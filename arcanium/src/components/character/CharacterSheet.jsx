import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  Divider,
  ListItemText,
} from "@mui/material";
import { calculateModifier, skillToAbilityMap } from "../utils/dndUtils";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  margin: theme.spacing(1),
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(1),
  },
}));

const ColorSwatch = styled("div")(({ theme, color }) => ({
  width: "30px",
  height: "30px",
  backgroundColor: color,
  borderRadius: theme.shape.borderRadius,
}));

const CharacterSheet = ({ character }) => {
  const {
    name,
    race,
    class: characterClass,
    level,
    background,
    abilityScores,
    spells,
    skills,
    equipment,
    details,
  } = character;

  const displaySkillModifiers = () => {
    return Object.keys(skillToAbilityMap).map((skill) => {
      const ability = skillToAbilityMap[skill];
      const abilityScore = abilityScores[ability.toLowerCase()];
      const modifier = calculateModifier(abilityScore);
      const isProficient = skills.includes(skill);

      const totalModifier = isProficient
        ? modifier + character.proficiencyBonus
        : modifier;

      return (
        <ListItem key={skill}>
          <ListItemText
            primary={`${skill}`}
            secondary={`Modifier: ${totalModifier}${
              isProficient ? " (Proficient)" : ""
            }`}
          />
        </ListItem>
      );
    });
  };

  // Function to render ability score boxes (unused rn)
  const renderAbilityScore = (ability, score) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography
        variant="caption"
        sx={{ fontFamily: "MedievalSharp", fontSize: "0.75rem" }}
      >
        {ability.toUpperCase()}
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontFamily: "MedievalSharp", fontSize: "1.25rem" }}
      >
        {score}
      </Typography>
    </Box>
  );

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        my: 2,
        background: "url()", // add a background image
        backgroundSize: "cover",
        color: "white",
        maxWidth: "90%",
        mx: "auto",
        borderRadius: 2,
        overflow: 'auto'
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontFamily: "MedievalSharp" }}
      >
        Character Sheet
      </Typography>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h2" sx={{ fontFamily: "MedievalSharp", mb: 2 }}>
            {character.details.name || "Name not chosen"}{" "}
          </Typography>
          <Avatar
  src={`https://arcanium.s3.eu-north-1.amazonaws.com/${character.details.image}`}
  alt="Character Image"
  sx={{ width: 150, height: 150, mb: 2, border: "3px solid purple" }}
/>

          <Typography variant="h5" sx={{ fontFamily: "MedievalSharp" }}>
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontFamily: "MedievalSharp" }}
          >{`Level ${level} ${race} ${characterClass}`}</Typography>

          {/* Ability Scores in Responsive Grid Cards */}
<Grid container spacing={2} sx={{ mt: 2, justifyContent: { xs: 'center', md: 'space-around' } }}>
  {Object.entries(abilityScores).map(([ability, score]) => (
    <Grid item xs={6} sm={4} md={3} lg={2} key={ability} sx={{
      maxWidth: { md: '160px', lg: '200px' }
    }}>
      <StyledCard>
        <CardContent sx={{ 
          textAlign: "center",
          minHeight: '100px', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center' 
        }}>
          <Typography
            variant="caption"
            sx={{ 
              fontFamily: "MedievalSharp",
              fontSize: { xs: "0.5rem", sm: "0.75rem", md: "0.85rem", lg: "1rem" },
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {ability.toUpperCase()}
          </Typography>
          <Typography
            variant="h6"
            sx={{ 
              fontFamily: "MedievalSharp",
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.4rem", lg: "1.5rem" },
              whiteSpace: 'nowrap'
            }}
          >
            {score}
          </Typography>
        </CardContent>
      </StyledCard>
    </Grid>
  ))}
</Grid>



          {/* AC Section */}
          <StyledCard sx={{ mt: 2, width: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontFamily: "MedievalSharp", textAlign: "center" }}
              >
                AC: {10 + calculateModifier(abilityScores["dexterity"])}{" "}
                {/* Simplified AC calculation */}
              </Typography>
            </CardContent>
          </StyledCard>

          {/* HP Section */}
          <StyledCard sx={{ mt: 2, width: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontFamily: "MedievalSharp", textAlign: "center" }}
              >
                HP:{" "}
                {character.level *
                  (10 + calculateModifier(abilityScores["constitution"]))}
              </Typography>
            </CardContent>
          </StyledCard>

          {/* Initiative Section */}
          <StyledCard sx={{ mt: 2, width: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontFamily: "MedievalSharp", textAlign: "center" }}
              >
                Initiative:{" "}
                {calculateModifier(abilityScores["dexterity"]) >= 0 ? "+" : ""}
                {calculateModifier(abilityScores["dexterity"])}
              </Typography>
            </CardContent>
          </StyledCard>

          {/* Speed Section */}
          <StyledCard sx={{ mt: 2, width: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontFamily: "MedievalSharp", textAlign: "center" }}
              >
                Speed: {character.speed.walk} ft
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={8}>
          <StyledCard sx={{ mb: 2 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontFamily: "MedievalSharp", mb: 2 }}
              >
                Skills
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <List>
                    {displaySkillModifiers().slice(
                      0,
                      displaySkillModifiers().length / 2
                    )}
                  </List>
                </Grid>
                <Grid item xs={6}>
                  <List>
                    {displaySkillModifiers().slice(
                      displaySkillModifiers().length / 2
                    )}
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {/* Spells Section */}
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" sx={{ fontFamily: "MedievalSharp" }}>
                    Spells
                  </Typography>
                  <List>
                    {spells.length > 0 ? (
                      spells.map((spell, index) => (
                        <React.Fragment key={spell.name}>
                          <ListItem>
                            <Typography>{spell.name}</Typography>
                          </ListItem>
                          {index < spells.length - 1 && <Divider />}
                        </React.Fragment>
                      ))
                    ) : (
                      <Typography sx={{ color: "gray" }}>
                        No spells chosen
                      </Typography>
                    )}
                  </List>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Equipment Section */}
              <StyledCard sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontFamily: "MedievalSharp" }}>
                    Equipment
                  </Typography>
                  <List>
                    {equipment.length > 0 ? (
                      equipment.map((item, index) => (
                        <ListItem key={index}>
                          <Typography>
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                          </Typography>
                        </ListItem>
                      ))
                    ) : (
                      <Typography sx={{ color: "gray" }}>
                        No equipment chosen
                      </Typography>
                    )}
                  </List>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
          <StyledCard>
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "MedievalSharp",
                  mb: 2,
                  textAlign: "center",
                }}
              >
                Character Details
              </Typography>
              <Divider sx={{ mb: 2 }} light />
              <Box sx={{ mb: 2 }}>
                <Typography paragraph sx={{ fontWeight: "bold", mb: 1 }}>
                  Backstory:
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: 1,
                    p: 2,
                    color: "white",
                  }}
                >
                  {details.backstory ||
                    "A rich backstory has yet to be written..."}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} light />
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={12} sm={6}>
                  <Typography paragraph sx={{ fontWeight: "bold" }}>
                    Height:
                  </Typography>
                  <Typography paragraph sx={{ color: "white" }}>
                    {details.height ? `${details.height} inches` : "Not set"}{" "}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography paragraph sx={{ fontWeight: "bold" }}>
                    Weight:
                  </Typography>
                  <Typography paragraph sx={{ color: "white" }}>
                    {details.weight ? `${details.weight} lbs` : "Not set"}
                  </Typography>
                </Grid>
                {/* Displaying Hair Color, Eye Color, and Alignment */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography paragraph sx={{ fontWeight: "bold" }}>
                      Hair Color:
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ColorSwatch color={details.hairColor || "#ffffff"} />
                      <Typography paragraph sx={{ ml: 1, color: "white" }}>
                        {details.hairColor.toUpperCase() || "Not set"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography paragraph sx={{ fontWeight: "bold" }}>
                      Eye Color:
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ColorSwatch color={details.eyeColor || "#ffffff"} />
                      <Typography paragraph sx={{ ml: 1, color: "white" }}>
                        {details.eyeColor.toUpperCase() || "Not set"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography paragraph sx={{ fontWeight: "bold" }}>
                      Alignment:
                    </Typography>
                    <Typography paragraph sx={{ color: "white" }}>
                      {details.alignment || "Not set"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} light />
              <Typography paragraph sx={{ fontWeight: "bold" }}>
                Background:
              </Typography>
              <Typography paragraph sx={{ color: "white" }}>
                {background || "Not chosen"}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CharacterSheet;
