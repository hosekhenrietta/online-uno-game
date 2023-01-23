import React from 'react'
import { motion } from 'framer-motion'

export default function Box2() {

  return (
    <div className="box-container">
      <motion.div 
          className='box'
          drag
          //drag="x"
          dragConstraints={{
            right: 20,
            left: -20,
            top: 5,
            bottom: -5
          }}
          whileHover={{
            scale: 1.1
          }}
          whileTap={{
            scale: 0.9
          }}
          >

      </motion.div>
    </div>
  )
}
