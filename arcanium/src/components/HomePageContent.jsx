import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardActionArea, CardContent, CardMedia, Typography, Grid
} from '@mui/material';
import monsterImage from '../images/monsters.jpg';
import spellImage from '../images/spells.jpg';
import itemImage from '../images/items.jpeg';
import ModelViewer from '../scenes/ModelViewer';
import AnimatedHeading from '../styling/AnimatedHeading';
import WizardHelper from '../styling/WizardHelper';

const HomePageContent = () => {
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false);
    }, 9000);  // Show the title for 9 seconds before running the exit animation

    return () => clearTimeout(timer);
  }, []);

  const features = [
    { title: 'Monsters', description: 'Discover fearsome monsters.', imgSrc: monsterImage, link: '/monsters' },
    { title: 'Spells', description: 'Browse through powerful spells.', imgSrc: spellImage, link: '/spells' },
    { title: 'Items', description: 'Browse magical items.', imgSrc: itemImage, link: '/items' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ position: 'relative', width: '100%', height: '60vh', overflow: 'hidden' }}>
        <ModelViewer modelPath="/scene/scene.gltf" />
        <Box sx={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
          <AnimatedHeading text="Welcome to Arcanium" show={showTitle} />
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
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
                    <Typography gutterBottom variant="h5">
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
      </Box>
    </Box>
  );
}

export default HomePageContent;
