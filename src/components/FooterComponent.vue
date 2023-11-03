<template>
    <div class="container-fluid footer">
        <footer class="py-4">
            <!-- Logo -->
            <div class="row mb-3">
                <div class="col-lg-5 col-md-4 col-sm-3 col-12">
                    <hr />
                </div>
                <div class="col-lg-2 text-center col-md-4 col-sm-6 col-12">
                    <img
                        alt="Reventé logo"
                        src="@/assets/logo.svg"
                        width="125"
                        height="35"
                    />
                </div>
                <div class="col-lg-5 col-md-4 col-sm-3 col-12">
                    <hr />
                </div>
            </div>

            <!-- Icons -->
            <div class="row">
                <div class="col mx-auto text-center py-1">
                    <ul class="list-unstyled d-inline-flex">
                        <li class="mx-1 px-2"><a class="link-body-emphasis"
                                href="https://www.facebook.com/profile.php?id=61552687107509"><font-awesome-icon
                                    :icon="['fab', 'facebook-f']" size="2xl" /></a></li>
                        <li class="mx-1 px-2"><a class="link-body-emphasis"
                                href="https://twitter.com/SG_Revente"><font-awesome-icon :icon="['fab', 'twitter']"
                                    size="2xl" /></a></li>
                        <li class="mx-1 px-2 "><a class="link-body-emphasis"
                                href="https://www.instagram.com/revente_123/"><font-awesome-icon
                                    :icon="['fab', 'instagram']" size="2xl" /></a></li>
                        <li class="mx-1 px-2 "><a class="link-body-emphasis"
                                href="https://www.tiktok.com/@sg_revente?lang=en"><font-awesome-icon
                                    :icon="['fab', 'tiktok']" size="2xl" /></a></li>
                    </ul>
                </div>
            </div>

            <!-- Content -->
            <div class="row justify-content-around">
                <!-- Content 1 -->
                <div
                    class="col-12 col-sm-4 col-md-2 mb-3 text-center order-2 order-sm-1"
                >
                    <h5>About Us</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2"><router-link to="/about" class="nav-link p-0 text-body-secondary">Our
                                Mission</router-link></li>
                        <li class="nav-item mb-2"><router-link to="/about" class="nav-link p-0 text-body-secondary">Our
                                Team</router-link></li>
                        <li class="nav-item mb-2"><router-link to="/about"
                                class="nav-link p-0 text-body-secondary">Sustainability Game</router-link></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Reviews</a></li>
                    </ul>
                </div>

                <!-- Content 2 -->
                <div
                    class="col-12 col-sm-4 col-md-5 mb-3 text-center order-1 order-sm-2"
                >
                    <form>
                        <h5>We even send weekly updates!</h5>
                        <div class="d-flex flex-column flex-sm-row w-100 gap-2">
                            <label for="newsletter1" class="visually-hidden">Email address</label>
                            <div class="d-flex flex-column w-100">
                                <input id="newsletter1" type="text" class="form-control mb-2 small-label"
                                    placeholder="Email address" v-model="email">
                                <button class="btn btn-dark" type="button" @click="subscribe"
                                    id="subscribe">SUBSCRIBE</button>
                                <Dialog v-model:visible="visible" modal header="Subscription Status"
                                    :style="{ width: '50vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
                                    <p>
                                        Thanks for subscribing! Do check your email for a confirmation email and future
                                        promotions!
                                    </p>
                                </Dialog>

                                <Dialog v-model:visible="visible1" modal header="Error! :(" :style="{ width: '50vw' }"
                                    :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
                                    <p>
                                        Wrong Email format! Please check and try again!

                                    </p>
                                </Dialog>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- Content 3 -->
                <div
                    class="col-12 col-sm-4 col-md-2 mb-3 text-center order-3 order-sm-3"
                >
                    <h5>Customer Care</h5>
                    <ul class="nav flex-column">

                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary"
                                @click="visible3 = true">Contact Us</a></li>
                        <Dialog v-model:visible="visible3" modal header="Contact Us" :style="{ width: '50vw' }"
                            :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
                            <p>
                                For any enquiries, you may contact our help desk at revente.admin@gmail.com for more
                                assistance! Our mobile help desk is 24/7 and in any case of emergencies feel free to call
                                +65 9471 9372!
                            </p>
                        </Dialog>
                        <li class="nav-item mb-2"><router-link to="/faq"
                                class="nav-link p-0 text-body-secondary">FAQ</router-link></li>
                        <li class="nav-item mb-2"><router-link to="/profile" class="nav-link p-0 text-body-secondary">Drop
                                Off Address</router-link></li>
                        <li class="nav-item mb-2"><router-link to="/tnc" class="nav-link p-0 text-body-secondary">Terms and
                                Conditions</router-link></li>
                    </ul>
                </div>
            </div>

            <!-- Bottom -->
            <div
                class="d-flex flex-column flex-sm-row justify-content-between py-2 border-top"
            >
                <p class="lead mx-auto mb-0">
                    © 2023 Reventé, Inc. All rights reserved.
                </p>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Dialog from "primevue/dialog";

const visible = ref(false);
const visible1 = ref(false);
const visible3 = ref(false);
const email = ref("");

function isValidEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
}

function subscribe() {
    if (isValidEmail(email.value)) {
        visible.value = true;
        email.value = ''; // Clear the input

    } else {
        // Handle invalid email (e.g., show an error message)
        visible1.value = true;
        email.value = ''; // Clear the input

    }
}
</script>

<style scoped>
.container-fluid {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}


.form-control:focus {
    border-color: #000000;
    box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.2);
}

@media (max-width: 375px) {
    #subscribe {
        font-size: smaller;
    }

    .small-label {
        font-size: 0.65rem;
    }

    .footer {
        font-size: 0.6rem;
    }

    .lead {
        font-size: 0.6rem;
    }

    h5 {
        font-size: 0.8rem;
    }

    font-awesome-icon {
        font-size: 0.6rem;
    }

}</style>
