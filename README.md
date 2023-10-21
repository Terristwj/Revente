# Reventé

> Reventé

A [Carousell](https://www.carousell.sg/) inspired platform.

An online platform for people to purchase and sell their used clothes with confidence. We aim to distinguish our platform from Carousell with a unique selling point for our platform and business that revolves around high-quality pre-loved clothings. All used clothes listed on our online marketplace will undergo refurbishment and rigorous quality checks performed by our own people before it is put up for sale. This ensures that every item we put for sale on our platform is of exceptional quality and in excellent condition.

## Setup Guide for team

1. (Frontend) In this main directory
    ```Bash
    //Only need to call once, after cloning
    //To create node_modules
    npm install
    ```
2. (Backend) Frontend is directly connected to Backend technologies
    - Firebase Authentication
    - Firebase Firestore
    - Firebase Storage

-   To run the project (Refer at package.json)

    -   Have `.env` and `.firebaserc` added into project

    ```Bash
    npm run dev
    ```

-   To deploy on the cloud

    -   Ensure you have `npm install -g firebase-tools` installed
    -   Ensure you've typed `firebase login`

    ```Bash
    npm run build
    firebase deploy
    ```

## Tech Stack

-   Frontend
    -   Bootstrap
    -   Axios
    -   Fonts/Icons
        -   Font Awesome
        -   Prime Icons
    -   PrimeVue (BTL)
    -   Vue Router (BTL)
    -   Pinia (Like Vuex) (BTL)
    -   Animations (BTL)
        -   Anime.js
        -   vue-responsive-video-background-player
    -   JavaScript Game (BTL)
        -   GSAP - For game UI animation
        -   Howler - For audio

<br/>

-   Backend
    -   Firebase
        -   Firebase Authentication
        -   Firestore Database
        -   Firebase Hosting

<br/>

-   Beyond The Lab (BTL)
    -   PrimeVue (Component Library)
    -   Vuetify 3 (Component Library) (WIP)
    -   Animations
    -   Vue Router
    -   Pinia
    -   JavaScript game with Canvas

<hr />

### References

1. [Vue 3 + Firebase Authentication](https://www.youtube.com/watch?v=xceR7mrrXsA&t=21s)

2. [JavaScript Game Tutorial](https://www.youtube.com/watch?v=yP5DKzriqXA)

3. [How to deploy with Firebase Hosting](https://medium.com/@rachidsakara/how-to-deploy-vue-js-applications-with-firebase-hosting-40cfa7f724e4)

4. [Cloud Firestore Database](https://firebase.google.com/docs/firestore)
