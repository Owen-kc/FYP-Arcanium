import React, { useState, useRef } from "react";
import {Box, Button, Slider, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Paper,} from "@mui/material";
import {calculatePointCost, calculateModifier, rollSingleAbilityScore,} from "../utils/dndUtils";
import Dice from "react-dice-complete";

const AbilityScoresForm = ({ character }) => {
  const [method, setMethod] = useState("pointBuy");
  const [points, setPoints] = useState(27);
  const diceRef = useRef(null);
  const [rolling, setRolling] = useState(false);

  // Initialize a sequence for rolling
  const rollSequence = [
    "strength",
    "constitution",
    "wisdom",
    "dexterity",
    "intelligence",
    "charisma",
  ];
  const [currentRoll, setCurrentRoll] = useState(0); // track the current index in the rollSequence

  const handleRollClick = () => {
    if (method === "diceRoll") {
      rollDiceForScoresVisual();
    }
  };

  const startOver = () => {
    setCurrentRoll(0); // Start from the first ability again
    setRolling(false); // Ensure rolling is not active
    setScores(initializeScores()); // Reset scores 
  };

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
    const selectedMethod = event.target.value;
    setMethod(selectedMethod);

    if (selectedMethod === "unlocked") {
      // Define methods behaviour 
      setRolling(false);
      setCurrentRoll(null);
    } else {
      if (selectedMethod === "diceRoll") {
        setCurrentRoll(0);
        setRolling(false);
      } else {
        setScores(initializeScores());
        setPoints(27);
        setCurrentRoll(null);
      }
    }
  };

  const handleSliderChange = (ability, newValue) => {
    if (method === "pointBuy") {
      const baseScore = scores[ability] - (character.asi?.[ability] || 0);
      const newBaseScore = newValue - (character.asi?.[ability] || 0);
      if (newBaseScore < 8) return; // Prevent decreasing below 8

      const difference = calculatePointCost(baseScore, newBaseScore);
      const newPoints = points - difference;
      // Point buy behaviour
      if (
        newPoints >= 0 &&
        newBaseScore <= 15 &&
        newValue >= 8 &&
        newValue <= 15 + (character.asi?.[ability] || 0)
      ) {
        setScores({ ...scores, [ability]: newValue });
        setPoints(newPoints);
      }
    } else if (method === "unlocked") {
      setScores((prevScores) => ({
        ...prevScores,
        [ability]: newValue,
      }));
    }
  };
  
  // Using animation for rolling in this method
  const rollDiceForScoresVisual = () => {
    if (!rolling && currentRoll < rollSequence.length) {
      setRolling(true);
      const { rolls } = rollSingleAbilityScore(); // Get individual rolls
      const abilityToRoll = rollSequence[currentRoll];

      // Calculate the new score using the sum of the top 3 rolls
      const newScore =
        rolls.slice(0, 3).reduce((acc, curr) => acc + curr, 0) +
        (character.asi?.[abilityToRoll] || 0);

      // Set the visual dice to roll to the specific values
      if (diceRef.current) {
        diceRef.current.rollAll(rolls); // Pass the rolls to visually match the outcome
      }

      setTimeout(() => {
        // Update scores after the visual roll is complete
        setScores((prevScores) => ({
          ...prevScores,
          [abilityToRoll]: newScore,
        }));
        setRolling(false);
        setCurrentRoll(currentRoll + 1); 
      }, 1500);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      {/* Components */}
      <Typography
        variant="h6"
        style={{ marginBottom: "20px", textAlign: "center" }}
      >
        Selected Race: {character.race || "None"}
      </Typography>
      <Typography style={{ marginBottom: "20px", textAlign: "center" }}>
        {character.asi
          ? `ASI: ${Object.entries(character.asi)
              .map(([key, value]) => `${key.toUpperCase()}: +${value}`)
              .join(", ")}`
          : "ASI: None"}
      </Typography>

      <FormControl component="fieldset" style={{ marginBottom: "20px" }}>
        <FormLabel component="legend" style={{ marginBottom: "10px" }}>
          Choose Method
        </FormLabel>
        <RadioGroup
          row
          name="method"
          value={method}
          onChange={handleMethodChange}
        >
          <FormControlLabel
            value="pointBuy"
            control={<Radio />}
            label="Point Buy"
          />
          <FormControlLabel
            value="diceRoll"
            control={<Radio />}
            label="Dice Roll"
          />
          <FormControlLabel
            value="unlocked"
            control={<Radio />}
            label="Unlocked"
          />
        </RadioGroup>
      </FormControl>

      {method === "diceRoll" && (
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Dice
            ref={diceRef}
            numDice={4}
            rollDone={() => {}}
            faceColor="#a5d6a7"
            dotColor="#000"
            disableIndividual
          />
          <Button
            variant="contained"
            onClick={() =>
              currentRoll >= rollSequence.length
                ? startOver()
                : handleRollClick()
            }
            disabled={rolling}
            style={{ marginTop: "20px" }}
          >
            {currentRoll >= rollSequence.length
              ? "Start Over"
              : currentRoll === null
              ? "Roll Dice"
              : `Roll for ${rollSequence[currentRoll]}`}
          </Button>
        </Box>
      )}

      <Grid container spacing={2}>
        {Object.keys(scores).map((ability) => (
          <Grid item xs={12} sm={6} key={ability}>
            <Typography gutterBottom>
              {ability.charAt(0).toUpperCase() + ability.slice(1)}:{" "}
              {scores[ability]} (
              {calculateModifier(scores[ability]) >= 0
                ? `+${calculateModifier(scores[ability])}`
                : calculateModifier(scores[ability])}
              )
            </Typography>
            <Slider
              value={scores[ability]}
              onChange={(e, newValue) => handleSliderChange(ability, newValue)}
              aria-labelledby="input-slider"
              min={3}
              max={18}
              disabled={method === "diceRoll" || rolling}
            />
          </Grid>
        ))}
      </Grid>

      {method === "pointBuy" && (
        <Typography style={{ marginTop: "20px", textAlign: "center" }}>
          Points Remaining: {points}
        </Typography>
      )}
    </Paper>
  );
};

export default AbilityScoresForm;
