import { useLayoutEffect, useRef, useState } from 'react';
import './App.css';
import classNames from 'classnames'


function NeoBrutalistButton({label, ...props}) {

const ref = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [clicked, setClicked] = useState(false);


  useLayoutEffect(() => {
    setTimeout(() => {
      setWidth(ref.current.offsetWidth);
      setHeight(ref.current.offsetHeight);
    }, 500);
    console.log("width",width);
    console.log("height",height)
    let shadowD = Math.sqrt((width * width) + (height * height)) - 4;
    const shadowElem = document.querySelector("#buttonShadow");
    shadowElem.style.width = shadowD + "px";
    shadowElem.style.height = shadowD + "px";
  }, [height, width]);

  function handleMouseUp() {
    setClicked(false)
    console.log("clicked?",clicked)
  }

  function handleMouseDown() {
    setClicked(true)
    console.log("clicked?",clicked)

  }

  return (
    <div className="relative overflow-hidden">
      <button 
        type='submit' 
        id="submit" 
        ref={ref} 
        onMouseDown={handleMouseDown}
        onTouchEnd={handleMouseDown}  
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseUp} 
        className={classNames("relative border-4 border-white bg-black m-2 p-4 transition",
          {"left-2 top-2": clicked},
          {"-left-2 -top-2": !clicked}
        )}
        {...props}>
          {label}
        </button>
      <span 
        id="buttonShadow" 
        className={classNames("block absolute -rotate-[40deg] left-0 origin-top-left -z-[1] bg-pink-500",
          {"top-28": clicked},
          {"top-16": !clicked}
        )}>
      </span>
    </div>
  )
}

export default NeoBrutalistButton