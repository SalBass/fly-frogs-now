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
      <div className="grid grid-rows-2 md:grid-cols-3 grid-flow-row">
        <div className="row-span-2 border-t-2 md:border-r-2 border-black bg-gray-200 relative">
          <p className="bg-black/50 text-white absolute bottom-0 right-0 text-xs p-1 cursor-pointer" onClick={() => reloadFrog()}>
            &#x21bb; Fly Frog {tokenId}
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
            <a className="underline underline-offset-2" target="blank" href="https://opensea.io/collection/fly-frogs">View collection &rarr;</a>
            <div className="mt-4">
              <Button href="https://fly-frogs-next.vercel.app">Breed tadpoles</Button>
            </div>
          </div>
        </div>
        <div className="bg-[#FFBC0A] pl-1 pr-4 pt-4 pb-0 border-t-2 border-black flex gap-1">
          <img className="self-center" src="/tadpole.png" width="160" />
          <div>
            <h2 className="text-xl">Tadpoles</h2>
            <a className="underline underline-offset-2" target="blank" href="https://opensea.io/collection/fly-frogs-tadpoles">View collection &rarr;</a>
            <div className="mt-4">
              <Button href="/customize">Customize</Button>
            </div>
          </div>
        </div>
        <div className="bg-[#FE0B0A] pl-1 pr-4 pt-4 pb-0 border-t-2 md:border-r-2 border-black flex gap-1">
          <img className="self-center" src="/flytrap.png" width="160" height="160" />
          <div>
            <h2 className="text-xl">Flytrap</h2>
            <a className="underline underline-offset-2" target="blank" href="https://opensea.io/collection/fly-frogs-flytrap">View collection &rarr;</a>
          </div>
        </div>
        <div className="bg-[#1F56B5] pl-3 pr-4 pt-4 pb-0 border-t-2 border-black flex gap-1">
          <img className="self-end" src="/doodle.png" width="160" height="160" />
          <div className="text-white">
            <h2 className="text-xl">Doodle Pond</h2>
            <a className="underline underline-offset-2" target="blank" href="https://opensea.io/collection/fly-frogs-doodle-pond">View collection &rarr;</a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4">
        <div className="col-span-2 border-t-2 md:border-r-2 border-black p-2">
          <a href="https://shop.flyfrogs.xyz" target="blank" className="flex items-center gap-1">
            <img src="/hat.png" className="w-32 md:w-16" />
            <img src="/backpack.png" className="w-32 md:w-16" />
            <h2 className="text-7xl md:text-4xl font-bold font-display">Merch Store</h2>
          </a>
        </div>
        <div className="bg-[#019FF1] border-t-2 border-r-2 border-black px-4 py-2">
          <a href="https://twitter.com/flyfrogsnft" target="blank" className="text-white flex items-center gap-2">
            <Icon icon="simple-icons:twitter" color="white" height="30px" className="my-4" />
            <h2 className="text-2xl">Twitter</h2>
          </a>
        </div>
        <div className="bg-[#7E4BA6] border-t-2 border-black px-4 py-2">
          <a href="https://discord.com/invite/kfp4xftqKM" target="blank" className="text-white flex items-center gap-2">
            <Icon icon="simple-icons:discord" color="white" height="30px" className="my-4" />
            <h2 className="text-2xl">Discord</h2>
          </a>
        </div>
      </div>
      <div className="md:grid md:grid-cols-3 md:grid-rows-3">
        <div className="md:row-span-3 md:border-r-2 border-t-2 border-black p-3">
          <h2 className="text-lg font-semibold uppercase">In the Media</h2>
          <ul className="space-y-2 mt-2 pl-4 list-outside list-disc">
            <li>
              <a href="https://savethefrogs.com/fly-frogs/" className="hover:underline" target="blank">
                <h3 className="text-base">Fly Frogs Donates $32,468 To SAVE THE FROGS!</h3>
              </a>
            </li>
            <li>
              <a href="https://artcolumn.substack.com/p/fly-frogs-making-the-internet-fun" className="hover:underline" target="blank">
                <h3 className="text-base">Fly Frogs - Making The Internet Fun Again</h3>
                <span className="text-slate-500">Art Column by Studio TBD</span>
              </a>
            </li>
            <li>
              <a href="https://podcasters.spotify.com/pod/show/ma-fer5/episodes/Ribbit--An-interview-from-the-pond-with-FlyFrogs-creators-Josh--Molly-e1b3hg6/a-a70q0u9" className="hover:underline" target="blank">
                <h3 className="text-base">Ribbit. An interview from the pond with Fly Frogs creators Josh & Molly</h3>
                <span className="text-slate-500">The Matthew and Rizzle Show</span>
              </a>
            </li>
            <li>
              <a href="https://artcolumn.substack.com/p/nft-spotlight-fly-frogs" className="hover:underline" target="blank">
                <h3 className="text-base">NFT Spotlight: Fly Frogs</h3>
                <span className="text-slate-500">Art Column by Studio TBD</span>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@flyfrogs2384/videos" className="hover:underline" target="blank">
                <h3 className="text-base">Fly Frogs YouTube Channel</h3>
              </a>
            </li>
          </ul>
        </div>
        <div className="border-t-2 md:border-r-2 border-black flex gap-4">
          <img src="/physical.jpg" className="w-48 h-48 md:w-32 md:h-32 lg:w-52 lg:h-52" />
          <div className="py-3">
            <h2 className="text-xl">Physicals</h2>
            <a className="underline underline-offset-2" target="blank" href="https://opensea.io/collection/fly-frog-physicals">View collection &rarr;</a>
          </div>
        </div>
        <div className="border-t-2 border-black flex gap-4">
          <img src="/fun.jpg" className="w-48 h-48 md:w-32 md:h-32 lg:w-52 lg:h-52" />
          <div className="py-3">
            <h2 className="text-xl">Fun Factory</h2>
            <a className="underline underline-offset-2" target="blank" href="https://opensea.io/collection/fly-frog-fun-factory">View collection &rarr;</a>
          </div>
        </div>
        <div className="border-t-2 md:border-r-2 border-black flex gap-4">
          <img src="/parcel.gif" className="w-48 h-48 md:w-32 md:h-32 lg:w-52 lg:h-52" />
          <div className="py-3">
            <h2 className="text-xl">Voxel Lily Pad</h2>
            <a className="underline underline-offset-2" target="blank" href="https://www.voxels.com/play?coords=E@1590E,1206N">Hop in world &rarr;</a>
          </div>
        </div>
        <div className="border-t-2 border-black flex gap-4">
          <img src="/ribbit.gif" className="w-48 h-48 md:w-32 md:h-32 lg:w-52 lg:h-52" />
          <div className="py-3">
            <h2 className="text-xl">Voxels</h2>
            <a className="underline underline-offset-2" target="blank" href="https://opensea.io/collection/fly-frog-voxels">View collection &rarr;</a>
          </div>
        </div>
        <div className="col-span-2 border-t-2 border-black p-3 bg-[#dddddd]">
          <h2 className="text-lg font-semibold uppercase">The Team</h2>
          <ul className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center justify-center">
            <li>
              <a href="https://twitter.com/flyfrogsnft" target="blank">
                <img src="/flyfrog.png" className="w-24 h-24 mx-auto my-2 rounded-full" />
                <h3 className="text-md font-bold">Fly Frog</h3>
                <p className="text-sm">Frog doodler</p>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/mfnkl" target="blank">
                <img src="/mollcule.png" className="w-24 h-24 mx-auto my-2 rounded-full" />
                <h3 className="text-md font-bold">Mollcule</h3>
                <p className="text-sm">Amphibious coder</p>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/chupacabrapower" target="blank">
                <img src="/tadpoleon.png" className="w-24 h-24 mx-auto my-2 rounded-full" />
                <h3 className="text-md font-bold">Chupacabra</h3>
                <p className="text-sm">Emperor</p>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/nftland" target="blank">
                <img src="/rizzle.png" className="w-24 h-24 mx-auto my-2 rounded-full" />
                <h3 className="text-md font-bold">Rizzle</h3>
                <p className="text-sm">Lover of frogs</p>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/jjjjigglyjams" target="blank">
                <img src="/jigglyjams.png" className="w-24 h-24 mx-auto my-2 rounded-full" />
                <h3 className="text-md font-bold">Jigglyjams</h3>
                <p className="text-sm">Bot builder</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
