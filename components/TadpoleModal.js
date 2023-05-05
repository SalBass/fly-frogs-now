import { useState } from 'react';
import Button from './Button';

export default function TadpoleModal(props) {
  const [showModal, setShowModal] = useState(false);
  
  function handleClick(tadpole) {
    props.onClick(tadpole);
    setShowModal(false);
  }
  
  return (
    <>
      {(props.type === "button") ? (
        <div className="p-8 text-center border-t-2 border-black">
          <Button onClick={() => setShowModal(true)}>
            Select tadpole
          </Button>
        </div>
      ) : (<div className="p-1 text-center border-t-2 border-black">
        <a className="text-sm cursor-pointer underline underline-offset-2" onClick={() => setShowModal(true)}>
          Switch tadpoles
        </a>
      </div>)}
      {showModal ? (
        <>
          <div
            className="justify-center items-center overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border border-black relative bg-white p-2">
                {/*body*/}
                <div className="flex flex-wrap gap-2">
                  {
                    props.tadpoles.map((tadpole, i) => {
                      return <div className="cursor-pointer" key={i} onClick={() => handleClick(tadpole)}>
                        <div className="bg-slate-400"><img src={tadpole.thumbnail} alt={tadpole.name} width="150" height="150" /></div>
                      </div>
                      }
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}