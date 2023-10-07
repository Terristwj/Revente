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
                            required
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
                            required
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
export default {
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            cfmPassword: "",
            phone: "+65 ",
            address: "",
            city: "",
            region: "",
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
            // Reset error messages
            this.firstNameError = "";
            this.lastNameError = "";
            this.emailError = "";
            this.passwordError = "";
            this.cfmPasswordError = "";
            this.phoneError = "";
            this.addressError = "";
            this.cityError = "";
            this.regionError = "";

            // Validate form fields
            if (!this.firstName) {
                this.firstNameError = "Please enter your first name.";
            }
            if (!this.lastName) {
                this.lastNameError = "Please enter your last name.";
            }
            if (!this.email) {
                this.emailError = "Please enter your email address.";
            } else if (!this.isValidEmail(this.email)) {
                this.emailError = "Please enter a valid email address.";
            }
            if (!this.password) {
                this.passwordError = "Please enter a password.";
            } else if (this.password.length < 8) {
                this.passwordError =
                    "Password must be at least 8 characters long.";
            }
            if (!this.cfmPassword) {
                this.cfmPasswordError = "Please confirm your password.";
            } else if (this.password !== this.cfmPassword) {
                this.cfmPasswordError = "Passwords do not match.";
            }
            if (!this.phone) {
                this.phoneError = "Please enter your phone number.";
            } else if (!this.isValidPhone(this.phone)) {
                this.phoneError = "Please enter a valid phone number.";
            }
            if (!this.address) {
                this.addressError = "Please enter your address.";
            }
            if (!this.city) {
                this.cityError = "Please enter your city.";
            }
            if (!this.region) {
                this.regionError = "Please enter your region.";
            }

            // If there are no errors, submit the form
            if (
                !this.firstNameError &&
                !this.lastNameError &&
                !this.emailError &&
                !this.passwordError &&
                !this.cfmPasswordError &&
                !this.phoneError &&
                !this.addressError &&
                !this.cityError &&
                !this.regionError
            ) {
                console.log("Form submitted successfully.");
            }
        },
        isValidEmail(email) {
            // Email validation logic
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        isValidPhone(phone) {
            // Phone validation logic
            let test1 = false;
            let first = phone.substring(0, 4);
            if (first == "+65 ") {
                test1 = true;
            }
            phone = phone.substring(4, phone.length);

            const phoneRegex = /^\d{8}$/;
            let test2 = phoneRegex.test(phone);

            return test1 && test2;
        },
    },
};
</script>

<style scoped>
@import "../assets/base.css";
@import "../assets/responsive.css";

.login-container {
    background-image: url("../assets/bg.jpeg");

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

/* button[type="submit"] {
    display: block;
    margin-top: 1rem;
    padding: 0.5rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
} */

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
