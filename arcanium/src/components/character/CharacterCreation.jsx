import React, { useState } from 'react';
import { Button, Box, Stepper, Step, StepLabel } from '@mui/material';
import ClassForm from './ClassForm'
import AbilityScoresForm from './AbilityScoresForm'
import SpellSelectionForm from './SpellSelectionForm'
import CharacterDetailsForm from './CharacterDetailsForm'
import ProficiencyForm from './ProficiencyForm'
import SkillSelectionForm from './SkillSelectionForm'
import RaceForm from './RaceForm'
import BackgroundForm from './BackgroundForm'
import ReviewAndSubmit from './ReviewAndSubmit'

function CharacterCreation() {
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
    <Box sx={{ mt: 4, mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Stepper activeStep={currentStep - 1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderStepComponent()}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {currentStep > 1 && (
          <Button variant="contained" color="primary" onClick={prevStep} sx={{ mr: 1 }}>
            Previous
          </Button>
        )}
        {currentStep < steps.length && (
          <Button variant="contained" color="primary" onClick={nextStep}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default CharacterCreation;