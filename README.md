# Reventé

> Your Next Generation Clothing Marketplace

[Reventé](https://smu-wad2.web.app) is an online platform that takes inspiration from popular marketplaces like Carousell. We are on a mission to redefine the way people buy and sell used clothing, offering a unique selling proposition that centers around high-quality pre-loved garments. Every item listed on our platform goes through a thorough refurbishment and quality check process conducted by our expert team, ensuring that only exceptional and excellent-condition clothing finds its way to our marketplace.

## Table of Contents

-   [Getting Started](#getting-started)
-   [Tech Stack](#tech-stack)
-   [Screenshots](#screenshots)
-   [Acknowledgments](#acknowledgments)

## Getting Started

### Prerequisites

Before you get started, make sure you have the following tools and dependencies installed:

-   Node.js
-   npm (Node Package Manager)
-   Firebase
    -   Authentication
    -   Firestore
    -   Storage
-   Secret Keys (APIs) (.env)
    -   Firebase
    -   Google Maps
    -   OpenAI
    -   PaLM
    -   Backend URL (Deployed and Local)

### Installation

1. Clone the backend repository
    - Follow the installation steps
    - Run the backend
2. Clone this repository and install the necessary dependencies:

    ```bash
    npm install
    ```

3. Ensure you have your Firebase configuration files (`.env` and `.firebaserc`) added to your project.

4. To run the project locally, use the following command:

    ```bash
    npm run dev
    ```

5. To deploy the project on the cloud, follow these steps:

    - Make sure you have Firebase CLI (Command Line Interface) installed globally:

    ```bash
    npm install -g firebase-tools
    ```

    - Log in to Firebase:

    ```bash
    firebase login
    ```

    - Build the project:

    ```bash
    npm run build
    ```

    - Deploy to Firebase:

    ```bash
    firebase deploy
    ```

## Tech Stack

### Frontend (This Repository)

-   **UI/UX**

    -   **Bootstrap**: For responsive and stylish user interface design.
    -   **PrimeVue (BTL)**: A UI component library for Vue.js.
    -   **Animations (BTL)**:
        -   **Anime.js**: A flexible JavaScript animation library.
        -   **vue-responsive-video-background-player**: For responsive video backgrounds.
    -   **Fonts/Icons (BTL)**:
        -   **Font Awesome**: A popular icon library.
        -   **Prime Icons**: Icon library for PrimeVue.

-   **Frontend Codes**

    -   **Axios**: A promise-based HTTP client for making API requests.

    -   **Vue Router (BTL)**: For client-side routing and navigation guards.

    -   **Pinia (Like Vuex) (BTL)**: A state management solution.

-   **JavaScript Game (BTL)**:

    -   **GSAP**: For game UI animation.
    -   **Howler**: For audio in your JavaScript game.

-   **Others**:

    -   **Chart.js (BTL)**: Creating insightful statistics for admin
    -   **Google Maps**:
        -   Geolocation
        -   Google Address Autocomplete
    -   **DialogFlow**: FAQ Chatbot

-   **Firebase**:

    -   **Authentication (BTL)**: Secure user authentication.
    -   **Firestore Database**: A NoSQL database for storing data.
    -   **Firebase Hosting (BTL)**: For deploying your web application.

-   **Backend Services (BTL)**:
    -   **Stripe**: Payment service provider
    -   **OpenAI**: Used to assist generating text
    -   **PaLM**: Used as an alternative to OpenAI as backup

### Backend (Backend Repository)

-   **Stripe (BTL)**: Payment service provider
-   **OpenAI**: Used to assist generating text
-   **PaLM**: Used as an alternative to OpenAI as backup
-   **Vercel**: Cloud Deployment

### Beyond The Lab (BTL) Compilation List

-   **Frontend**
    -   PrimeVue & Prime Icons
    -   Anime.js
    -   Font Awesome
    -   GSAP & Howler
    -   Chart.js
    -   DialogFlow
    -   Vue Router
    -   Pinia
-   **Database**
    -   Firebase Authentication
    -   Firebase Storage
-   **Backend**
    -   Stripe
    -   OpenAI
    -   PaLM
-   **Deployment**
    -   Firebase Hosting
    -   Vercel

## Screenshots

![Screenshot 1](/src//assets/screenshots/screenshot1.png)
_Homepage._

![Screenshot 2](/src//assets/screenshots/screenshot2.png)
_Sustainability game where users learn more about why sustainability in fashion matters._

![Screenshot 3](/src//assets/screenshots/screenshot3.png)
_FAQ page powered by AI._

## Acknowledgments

Special thanks to the following resources that helped us along the way:

1. [Vue 3 + Firebase Authentication](https://www.youtube.com/watch?v=xceR7mrrXsA&t=21s)
2. [JavaScript Game Tutorial](https://www.youtube.com/watch?v=yP5DKzriqXA)
3. [How to deploy with Firebase Hosting](https://medium.com/@rachidsakara/how-to-deploy-vue-js-applications-with-firebase-hosting-40cfa7f724e4)
4. [Cloud Firestore Database](https://firebase.google.com/docs/firestore)
5. I forgot to keep track of the links - Terris

Feel free to add more screenshots and shoutouts to your GitHub profiles, repositories, or any contributors who played a significant role in the project. Good luck with your portfolio piece!

-   Our Team:

    -   [Terristwj](https://github.com/Terristwj)
    -   [adriank0h](https://github.com/adriank0h)
    -   [owengohh](https://github.com/owengohh)
    -   [viqeey](https://github.com/viqeey)
    -   [0gw0](https://github.com/0gw0)
