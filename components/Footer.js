export default function Footer(props) {
  return (
    <div className="p-2 md:p-4 border-t-2 border-black text-center text-sm">
      <a className="inline-block mx-2 underline underline-offset-2 hover:underline-offset-4" href="https://opensea.io/collection/fly-frogs-tadpoles" target="blank">
        Opensea
      </a>
      <a className="inline-block mx-2 underline underline-offset-2 hover:underline-offset-4" href="https://etherscan.io/address/0x9d3031d181ec6a2a784ba152f993332442fe8bfc" target="blank">
        Contract
      </a>
      <a className="inline-block mx-2 underline underline-offset-2 hover:underline-offset-4" href="https://discord.com/invite/kfp4xftqKM" target="blank">
        Discord
      </a>
    </div>
  );
}