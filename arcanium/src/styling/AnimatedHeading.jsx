import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { staggerChildren: 0.05, ease: 'easeOut', duration: 0.5 }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.5 }
  }
};

const letterVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 }
  },
};

const AnimatedHeading = ({ text, show }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (show) {
      controls.start('visible');
    } else {
      controls.start('exit');
    }
  }, [show, controls]);

  const words = text.split(' ');

  return (
    <motion.div initial="hidden" animate={controls} variants={wordVariants} style={{ fontSize: '4rem', color: '#FFF', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
      {words.map((word, index) => (
        <span key={index} style={{ whiteSpace: 'nowrap' }}>
          {word.split('').map((letter, index) => (
            <motion.span key={index} variants={letterVariants}>
              {letter}
            </motion.span>
          ))}
          &nbsp;
        </span>
      ))}
    </motion.div>
  );
};

export default AnimatedHeading;
