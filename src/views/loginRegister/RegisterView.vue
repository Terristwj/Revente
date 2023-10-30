<script>
import router from "../../router/router.js";
import { userStore } from "../../main.js";

// For Firebase Register
import FBInstanceAuth from "../../services/Firebase/FirebaseAuthentication";

export default {
    data() {
        return {
            // User inputs
            firstName: "",
            lastName: "",

            email: "",
            password: "",
            cfmPassword: "",

            phone: "+65 ",
            address: "",
            city: "",
            region: "",

            // Error messages
            firstNameError: "",
            lastNameError: "",

            emailError: "",
            passwordError: "",
            cfmPasswordError: "",

            phoneError: "",
            addressError: "",
            cityError: "",
            regionError: "",

            firebaseErrorMsg: "",

            // Register Logic
            auth: FBInstanceAuth.getAuth(),
        };
    },
    methods: {
        submitForm() {
            // If there are no errors, submit the form
            if (this.isEverythingValid()) {
                this.firebaseRegister();
            } else {
                this.showToastError("Please fill up everything.");
            }
        },
        isEverythingValid() {
            // Validate form fields
            this.firstNameError = !this.firstName
                ? "Please enter your first name."
                : "";

            this.lastNameError = !this.lastName
                ? "Please enter your last name."
                : "";

            this.emailError = !this.email
                ? "Please enter your email address."
                : "";

            this.passwordError = !this.password
                ? "Please enter a password."
                : "";

            this.cfmPasswordError = !this.cfmPassword
                ? "Please confirm your password."
                : this.password !== this.cfmPassword
                ? "Passwords do not match."
                : "";

            this.phoneError = !this.phone
                ? "Please enter your phone number."
                : !this.isValidPhone(this.phone)
                ? "Please enter a valid phone number."
                : "";

            this.addressError = !this.address
                ? "Please enter your address."
                : "";

            this.cityError = !this.city ? "Please enter your city." : "";

            this.regionError = !this.region ? "Please enter your region." : "";

            return (
                !this.firstNameError &&
                !this.lastNameError &&
                !this.emailError &&
                !this.passwordError &&
                !this.cfmPasswordError &&
                !this.phoneError &&
                !this.addressError &&
                !this.cityError &&
                !this.regionError
            );
        },
        isValidPhone(phone) {
            // Phone validation logic
            phone = phone.replaceAll(" ", "");

            return /^\d{8}$/.test(phone);
        },
        async firebaseRegister() {
            // Firebase Create User
            let errorCode = await FBInstanceAuth.register(
                this.auth,
                this.email,
                this.password,

                this.firstName,
                this.lastName,

                this.phone,
                this.address,
                this.city,
                this.region
            );
            // console.log(errorCode);
            switch (errorCode) {
                case "auth/invalid-email":
                    this.emailError = "Not a valid email address.";
                    this.firebaseErrorMsg = this.emailError;
                    break;
                case "auth/email-already-in-use":
                    this.emailError = "Email is already registered.";
                    this.firebaseErrorMsg = this.emailError;
                    break;
                case "auth/weak-password":
                    this.passwordError =
                        "Password must be at least 6 characters.";
                    this.firebaseErrorMsg = this.passwordError;
                    break;
                default:
                    this.firebaseErrorMsg = errorCode;
            }
            if (this.firebaseErrorMsg)
                this.showToastError(this.firebaseErrorMsg);
        },
        toCancel() {
            router.push("/login");
        },
        showToastError(detail) {
            this.$toast.add({
                severity: "error",
                summary: "Registration Failed",
                detail,
                life: 3000,
            });
        },
    },
    mounted() {
        setTimeout(() => {
            if (userStore.getUserID()) {
                router.push("/");
            }
        }, 500);
    },
};
</script>

<template>
    <video playsinline autoplay muted loop>
        <source src="../../assets/videos/login.webm" type="video/webm" />
    </video>
    <div class="background-container">
        <div class="register-container mx-auto">
            <h1 class="text-center login-text fs-1" style="font-size: 30px">
                Registration
            </h1>
            <div>
                <div class="d-flex gap-3">
                    <div class="form-group w-50">
                        <label for="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            class="Aoboshi-One"
                            v-model="firstName"
                        />
                        <span v-show="firstNameError" class="error">{{
                            firstNameError
                        }}</span>
                    </div>
                    <div class="form-group w-50">
                        <label for="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            class="Aoboshi-One"
                            v-model="lastName"
                        />
                        <span v-show="lastNameError" class="error">{{
                            lastNameError
                        }}</span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        class="Aoboshi-One"
                        v-model="email"
                    />
                    <span v-show="emailError" class="error">{{
                        emailError
                    }}</span>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        class="Aoboshi-One"
                        v-model="password"
                    />
                    <span v-show="passwordError" class="error">{{
                        passwordError
                    }}</span>
                </div>

                <div class="form-group">
                    <label for="cfmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="cfmPassword"
                        class="Aoboshi-One"
                        v-model="cfmPassword"
                    />
                    <span v-show="cfmPasswordError" class="error">{{
                        cfmPasswordError
                    }}</span>
                </div>

                <div class="form-group">
                    <label for="phone">Phone:</label>
                    <div class="p-inputgroup flex-1">
                        <span class="p-inputgroup-addon">
                            <label>+65</label>
                        </span>
                        <InputMask
                            id="phone"
                            class="Aoboshi-One"
                            v-model="phone"
                            date="phone"
                            mask="9999 9999"
                        />
                    </div>
                    <span v-show="phoneError" class="error">
                        {{ phoneError }}</span
                    >
                </div>

                <div class="form-group">
                    <label for="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        class="Aoboshi-One"
                        v-model="address"
                    />
                    <span v-show="addressError" class="error">{{
                        addressError
                    }}</span>
                </div>

                <div class="form-group">
                    <label for="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        class="Aoboshi-One"
                        v-model="city"
                    />
                    <span v-show="cityError" class="error">{{
                        cityError
                    }}</span>
                </div>

                <div class="form-group">
                    <label for="region">Region:</label>
                    <input
                        type="text"
                        id="region"
                        class="Aoboshi-One my-0"
                        v-model="region"
                    />
                    <span v-show="regionError" class="error">{{
                        regionError
                    }}</span>
                </div>

                <div class="d-flex justify-content-center gap-3 mt-3">
                    <button class="btn btn-dark w-50" @click="submitForm()">
                        Register
                    </button>
                    <button class="btn btn-dark w-50" @click="toCancel()">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

video {
    position: absolute;
    top: 0;
    height: 100vh;
    z-index: -1;
}

/* X-Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
    video {
        width: 100%;
    }
}

.background-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 92vh;
    width: auto;
    animation: fadeInAnimation ease 1.5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}

/* Custom Scrollbar START*/
/* width */
::-webkit-scrollbar {
    width: 3px;
}
/* Track */
::-webkit-scrollbar-track {
    /* background: #888; */
    /* border-left: 1px solid grey; */
    background: transparent;
}
/* Handle */
::-webkit-scrollbar-thumb {
    background: #000000;
}
/* Custom Scrollbar END*/

/* Small devices (landscape phones, 576px and up) */
.login-text {
    color: black;
    text-transform: uppercase;
    /* font-size: 100px; */
    font-family: "Sigmar";
    font-weight: bolder;
    line-height: 1;
    letter-spacing: 10px;
}

.register-container {
    border-radius: 25px;
    width: 100%;
    max-height: 90%;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.9);
    max-width: 800px;
    overflow-y: scroll;
}

.register-container:hover {
    background-color: rgba(255, 255, 255, 0.95);
}

.register-container > h1 {
    font-size: 32px;
}

.register-container > label {
    font-size: 20px;
    display: block;
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
    .register-container {
        width: 75%;
    }

    .register-container > h1 {
        font-size: 28px;
    }

    .register-container > label {
        font-size: 16px;
    }
}

.form-group {
    margin-bottom: 0.5rem;
}

label {
    display: block;
}

input {
    width: 100%;
    padding: 0.5rem 10px;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
}

input,
button {
    border-radius: 0%;
    /* box-shadow: 0px 10px 0px -5px #ccc; */
}

input:hover,
button:hover {
    box-shadow: 0px 0px 0px 3px #c7d2fe;
}

button {
    padding: 10px;
}

input:focus {
    box-shadow: none;
}

.error {
    color: red;
}
</style>
