export default function AttributeSelect(props) {
  return (
    <>
    <label>
      <div className="flex mb-1 content-center">
        <div className="grow font-bold">{props.name}</div>
        <p>
          <a href={props.url} target="blank"><img src={`/dragonfly${props.dragonflyName}.png`} alt={`Dragonfly ${props.dragonflyName.toLowerCase()}`} className="inline-block w-8 h-8" /></a> (<span className={props.dragonflyBal === "0" ? "text-red-600" : null}>{props.dragonflyBal}</span>/1)
        </p>
      </div>
      <select name={props.name} value={props.value} onChange={props.onChange} className="w-full">
        <option value={props.starting}>{props.starting}</option>
        {props.options.map((o) =>
          o !== props.starting && <option key={o} value={o}>{o}</option>
        )}
      </select>
    </label>
    </>
  );
}