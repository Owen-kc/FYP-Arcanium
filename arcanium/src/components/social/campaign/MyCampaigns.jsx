import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Dialog,
  Card,
  CardContent,
  Typography,
  Backdrop,
  Button,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CampaignDetails from './CampaignDetails'; // Ensure this path is correct

const MyCampaigns = ({ userId }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  useEffect(() => {
    const fetchMyCampaigns = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/campaigns/my-campaigns/${userId}`);
        setCampaigns(response.data);
      } catch (error) {
        console.error('Failed to fetch campaigns:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyCampaigns();
  }, [userId]);

  const handleOpenDetails = (campaignId) => {
    setSelectedCampaignId(campaignId);
    setOpenDetails(true);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <List>
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <Card key={campaign._id} sx={{ margin: 1 }}>
              <CardContent>
                <ListItem button onClick={() => handleOpenDetails(campaign._id)}>
                  <ListItemText primary={campaign.name} secondary={campaign.description} />
                </ListItem>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
            No campaigns found
          </Typography>
        )}
      </List>

      <Dialog
        fullScreen={fullScreen}
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <CampaignDetails campaignId={selectedCampaignId} />
      </Dialog>
    </Box>
  );
};

export default MyCampaigns;
