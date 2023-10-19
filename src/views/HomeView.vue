<script>
import BigCarousel from "../components/BigCarousel.vue";
import router from "../router/router.js";

import { ref, onMounted, onUnmounted } from "vue";
import anime from "animejs";
import { onIntersect } from "../composables/onIntersect";
import transitions from "../utilities/transitions";

export default {
    data() {
        return {
            imgurls: [
                "/src/assets/img/ecommerce/Google.png",
                "/src/assets/img/ecommerce/Google.png",
                "/src/assets/img/ecommerce/Google.png",
            ],
        };
    },
    components: {
        BigCarousel,
    },
    methods: {
        toRegistration() {
            router.push("/register");
        },
        toLogin() {
            router.push("/login");
        },
    },
    props: {
        transition: {
            type: String,
            default: "customzoomOut",
        },
    },
    mounted() {
        // When enter from About page - START
        if (sessionStorage.getItem("toReload")) {
            sessionStorage.removeItem("toReload");
            location.reload();
        }
        // When enter from About page - END
    },
    setup(props) {
        let hasEnteredOnce = false;

        const _ = {
            observer: {},
            motion: {},
        };

        const root = ref(null);

        const animeTransition = transitions[`${props.transition}`]["in"];

        onMounted(() => {
            // init our Observer instance
            _.observer = onIntersect(root.value, onEnter, {
                outCallback: onExit,
                once: true,
                options: {
                    threshold: 0.1,
                },
            });

            // init our anime object.
            _.motion = anime({
                targets: root.value,
                // by default animejs will run the transition on load.
                // autoplay: false,
                duration: 5000,
                easing: "easeOutExpo",
                // here we spread in our custom transition properties
                // based on the transition prop provided.
                ...animeTransition,
            });
        });

        onUnmounted(() => {
            _.observer.disconnect();
        });

        const onEnter = () => {
            if (hasEnteredOnce) {
                // clean up from the exit transition
                _.motion.pause(); // if the exit transition is currently running, pause it.
                _.motion.reverse(); // change the direction back to the original
            }
            _.motion.play(); // run the transition

            if (!hasEnteredOnce) {
                // allow exit transitions to run.
                hasEnteredOnce = true;
            }
        };

        const onExit = () => {
            // keeps exit transition from running before the first entrance.
            if (hasEnteredOnce) {
                _.motion.pause(); // if the enter transition is currently running, pause it.
                _.motion.reverse(); // change the direction of the transition
                _.motion.play(); // run the new reversed transition.
            }
        };

        return {
            root,
        };
    },
};
</script>

<template>
    <header class="video-header">
        <video
            src="../assets/videos/revente.mp4"
            autoplay
            loop
            playsinline
            muted
        ></video>

        <div class="header-text" ref="root">
            <h1>
                Reimagining
                <span>Sustainable</span>
            </h1>
        </div>
        <div class="description">
            <p>
                Propelling the Second-Hand Market:
                <span class="large-view"
                    >AI's Thrift Store. AI holds immense potential to enhance
                    the second-hand clothing market in myriad ways. From
                    reliable pricing and personalized user experiences to expert
                    styling services<span class="small-view"
                        >, AI-driven advancements breathe new life into
                        pre-loved fashion. And let's not forget the boon of
                        precise sizing</span
                    >, </span
                >eliminating guesswork and enabling customers to find their
                perfect match effortlessly.
            </p>
            <p class="credit">
                Find out more
                <router-link to="/about">here</router-link>
            </p>
        </div>
    </header>
    <div class="body-spacer"></div>

    <body>
        <div class="p-4 my-5">
            <h1>Fashionably Green</h1>
            <p>
                With REVENTÉ, you are supporting sustainable fashion! Explore a
                curated collection of fashionable clothing, made to enhance your
                wardrobe. Here at REVENTÉ, we build our platform through the
                principles of the circular economy and thrifting. Discover the
                latest trends, vintage finds, and timeless classics, all while
                reducing your environmental footprint. Join us in redefining
                fashion with style and conscience.
            </p>
            <p style="font-style: italic">
                REVENTÉ: where style meets sustainability.
            </p>
            <div>
                <button
                    class="btn btn-outline-dark me-3 px-5"
                    @click="toRegistration()"
                >
                    Register
                </button>
                <button class="btn btn-dark ms-3 px-5" @click="toLogin()">
                    Sign In
                </button>
            </div>
        </div>
        <div class="p-4 my-5">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6">
                        <h1>Sale</h1>
                        <BigCarousel
                            :imgurls="imgurls"
                            imgDesc="Example"
                            carouId="SaleCarousel"
                            :interval="5000"
                        />
                    </div>
                    <div class="col-md-6">
                        <h1>New Drops</h1>
                        <BigCarousel
                            :imgurls="imgurls"
                            imgDesc="Example2"
                            carouId="DropCarousel"
                            :interval="7000"
                        />
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>
.btn {
    border-radius: 23px;
}

html,
body {
    background-color: white;
}

.body-spacer {
    margin-top: 100dvh;
}

video {
    width: 100dvw;
    min-height: 100dvh;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
}

.header-text {
    position: absolute;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    transform: translateY(-5rem);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.header-text h1 {
    font-weight: 400;
    font-size: 1.75rem;
    text-transform: uppercase;
    line-height: 1;
}

.header-text span {
    display: block;
    font-weight: 900;
    font-size: 6rem;
}

.description {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    color: black;
    background-color: hsla(0, 0%, 92%, 0.7);
    padding: 2rem;
}

.description p {
    max-width: 60rem;
    margin-inline: auto;
    line-height: 1.6;
}

.credit {
    font-size: 0.75rem;
}

.credit a {
    color: rgb(84, 84, 84);
    text-underline-offset: 2px;
}

@media (max-width: 768px) {
    .header-text h1 {
        font-weight: 400;
        font-size: 1.4rem;
        text-transform: uppercase;
        line-height: 1;
    }

    .header-text span {
        display: block;
        font-weight: 900;
        font-size: 4.8rem;
    }

    .small-view {
        display: none;
    }
}

@media (max-width: 576px) {
    .header-text h1 {
        font-weight: 400;
        font-size: 1.12rem;
        text-transform: uppercase;
        line-height: 1;
    }

    .header-text span {
        display: block;
        font-weight: 900;
        font-size: 3.85rem;
    }

    .large-view {
        display: none;
    }
}
</style>
