import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Button from '../components/Button';
import Header from '../components/Header';

export default function Home() {
  const [tokenId, setTokenId] = useState(0);
  
  function reloadFrog() {
    const random = Math.floor(Math.random() * 10000);
    setTokenId(random);
  }
  
  useEffect(() => {
    reloadFrog();
  }, []);
  
  return (
    <div className="border-2 border-black">
      <Header />
      <div className="md:flex flex-row-reverse bg-[#1F56B5]">
        <div className="border-t-2 border-black">
          <video autoPlay muted loop className="bottom-0 right-0 min-w-full min-h-full">
            <source src="/sizzle.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="border-t-2 border-black text-white md:border-r-2 p-10 grow">
          <h2 className="text-4xl">Fly Frog Printables</h2>
          <p className="text-l pt-3 pb-3">
            A line of 3D printable, collectible, modular toys, ribbit!
            Download digital files and subscribe for commercial license.
          </p>
          <ul className="space-y-0.5">
            <li><a className="underline underline-offset-2 hover:underline-offset-4" href="https://www.patreon.com/flyfrog">Patreon</a></li>
            <li><a className="underline underline-offset-2 hover:underline-offset-4" href="https://cults3d.com/en/users/flyfrog/3d-models">Cults</a></li>
            <li><a className="underline underline-offset-2 hover:underline-offset-4" href="https://thangs.com/designer/flyfrog">Thangs</a></li>
            <li><a className="underline underline-offset-2 hover:underline-offset-4" href="https://www.myminifactory.com/users/flyfrog">MyMiniFactory</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center bg-black">
          <a href="https://instagram.com/flyfrog3d" target="blank">
            <Icon icon="simple-icons:instagram" color="white" height="30px" className='m-4 inline-block' />
          </a>
          <a href="https://x.com/flyfrogsnft" target="blank">
            <Icon icon="simple-icons:x" color="white" height="30px" className="m-4 inline-block" />
          </a>
          <a href="https://discord.com/invite/kfp4xftqKM" target="blank">
            <Icon icon="simple-icons:discord" color="white" height="30px" className="m-4 inline-block" />
          </a>
      </div>
      <div className="grid grid-rows-2 md:grid-cols-3 grid-flow-row">
        <div className="row-span-2 border-t-2 md:border-r-2 border-black bg-gray-200 relative">
          <p className="bg-black/50 text-white absolute bottom-0 right-0 text-xs p-1 cursor-pointer" onClick={() => reloadFrog()}>
            &#x21bb; Click to Refresh
          </p>
          <img
            className="mx-auto cursor-pointer"
            src={`https://ipfs.io/ipfs/QmTubGm6aKcjgTutgk7whbhXKeW42dHQmdXwp4GbbWxtTF/flyfrog${tokenId}.png`}
            alt={`Fly Frog ${tokenId}`}
            width="600"
            height="600"
            onClick={() => reloadFrog()}
          />
        </div>
        <div className="bg-[#A3DAEF] pl-1 pr-4 pt-4 pb-0 md:border-r-2 border-t-2 border-black flex gap-1">
          <img className="self-end" src="/frog.png" width="160" />
          <div>
            <h2 className="text-xl">Fly Frogs</h2>
            <a className="underline underline-offset-2 hover:underline-offset-4" target="blank" href="https://opensea.io/collection/fly-frogs">View NFT collection &rarr;</a>
            <div className="mt-4">
              <Button href="https://fly-frogs-next.vercel.app">Breed tadpoles</Button>
            </div>
          </div>
        </div>
        <div className="bg-[#FFBC0A] pl-1 pr-4 pt-4 pb-0 border-t-2 border-black flex gap-1">
          <img className="self-center" src="/tadpole.png" width="160" />
          <div>
            <h2 className="text-xl">Tadpoles</h2>
            <a className="underline underline-offset-2 hover:underline-offset-4" target="blank" href="https://opensea.io/collection/fly-frogs-tadpoles">View NFT collection &rarr;</a>
            <div className="mt-4">
              <Button href="/customize">Customize</Button>
            </div>
          </div>
        </div>
        <div className="bg-[#FE0B0A] pl-1 pr-4 pt-4 pb-0 border-t-2 md:border-r-2 border-black flex gap-1">
          <img className="self-center" src="/flytrap.png" width="160" height="160" />
          <div>
            <h2 className="text-xl">Flytrap</h2>
            <a className="underline underline-offset-2 hover:underline-offset-4" target="blank" href="https://opensea.io/collection/fly-frogs-flytrap">View NFT collection &rarr;</a>
          </div>
        </div>
        <div className="bg-[#1F56B5] pl-3 pr-4 pt-4 pb-0 border-t-2 border-black flex gap-1">
          <img className="self-end" src="/doodle.png" width="160" height="160" />
          <div className="text-white">
            <h2 className="text-xl">Doodle Pond</h2>
            <a className="underline underline-offset-2 hover:underline-offset-4" target="blank" href="https://opensea.io/collection/fly-frogs-doodle-pond">View NFT collection &rarr;</a>
          </div>
        </div>
      </div>
      <div className="text-center bg-black text-white p-12">
          <p>
            Fly Frogs was founded in 2021 by husband and wife team, Josh and Molly. The project launched as a set of 10k collectible Fly Frogs living on the ethereum blockchain. The brand has hopped into the 3d printable space. These frogs have legs!
          </p>
      </div>
    </div>
  )
}
