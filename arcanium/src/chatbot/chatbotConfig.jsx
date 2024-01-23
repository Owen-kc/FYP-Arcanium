import { createChatBotMessage } from "react-chatbot-kit";
import CustomOptions from "./CustomOptions";
import botAvatar from '../images/wiz.png';

const config = {

    
    initialMessages: [
        createChatBotMessage("Hi! I'm here to talk about Dungeons & Dragons. Choose an option below to get started!", {
          widget: "customOptions",
        }),
      ],
      widgets: [
        {
          widgetName: "customOptions",
          widgetFunc: (props) => <CustomOptions {...props} />,
        },
      ],
      customStyles: {
        botMessageBox: {
          backgroundColor: "#6610f2", // This should match your primary main color
        },
        chatButton: {
          backgroundColor: "#6610f2", // This should match your primary main color
        },
      },
      botName: 'Arcanium Helper'
    };

export default config;
