import React, { useState, useEffect } from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Button, Typography, Grid, Chip, Tooltip, Card, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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
  const proficiencyBonus = 2; // Default level 1 prof bonus
  const theme = useTheme();

  useEffect(() => {
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

  // Function to calculate ability modifier
  const calculateAbilityModifier = (abilityScore) => {
    return Math.floor((abilityScore - 10) / 2);
  };

  // Display the skill modifier which includes the ability modifier and proficiency bonus if proficient
  const skillModifier = (skill) => {
    const ability = skillToAbilityMap[skill];
    const abilityScore = character.abilityScores[ability.toLowerCase()];
    const abilityModifier = calculateAbilityModifier(abilityScore);
    const isProficient = selectedSkills.includes(skill);
    return abilityModifier + (isProficient ? proficiencyBonus : 0);
  };

  const suggestedSkills = () => {
    return character.backgroundSkillProficiencies?.join(', ') || 'None';
  };

  return (
    <Box
      sx={{
        mt: 2,
        display: 'flex',
        justifyContent: 'center',
        '@media (max-width:600px)': {
          paddingLeft: '60px', // Shifts content slightly to the right on mobile
        },
      }}
    >
      <Card
        sx={{
          p: 3,
          maxWidth: 800, // Adjust as needed
          backgroundColor: '#343a40',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
          Skill Selection
        </Typography>
        <Typography variant="h6" sx={{ color: 'white' }}>
          As a <span style={{ fontWeight: 'bold', color: theme.palette.secondary.main }}>{character.class}</span>, you are more likely to be proficient in the following skills: {suggestedSkills()}.
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2, color: 'white' }}>
          Choose any four skill proficiencies:
        </Typography>
        <LinearProgress variant="determinate" value={(selectedSkills.length / maxSkills) * 100} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {selectedSkills.map(skill => (
            <Chip key={skill} label={skill} color="primary" />
          ))}
        </Box>
        <FormGroup>
          <Grid container spacing={2}>
            {Object.entries(skillToAbilityMap).map(([skill, ability]) => (
              <Grid item xs={12} sm={6} md={4} key={skill}>
                <Tooltip title={`Related Ability: ${ability}, Current Modifier: ${skillModifier(skill)}`}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedSkills.includes(skill)}
                        onChange={handleSkillChange}
                        name={skill}
                      />
                    }
                    label={skill}
                  />
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </FormGroup>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={nextStep}>
            Select Skills
          </Button>
        </Box>
      </Card>
    </Box>
  );
  
};

export default SkillSelectionForm;
