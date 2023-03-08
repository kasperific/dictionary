import { useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames'


function NeoBrutalistButton({label, ...props}) {

const ref = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [border, setBorder] = useState(0);
  const [clicked, setClicked] = useState(false);


  useLayoutEffect(() => {
    // Get the dimensions of the element
    setTimeout(() => {
      setWidth(ref.current.offsetWidth);
      setHeight(ref.current.offsetHeight);
      //  We only want to count the border once, so we need halve the border width 
      setBorder((ref.current.offsetWidth - ref.current.clientWidth) / 2)
    }, 500);
    //  The shadow's width should equal the hypotenuse of the element
    let shadowD = Math.sqrt((width * width) + (height * height)) - border;
    // Apply the calculated dimensions to the shadow element
    const shadowElem = document.querySelector("#buttonShadow");
    shadowElem.style.width = shadowD + "px";
    shadowElem.style.height = shadowD + "px";
  }, [height, width]);

  function handleMouseUp() {
    setClicked(false)
  }

  function handleMouseDown() {
    setClicked(true)
  }

  return (
    <div className="relative overflow-hidden">
      <button 
        type='submit' 
        id="submit" 
        ref={ref} 
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown} 
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}  
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