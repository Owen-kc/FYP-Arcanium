import React from 'react';
import {
  Box, Card, CardActionArea, CardContent, CardMedia, Typography, Grid,
  Slider, Paper, List, ListItem, ListItemText
} from '@mui/material';
import monsterImage from '../images/monsters.jpg';
import spellImage from '../images/spells.jpg';
import itemImage from '../images/items.jpeg';
import { Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HomePageContent = () => {
  // Dummy data for featured items, replace with actual data and mapping
  const features = [
    { title: 'Monsters', description: 'Discover fearsome monsters.', imgSrc: monsterImage, link: '/monsters' },
    { title: 'Spells', description: 'Browse through powerful spells.', imgSrc: spellImage, link: '/spells' },
    { title: 'Items', description: 'Browse magical items.', imgSrc: itemImage, link: '/items' },
    // ...other features
  ];

  // Placeholder for slider value
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>Welcome to Arcanium!</Typography>
      <Typography variant="subtitle1" gutterBottom>Your ultimate 5e D&D Companion app.</Typography>



      <Grid container spacing={3}>
        {/* Feature Cards */}
        {features.map((feature, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea href={feature.link}>
                <CardMedia
                  component="img"
                  height="140"
                  image={feature.imgSrc}
                  alt={feature.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Interactive List Placeholder */}
      <Typography variant="h6" gutterBottom mt={4}>
        Latest Campaign Updates
      </Typography>
      <Paper>
        <List>
          <ListItem>
            <ListItemText primary="Quest Update 1" secondary="The goblins have been seen in the eastern forest." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Quest Update 2" secondary="A mysterious artifact was found in the old ruins." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Quest Update 3" secondary="A new ally has appeared in the town square." />
          </ListItem>
          {/* More list items */}
        </List>
      </Paper>

      {/* Slider Placeholder */}
      <Typography gutterBottom>Adventure Progress</Typography>
      <Slider value={value} onChange={handleSliderChange} aria-label="Adventure Progress" />

      {/* Accordion Placeholder for FAQs or Descriptions */}
      <Typography variant="h6" gutterBottom mt={4}>
        Character Backgrounds
      </Typography>
      {['Character 1', 'Character 2', 'Character 3'].map((character, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <Typography>{character}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {character} comes from a mysterious background. Here is a brief story about them...
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      <Typography variant="h6" gutterBottom mt={4}>
        Item Tags
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap', gap: 0.5 }}>
        {['Fire', 'Magic', 'Rare', 'Potion', 'Armor'].map((tag, index) => (
          <Chip label={tag} key={index} onClick={() => console.log(`Clicked ${tag}`)} />
        ))}
      </Box>

      {/* Add more interactive or informative components as needed */}

    </Box>
  );
}

export default HomePageContent;
