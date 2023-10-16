<script>
export default {
    data() {
        return {
            imgurls: [
                '/src/assets/img/ecommerce/Google.png',
                '/src/assets/img/ecommerce/Google.png',
                '/src/assets/img/ecommerce/Google.png',
            ],
        };
    },
    methods: {
    }

};

</script>

<template>
    <header class="video-header">
        <video src="../assets/videos/exampleVid.mp4" autoplay loop playsinline muted>
        </video>
        <div class="header-text">
            <h1 class="flicker">
                About Us
            </h1>

        </div>
    </header>
    <div class="body-spacer"></div>

    <body>
        <div class="container-fluid content ">


            <div class="content-1 row p-4">
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
            <div class="row content-2 p-4 ">
                <h1>Our Mission</h1>
                <p>
                    REVENTÉ is a platform that aims to promote sustainable fashion. We believe that fashion should be
                    accessible
                    to everyone, and that it should not come at the cost of the environment. We are committed to providing a
                    platform that is inclusive, sustainable, and affordable.
                </p>
            </div>



            <div class="content-4 row p-4 ">
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
            </div>

            <div class="content-3 row p-4 ">
                <h1>Our Team</h1>
                <p>
                    REVENTÉ was founded by a team of students from Singapore Management University. We are a group of
                    passionate
                    individuals who are committed to making a difference in the fashion industry.
                </p>
            </div>
        </div>
    </body>
</template>

<style scoped>
.row {
    border: 1px solid black;
    border-radius: 30px;
    margin-bottom: 40px;
}

.content {
    width: 75%;
}

.flicker {
    font-family: 'Merienda', sans-serif;
    margin: 1rem auto;
    color: #d1bcbc11;
    background: -webkit-gradient(linear, left top, right top, from(#ffffff), to(#d3d3d3), color-stop(0.8, #d0d0d0));
    /* background: gradient(linear, left top, right top, from(#222), to(#222), color-stop(0.8, #fff)) no-repeat; */
    background-size: 110px 100%;
    -webkit-background-clip: text;
    background-clip: text;
    animation: flick 3s infinite;
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

video {
    width: 100dvw;
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
    -webkit-text-stroke: 0.5px rgb(114, 114, 114);
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
        font-weight: 900;
    font-size: 8vw;
    text-transform: uppercase;
    line-height: 1;
    }
}

@media (max-width: 576px) {
    .body-spacer {
    margin-top: 30dvh;
}
    .header-text {
    position: absolute;
    color: rgb(240, 237, 237);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    transform: translateY(-5rem);
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
}

</style>
