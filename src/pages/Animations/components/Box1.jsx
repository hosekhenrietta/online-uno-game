import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Box1() {

  const [isAnimating, setIsAnimating] = useState(false)

  return (
    <div className="box-container">
      <motion.div 
          className='box'
          animate={{
            //x: 700,
            x: isAnimating ? 700 : 0,
            opacity: isAnimating ? 1 : 0.5,
            //backgroundColor: "blue",
            //scale: 2
            rotate: isAnimating ? 360 : 0
          }}
          initial={{
            opacity: 0.2
          }}
          transition={{
            /*type: "tween",
            duration: 2*/
            type: "spring",
            stiffness: 100,
            damping: 100
          }}
          onClick={() => setIsAnimating(!isAnimating)}
          >

      </motion.div>
    </div>
  )
}
