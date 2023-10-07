<template class="login-view">
    <div class="login-container container-fluid">
        <div class="login-form-container">
            <h1 class="text-center Aoboshi-One">Login</h1>
            <p class="text-center Aoboshi-One my-3">
                Enter your account details
            </p>
            <div class="w-75 mx-auto" style="max-width: 400px">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        class="Aoboshi-One"
                        v-model="email"
                    />
                </div>
                <div class="form-group my-4">
                    <label for="password">Password:</label>
                    <input
                        class="Aoboshi-One"
                        type="password"
                        name="password"
                        autocomplete="current-password"
                        id="password"
                        v-model="password"
                    />
                    <i
                        class="far fa-eye"
                        id="togglePassword"
                        style="margin-left: -30px; cursor: pointer"
                        @click="hidePassword"
                    ></i>
                </div>
                <div
                    class="d-flex justify-content-center flex-column gap-1 w-75 mx-auto"
                >
                    <button
                        class="btn btn-primary"
                        type="submit"
                        @click="emailPasswordLogin"
                    >
                        Login
                    </button>
                    <label class="text-center Aoboshi-One">OR</label>
                    <button
                        class="btn btn-primary"
                        type="submit"
                        @click="googleLogin"
                    >
                        Google Login
                    </button>
                </div>
            </div>

            <label
                class="text-center mt-4 p-3 Aoboshi-One border-top border-black"
            >
                Need an account?
            </label>
            <div
                class="d-flex justify-content-center w-75 mx-auto"
                style="max-width: 400px"
            >
                <router-link to="/register" class="btn btn-primary w-75"
                    >Register</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
import router, { isAuthenticated } from "../router/index";

// For Firebase Login
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
    data() {
        return {
            email: "",
            password: "",
            errMsg: "",
            isLoggedIn: isAuthenticated(),
        };
    },
    methods: {
        hidePassword() {
            var x = document.getElementById("id_password");
            if (x.type === "password") {
                x.type = "text";
                document
                    .getElementById("togglePassword")
                    .classList.remove("fa-eye");
                document
                    .getElementById("togglePassword")
                    .classList.add("fa-eye-slash");
            } else {
                x.type = "password";
                document
                    .getElementById("togglePassword")
                    .classList.remove("fa-eye-slash");
                document
                    .getElementById("togglePassword")
                    .classList.add("fa-eye");
            }
        },
        emailPasswordLogin() {
            // Handle Firebase email logic here
            console.log("Email:", this.email);
            console.log("Password:", this.password);

            console.log(isAuthenticated());

            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((data) => {
                    console.log(data);
                    console.log("succesful signed in");
                    console.log(auth);
                    this.currentUserStore.toggleLoggedIn();

                    router.push("/");
                })
                .catch((error) => {
                    console.log(error.code);
                    switch (error.code) {
                        case "auth/invalid-email":
                            this.errMsg = "Invalid Email";
                            break;
                        case "auth/wrong-password":
                            this.errMsg = "Incorrect Password";
                            break;
                        case "auth/user-not-found":
                        case "auth/user-disabled":
                            this.errMsg = "Email or password was incorrect";
                            break;

                        // toast.success(`Welcome back ${auth.currentUser.displayName}!`, {
                        //     autoClose: 1000,
                        //     // ToastOptions
                        // });
                    }
                });
        },
        googleLogin() {
            // Handle Firebase Google logic here
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
    width: 100%;
}

.login-form-container {
    opacity: 0.9;
    width: 75%;
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

label {
    display: block;
}

input[type="email"],
input[type="password"],
input[type="text"] {
    width: 100%;
}
</style>
