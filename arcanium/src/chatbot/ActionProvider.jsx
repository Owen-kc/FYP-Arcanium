class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    handleDnDQuery() {
      const message = this.createChatBotMessage("Sure! What would you like to know about Dungeons & Dragons?");
      this.setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
    }
  
    handleDefault() {
      const message = this.createChatBotMessage("I'm not sure about that. Can you ask something about D&D?");
      this.setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
    }

    handleDnDRules() {
        const message = this.createChatBotMessage("D&D has a set of core rules that all players need to know. Would you like an overview or details about a specific rule?");
        this.setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
      }
    
      handleCharacterCreation() {
        const message = this.createChatBotMessage("Creating a character is fun! Do you need help with the basics, or do you have specific questions about classes or races?");
        this.setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
      }
    
      handleCampaigns() {
        const message = this.createChatBotMessage("Looking to start or join a campaign? I can offer advice on finding a group, creating a story, or any other campaign-related questions.");
        this.setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
      }
  }
  
  export default ActionProvider;
  