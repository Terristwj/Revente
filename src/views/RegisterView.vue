<template>
    <div class="login-container container-fluid">
        <div class="login-form-container mx-auto" style="max-width: 600px">
            <h1 class="text-center Aoboshi-One">Registration</h1>
            <p class="text-center Aoboshi-One my-3">
                Enter your account details
            </p>
            <form @submit.prevent="submitForm">
                <div class="d-flex mb-2">
                    <div class="form-group w-50">
                        <label for="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            class="Aoboshi-One"
                            v-model="firstName"
                        />
                        <span v-if="firstNameError" class="error">{{
                            firstNameError
                        }}</span>
                    </div>
                    <div class="form-group w-50 mx-2">
                        <label for="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            class="Aoboshi-One"
                            v-model="lastName"
                        />
                        <span v-if="lastNameError" class="error">{{
                            lastNameError
                        }}</span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        class="Aoboshi-One"
                        v-model="email"
                    />
                    <span v-if="emailError" class="error">{{
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
                    <span v-if="passwordError" class="error">{{
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
                    <span v-if="cfmPasswordError" class="error">{{
                        cfmPasswordError
                    }}</span>
                </div>

                <div class="form-group">
                    <label for="phone">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        class="Aoboshi-One"
                        v-model="phone"
                    />
                    <span v-if="phoneError" class="error">
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
                    <span v-if="addressError" class="error">{{
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
                    <span v-if="cityError" class="error">{{ cityError }}</span>
                </div>

                <div class="form-group">
                    <label for="region">Region:</label>
                    <input
                        type="text"
                        id="region"
                        class="Aoboshi-One my-0"
                        v-model="region"
                    />
                    <span v-if="regionError" class="error">{{
                        regionError
                    }}</span>
                </div>

                <div class="d-flex justify-content-center">
                    <!-- <span>
                        <input type="checkbox" name="remember mx-3" id="remember">
                        <label for="remember" class="Aoboshi-One d-inline mx-2">Remember Me</label>
                    </span> -->
                    <button class="btn btn-primary w-50" type="submit">
                        Register
                    </button>
                    <router-link to="/login" class="btn btn-primary mx-2 w-50"
                        >Cancel</router-link
                    >
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

// import axios from "axios";

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
        };
    },
    methods: {
        submitForm() {
            // If there are no errors, submit the form
            if (this.isEverythingValid()) {
                console.log("Form submitted successfully.");
                this.firebaseRegister();
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
                : this.password.length < 8
                ? "Password must be at least 8 characters long."
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

            let countryCode = phone.substring(0, 3);
            let phoneNumber = phone.substring(3, phone.length);

            return (
                (countryCode == "+65" ? true : false) &&
                /^\d{8}$/.test(phoneNumber)
            );
        },
        async firebaseRegister() {
            const auth = getAuth();

            // Firebase Create User
            await createUserWithEmailAndPassword(
                auth,
                this.email,
                this.password
            )
                .then(async (userCredential) => {
                    console.log(userCredential);
                    // const user = userCredential.user;
                    // await updateProfile(user, {
                    //     firstName: this.firstName,
                    //     lastName: this.lastName,

                    //     phone: this.phone,
                    //     address: this.address,
                    //     city: this.city,
                    //     region: this.region,
                    // });
                })
                .catch((error) => {
                    console.log(error.code);
                    if (error.code == "auth/invalid-email") {
                        this.emailError = "Invalid Email";
                    }
                    // alert(error.message);
                });
        },
    },
};
</script>

<style scoped>
.login-container {
    background-image: url("img/ecommerce/login-bg.jpeg");

    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-form-container {
    opacity: 0.9;
    width: 75%;
    height: 98%;
    padding: 2rem;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

@media (max-width: 576px) {
    .login-form-container {
        font-size: small;
        width: 100%;
    }
}

@media (max-width: 768px) {
    .login-form-container {
        font-size: 12px;
        width: 100%;
    }
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
}

input[type="email"],
input[type="password"],
input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
}

.error {
    color: red;
}

.login-image-container {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

img {
    max-width: 100%;
    height: auto;
}

#content {
    background-color: black;
}
</style>
