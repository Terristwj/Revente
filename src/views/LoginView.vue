<script>
import router from "../router/router.js";

// For Firebase Login
import FBInstanceAuth from "../services/Firebase/FirebaseAuthentication";

export default {
    data() {
        return {
            // Login Form
            email: "",
            password: "",
            errMsg: "",

            // Login Logic
            auth: FBInstanceAuth.getAuth(),
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
        async emailPasswordLogin() {
            // Handle Firebase email logic here
            const errorCode = await FBInstanceAuth.login(
                this.auth,
                this.email,
                this.password
            );
            // console.log(errorCode);
            switch (errorCode) {
                case "auth/invalid-email":
                    this.errMsg =
                        this.email == ""
                            ? "Please enter your email"
                            : "This email is not signed up";
                    break;
                case "auth/missing-password":
                    this.errMsg = "Please enter your password";
                    break;
                case "auth/invalid-login-credentials":
                    this.errMsg = "Wrong password";
                    break;
                case "auth/user-disabled":
                    this.errMsg = "Account is currently disabled";
                    break;
                default:
                    this.errMsg = errorCode;
            }
            if (this.errMsg) this.showToast("error", this.errMsg);
        },
        async googleLogin() {
            // Handle Firebase Google logic here
            const errorCode = await FBInstanceAuth.GoogleLogin(this.auth);
            switch (errorCode) {
                case "auth/user-disabled":
                    this.errMsg = "Account is currently disabled";
                    break;
                default:
                    this.errMsg = errorCode;
            }
            if (this.errMsg) this.showToast("error", this.errMsg);
        },
        toRegistration() {
            router.push("/register");
        },
        showToast(severity, summary) {
            this.$toast.add({
                severity,
                summary,
                life: 3000,
            });
        },
    },
};
</script>

<template>   
        <video playsinline autoplay muted loop poster="cake.jpg">
            <source src="../assets/login.webm" type="video/webm">
        </video>

        <div class="background-container">
        <div class="login-container" >
            <h1 class="text-center login-text fs-1">LOGIN</h1>
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
                <div class="form-group mt-2">
                    <label for="password">Password:</label>
                    <input
                        class="Aoboshi-One"
                        type="password"
                        name="password"
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
                    class="d-flex justify-content-center flex-column gap-1 w-75 mx-auto mt-4"
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
                        id="GoogleSignIn"
                        class="d-flex justify-content-center align-items-center pointing"
                        type="submit"
                        @click="googleLogin"
                    >
                        <img src="../assets/img/ecommerce/Google.png" />
                        <label class="pointing"> Login with Google </label>
                    </button>
                </div>
            </div>

            <label
                class="text-center mt-4 pt-3 pb-2 Aoboshi-One border-top border-black"
            >
                Need an account?
            </label>
            <div
                class="d-flex justify-content-center w-75 mx-auto"
                style="max-width: 400px"
            >
                <button
                    class="btn btn-primary w-75 mx-auto"
                    type="submit"
                    @click="toRegistration()"
                >
                    Register
                </button>
            </div>
        </div>
    </div>

    <Toast />
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
  left: 0;
  width: 100%;
    height: 100%;
    z-index: -1;
}

.background-container {
  display: flex;
justify-content: center;
align-items: center;
height: 92vh;
width: auto;
animation: fadeInAnimation ease 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}
.login-text{
    color:black;
  text-transform:uppercase;
  /* font-size: 100px; */
  font-family: 'Sigmar';
  font-weight: bolder;
  line-height:1;
  letter-spacing: 10px;
}

.login-text:hover{
    letter-spacing: 10px;
}

/* Small devices (landscape phones, 576px and up) */
.login-container {
    /* width: 80%; */
    max-height: 90%;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    max-width: 800px;
    border-radius: 30px;
    overflow-y: scroll;
    
}
.login-container:hover {
    background-color: rgba(255, 255, 255, 0.95);
}
.login-container > h1 {
    font-size: 32px;
}
.login-container > label {
    font-size: 20px;
    display: block;
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
    .login-container {
        width: 75%;
    }
    .login-container > h1 {
        font-size: 28px;
    }
    .login-container > label {
        font-size: 16px;
    }
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
    box-shadow: 0px 0px 0px 3px #ccc;
}
input:focus {
    box-shadow: none;
}

button {
    padding: 10px;
}

#GoogleSignIn {
    border: none;
    background-color: white;
    border: 0.5px solid black;
}
#GoogleSignIn:hover {
    background-color: #edfdff;
}
#GoogleSignIn > img {
    height: 25px;
    margin-right: 10px;
    padding: 2px;
}
#GoogleSignIn > label {
    font-weight: 600;
}
</style>
