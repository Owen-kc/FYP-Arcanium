import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

import { useTheme } from '@mui/material/styles';

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


const AnimatedHeading = ({ text = '', show }) => {
  const theme = useTheme();
  const controls = useAnimation();

  useEffect(() => {
    if (show) {
      controls.start('visible');
    } else {
      controls.start('exit');
    }
  }, [show, controls]);

  const words = text.split(' ').filter(Boolean);

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={wordVariants}
      style={{
        fontSize: '4vw', // Responsive font size based on viewport width
        fontWeight: theme.typography.h6.fontWeight,
        fontFamily: theme.typography.fontFamily,
        letterSpacing: theme.typography.h6.letterSpacing,
        color: theme.palette.text.primary,
        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}
      // Apply responsive styles with breakpoints
      sx={{
        [theme.breakpoints.down('md')]: {
          fontSize: '5.5vw',
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: '7vw',
        },
        [theme.breakpoints.down('xs')]: {
          fontSize: '9vw',
        },
      }}
    >
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
