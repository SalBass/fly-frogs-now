const ethers = require('ethers');
import { NFTStorage, File, Blob } from 'nft.storage';
import { doc, collection, updateDoc, query, where, limit, getDocs } from 'firebase/firestore';
import { app, database } from '../../firebaseConfig';
import FlyFrogsTadpoles from '../../abi/FlyFrogsTadpoles.json';
import FlyTrap from '../../abi/FlyTrap.json';
import {
  tadpolesAddress,
  flyTrapAddress,
  ETH_NETWORK,
  INFURA_ID,
  POLY_NETWORK
} from '../../config';
import { dataURItoBlob } from '../../util/images';

const GAS_STATION = 'https://gasstation-mainnet.matic.network/v2';

function checkSignature(sig, account, tokenId) {
  let inHash = ethers.utils.solidityKeccak256(
      ["address", "uint256"],
      [account, tokenId]
    );
  let inHashBytes = ethers.utils.arrayify(inHash);
  const recoveredAddress = ethers.utils.verifyMessage(inHashBytes, sig).toLowerCase();
  return account === recoveredAddress;
}

async function checkTadpoleOwner(account, tokenId) {
  const eProvider = new ethers.providers.InfuraProvider(ETH_NETWORK, INFURA_ID);
  const flyFrogsTadpoles = new ethers.Contract(tadpolesAddress, FlyFrogsTadpoles.abi, eProvider);
  
  let count = await flyFrogsTadpoles.balanceOf(account, tokenId);
  if (count.toNumber() < 1) {
    return false;
  }
  
  return true;
}

async function getTransactionPropertiesViaGasStation() {
    const gasStationResponse = await fetch(GAS_STATION);
    const gasStationObj = JSON.parse(await gasStationResponse.text());

    let block_number = gasStationObj.blockNumber;
    let base_fee = parseFloat(gasStationObj.estimatedBaseFee);
    let max_priority_fee = gasStationObj.standard.maxPriorityFee;
    let max_fee_per_gas = base_fee + max_priority_fee;

    //  In case the network gets (up to 25%) more congested
    max_fee_per_gas += (base_fee * 0.25);

    //  cast gwei numbers to wei BigNumbers for ethers
    const maxFeePerGas = ethers.utils.parseUnits(max_fee_per_gas.toFixed(9), 'gwei');
    const maxPriorityFeePerGas = ethers.utils.parseUnits(max_priority_fee.toFixed(9), 'gwei');

    //  Final object ready to feed into a transaction
    return {
        maxFeePerGas,
        maxPriorityFeePerGas
    };
}

export default async function evolveHandler(req, res) {
  const { account, sig, tokenId, dragonflyTokenIds, src, attributes, name, desc } = req.body;

  if (checkSignature(sig, account, tokenId)) {
    if(await checkTadpoleOwner(account, tokenId)) {
      // Create a wallet & get FlyTrap contract
      const pProvider = new ethers.providers.InfuraProvider(POLY_NETWORK, INFURA_ID);
      const privateKey = `0x${process.env.ACCOUNT_KEY}`;
      let wallet = new ethers.Wallet(privateKey, pProvider);
      const flyTrap = new ethers.Contract(flyTrapAddress, FlyTrap.abi, wallet);
      
      for (const i in dragonflyTokenIds) {
        const options = await getTransactionPropertiesViaGasStation();
        const transaction = await flyTrap.burnForAddress(account, dragonflyTokenIds[i], 1, options);
        transaction.wait();
      }
      
      // Save image to ipfs
      const NFT_STORAGE_TOKEN = process.env.NFT_STORAGE_API_KEY;
      const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
  
      const blob = dataURItoBlob(src);
      const cid = await client.storeBlob(blob);

      if (cid) {
        // Save metadata
        const dbInstance = collection(database, 'tadpole');
        const q = query(dbInstance, where("id", "==", parseInt(tokenId)), limit(1));
        const querySnapshot = await getDocs(q);
        let docId;
        querySnapshot.forEach((doc) => {
          docId = doc.id;
        });
        const tadpoleRef = doc(database, "tadpole", docId);
        
        const metadata = {
          'name': name,
          'description': desc,
          'attributes': attributes,
          'image': `ipfs://${cid}`,
        };
        
        try {
          await updateDoc(tadpoleRef, {
            metadata: JSON.stringify(metadata)
          });
          
          res.status(200).json({ data: metadata });
        } catch (e) {
          res.status(500).json({ message: `Error uploading metadata.` });
        }
      } else {
        res.status(500).json({message: `Error saving image to ipfs.`});
      }
    } else {
      res.status(500).json({message: `Must own evolving tadpole.`});
    }
  } else {
    res.status(500).json({message: `Invalid signature.`});
  }
}