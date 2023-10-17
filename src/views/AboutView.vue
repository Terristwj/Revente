<script>
import ScrollSection from "../components/ScrollSection.vue";
import GameCanvas from "../components/GameCanvas.vue";
export default {
    name: "App",
    components: {
        ScrollSection: ScrollSection,
        GameCanvas: GameCanvas,
    },
};

</script>

<template>
    <header class="video-header">
        <!-- <video src="../assets/videos/exampleVid.mp4" autoplay loop playsinline muted>
        </video> -->
        <img src="../assets/img/ecommerce/about.svg" alt="" id="coverimg">
        <div class="header-text">
            <h1 class="flicker">
                About Us
            </h1>
        </div>


    </header>
    <div class="body-spacer"></div>


    <div class="container-fluid content1">


        <div class="content-1 row p-4">
            <div class="col-4 m-0 p-0">
                <img src="../assets/img/ecommerce/fraser.png" alt="" id="firstimg">
            </div>
            <div class="col-8">
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
                <p style="font-style:italic;">REVENTÉ: where style meets sustainability.</p>
            </div>

        </div>
        <div class="row">
            <ScrollSection transition="zoomOut" class="content-2 card-bg">
                <h1>Our Mission</h1>
                <br>
                <p>
                    REVENTÉ is a platform that aims to promote sustainable fashion. We believe that fashion should be
                    accessible
                    to everyone, and that it should not come at the cost of the environment. We are committed to providing a
                    platform that is inclusive, sustainable, and affordable

                </p>
                <p style="font-style:italic;">~where style meets sustainability~</p>
            </ScrollSection>
        </div>

        <div class="content-4 row p-4">

            <div class="col-8">
                <h1>Our Commitment to Sustainability</h1>
                <p>
                    At REVENTÉ, our commitment to sustainability goes beyond just words. We take concrete steps to minimize
                    our
                    environmental impact. We source our products responsibly, utilize eco-friendly packaging, and support
                    fair
                    labor
                    practices. By choosing REVENTÉ, you're not just making a fashion statement; you're supporting a greener,
                    more
                    ethical future.

                </p>
                <p style="font-style:italic;">REVENTÉ: where style meets sustainability.</p>
            </div>

            <div class="col-4 m-0 p-0">
                <img src="../assets/img/ecommerce/fraser.png" alt="" id="firstimg">
            </div>

        </div>

        <div class="row mb-3">
            <ScrollSection transition="fade" class="content-4 card-bg">
                <h1>Our Team</h1>
                <br>
                <p>
                    REVENTÉ was founded by a team of students from Singapore Management University. We are a group of
                    passionate
                    individuals who are committed to making a sustainable difference in the fashion industry.
                </p>
            </ScrollSection>
        </div>

        <div class="row">
            <ScrollSection transition="slideUp" class="content-5 game-bg">
                <div class="text-center">
                    <h1>Welcome to Our Sustainability Game!</h1>
                    <br>

                    <p>Test your knowledge and make a positive impact on the planet. Play now and learn about sustainability
                        in an interactive and fun way!</p>


                </div>

            </ScrollSection>
        </div>

        <div class="row m-0">

            <div class="game d-flex" style="justify-content:center; align-items:center;">
                <GameCanvas />
            </div>

        </div>
    </div>
</template>

<style scoped>
*{
    overflow-x: hidden;
    overflow-y: hidden;
}
.game-bg {
    background-image: url("../assets/img/ecommerce/pixelbg2.jpeg");
    /* background-size:contain; */

}

.scrollSection {
    display: grid;
    height: 40vw;
    place-items: center;
    width: 100vw;

}

.card-bg {
    background-image: url("../assets/img/ecommerce/about1.png");
    background-size: cover;

}


#firstimg {
    width: 75%;
    height: auto;
    margin-left: 50%;
    transform: translateX(-50%);

}

.row {
    margin-bottom: 40px;

}

.content-2>h1 {
    font-size: 3rem;
}



.flicker {
    margin: 1rem auto;
    color: #d1bcbc11;
    background: -webkit-gradient(linear, left top, right top, from(#ffffff), to(#d3d3d3), color-stop(0.8, #d0d0d0));
    /* background: gradient(linear, left top, right top, from(#222), to(#222), color-stop(0.8, #fff)) no-repeat; */
    background-size: 110px 100%;
    -webkit-background-clip: text;
    background-clip: text;
    animation: flick 3.5s infinite;
}

@keyframes flick {
    10% {
        background-position: top left;
    }

    100% {
        background-position: top right;
    }
}

.body-spacer {
    margin-top: 60dvh;
}

#coverimg {
    width: 100%;
    max-height: 60dvh;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
}

.header-text {
    position: absolute;
    color: rgb(240, 237, 237);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    /* transform: translateY(-10rem); */
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    -webkit-text-stroke: 1px rgb(27, 27, 27);
    height: 60dvh;
}

.header-text h1 {
    font-weight: 900;
    font-size: 8vw;
    text-transform: uppercase;
    line-height: 1;
}

@media (max-width: 768px) {
    .header-text h1 {
        font-size: 8vw;
    }

    .header-text {
        height: 50dvh;
    }

    .body-spacer {
        margin-top: 40dvh;
    }

    #coverimg {
        max-height: 40dvh;
    }

    .row {
        margin-bottom: 10px;
    }

    .row h1 {
        font-size: 20px;
    }

    .row p {
        font-size: 12px;
    }

}

@media (max-width: 576px) {
    .header-text h1 {
        font-size: 8vw;
    }

    .header-text {
        height: 50dvh;
    }

    .body-spacer {
        margin-top: 35dvh;
    }

    #coverimg {
        max-height: 40dvh;
    }
}

@media (max-width: 320px) {
    .body-spacer {
        margin-top: 20dvh;
    }

    .header-text {
        position: absolute;
        color: rgb(240, 237, 237);
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        transform: translateY(-7rem);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        -webkit-text-stroke: 0.5px rgb(114, 114, 114);
        height: 60dvh;
    }

    .header-text h1 {
        font-weight: 900;
        font-size: 8vw;
        text-transform: uppercase;
        line-height: 1;
    }
}</style>
