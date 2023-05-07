import { Network, Alchemy } from 'alchemy-sdk';
import { ethers } from 'ethers';
import Image from 'next/image';
import { useState } from 'react';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import {
  flyTrapAddress,
  tadpolesAddress,
  INFURA_ID,
  POLY_NETWORK
} from '../config';
import FlyTrap from '../abi/FlyTrap.json';
import AttributeSelect from '../components/AttributeSelect';
import Button from '../components/Button';
import Header from '../components/Header';
import TadpoleModal from '../components/TadpoleModal';
import { backgrounds, heads, skins, eyes, mouths, outfits } from '../util/customizableTraits';
import { getImageUrl } from "../util/imageUrl";

export default function Customize() {
  const pProvider = new ethers.providers.InfuraProvider(POLY_NETWORK, INFURA_ID);
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: INFURA_ID,
        qrcodeModalOptions: {
          mobileLinks: [
            'rainbow',
            'metamask',
            'argent',
            'trust'
          ]
        }
      }
    }
  };
  
  const [account, setAccount] = useState();
  const [dragonflyApple, setDragonflyApple] = useState("--");
  const [dragonflyGum, setDragonflyGum] = useState("--");
  const [dragonflyLime, setDragonflyLime] = useState("--");
  const [dragonflyTurquoise, setDragonflyTurquoise] = useState("--");
  const [dragonflyWonka, setDragonflyWonka] = useState("--");
  const [dragonflyYellow, setDragonflyYellow] = useState("--");
  const [waterLily, setWaterLily] = useState("--");
  const [tadpoles, setTadpoles] = useState([]);
  const [stagedTadpole, setStagedTadpole] = useState();
  const [stagedBackground, setStagedBackground] = useState();
  const [stagedHead, setStagedHead] = useState();
  const [stagedSkin, setStagedSkin] = useState();
  const [stagedEyes, setStagedEyes] = useState();
  const [stagedMouth, setStagedMouth] = useState();
  const [stagedOutfit, setStagedOutfit] = useState();
  const [stagedName, setStagedName] = useState();
  const [stagedDesc, setStagedDesc] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [provider, setProvider] = useState();
  const [success, setSuccess] = useState(false);
  
  async function loadFlytrap(address) {
    const flyTrap = new ethers.Contract(flyTrapAddress, FlyTrap.abi, pProvider);
    const dragonflyGumBalance = await flyTrap.balanceOf(address, 2);
    const dragonflyLimeBalance = await flyTrap.balanceOf(address, 3);
    const dragonflyTurquoiseBalance = await flyTrap.balanceOf(address, 4);
    const dragonflyWonkaBalance = await flyTrap.balanceOf(address, 5);
    const dragonflyYellowBalance = await flyTrap.balanceOf(address, 6);
    const dragonflyAppleBalance = await flyTrap.balanceOf(address, 11);
    const waterLilyBalance = await flyTrap.balanceOf(address, 1);

    setDragonflyApple(dragonflyAppleBalance.toString());
    setDragonflyGum(dragonflyGumBalance.toString());
    setDragonflyLime(dragonflyLimeBalance.toString());
    setDragonflyTurquoise(dragonflyTurquoiseBalance.toString());
    setDragonflyWonka(dragonflyWonkaBalance.toString());
    setDragonflyYellow(dragonflyYellowBalance.toString());
    setWaterLily(waterLilyBalance.toString());
  }
  
  async function getAccount() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions
    });
    const connection = await web3Modal.connect();
    const web3provider = new ethers.providers.Web3Provider(connection);
    const [account] = await web3provider.listAccounts();
    
    setProvider(web3provider);
    setAccount(account.toLowerCase());
    loadTadpoles(account.toLowerCase());
    loadFlytrap(account.toLowerCase());
  }
  
  async function loadTadpoles(address) {
    const settings = {
      apiKey: "kf_MSd0_EFwjv5qqsWIduwj_mtRKz78F",
      network: Network.ETH_MAINNET,
    };
    const alchemy = new Alchemy(settings);
    
    const nftsForOwner = await alchemy.nft.getNftsForOwner(
      address, {contractAddresses: [tadpolesAddress]}
    );
    
    if (nftsForOwner.totalCount > 0) {
      const nftList = nftsForOwner.ownedNfts.map((i) => {
        return {
          contractAddress: tadpolesAddress,
          tokenId: i.tokenId,
          tokenType: "ERC1155"
        }
      });
  
      const items = await alchemy.nft.getNftMetadataBatch(nftList).then((result) => (
        result.map((i) => {
          return {
            tokenId: i.tokenId,
            name: i.title,
            desc: i.description,
            thumbnail: i.media[0].thumbnail,
            image: i.media[0].gateway,
            attributes: i.rawMetadata.attributes,
          }
        })
      ));
      
      setTadpoles(items);
    } else {
      setTadpoles(null);
    }
  }
  
  const switchStaged = (tadpole) => {
    setStagedTadpole(tadpole);
    setStagedBackground(tadpole.attributes[0].value);
    setStagedHead(tadpole.attributes[1].value);
    setStagedSkin(tadpole.attributes[2].value);
    setStagedEyes(tadpole.attributes[3].value);
    setStagedMouth(tadpole.attributes[4].value);
    setStagedOutfit(tadpole.attributes[5].value);
    setStagedName(tadpole.name);
    setStagedDesc(tadpole.desc);
  }
  
  const handleReset = () => {
    setStagedBackground(stagedTadpole.attributes[0].value);
    setStagedHead(stagedTadpole.attributes[1].value);
    setStagedSkin(stagedTadpole.attributes[2].value);
    setStagedEyes(stagedTadpole.attributes[3].value);
    setStagedMouth(stagedTadpole.attributes[4].value);
    setStagedOutfit(stagedTadpole.attributes[5].value);
    setStagedName(stagedTadpole.name);
    setStagedDesc(stagedTadpole.desc);
  }
  
  function didBackgroundChange() {
    return stagedBackground !== stagedTadpole.attributes[0].value;
  }
  
  function didHeadChange() {
    return stagedHead !== stagedTadpole.attributes[1].value;
  }
  
  function didSkinChange() {
    return stagedSkin !== stagedTadpole.attributes[2].value;
  }
  
  function didEyesChange() {
    return stagedEyes !== stagedTadpole.attributes[3].value;
  }
  
  function didMouthChange() {
    return stagedMouth !== stagedTadpole.attributes[4].value;
  }
  
  function didOutfitChange() {
    return stagedOutfit !== stagedTadpole.attributes[5].value;
  }
  
  function didNameChange() {
    return stagedName !== stagedTadpole.name;
  }
  
  function didDescChange() {
    return stagedDesc !== stagedTadpole.desc;
  }
  
  function getDragonflyTokenIds() {
    const dragonflyTokenIds = [];
    if(didBackgroundChange()) {
      drafongflyTokenIds.push(11);
    }
    if(didHeadChange()) {
      dragonflyTokenIds.push(5);
    }
    if(didSkinChange()) {
      dragonflyTokenIds.push(2);
    }
    if(didEyesChange()) {
      dragonflyTokenIds.push(3);
    }
    if(didMouthChange()) {
      dragonflyTokenIds.push(4);
    }
    if(didOutfitChange()) {
      dragonflyTokenIds.push(6);
    }
    if(didNameChange() || didDescChange()) {
      dragonflyTokenIds.push(1);
    }
    
    return dragonflyTokenIds;
  }
  
  function hasChanges() {
    return didBackgroundChange() || didHeadChange() || didSkinChange() || didEyesChange() || didMouthChange() || didOutfitChange() || didNameChange() || didDescChange();
  }
  
  function hasMissingDragonflies() {
    if(
      (didBackgroundChange() && dragonflyApple < 1) ||
      (didHeadChange() && dragonflyWonka < 1) ||
      (didSkinChange() && dragonflyGum < 1) ||
      (didEyesChange() && dragonflyLime < 1) ||
      (didMouthChange() && dragonflyTurquoise < 1) ||
      (didOutfitChange() && dragonflyYellow < 1) ||
      ((didNameChange() || didDescChange()) && waterLily < 1 )
    ) {
      return true;
    }
    return false;
  }
  
  function getAttributes() {
    return [
      {
        "trait_type": "Background",
        "value": stagedBackground
      },
      {
        "trait_type": "Head",
        "value": stagedHead
      },
      {
        "trait_type": "Skin",
        "value": stagedSkin
      },
      {
        "trait_type": "Eyes",
        "value": stagedEyes
      },
      {
        "trait_type": "Mouth",
        "value": stagedMouth
      },
      {
        "trait_type": "Outfit",
        "value": stagedOutfit
      },
      stagedTadpole.attributes[6],
      stagedTadpole.attributes[7],
      {
        "trait_type": "Customized",
        "value": "True"
      },
    ];
  }
  
  async function getSignature() {
    const signer = provider.getSigner();
    
    let messageHash = ethers.utils.solidityKeccak256(
      ["address", "uint256"],
      [account, stagedTadpole.tokenId]
    );
    let messageHashBytes = ethers.utils.arrayify(messageHash);
    let sig = await signer.signMessage(messageHashBytes);
    return sig;
  }
  
  async function handleCustomize() {
    const dragonflyTokenIds = getDragonflyTokenIds();
    const attributes = getAttributes();
    
    if(dragonflyTokenIds.length > 0) {
      let sig;

      try {
        sig = await getSignature();
      } catch (e) {
        setAlertMsg(`Error: ${e.message}`);
      }
    
      if (sig) {
        try {
          const response = await fetch('/api/customize', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              account: account,
              sig: sig,
              tokenId: stagedTadpole.tokenId.toString(),
              dragonflyTokenIds: dragonflyTokenIds.join('/'),
              src: document.querySelector('img.stage').getAttribute('src'),
              attributes: attributes,
              name: stagedName,
              desc: stagedDesc
            }),
          });
          setAlertMsg(null);
          setSuccess(true);
        } catch (e) {
          setAlertMsg(`Error: ${e.message}`);
        }
      }
    }
  }
  
  if (!account) {
    return (
      <div className="border-2 border-black">
        <Header />
        <div className="border-t-2 border-black">
          <div className="p-4 max-w-sm mx-auto">
            <h2 className="text-3xl font-medium text-center">
              got dragonflies?
            </h2>
            <div className="my-8 text-center">
              <Button onClick={getAccount}>Connect wallet</Button>
            </div>
            <div className="mt-6">
              Use dragonflies and water lillies to customize your tadpole&rsquo;s traits. No gas!
              <ul className="mt-4 space-y-2">
                <li>
                  <img src="/dragonflyYellow.png" className="w-14 h-14 inline-block rounded" alt="Dragonfly yellow" /> Customize outfit
                </li>
                <li>
                  <img src="/dragonflyWonka.png" className="w-14 h-14 inline-block rounded" alt="Dragonfly wonka" /> Customize head
                </li>
                <li>
                  <img src="/dragonflyTurquoise.png" className="w-14 h-14 inline-block rounded" alt="Dragonfly turquoise" /> Customize mouth
                </li>
                <li>
                  <img src="/dragonflyLime.png" className="w-14 h-14 inline-block rounded" alt="Dragonfly lime" />  Customize eyes
                </li>
                <li>
                  <img src="/dragonflyGum.png" className="w-14 h-14 inline-block rounded" alt="Dragonfly gum" /> Customize skin
                </li>
                <li>
                  <img src="/dragonflyApple.png" className="w-14 h-14 inline-block rounded" alt="Dragonfly apple" /> Customize background
                </li>
                <li>
                  <img src="/waterLily.png" className="w-14 h-14 inline-block rounded" alt="Water lily" /> Customize name and description
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!stagedTadpole) {
    return (
      <div className="border-2 border-black">
        <Header />
        {tadpoles ?
          <TadpoleModal tadpoles={tadpoles} stagedTadpole={stagedTadpole} onClick={switchStaged} type="button" />
          : <p className="p-8 text-center border-t-2 border-black">
            You need at least one tadpole to customize. Hop on over and <a className="cursor-pointer underline underline-offset-2" href="https://opensea.io/collection/fly-frogs-tadpoles" target="_blank">buy a tad</a>!</p>
        }
      </div>
    );
  }
  
  getImageUrl([
    {
      "trait_type": "Background",
      "value": stagedBackground
    },
    {
      "trait_type": "Head",
      "value": stagedHead
    },
    {
      "trait_type": "Skin",
      "value": stagedSkin
    },
    {
      "trait_type": "Eyes",
      "value": stagedEyes
    },
    {
      "trait_type": "Mouth",
      "value": stagedMouth
    },
    {
      "trait_type": "Outfit",
      "value": stagedOutfit
    },
  ]).then((b64) => {
    document.querySelector('img.stage').src = b64;
  });
  
  if (success) {
    return (
      <div className="border-2 border-black">
        <Header />
        <div className="grid grid-cols-3 grid-flow-row">
          <div className="row-span-2 border-t-2 border-r-2 border-black">
            <img
              src={stagedTadpole.image}
              alt={stagedTadpole.name}
              width="600"
              height="600"
              className="stage"
            />
          </div>
          <div className="col-span-2 p-8 text-center border-t-2 border-black">
            <h2 className="text-2xl">Congrats!</h2>
            <p className="text-lg">{stagedName}</p>
            <a className="cursor-point underline underline-offset-2" target="_blank" href={`https://opensea.io/assets/ethereum/0x9d3031d181ec6a2a784ba152f993332442fe8bfc/${stagedTadpole.tokenId}`}>Don&rsquo;t forget to refresh the metadata ↗</a>
            <div className="mt-8">
              <Button href="/customize">&#x21bb; Start again</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="border-2 border-black">
      <Header />
      {alertMsg
        && <div className="bg-red-100 text-red-600 text-center p-4 border-t-2 border-black">
          {alertMsg}
        </div>
      }
      <div className="md:grid md:grid-cols-3 border-t-2 border-black">
        <div className="border-b-2 md:border-b-0 md:border-r-2 border-black">
          <img
            src={stagedTadpole.image}
            alt={stagedTadpole.name}
            width="600"
            height="600"
            className="stage"
          />
          <TadpoleModal tadpoles={tadpoles} stagedTadpole={stagedTadpole} onClick={switchStaged} type="link" />
        </div>
        <div className="md:col-span-2 flex flex-wrap p-3">
          <div className="p-3 basis-full">Use dragonflies and water lillies to customize your tadpole&rsquo;s traits. No gas!</div>
          <div className="p-3 basis-1/2 md:basis-1/3">
            <AttributeSelect name="Background" dragonflyName="Apple" dragonflyBal={dragonflyApple} value={stagedBackground} starting={stagedTadpole.attributes[0].value} onChange={(e) => setStagedBackground(e.target.value)} options={backgrounds} />
          </div>
          <div className="p-3 basis-1/2 md:basis-1/3">
            <AttributeSelect name="Skin" dragonflyName="Gum" dragonflyBal={dragonflyGum} value={stagedSkin} starting={stagedTadpole.attributes[2].value} onChange={(e) => setStagedSkin(e.target.value)} options={skins} />
          </div>
          <div className="p-3 basis-1/2 md:basis-1/3">
            <AttributeSelect name="Eyes" dragonflyName="Lime" dragonflyBal={dragonflyLime} value={stagedEyes} starting={stagedTadpole.attributes[3].value} onChange={(e) => setStagedEyes(e.target.value)} options={eyes} />
          </div>
          <div className="p-3 basis-1/2 md:basis-1/3">
            <AttributeSelect name="Mouth" dragonflyName="Turquoise" dragonflyBal={dragonflyTurquoise} value={stagedMouth} starting={stagedTadpole.attributes[4].value} onChange={(e) => setStagedMouth(e.target.value)} options={mouths} />
          </div>
          <div className="p-3 basis-1/2 md:basis-1/3">
            <AttributeSelect name="Head" dragonflyName="Wonka" dragonflyBal={dragonflyWonka} value={stagedHead} starting={stagedTadpole.attributes[1].value} onChange={(e) => setStagedHead(e.target.value)} options={heads} />
          </div>
          <div className="p-3 basis-1/2 md:basis-1/3">
            <AttributeSelect name="Outfit" dragonflyName="Yellow" dragonflyBal={dragonflyYellow} value={stagedOutfit} starting={stagedTadpole.attributes[5].value} onChange={(e) => setStagedOutfit(e.target.value)} options={outfits} />
          </div>
          <div className="p-3 basis-full">
            <label>
              <div className="flex mb-1 content-center">
                <div className="font-bold grow">Name & Description</div>
                <p><img src={`/waterLily.png`} alt="Water lily" className="inline-block w-8 h-8" /> ({waterLily}/1)</p>
              </div>
              <input className="w-full mb-1" id="nameField" name="tadpoleName" type="text" value={stagedName} onChange={(e) => setStagedName(e.target.value)} />
              <textarea className="w-full" id="descField" name="tadpoleDesc" value={stagedDesc} onChange={(e) => setStagedDesc(e.target.value)} />
            </label>
          </div>
          <div className="p-3 basis-full text-center">
            {hasMissingDragonflies() && <p>To complete this customization, you&rsquo;ll need:</p>}
            {didBackgroundChange() && dragonflyApple < 1 && <p>1 Dragonfly apple <a className="cursor-pointer underline underline-offset-2" href="https://opensea.io/assets/matic/0x944de29a2ea9bebdb26b8a387afbf95a364a37cc/11" target="_blank">purchase ↗</a></p>}
            {didSkinChange() && dragonflyGum < 1 && <p>1 Dragonfly gum <a className="cursor-pointer underline underline-offset-2" href="https://opensea.io/assets/matic/0x944de29a2ea9bebdb26b8a387afbf95a364a37cc/2" target="_blank">purchase ↗</a></p>}
            {didEyesChange() && dragonflyLime < 1 && <p>1 Dragonfly lime <a className="cursor-pointer underline underline-offset-2" href="https://opensea.io/assets/matic/0x944de29a2ea9bebdb26b8a387afbf95a364a37cc/3" target="_blank">purchase ↗</a></p>}
            {didMouthChange() && dragonflyTurquoise < 1 && <p>1 Dragonfly turquoise <a className="cursor-pointer underline underline-offset-2" href="https://opensea.io/assets/matic/0x944de29a2ea9bebdb26b8a387afbf95a364a37cc/4" target="_blank">purchase ↗</a></p>}
            {didHeadChange() && dragonflyWonka < 1 && <p>1 Dragonfly wonka <a className="cursor-pointer underline underline-offset-2" href="https://opensea.io/assets/matic/0x944de29a2ea9bebdb26b8a387afbf95a364a37cc/5" target="_blank">purchase ↗</a></p>}
            {didOutfitChange() && dragonflyYellow < 1 && <p>1 Dragonfly yellow <a className="cursor-pointer underline underline-offset-2" href="https://opensea.io/assets/matic/0x944de29a2ea9bebdb26b8a387afbf95a364a37cc/6" target="_blank">purchase ↗</a></p>}
            {(didNameChange() || didDescChange()) && waterLily < 1 && <p>1 Water lily<a className="cursor-pointer underline underline-offset-2" href="https://opensea.io/assets/matic/0x944de29a2ea9bebdb26b8a387afbf95a364a37cc/1" target="_blank">purchase ↗</a></p> }
            {hasMissingDragonflies() && <a className="cursor-pointer underline underline-offset-2" onClick={() => loadFlytrap(account)}>&#x21bb; Check my balance again</a>}
            {hasChanges() && !hasMissingDragonflies() &&
              <>
                <div>
                  <Button onClick={() => handleCustomize()}>Customize!</Button>
                  <a className="cursor-pointer underline underline-offset-2 ml-3" onClick={() => handleReset()}>Reset</a>
                  <div className="text-sm italic mt-4">This will not cost gas.</div>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
