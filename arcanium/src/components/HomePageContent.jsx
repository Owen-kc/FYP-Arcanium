import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Paper
} from '@mui/material';
import { styled } from '@mui/system';
import Carousel from 'react-material-ui-carousel'; // Make sure to install this package
import monsterImage from '../images/monsters.jpg';
import spellImage from '../images/spells.jpg';
import itemImage from '../images/items.jpeg';
import ModelViewer from '../scenes/ModelViewer';
import AnimatedHeading from '../styling/AnimatedHeading';
import Footer from './Footer';
import bg1 from '../images/bg1.jpg';
import bg2 from '../images/bg2.jpg';
import bg3 from '../images/bg3.jpg';
import useTheme from '@mui/material/styles/useTheme';

const images = [
  { src: bg1, label: 'First Slide' },
  { src: bg2, label: 'Second Slide' },
  { src: bg3, label: 'Third Slide' }
];

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.15s ease-in-out',
  '&:hover': {
    transform: 'scale3d(1.05, 1.05, 1)'
  }
}));

const HomePageContent = () => {
  const theme = useTheme();
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false);
    }, 9000); // Show the title for 9 seconds before running the exit animation

    return () => clearTimeout(timer);
  }, []);

  const features = [
    { title: 'Monsters', description: 'Discover fearsome monsters.', imgSrc: monsterImage, link: '/monsters' },
    { title: 'Spells', description: 'Browse through powerful spells.', imgSrc: spellImage, link: '/spells' },
    { title: 'Items', description: 'Find legendary items.', imgSrc: itemImage, link: '/items' },
  ];

  return (
    <Box sx={{ flexGrow: 1, pb: 10 }}>
      <Box sx={{ position: 'relative', width: '100%', height: '60vh', overflow: 'hidden' }}>
        <ModelViewer modelPath="/scene/scene.gltf" />
        <Box sx={{
  position: 'absolute',
  top: '2rem', // move down from the top
  left: '1rem', // left aligned with some padding
  zIndex: 10
}}>
          <AnimatedHeading text="Welcome to Arcanium" show={showTitle} theme={theme} />
        </Box>
      </Box>
  
      <Paper elevation={4} sx={{ my: 4, mx: 2, overflow: 'hidden', borderRadius: '16px' }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Carousel indicators={false}>
              {images.map((item, i) => (
                <Box key={i} sx={{
                  height: 400,
                  display: 'flex',
                  backgroundImage: `url(${item.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <Typography variant="h3" component="h1" sx={{
                    color: '#fff',
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    textShadow: '2px 2px 8px rgba(0,0,0,0.6)'
                  }}>
                    Arcanium
                  </Typography>
                </Box>
              ))}
            </Carousel>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Paper elevation={0} sx={{ padding: 4, maxWidth: '90%', margin: 'auto', height: 'fit-content', bgcolor: 'background.default' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                About Arcanium
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Welcome to Arcanium, the Dungeons and Dragons companion application!
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Arcanium is a multi-faceted tool designed to enhance the tabletop role-playing experience. Arcanium provides a wide array of resources for new and experienced players alike, including resource searching functionality, artificial intelligence integration, and social connectivity.
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Navigate to the seamless functionality of Arcanium with the navigation bar at the top of the page. Let Arcanium be your guide to the world of Dungeons and Dragons.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
  
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <StyledCard>
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
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
  
}

export default HomePageContent;
