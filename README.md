# Arcanium

![Header Image](./arcanium/src/images/arcanium-header-image.png)


## Project Overview

Arcanium is a dynamic, multi-platform web-based application designed for Dungeons & Dragons 5th Edition. It offers a comprehensive suite of tools to enhance the D&D gameplay experience, catering to both new and experienced players. The application was designed with scalability and user experience in mind, and offers the following features:

- **Centralized Hub:** Centralizes essential tools, resources, and information into a single platform.
- **User-Friendly Design:** Designed to be intuitive and engaging for both new and veteran D&D players.
- **Multi-Platform Support:** Ensures full functionality across both desktop and mobile devices to accommodate all user preferences.
- **API Integration:** Incorporates Open5e's API to facilitate extensive resource searching, data retrieval and character creation.
- **Dynamic Character Creation:** Features an interactive process for character creation, where users can create characters to use in campaigns and generative storytelling.
- **Social Connectivity:** Enables users to add friends, join campaigns, and communicate in real time through Socket.io.
- **AI Integration:** Utilizes advanced AI for dynamic story generation utilizing character and location context, and a chatbot for user assistance and queries.
- **Security/Authentication:** Implements robust authentication mechanisms through Auth0.
- **Scalable Database:** Uses a cloud-based architecture for scalable data storage, through the use of MongoDB Atlas.

These features provide a comprehensive and detailed location for the needs of players of Dungeons & Dragons, both new and experienced alike.

### Video Demonstration
A video demonstration can be watched below:

[![Watch the Video](https://img.youtube.com/vi/3oAZ_GkNiQM/0.jpg)](https://www.youtube.com/watch?v=3oAZ_GkNiQM)

Otherwise the file can be accessed and downloaded from [google drive](https://drive.google.com/file/d/15ZbRrJsBI0aORT4KFgiGr0rninUsluUN/view?usp=sharing)

## Usage

### Deployment

Arcanium is deployed on Render and is accessible at this link:

<h4><a href="https://fyp-arcanium-1.onrender.com/" target="_blank" style="font-size: 1.5em; color: purple;">Visit Arcanium</a></h4>

### Local Installation

Otherwise, Arcanium can be installed and launched locally:

To set up Arcanium:

1. Clone the repository
```
git clone https://github.com/Owen-kc/FYP-Arcanium.git
```

2. Navigate to the arcanium folder

```
cd arcanium
```

3. Install necessary dependencies

```
npm install
```

4. Start the server with
```
npm start
```


## Technology Stack

- **Frontend:**
  - React: A JavaScript library for building user interfaces
  - JavaScript: The programming language of the web
  - Material UI (MUI): A popular React UI framework

- **Backend:**
  - Node.js: JavaScript based backend technology
  - Express: A flexible Node.js web application framework
  - Axios: Promise-based HTTP client for making requests to external APIs

- **Database & Storage:**
  - MongoDB Atlas: Cloud database service that hosts MongoDB databases
  - AWS S3 Bucket: For secure and scalable image storage

- **Authentication:**
  - Auth0: A flexible solution to add authentication and authorization services to applications

- **Real-Time Communication:**
  - Socket.IO: Enables real-time bidirectional event-based communication

- **APIs:**
  - Open5e API: Provides extensive data and resources for Dungeons & Dragons
  - OpenAI: For implementing generative storytelling and chatbot assistance

The technology stack of Arcanium utilizes the MERN stack for it's main technologies. Many other miscellaneous frameworks and technologies are used throughout the application. The package.json file provides a more detailed overview of exactly what technologies are used and their versions.

## Poster
[View the A0 poster here](./sw4-FYP-Poster.pdf)

## Dissertation
[Read the disseration associated with Arcanium here](./SW4_FYP_Dissertation.pdf)

## Acknowledgements

This project makes use of several key resources that have contributed immensely to its development:

- **Open5e API:** Arcanium utilizes the [Open5e API](https://api.open5e.com/) to access a wealth of Dungeons & Dragons 5th Edition resources and data in a JSON format. This API has been invaluable for integrating comprehensive D&D content, resource searching, character creation and more.

- **Systems Reference Document (SRD):** This project adheres to and incorporates content based on the [Open Gaming License: Systems Reference Document](https://dnd.wizards.com/resources/systems-reference-document) by Wizards of the Coast. This document provides the foundational mechanics and content used under the Open Gaming License.

- **D&D Media Gallery (WOTC):** This project utilizes images from Wizards of the Coast's [media gallery](https://dnd.wizards.com/media-gallery). 



