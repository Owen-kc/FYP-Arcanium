import React, { useState, useRef } from 'react';
import { Box, Button, Slider, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Paper } from '@mui/material';
import { calculatePointCost, calculateModifier, rollDiceForScores } from '../utils/dndUtils';
import Dice from 'react-dice-complete';

const AbilityScoresForm = ({ character }) => {
    const [method, setMethod] = useState('pointBuy');
    const [points, setPoints] = useState(27);
    const diceRef = useRef(null);
    const [rolling, setRolling] = useState(false);

    const initializeScores = () => ({
        strength: 8 + (character.asi?.strength || 0),
        dexterity: 8 + (character.asi?.dexterity || 0),
        constitution: 8 + (character.asi?.constitution || 0),
        intelligence: 8 + (character.asi?.intelligence || 0),
        wisdom: 8 + (character.asi?.wisdom || 0),
        charisma: 8 + (character.asi?.charisma || 0),
    });

    const [scores, setScores] = useState(initializeScores());

    const handleMethodChange = (event) => {
        setMethod(event.target.value);
        if (event.target.value !== 'diceRoll') {
            setScores(initializeScores());
            setPoints(27);
        }
    };


  const handleSliderChange = (ability, newValue) => {
    if (method === 'pointBuy') {
      const baseScore = scores[ability] - (character.asi?.[ability] || 0);
      const newBaseScore = newValue - (character.asi?.[ability] || 0);
      if (newBaseScore < 8) return; // Prevent decreasing below 8

      const difference = calculatePointCost(baseScore, newBaseScore);
      const newPoints = points - difference;

      if (newPoints >= 0 && newBaseScore <= 15 && newValue >= 8 && newValue <= (15 + (character.asi?.[ability] || 0))) {
        setScores({ ...scores, [ability]: newValue });
        setPoints(newPoints);
      }
    }
  };

   // roll and update process
   const rollDiceForScoresVisual = () => {
    if (!rolling && method === 'diceRoll') {
      setRolling(true);
      if (diceRef.current) {
        diceRef.current.rollAll();
      }
      //delay
      setTimeout(() => {
        const newScores = rollDiceForScores();
        Object.keys(newScores).forEach(ability => {
          // Apply racial ASI to each ability score after rolling
          newScores[ability] += character.asi?.[ability] || 0;
        });
        setScores(newScores);
        setRolling(false); 
      }, 1500); 
    }
  };


return (
  <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      {/* Components */}
      <Typography variant="h6" style={{ marginBottom: '20px', textAlign: 'center' }}>
          Selected Race: {character.race || 'None'}
      </Typography>
      <Typography style={{ marginBottom: '20px', textAlign: 'center' }}>
          {character.asi ? `ASI: ${Object.entries(character.asi).map(([key, value]) => `${key.toUpperCase()}: +${value}`).join(', ')}` : 'ASI: None'}
      </Typography>

      <FormControl component="fieldset" style={{ marginBottom: '20px' }}>
          <FormLabel component="legend" style={{ marginBottom: '10px' }}>Choose Method</FormLabel>
          <RadioGroup row name="method" value={method} onChange={handleMethodChange}>
              <FormControlLabel value="pointBuy" control={<Radio />} label="Point Buy" />
              <FormControlLabel value="diceRoll" control={<Radio />} label="Dice Roll" onClick={rollDiceForScoresVisual} />
              <FormControlLabel value="unlocked" control={<Radio />} label="Unlocked" />
          </RadioGroup>
      </FormControl>

      {method === 'diceRoll' && (
          <Box display="flex" justifyContent="center" marginTop="20px">
              <Dice ref={diceRef} numDice={4} rollDone={() => {}} faceColor="#a5d6a7" dotColor="#000" disableIndividual />
              <Button variant="contained" onClick={rollDiceForScoresVisual} disabled={rolling} style={{ marginTop: '20px' }}>
                  Roll Dice
              </Button>
          </Box>
      )}

      <Grid container spacing={2}>
        {Object.keys(scores).map((ability) => (
          <Grid item xs={12} sm={6} key={ability}>
            <Typography gutterBottom>
              {ability.charAt(0).toUpperCase() + ability.slice(1)}: {scores[ability]} ({calculateModifier(scores[ability]) >= 0 ? `+${calculateModifier(scores[ability])}` : calculateModifier(scores[ability])})
            </Typography>
            <Slider
              value={scores[ability]}
              onChange={(e, newValue) => handleSliderChange(ability, newValue)}
              aria-labelledby="input-slider"
              min={3}
              max={18}
              disabled={method === 'diceRoll' || rolling}
            />
          </Grid>
        ))}
      </Grid>

      {method !== 'diceRoll' && (
        <Typography style={{ marginTop: '20px', textAlign: 'center' }}>Points Remaining: {points}</Typography>
      )}
    </Paper>
  );
};

export default AbilityScoresForm;