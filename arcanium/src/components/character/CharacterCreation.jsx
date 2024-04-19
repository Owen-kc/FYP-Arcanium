import React, { useState } from 'react';
import { Button, Box, Stepper, Step, StepLabel, styled, useMediaQuery, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import ClassForm from './ClassForm'
import AbilityScoresForm from './AbilityScoresForm'
import SpellSelectionForm from './SpellSelectionForm'
import CharacterDetailsForm from './CharacterDetailsForm'
import ProficiencyForm from './ProficiencyForm'
import SkillSelectionForm from './SkillSelectionForm'
import RaceForm from './RaceForm'
import BackgroundForm from './BackgroundForm'
import ReviewAndSubmit from './ReviewAndSubmit'

const MotionBox = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch', 
  width: '100%', 
  maxWidth: '1280px', 
  margin: 'auto', 
  padding: theme.spacing(2),
  boxSizing: 'border-box',
}));

const contentBoxStyle = {
  width: '100%', // Full width
  display: 'flex',
  justifyContent: 'space-between',
  mt: 2,
  padding: '0 24px', 
};

const formVariants = {
  initial: {
    opacity: 0,
    filter: "blur(10px) saturate(2)",
    scale: 0.9,
  },
  in: {
    opacity: 1,
    filter: "blur(0px) saturate(1)",
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.3
    }
  },
  out: {
    opacity: 0,
    filter: "blur(10px) saturate(2)",
    scale: 0.9,
    transition: {
      duration: 0.5,
      ease: "easeIn"
    }
  }
};



function CharacterCreation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [character, setCharacter] = useState({
    race: '',
    class: '',
    level: '1',
    background: '',
    speed: '',
    proficiencyBonus: 2,
    abilityScores: {},
    spells: [],
    skills: [],
    equipment: [],
    details: {
      name: '',
      backstory: '',
      height: '',
      weight: '',
      image: '' ,
      hairColor: '',
      eyeColor: '',
      alignment: '',
      // Add other details (TBD)
    }
  });
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ['Race', 'Class', 'Background Selection', 'Ability Scores',  'Spell Selection', 'Equipment Selection', 'Skill Selection', 'Character Details', 'Review and Submit'];
  const totalSteps = 9;

  const dynamicStyle = {
    margin: isMobile ? 'auto auto auto -28px' : 'auto', // Shift left on mobile
  };

  // Mobile step indicator
  const MobileStepIndicator = ({ currentStep, totalSteps }) => (
    <Typography variant="caption" display="block" gutterBottom>
      Step {currentStep} of {totalSteps}
    </Typography>
  );

  // For Stepper and Content Box
  const stepStyle = {
    width: 'calc(100% - 48px)', 
    padding: '0',
    '.MuiStepLabel-label': { 
      display: isMobile ? 'none' : 'block', 
    },
    '.MuiStepIcon-root': { 
      transform: isMobile ? 'scale(0.8)' : 'scale(1)',
    },
    '.MuiStepConnector-root': { 
      display: isMobile ? 'none' : 'block', 
    },
  };

  const updateCharacter = (updates) => {
    setCharacter((prevCharacter) => {
      console.log('Before update:', prevCharacter);
      const updatedCharacter = { ...prevCharacter, ...updates };
      console.log('After update:', updatedCharacter);
      return updatedCharacter;
    });
  };

  // Move to the next or previous step
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  // Render components based on the current step
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <RaceForm character={character} updateCharacter={updateCharacter} nextStep={nextStep} />;
      case 2:
        return <ClassForm character={character} updateCharacter={updateCharacter} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <BackgroundForm character={character} updateCharacter={updateCharacter} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <AbilityScoresForm character={character} updateCharacter={updateCharacter} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <SpellSelectionForm character={character} updateCharacter={updateCharacter} nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <ProficiencyForm character={character} updateCharacter={updateCharacter} nextStep={nextStep} prevStep={prevStep} />;
      case 7: 
        return <SkillSelectionForm character={character} updateCharacter={updateCharacter} nextStep={nextStep} prevStep={prevStep} />;
      case 8:
        return <CharacterDetailsForm character={character} updateCharacter={updateCharacter} nextStep={nextStep} prevStep={prevStep} />;
      case 9:
        return <ReviewAndSubmit character={character} />;
      default:
        return <div>Unknown step</div>;
    }
  };
  

  return (
    <MotionBox style={dynamicStyle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {isMobile ? (
        // Mobile view: simplified step indicator
        <Typography 
    variant="caption" 
    display="block" 
    gutterBottom
    sx={{ 
      color: 'white', 
      fontWeight: 'bold', 
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', 
    }}
  >
        </Typography>
      ) : (
        // Desktop view: full stepper with labels
        <Stepper activeStep={currentStep - 1} alternativeLabel sx={stepStyle}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel icon={index + 1}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
      <AnimatePresence>
        <motion.div key={currentStep} variants={formVariants} initial="initial" animate="in" exit="out">
          {renderStepComponent(currentStep)}
        </motion.div>
      </AnimatePresence>
      <Box sx={contentBoxStyle}>
        {currentStep > 1 && <Button variant="contained" onClick={prevStep}>Previous</Button>}
        {currentStep < steps.length && <Button variant="contained" onClick={nextStep}>Next</Button>}
      </Box>
    </MotionBox>
  );
  
}

export default CharacterCreation;