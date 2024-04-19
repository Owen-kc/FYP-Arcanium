import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../images/Arcanium-logo.png'; 

const WizardHelper = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 10000);  // 10 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }} // Exit by moving down to enhance the animation effect
                    transition={{ duration: 1 }} // Slower transition to make the animation more noticeable
                    style={{
                        position: 'fixed',
                        bottom: 60, 
                        right: 20,
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <Button onClick={() => setIsVisible(false)} style={{ minWidth: 40, padding: 0 }}>
                        <img src={logo} alt="Arcanium Wizard" style={{ height: 50 }} />
                    </Button>
                    <Box
                        sx={{
                            ml: 1,
                            p: 1,
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            borderRadius: 2,
                            maxWidth: 300,
                            color: 'white'
                        }}
                    >
                        <Typography color="inherit">
                            Need help? Ask our advisor!
                        </Typography>
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WizardHelper;
