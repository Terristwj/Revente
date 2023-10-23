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
-   Firebase Authentication
-   Firebase Firestore
-   Firebase Storage
-   npm (Node Package Manager)

### Installation

1. Clone this repository.

2. Install the necessary dependencies for the frontend by navigating to the project directory and running the following command:

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

### Frontend

-   **Bootstrap**: For responsive and stylish user interface design.
-   **Axios**: A promise-based HTTP client for making API requests.
-   **Fonts/Icons**:
    -   Font Awesome: A popular icon library.
    -   Prime Icons: Icon library for PrimeVue.
-   **PrimeVue (BTL)**: A UI component library for Vue.js.
-   **Vue Router (BTL)**: For client-side routing.
-   **Pinia (Like Vuex) (BTL)**: A state management solution.
-   **Animations (BTL)**:
    -   Anime.js: A flexible JavaScript animation library.
    -   vue-responsive-video-background-player: For responsive video backgrounds.
-   **JavaScript Game (BTL)**:
    -   GSAP: For game UI animation.
    -   Howler: For audio in your JavaScript game.

### Backend

-   **Firebase**:
    -   Firebase Authentication: Secure user authentication.
    -   Firestore Database: A NoSQL database for storing data.
    -   Firebase Hosting: For deploying your web application.

### Beyond The Lab (BTL)

-   **PrimeVue (Component Library)**: Extending PrimeVue for additional components.
-   **Vuetify 3 (Component Library) (WIP)**: A popular Vue component library (work in progress).
-   **Animations**: Additional animations for a rich user experience.
-   **Vue Router**: Extended use of Vue Router.
-   **Pinia**: State management using Pinia.
-   **JavaScript game with Canvas**: Incorporating Canvas for game development.

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

Feel free to add more screenshots and shoutouts to your GitHub profiles, repositories, or any contributors who played a significant role in the project. Good luck with your portfolio piece!
