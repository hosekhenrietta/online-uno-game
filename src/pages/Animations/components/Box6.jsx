import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useEffect } from "react";
import { createRef } from "react";
//import { enableReactiveBindings } from "@syncedstore/yjs-reactive-bindings";

export default function Box6() {
  const [isAnimating, setIsAnimating] = useState(false);
  const redLineRef = useRef()
  const boxRef = useRef()
  const [boxIsOverRedLine, setBoxIsOverRedLine] = useState(false)
  const [coordiante, setCoordiante] = useState(0)
  const [coordianteHelper, setCoordianteHelper] = useState(-2000)
  const [isCardSelected, setIsCardSelected] = useState(false)

    useEffect(() => {
        console.log(coordiante);
        if(coordiante < 0)
            setCoordianteHelper(coordianteHelper === 2010 ? 1990 :coordianteHelper + 10)
    }, [coordiante])

    const handleOnDrag = (info) => {
        
        const helper = document.getElementById('kocka').getBoundingClientRect().top < 0
        console.log('====================================')
        console.log(helper)
        console.log('====================================')
        setCoordiante(document.getElementById('kocka').getBoundingClientRect().top)
    }

    const handleCardOnClick = () => {
      if (isCardSelected === false) {
        setIsCardSelected(true)
        setCoordiante(-200)
      }
      else {
        setCoordiante(-1000)
        setIsCardSelected(false)
      }
    }


  return (
    <div className="box-container">
        <div className="red-line" ref={redLineRef}></div>
        <div className="hand-container">
      <div className="box-container">
        <motion.div
            id="kocka"
          className="box"
          drag
          ref={boxRef}
          //onDragEnd={(event, info) => handleOnDrag(info)}
          animate={{
            y: coordiante
          }}
          onClick={() => handleCardOnClick()}
          dragConstraints={{
            left: 0,
            right: 0,
            bottom: 0,
          }}
          initial={{
            opacity: 0.2,
          }}
          transition={{
            /*type: "tween",
            duration: 2*/
            type: "spring",
            stiffness: 100,
            damping: 10, //100
          }}
          //onClick={() => setBoxIsOverRedLine(-200)}
          
        ></motion.div>
      </div>
    </div>
    </div>
  );
}
