import React, { useState, useEffect } from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Button, Typography } from '@mui/material';

const skillToAbilityMap = {
  'Acrobatics': 'Dexterity',
  'Animal Handling': 'Wisdom',
  'Arcana': 'Intelligence',
  'Athletics': 'Strength',
  'Deception': 'Charisma',
  'History': 'Intelligence',
  'Insight': 'Wisdom',
  'Intimidation': 'Charisma',
  'Investigation': 'Intelligence',
  'Medicine': 'Wisdom',
  'Nature': 'Intelligence',
  'Perception': 'Wisdom',
  'Performance': 'Charisma',
  'Persuasion': 'Charisma',
  'Religion': 'Intelligence',
  'Sleight of Hand': 'Dexterity',
  'Stealth': 'Dexterity',
  'Survival': 'Wisdom',
};

const SkillSelectionForm = ({ character, updateCharacter, nextStep, prevStep }) => {
    const [selectedSkills, setSelectedSkills] = useState(character.skills || []);
    const maxSkills = 4; // Maximum number of skills a user can select
    
    useEffect(() => {
      // Pre-select any existing skills if they exist
      setSelectedSkills(character.skills || []);
    }, [character.skills]);
  
    const handleSkillChange = (event) => {
      const { name, checked } = event.target;
      if (checked && selectedSkills.length < maxSkills) {
        setSelectedSkills([...selectedSkills, name]);
      } else if (!checked) {
        setSelectedSkills(selectedSkills.filter(skill => skill !== name));
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      updateCharacter({ ...character, skills: selectedSkills });
      nextStep();
    };
  
    // Function to display suggested skills based on the character's background
    const suggestedSkills = () => {
      return character.backgroundSkillProficiencies?.join(', ') || 'None';
    };

    // current error logging
    useEffect(() => {
        console.log("Current background:", character);
      }, [character]);
  
    return (
      <Box sx={{ mt: 2 }}>
        <FormControl component="fieldset" sx={{ m: 3 }} variant="standard">
          <Typography variant="h6">
            As a {character.background || 'character'}, you are more likely to be proficient in the following skills: {suggestedSkills()}.
          </Typography>
          <Typography variant="subtitle1">
            Choose any four skill proficiencies:
          </Typography>
          <FormGroup>
            {Object.keys(skillToAbilityMap).map((skill) => (
              <FormControlLabel
                key={skill}
                control={
                  <Checkbox
                    checked={selectedSkills.includes(skill)}
                    onChange={handleSkillChange}
                    name={skill}
                  />
                }
                label={skill}
              />
            ))}
          </FormGroup>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={prevStep}>Previous</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Next</Button>
          </Box>
        </FormControl>
      </Box>
    );
  };

export default SkillSelectionForm;
