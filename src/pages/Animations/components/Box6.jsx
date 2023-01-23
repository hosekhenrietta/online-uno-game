import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useEffect } from "react";
import { createRef } from "react";
import { enableReactiveBindings } from "@syncedstore/yjs-reactive-bindings";

export default function Box6() {
  const [isAnimating, setIsAnimating] = useState(false);
  const redLineRef = useRef()
  const boxRef = useRef()
  const [bosIsOverRedLine, setBoxIsOverRedLine] = useState(0)

    useEffect(() => {
        console.log(redLineRef);
    }, [redLineRef])

    const handleOnDrag = (info) => {
        console.log('====================================')
        console.log(redLineRef.current.offsetTop + redLineRef.current.offsetHeight, boxRef.current.offset)
        console.log('====================================')
        if(redLineRef.current.offsetTop + redLineRef.current.offsetHeight > info.point.y) {
            console.log("if");
            setBoxIsOverRedLine(-1000)
        }
        else {
            console.log("else");
            setBoxIsOverRedLine(0)
        }
    }


  return (
    <div className="box-container">
        <div className="red-line" ref={redLineRef}></div>
        <div className="hand-container">
      <div className="box-container">
        <motion.div
          className="box"
          animate={{
            //x: 700,
            //x: isAnimating ? 700 : 0,
            opacity: isAnimating ? 1 : 0.5,
            //backgroundColor: "blue",
            //scale: 2
            rotate: isAnimating ? 360 : 0,
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
          onClick={() => setIsAnimating(!isAnimating)}
          whileHover={{
            y: -200,
          }}
        ></motion.div>
      </div>
      <div className="box-container">
        <motion.div
          className="box"
          animate={{
            //x: 700,
            //x: isAnimating ? 700 : 0,
            opacity: isAnimating ? 1 : 0.5,
            //backgroundColor: "blue",
            //scale: 2
            rotate: isAnimating ? 360 : 0,
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
          onClick={() => setIsAnimating(!isAnimating)}
          whileHover={{
            y: -200,
          }}
        ></motion.div>
      </div>
      <div className="box-container">
        <motion.div
            ref={boxRef}
          className="box"
          drag
          onDragEnd={(event, info) => handleOnDrag(info)}
          animate={{
            //x: 700,
            y: bosIsOverRedLine,
            opacity: isAnimating ? 1 : 0.5,
            //backgroundColor: "blue",
            //scale: 2
            //rotate: isAnimating ? 360 : 0,
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
          
        ></motion.div>
      </div>
      <div className="box-container">
        <motion.div
          className="box"
          animate={{
            //x: 700,
            //x: isAnimating ? 700 : 0,
            opacity: isAnimating ? 1 : 0.5,
            //backgroundColor: "blue",
            //scale: 2
            rotate: isAnimating ? 360 : 0,
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
          onClick={() => setIsAnimating(!isAnimating)}
          whileHover={{
            y: -200,
          }}
        ></motion.div>
      </div>
    </div>
    </div>
  );
}
