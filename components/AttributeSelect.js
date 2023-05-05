export default function AttributeSelect(props) {
  let balColor = null;
  if(props.dragonflyBal === "0") {
    balColor = "text-red-600";
  }

  return (
    <>
    <label>
      <div className="flex mb-1 content-center">
        <div className="grow font-bold">{props.name}</div>
        <p>
          <img src={`/dragonfly${props.dragonflyName}.png`} alt={`Dragonfly ${props.dragonflyName.toLowerCase()}`} className="inline-block w-8 h-8" /> (<span className={balColor}>{props.dragonflyBal}</span>/1)
        </p>
      </div>
      <select name={props.name} value={props.value} onChange={props.onChange} className="w-full">
        <option value={props.starting}>{props.starting}</option>
        {props.options.map((o) =>
          o !== props.starting && <option value={o}>{o}</option>
        )}
      </select>
    </label>
    </>
  );
}