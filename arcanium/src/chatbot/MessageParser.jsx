class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("dnd") || lowerCaseMessage.includes("dungeons and dragons")) {
        this.actionProvider.handleDnDQuery();
      } 
      if (lowerCaseMessage.includes("rules")) {
        this.actionProvider.handleDnDRules();
      } else if (lowerCaseMessage.includes("character creation")) {
        this.actionProvider.handleCharacterCreation();
      } else if (lowerCaseMessage.includes("campaign")) {
        this.actionProvider.handleCampaigns();
      } else {
        this.actionProvider.handleDefault();
      }
    }

  }
  
  export default MessageParser;
  