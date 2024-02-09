export default function Button({onClick, children, ...rest}) {
  return (
    <a className="rounded-full bg-white border border-black border-2 px-6 py-3 font-bold tracking-wider uppercase cursor-pointer text-center inline-block" onClick={onClick} {...rest}>
      {children}
    </a>
  );
}