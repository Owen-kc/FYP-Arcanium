// CustomOptions.js
import React from "react";
import { Button } from "@mui/material";

const CustomOptions = ({ actionProvider }) => {
  const handleRulesClick = () => {
    actionProvider.handleDnDRules();
  };

  const handleCharacterCreationClick = () => {
    actionProvider.handleCharacterCreation();
  };

  const handleCampaignsClick = () => {
    actionProvider.handleCampaigns();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleRulesClick}>
        D&D Rules
      </Button>
      <Button variant="contained" color="primary" onClick={handleCharacterCreationClick}>
        Character Creation
      </Button>
      <Button variant="contained" color="primary" onClick={handleCampaignsClick}>
        Campaigns
      </Button>
    </div>
  );
};

export default CustomOptions;
