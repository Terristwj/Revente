
<template>
   
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
    
    <div class="login-container container-fluid">
    
            <div class="login-form-container w-50">
                <h1 class="text-center Aoboshi-One">Registration</h1>
                <p class="text-center Aoboshi-One my-3">
                    Enter your account details
                </p>
                <form @submit.prevent="submitForm">
                    <div class="form-group" style="margin-left: 20%;">
                        <label for="email">Email:</label>
                        <input type="email" id="email" class="Aoboshi-One" v-model="email" required>
                    </div>
                    <div class="form-group my-4" style="margin-left: 20%;">
                        <label for="password">Password:</label>
                        <input class="Aoboshi-One" type="password" name="password" autocomplete="current-password" required="" id="id_password">
                        <i class="far fa-eye" id="togglePassword" style="margin-left: -30px; cursor: pointer;" @click="hidePassword"></i>
                    </div>
                    <div class="text-center mt-3">
                        <a href="#" class="Aoboshi-One">Forgot Password?</a>
                    </div>
                    <div class="d-flex justify-content-center">
                    <!-- <span>
                        <input type="checkbox" name="remember mx-3" id="remember">
                        <label for="remember" class="Aoboshi-One d-inline mx-2">Remember Me</label>
                    </span> -->
                    <button class="btn btn-primary mt-3 w-50" type="submit" >Login</button>
                </div>
                </form>
                
                <p class="text-center mt-5 p-3 Aoboshi-One" style="border-top: 2px solid rgba(52, 51, 51, 0.5)">
                    Need an account?
                </p>
                <div class="d-flex justify-content-center">
                    <router-link to="/register" class="btn btn-primary mt-3 w-50">Register</router-link>
                </div>
               

              
               
    </div>

</div>
</template>

<script>



export default {
    
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        submitForm() {
            // Handle login logic here
            console.log('Email:', this.email)
            console.log('Password:', this.password)
        },
        hidePassword() {
            var x = document.getElementById("id_password");
            if (x.type === "password") {
                x.type = "text";
                document.getElementById("togglePassword").classList.remove("fa-eye");
                document.getElementById("togglePassword").classList.add("fa-eye-slash");
            } else {
                x.type = "password";
                document.getElementById("togglePassword").classList.remove("fa-eye-slash");
                document.getElementById("togglePassword").classList.add("fa-eye");
            }

        }
    }
}
</script>

<style scoped>
@import "../assets/base.css";
@import "../assets/responsive.css";

.login-container {
    background-image: url('../assets/bg.jpeg');
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-form-container {
    opacity: 0.9;
    width: 50%;
    padding: 2rem;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
    width: 80%;
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
#content{
    background-color: black;
}
</style>
