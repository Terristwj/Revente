<script>
import { Howl } from "howler";

let script2 = document.createElement("script");
script2.setAttribute(
    "src",
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"
);
script2.setAttribute(
    "integrity",
    "sha512-H6cPm97FAsgIKmlBA4s774vqoN24V5gSQL4yBTDOY2su2DeXZVhQPxFK4P6GPdnZqM9fg1G3cMv5wD7e6cFLZQ=="
);
script2.setAttribute("crossorigin", "anonymous");
script2.setAttribute("referrerpolicy", "no-referrer");
document.head.appendChild(script2);

export default {
    data() {
        return {
            movementSpeed: 5,
            audio: {
                Map: new Howl({
                    src: "./audio/map.wav",
                    html5: true,
                    volume: 0.1,
                }),
            },
        };
    },
    mounted() {
        let movementSpeed = this.movementSpeed;
        const audio = this.audio;

        const collisions = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 1025, 1025, 1025, 1025, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 0, 0,
            1025, 0, 0, 0, 0, 0, 1025, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0, 1025, 1025, 0,
            1025, 0, 0, 0, 0, 0, 0, 1025, 0, 1025, 1025, 0, 0, 1025, 0, 0, 1025,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1025, 1025, 1025, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0,
            1025, 1025, 1025, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 1025, 0, 0, 0,
            0, 0, 0, 1025, 0, 0, 0, 1025, 0, 0, 0, 0, 1025, 1025, 1025, 1025,
            1025, 1025, 1025, 1025, 1025, 1025, 0, 1025, 1025, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 1025, 1025, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0,
            1025, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025,
            0, 0, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0,
            1025, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 1025, 0, 0, 1025, 1025, 1025, 1025, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 1025, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0,
            1025, 0, 0, 1025, 1025, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 0, 0,
            0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 1025,
            1025, 1025, 1025, 1025, 1025, 1025, 1025, 0, 0, 0, 0, 1025, 1025, 0,
            0, 0, 1025, 1025, 1025, 0, 1025, 1025, 0, 0, 1025, 0, 0, 0, 0, 0, 0,
            0, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 1025, 1025, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0,
            1025, 1025, 1025, 0, 0, 1025, 1025, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 1025, 1025, 1025, 1025, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 1025, 1025, 0, 0, 0, 1025,
            1025, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025,
            1025, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 1025, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 1025, 1025, 0, 0, 0, 0, 1025, 1025, 1025, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 1025, 0, 1025, 1025,
            1025, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 1025, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 1025, 1025, 1025, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1025, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 1025, 0,
            0, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 1025, 0,
            0, 0, 1025, 1025, 1025, 1025, 1025, 0, 1025, 1025, 1025, 0, 1025,
            1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 0, 1025, 1025, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1025, 0, 0, 0, 1025, 0, 0, 0, 1025, 1025, 1025, 1025, 1025, 1025,
            1025, 1025, 0, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1025, 1025, 1025, 0, 1025, 1025, 1025, 1025, 1025, 1025, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1025, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
        ];

        const charactersMapData = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ];

        function rectangularCollision({ rectangle1, rectangle2 }) {
            return (
                rectangle1.position.x + rectangle1.width >=
                    rectangle2.position.x &&
                rectangle1.position.x <=
                    rectangle2.position.x + rectangle2.width &&
                rectangle1.position.y <=
                    rectangle2.position.y + rectangle2.height &&
                rectangle1.position.y + rectangle1.height >=
                    rectangle2.position.y
            );
        }

        function checkForCharacterCollision({
            characters,
            player,
            characterOffset = { x: 0, y: 0 },
        }) {
            player.interactionAsset = null;
            // monitor for character collision
            for (let i = 0; i < characters.length; i++) {
                const character = characters[i];

                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...character,
                            position: {
                                x: character.position.x + characterOffset.x,
                                y: character.position.y + characterOffset.y,
                            },
                        },
                    })
                ) {
                    player.interactionAsset = character;
                    break;
                }
            }
        }

        class Sprite {
            constructor({
                position,
                image,
                frames = { max: 1, hold: 10 },
                sprites,
                animate = false,
                rotation = 0,
                scale = 1,
            }) {
                this.position = position;
                this.image = new Image();
                this.frames = { ...frames, val: 0, elapsed: 0 };
                this.image.onload = () => {
                    this.width = (this.image.width / this.frames.max) * scale;
                    this.height = this.image.height * scale;
                };
                this.image.src = image.src;

                this.animate = animate;
                this.sprites = sprites;
                this.opacity = 1;

                this.rotation = rotation;
                this.scale = scale;
            }

            draw() {
                context.save();
                context.translate(
                    this.position.x + this.width / 2,
                    this.position.y + this.height / 2
                );
                context.rotate(this.rotation);
                context.translate(
                    -this.position.x - this.width / 2,
                    -this.position.y - this.height / 2
                );
                context.globalAlpha = this.opacity;

                const crop = {
                    position: {
                        x: this.frames.val * (this.width / this.scale),
                        y: 0,
                    },
                    width: this.image.width / this.frames.max,
                    height: this.image.height,
                };

                const image = {
                    position: {
                        x: this.position.x,
                        y: this.position.y,
                    },
                    width: this.image.width / this.frames.max,
                    height: this.image.height,
                };

                context.drawImage(
                    this.image,
                    crop.position.x,
                    crop.position.y,
                    crop.width,
                    crop.height,
                    image.position.x,
                    image.position.y,
                    image.width * this.scale,
                    image.height * this.scale
                );

                context.restore();

                if (!this.animate) return;

                if (this.frames.max > 1) {
                    this.frames.elapsed++;
                }

                if (this.frames.elapsed % this.frames.hold === 0) {
                    if (this.frames.val < this.frames.max - 1)
                        this.frames.val++;
                    else this.frames.val = 0;
                }
            }
        }

        class Boundary {
            static width = 48;
            static height = 48;
            constructor({ position }) {
                this.position = position;
                this.width = 48;
                this.height = 48;
            }

            draw() {
                context.fillStyle = "rgba(255, 0, 0, 0)";
                context.fillRect(
                    this.position.x,
                    this.position.y,
                    this.width,
                    this.height
                );
            }
        }

        class Character extends Sprite {
            constructor({
                position,
                velocity,
                image,
                frames = { max: 1, hold: 10 },
                sprites,
                animate = false,
                rotation = 0,
                scale = 1,
                dialogue = [""],
            }) {
                super({
                    position,
                    velocity,
                    image,
                    frames,
                    sprites,
                    animate,
                    rotation,
                    scale,
                });

                this.dialogue = dialogue;
                this.dialogueIndex = 0;
            }
        }

        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");

        canvas.width = 1024;
        canvas.height = 576;

        const collisionsMap = [];
        for (let i = 0; i < collisions.length; i += 70) {
            collisionsMap.push(collisions.slice(i, 70 + i));
        }

        const charactersMap = [];
        for (let i = 0; i < charactersMapData.length; i += 70) {
            charactersMap.push(charactersMapData.slice(i, 70 + i));
        }
        // console.log(charactersMap);

        const boundaries = [];
        const offset = {
            x: -735,
            y: -650,
        };

        collisionsMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if (symbol === 1025)
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: j * Boundary.width + offset.x,
                                y: i * Boundary.height + offset.y,
                            },
                        })
                    );
            });
        });

        const characters = [];
        const villagerImg = new Image();
        villagerImg.src = "./img/2d_game/villager/Idle.png";

        const oldManImg = new Image();
        oldManImg.src = "./img/2d_game/oldMan/Idle.png";

        charactersMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                // 1026 === villager
                if (symbol === 1026) {
                    characters.push(
                        new Character({
                            position: {
                                x: j * Boundary.width + offset.x,
                                y: i * Boundary.height + offset.y,
                            },
                            image: villagerImg,
                            frames: {
                                max: 4,
                                hold: 60,
                            },
                            scale: 3,
                            animate: true,
                            dialogue: [
                                "Hello there! Are you lost? Well here are some fun facts about sustainability anyway!",
                                "I am a Researcher Greenie.",
                                "Did you know that it can take more than 700 gallons of water to make a single t-shirt",
                                "Thats a mad amount right! Jeez",
                                "Did you know almost all clothes are 100% recyclable but.. our landfills are still filled with 60% textile waste",
                                "Luckily we have revente where you can sell and buy old clothes.. one man's trash is another man treasure am i right :D",
                                "Find the other researchers to learn more!",
                            ],
                        })
                    );
                } else if (symbol === 1992) {
                    characters.push(
                        new Character({
                            position: {
                                x: j * Boundary.width + offset.x,
                                y: i * Boundary.height + offset.y,
                            },
                            image: villagerImg,
                            frames: {
                                max: 4,
                                hold: 60,
                            },
                            scale: 3,
                            animate: true,
                            dialogue: [
                                "Hello there taking a break from shopping? Well here are some fun facts about sustainability!",
                                "I am a Researcher Greenie the second! Hope you saw my twin",
                                "Fun fact 1: The Average Person Only Wears 20% of Their Clothes 80% of the Time",
                                "Only 15% is recycled or donated, and the rest goes directly to the landfill or is incinerated",
                                "Luckily we have revente where you can sell and buy old clothes.. one man's trash is another man treasure am i right :D",
                                "Oops did i repeat what my twin said o wells! Enjoy shopping!",
                                "Find the other researchers to learn more!",
                            ],
                        })
                    );
                }
                // 1031 === oldMan
                else if (symbol === 1031) {
                    characters.push(
                        new Character({
                            position: {
                                x: j * Boundary.width + offset.x,
                                y: i * Boundary.height + offset.y,
                            },
                            image: oldManImg,
                            frames: {
                                max: 4,
                                hold: 60,
                            },
                            scale: 3,
                            animate: true,
                            dialogue: [
                                "Hello there! I am a Researcher Hynki Pinkie.",
                                " Over 80 billion new pieces of clothing are bought each year worldwide, which is 400% more than what we consumed just two decades ago.",
                                "Did you know that the fashion industry is responsible for 10% of annual global carbon emissions, more than all international flights and maritime shipping combined. ",
                                "Thats surprising right! Jeez",
                                "Continue shopping and thanks for visitng me!",
                            ],
                        })
                    );
                } else if (symbol === 2048) {
                    characters.push(
                        new Character({
                            position: {
                                x: j * Boundary.width + offset.x,
                                y: i * Boundary.height + offset.y,
                            },
                            image: oldManImg,
                            frames: {
                                max: 4,
                                hold: 60,
                            },
                            scale: 3,
                            animate: true,
                            dialogue: [
                                "Hello there! I am a Researcher Hynki Pinkie.",
                                " Over 80 billion new pieces of clothing are bought each year worldwide, which is 400% more than what we consumed just two decades ago.",
                                "Did you know that the fashion industry is responsible for 10% of annual global carbon emissions, more than all international flights and maritime shipping combined. ",
                                "Thats surprising right! Jeez",
                                "Continue shopping and thanks for visitng me!",
                            ],
                        })
                    );
                }

                if (symbol !== 0) {
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: j * Boundary.width + offset.x,
                                y: i * Boundary.height + offset.y,
                            },
                        })
                    );
                }
            });
        });

        const image = new Image();
        image.src = "./img/2d_game/Pellet Town.png";

        const foregroundImage = new Image();
        foregroundImage.src = "./img/2d_game/foregroundObjects.png";

        const playerDownImage = new Image();
        playerDownImage.src = "./img/2d_game/playerDown.png";

        const playerUpImage = new Image();
        playerUpImage.src = "./img/2d_game/playerUp.png";

        const playerLeftImage = new Image();
        playerLeftImage.src = "./img/2d_game/playerLeft.png";

        const playerRightImage = new Image();
        playerRightImage.src = "./img/2d_game/playerRight.png";

        const player = new Sprite({
            position: {
                x: canvas.width / 2 - 192 / 4 / 2,
                y: canvas.height / 2 - 68 / 2,
            },
            image: playerDownImage,
            frames: {
                max: 4,
                hold: 10,
            },
            sprites: {
                up: playerUpImage,
                left: playerLeftImage,
                right: playerRightImage,
                down: playerDownImage,
            },
        });

        const background = new Sprite({
            position: {
                x: offset.x,
                y: offset.y,
            },
            image: image,
        });

        const foreground = new Sprite({
            position: {
                x: offset.x,
                y: offset.y,
            },
            image: foregroundImage,
        });

        const keys = {
            w: {
                pressed: false,
            },
            a: {
                pressed: false,
            },
            s: {
                pressed: false,
            },
            d: {
                pressed: false,
            },
        };

        const movables = [
            background,
            ...boundaries,
            foreground,
            ...characters,
        ];
        const renderables = [
            background,
            ...boundaries,
            ...characters,
            player,
            foreground,
        ];

        function animate() {
            window.requestAnimationFrame(animate);
            renderables.forEach((renderable) => {
                renderable.draw();
            });

            let moving = true;
            player.animate = false;

            if (keys.w.pressed && lastKey === "w") {
                player.animate = true;
                player.image = player.sprites.up;

                checkForCharacterCollision({
                    characters,
                    player,
                    characterOffset: { x: 0, y: movementSpeed },
                });

                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i];
                    if (
                        rectangularCollision({
                            rectangle1: player,
                            rectangle2: {
                                ...boundary,
                                position: {
                                    x: boundary.position.x,
                                    y: boundary.position.y + movementSpeed,
                                },
                            },
                        })
                    ) {
                        moving = false;
                        break;
                    }
                }

                if (moving)
                    movables.forEach((movable) => {
                        movable.position.y += movementSpeed;
                    });
            } else if (keys.a.pressed && lastKey === "a") {
                player.animate = true;
                player.image = player.sprites.left;

                checkForCharacterCollision({
                    characters,
                    player,
                    characterOffset: { x: movementSpeed, y: 0 },
                });

                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i];
                    if (
                        rectangularCollision({
                            rectangle1: player,
                            rectangle2: {
                                ...boundary,
                                position: {
                                    x: boundary.position.x + movementSpeed,
                                    y: boundary.position.y,
                                },
                            },
                        })
                    ) {
                        moving = false;
                        break;
                    }
                }

                if (moving)
                    movables.forEach((movable) => {
                        movable.position.x += movementSpeed;
                    });
            } else if (keys.s.pressed && lastKey === "s") {
                player.animate = true;
                player.image = player.sprites.down;

                checkForCharacterCollision({
                    characters,
                    player,
                    characterOffset: { x: 0, y: -movementSpeed },
                });

                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i];
                    if (
                        rectangularCollision({
                            rectangle1: player,
                            rectangle2: {
                                ...boundary,
                                position: {
                                    x: boundary.position.x,
                                    y: boundary.position.y - movementSpeed,
                                },
                            },
                        })
                    ) {
                        moving = false;
                        break;
                    }
                }

                if (moving)
                    movables.forEach((movable) => {
                        movable.position.y -= movementSpeed;
                    });
            } else if (keys.d.pressed && lastKey === "d") {
                player.animate = true;
                player.image = player.sprites.right;

                checkForCharacterCollision({
                    characters,
                    player,
                    characterOffset: { x: -movementSpeed, y: 0 },
                });

                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i];
                    if (
                        rectangularCollision({
                            rectangle1: player,
                            rectangle2: {
                                ...boundary,
                                position: {
                                    x: boundary.position.x - movementSpeed,
                                    y: boundary.position.y,
                                },
                            },
                        })
                    ) {
                        moving = false;
                        break;
                    }
                }

                if (moving)
                    movables.forEach((movable) => {
                        movable.position.x -= movementSpeed;
                    });
            }
        }
        // animate()

        let lastKey = "";
        window.addEventListener("keydown", (e) => {
            if (player.isInteracting) {
                switch (e.key) {
                    case "Enter": {
                        player.interactionAsset.dialogueIndex++;

                        const { dialogueIndex, dialogue } =
                            player.interactionAsset;
                        if (dialogueIndex <= dialogue.length - 1) {
                            document.querySelector(
                                "#characterDialogueBox"
                            ).innerHTML =
                                player.interactionAsset.dialogue[dialogueIndex];
                            return;
                        }

                        // finish conversation
                        player.isInteracting = false;
                        player.interactionAsset.dialogueIndex = 0;
                        document.querySelector(
                            "#characterDialogueBox"
                        ).style.display = "none";

                        break;
                    }
                }
                return;
            }

            switch (e.key) {
                case "Enter": {
                    if (!player.interactionAsset) return;

                    // beginning the conversation
                    const firstMessage = player.interactionAsset.dialogue[0];
                    document.querySelector("#characterDialogueBox").innerHTML =
                        firstMessage;
                    document.querySelector(
                        "#characterDialogueBox"
                    ).style.display = "flex";
                    player.isInteracting = true;
                    break;
                }
                case "w": {
                    keys.w.pressed = true;
                    lastKey = "w";
                    break;
                }
                case "a": {
                    keys.a.pressed = true;
                    lastKey = "a";
                    break;
                }

                case "s": {
                    keys.s.pressed = true;
                    lastKey = "s";
                    break;
                }

                case "d": {
                    keys.d.pressed = true;
                    lastKey = "d";
                    break;
                }
            }
        });

        window.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "w":
                    keys.w.pressed = false;
                    break;
                case "a":
                    keys.a.pressed = false;
                    break;
                case "s":
                    keys.s.pressed = false;
                    break;
                case "d":
                    keys.d.pressed = false;
                    break;
            }
        });

        let clicked = false;
        addEventListener("click", () => {
            if (!clicked) {
                audio.Map.play();
                clicked = true;
            }
        });
        animate();
    },
    methods: {},
};
</script>

<template>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        rel="stylesheet"
    />

    <div id="gameArea">
        <div style="display: inline-block; position: relative">
            <div
                id="overlappingDiv"
                style="
                    background-color: black;
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    opacity: 0;
                    pointer-events: none;
                    z-index: 10;
                "
            ></div>

            <canvas class="border border-2 border-dark"></canvas>

            <div
                id="characterDialogueBox"
                style="
                    background-color: white;
                    height: 140px;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    border: 2px black solid;
                    border-top: 4px black solid;
                    display: none;
                    padding: 12px;
                "
            ></div>

            <div id="userInterface" style="display: none">
                <!-- Represents health bar of draggle (enemy) -->
                <div
                    style="
                        background-color: white;
                        width: 250px;
                        position: absolute;
                        top: 50px;
                        left: 50px;
                        border: 4px black solid;
                        padding: 12px;
                    "
                >
                    <h1 style="font-size: 16px">Draggle</h1>
                    <div style="position: relative">
                        <div
                            style="
                                height: 5px;
                                background-color: #ccc;
                                margin-top: 10px;
                            "
                        ></div>
                        <div
                            id="enemyHealthBar"
                            style="
                                height: 5px;
                                background-color: green;
                                position: absolute;
                                top: 0;
                                left: 0;
                                right: 0;
                            "
                        ></div>
                    </div>
                </div>

                <!-- Represents health bar of emby (us) -->
                <div
                    style="
                        background-color: white;
                        width: 250px;
                        position: absolute;
                        top: 330px;
                        right: 50px;
                        border: 4px black solid;
                        padding: 12px;
                    "
                >
                    <h1 style="font-size: 16px">Emby</h1>
                    <div style="position: relative">
                        <div
                            style="
                                height: 5px;
                                background-color: #ccc;
                                margin-top: 10px;
                            "
                        ></div>
                        <div
                            id="playerHealthBar"
                            style="
                                height: 5px;
                                background-color: green;
                                position: absolute;
                                top: 0;
                                left: 0;
                                right: 0;
                            "
                        ></div>
                    </div>
                </div>

                <div
                    style="
                        background-color: white;
                        height: 140px;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        border: 2px black solid;
                        border-top: 4px black solid;
                        display: flex;
                    "
                >
                    <div
                        id="dialogueBox"
                        style="
                            position: absolute;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            left: 0;
                            background-color: white;
                            padding: 12px;
                            display: none;
                            cursor: pointer;
                        "
                    ></div>
                    <div
                        id="attacksBox"
                        style="
                            width: 66.66%;
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                        "
                    ></div>
                    <div
                        style="
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 33.33%;
                            border-left: 4px black solid;
                        "
                    >
                        <h1 id="attackType" style="font-size: 16px">
                            Attack Type
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    font-family: "Press Start 2P", cursive;
    box-sizing: border-box;
}
#gameArea {
    width: 100vw;
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin: auto;
    background-color: rgb(255, 255, 255);
    /* border: 5px solid black; */
    margin: 0px 0px;
}

canvas {
    width: 100%;
    height: 100%;
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    #gameArea {
        width: 99vw;
        margin: 0 -5%;
    }
}
</style>
