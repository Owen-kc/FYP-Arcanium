import React, { useState } from 'react';
import { Button, Box, Stepper, Step, StepLabel } from '@mui/material';
import ClassForm from './ClassForm'
import {AbilityScoresForm} from './AbilityScoresForm'
import {SpellSelectionForm} from './SpellSelectionForm'
import {CharacterDetailsForm} from './CharacterDetailsForm'
import {EquipmentSelectionForm} from './EquipmentSelectionForm';
import RaceForm from './RaceForm'
import {ReviewAndSubmit} from './ReviewAndSubmit'



function CharacterCreation() {
  const [character, setCharacter] = useState({
    name: '',
    race: '',
    class: '',
    abilityScores: {},
    spells: [],
    equipment: [],
    details: {
      backstory: '',
      height: '',
      weight: '',
      // Add other details
    }
  });
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ['Race', 'Class', 'Ability Scores', 'Spell Selection', 'Equipment Selection', 'Character Details', 'Review and Submit'];

  // Function to update character state
  const updateCharacter = (updates) => {
    setCharacter((prevCharacter) => ({ ...prevCharacter, ...updates }));
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
        return <AbilityScoresForm character={character} updateCharacter={updateCharacter} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <SpellSelectionForm character={character} updateCharacter={updateCharacter} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <EquipmentSelectionForm character={character} updateCharacter={updateCharacter} nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <CharacterDetailsForm character={character} updateCharacter={updateCharacter} nextStep={nextStep} prevStep={prevStep} />;
      case 7:
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