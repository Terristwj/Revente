# Reventé

> Your Next Generation Clothing Marketplace

[Reventé](https://smu-wad2.web.app) is an online platform that takes inspiration from popular marketplaces like Carousell. We are on a mission to redefine the way people buy and sell used clothing, offering a unique selling proposition that centers around high-quality pre-loved garments. Every item listed on our platform goes through a thorough refurbishment and quality check process conducted by our expert team, ensuring that only exceptional and excellent-condition clothing finds its way to our marketplace.

#### Reventé Deployment Links:

| Frontend Website (Vue/Vite)                                   | Backend Server (NodeJS)                                               |
| ------------------------------------------------------------- | --------------------------------------------------------------------- |
| [Reventé](https://smu-wad2.web.app)                           | [Stripe & APIs](https://vercel.com/terristwj/revente-backend)         |
| [GitHub Repo (Private)](https://github.com/Terristwj/Revente) | [GitHub Repo (Private)](https://github.com/Terristwj/Revente-Backend) |

Please ask [Terristwj](https://github.com/Terristwj) to allow collaboration.

## Table of Contents

-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
        -   [Frontend Repository](#frontend-repository)
        -   [Backend Repository](#backend-repository)
        -   [Installation](#installation)
    -   [Developer Shortcuts](#developer-shortcuts)
    -   [What's Next? (User Journeys)](#what-next)
        -   [First Time Users](#first-time-users)
        -   [User Buyers](#user-buyers)
        -   [Buyers Followup](#buyers-followup)
        -   [User Sellers](#user-sellers)
        -   [Sellers Followup](#sellers-followup)
        -   [Admin Account](#admin-account)
-   [Tech Stack](#tech-stack)
    -   [Frontend](#frontend-this-repository)
    -   [Backend (BTL)](#backend-backend-repository-btl)
    -   [BTL Compilation](#beyond-the-lab-btl-compilation-list)
-   [Screenshots](#screenshots)
-   [Acknowledgments](#acknowledgments)
    -   [References](#references)
    -   [Team Members](#team-members)

## Getting Started

### Prerequisites

Before you get started, make sure you have everything setup for both frontend and backend.

#### Frontend Repository

The [repository link](https://github.com/Terristwj/Revente) is currently private. Please ask [Terristwj](https://github.com/Terristwj) to allow collaboration.
Ensure you have the following tools and dependencies installed:

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

#### Backend Repository

The [repository link](https://github.com/Terristwj/Revente-Backend) is currently private. Please ask [Terristwj](https://github.com/Terristwj) to allow collaboration.
Ensure you have the following tools and dependencies installed:

-   Node.js
-   npm (Node Package Manager)
-   Secret Keys (APIs) (.env)
    -   Stripe
    -   OpenAI
    -   PaLM

#### Installation

1. Clone the backend repository
    - Follow the installation steps
    - Run the backend
2. Clone this frontend repository and install the necessary dependencies:

    ```bash
    npm install
    ```

3. In both frontend and backend, ensure you have the `.env` files added into each of the project's root directory.

    - Frontend - `.env`
    - Backend - `.env`

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

### Developer Shortcuts

A compilation of developer portals to check API limits, payments, deployments, database, and etc. Specific shortcuts require access as collaborator.

1. Firebase
    1. [Project's Firebase Overview](https://console.firebase.google.com/u/0/project/smu-wad2/overview)
    2. [Firebase Authentication](https://console.firebase.google.com/u/0/project/smu-wad2/authentication/users)
    3. [Firestore Database](https://console.firebase.google.com/u/0/project/smu-wad2/firestore/data/~2Fusers~2FBOeeIFP1AsVor9SPn7BSzpmlBnH2)
    4. [Firebase Hosting](https://console.firebase.google.com/u/0/project/smu-wad2/hosting/sites/smu-wad2)
    5. [Firebase Quotas](https://console.cloud.google.com/appengine/quotadetails?authuser=0&project=smu-wad2&hl=en)
2. Others
    1. [DialogFlow Controls](https://dialogflow.cloud.google.com/)
3. Backend
    1. [Backend Vercel](https://vercel.com/terristwj/revente-backend)
    2. [OpenAI Billing](https://platform.openai.com/account/billing/overview)
    3. [PaLM API Keys](https://makersuite.google.com/app/apikey)

### What Next?

After installation and running both frontend and backend projects, you will start in the Homepage. [Our website is also deployed](https://smu-wad2.web.app/). The following are the various user journeys:

#### First time users:

Wanting to learn more about Reventé, users will want to learn more about 'Who we are' by visiting the [About](https://smu-wad2.web.app/about), [Terms & Conditions](https://smu-wad2.web.app/tnc), and [FAQ](https://smu-wad2.web.app/faq).

#### User Buyers:

At Reventé, we sell various recycled clothings. Our buyers do not need to login to make a purchase. Instead, our buyers can directly visit our [Product Listings](https://smu-wad2.web.app/listings), browsing through our extensive product catalogue and filtering any specific tags.

Once buyers have found an item, they can proceed to 'Add to Cart'. From here, they may proceed to [checkout](https://smu-wad2.web.app/cart) and complete the purchasing procedure through making payment with Stripe.

#### Buyers Followup:

Whilst shopping logged in, buyers will be able to view, modify, and gain access to various user-related features. They will be able to view/modify their profile, check their wishlist and purchase history. And make reviews on their purchases.

#### User Sellers:

At Reventé, we buy clothings from our users. [Sellers will have to first login](https://smu-wad2.web.app/login), and proceed on to upload their clothing product for listing. Upon completion, their items will not be immediately listed but instead, they will have to visit our physical warehouse where we will further negotiate the price and buy their item on the day of visit.

#### Sellers Followup:

After making their first business transaction with Reventé, sellers can continue viewing their profile to see what has happened to their sold item. Most importantly, when we have finally sold their item, sellers can view the reviews from other buyers about their items.

#### Admin Account:

To access the admin page, [staff will have to access a secret link](https://smu-wad2.web.app/admin). This page will serve the warehouse team and marketing team. The warehouse team will Approve/Reject items from sellers on the day of their visit. The marketing team will make use of the admin dashboard, to effectively create meaningful monthly reports.

## Tech Stack

### Frontend (This Repository)

-   **UI/UX**

    -   **Bootstrap**: For responsive and stylish user interface design.
    -   **PrimeVue (BTL)**: A UI component library for Vue.js.
    -   **Animations (BTL)**:
        -   **Anime.js**: A flexible JavaScript animation library.
        -   **vue-responsive-video-background-player**: For responsive video backgrounds.
        -   **canvas-confetti**: Confetti effect on successful actions.
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
    -   **DialogFlow (BTL)**: FAQ Chatbot
    -   **@chat-ui/vue3**: Messaging UI component

-   **Firebase**:

    -   **Authentication (BTL)**: Secure user authentication.
    -   **Firestore Database**: A NoSQL database for storing data.
    -   **Firebase Hosting (BTL)**: For deploying your web application.

-   **Backend Services (BTL)**:
    -   **Stripe**: Payment service provider
    -   **OpenAI**: Used to assist generating text
    -   **PaLM**: Used as an alternative to OpenAI as backup

### Backend (Backend Repository) (BTL)

-   **Stripe**: Payment service provider
-   **OpenAI**: Used to assist generating text
-   **PaLM**: Used as an alternative to OpenAI as backup
-   **Vercel**: Cloud Deployment

### Beyond The Lab (BTL) Compilation List

-   **Frontend**
    -   PrimeVue & Prime Icons
    -   Anime.js
    -   Canvas Confetti
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

### References

Special thanks to the following resources that helped us along the way:

1.  Firebase

    1.  [Vue 3 + Firebase Authentication](https://www.youtube.com/watch?v=xceR7mrrXsA&t=21s)
    2.  [Cloud Firestore Database](https://firebase.google.com/docs/firestore)
    3.  [Advance Firestore Queries](https://firebase.google.com/docs/firestore/query-data/query-cursors)
    4.  [Firebase Storage Queries](https://firebase.google.com/docs/storage/web/start)
    5.  [How to deploy with Firebase Hosting](https://medium.com/@rachidsakara/how-to-deploy-vue-js-applications-with-firebase-hosting-40cfa7f724e4)

2.  UI/UX

    1.  [PrimeVue Documentation](https://primevue.org/installation/)
    2.  [Chat UI](https://vuejsexamples.com/fully-customizable-chat-ui-for-different-frameworks/)

3.  Vue Learnings

    1. [Vue Lifecycle](https://vuejs.org/guide/essentials/lifecycle.html)

4.  Others

    1.  [JavaScript Game Tutorial](https://www.youtube.com/watch?v=yP5DKzriqXA)
    2.  [Format AM/PM](http://www.java2s.com/ref/javascript/javascript-date-formatampm-date.html)
    3.  [DialogFlow Documentation](https://cloud.google.com/dialogflow/docs)

5.  Express JS

    1.  [ExpressJS Deploy w/ Vercel](https://masteringbackend.com/posts/how-to-deploy-your-node-js-backend-project-to-vercel-a-step-by-step-guide)
    2.  [ExpressJS CORS](https://stackoverflow.com/questions/26988071/allow-multiple-cors-domain-in-express-js)

6.  Backend APIs

    1.  [OpenAI Documentation](https://platform.openai.com/docs/api-reference)
    2.  [PaLM Documentation](https://developers.generativeai.google/tutorials/setup)
    3.  [Stripe Documentation](https://stripe.com/docs)
    4.  [Stripe & NodeJS Video](https://www.youtube.com/watch?v=WG4ehXSEpz4&feature=youtu.be)

7.  I forgot to keep track of all the links - Terris

Feel free to add more screenshots and shoutouts to your GitHub profiles, repositories, or any contributors who played a significant role in the project. Good luck with your portfolio piece!

### Team Members

| Terris                                    | Owen                                    | Adrian                                    | Viciky                              | Glen                            |
| ----------------------------------------- | --------------------------------------- | ----------------------------------------- | ----------------------------------- | ------------------------------- |
| [Terristwj](https://github.com/Terristwj) | [owengohh](https://github.com/owengohh) | [adriank0h](https://github.com/adriank0h) | [viqeey](https://github.com/viqeey) | [0gw0](https://github.com/0gw0) |
