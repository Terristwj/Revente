<template>
    <section class="scrollSection">
        <div ref="root" class="card">
            <slot></slot>
        </div>
    </section>
</template>
  
<script>
import { ref, onMounted, onUnmounted } from "vue";
import anime from "animejs";
import { onIntersect } from "../composables/onIntersect";
import transitions from "../utilities/transitions";

export default {
    props: {
        transition: {
            type: String,
            default: "fade",
        },
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
                once: false,
                options: {
                    threshold: 0.1,
                },
            });

            // init our anime object.
            _.motion = anime({
                targets: root.value,
                // by default animejs will run the transition on load.
                autoplay: false,
                duration: 2000,
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
  
<style>
/* .scrollSection {
    display: grid;
    max-height: 100%;
    place-items: center;
    max-width: 100%;
} */

.card {
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px,
        rgba(17, 17, 26, 0.05) 0px 8px 32px;
    border-radius: 25px;
    display: inline-flex;
    flex-direction: column;
    height: 400px;
    justify-content: center;
    margin: 0 auto 45px;
    padding: 60px 60px;
    width: 75%;
}
@media(min-width:320px){
    .card{
        margin: 3%;
        height: 15dvh; 
        padding: 2%;
    }
    .card p {
        font-size: 7px!important;
        /* padding-top:0 !important; */
        margin-top: 0!important;
    }
    .card h1{
        font-size: 10px!important;
        /* margin-top: 15px!important; */
    }
}


@media(min-width: 425px) and (max-width: 576px) {
    .card{
        margin: 3%;
        height: 20dvh; 
        padding: 2%;
    }
    .card p {
        font-size: 10px!important;
        /* padding-top:0 !important;
        margin-top: 0!important; */
    }
    .card h1{
        font-size: 13px!important;
        /* margin-top: 15px!important; */
    }
}

@media (min-width: 576px) and (max-width: 768px) {
    .card{
        margin: 3%;
        height: 28dvh; 
        padding: 2%;
    }
    .card p {
        font-size: 14px!important;
        padding-top:0 !important;
        margin-top: 0!important;
    }
    .card h1{
        font-size: 23px!important;
        margin-top: 15px!important;
    }


}

@media (min-width: 768px){
    .card{
        margin: 3%;
        height: 30dvh; 
        padding: 2%;
    }
    .card p {
        font-size: 15px !important;
    }
    .card h1{
        font-size: 25px!important;
        margin:0!important;
    }

}

@media (min-width: 1024px){
    .card{
        margin: auto 45px;
        height: 400px;
        padding: 60px 60px;
    }
    .card p {
        font-size: 20px!important;
    }
    .card h1{
        font-size: 30px!important;
        margin:0!important;
    }

}
</style>