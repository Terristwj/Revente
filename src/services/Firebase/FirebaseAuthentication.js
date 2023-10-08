import router from "../../router/router.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
} from "firebase/auth";

class FirebaseAuthentication {
    getAuth = function () {
        return getAuth();
    };

    // When Firebase email login
    // Returns error code if there is an error
    // Else navigate to loginPath
    login = async function (auth, email, password) {
        const loginPath = "/";
        let errorCode = null;
        await signInWithEmailAndPassword(auth, email, password)
            // eslint-disable-next-line no-unused-vars
            .then((data) => {
                // Successfully login
                router.push(loginPath);
            })
            .catch((error) => {
                // console.log(error.code);
                errorCode = error.code;
            });
        return errorCode;
    };

    // Handle Firebase Google logic here
    // Returns error code if there is an error
    // Else navigate to loginPath
    GoogleLogin = async function (auth) {
        const loginPath = "/";
        let errorCode = null;
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
            // eslint-disable-next-line no-unused-vars
            .then((result) => {
                // console.log(result);
                router.push(loginPath);
            })
            .catch((error) => {
                // console.log(error);
                errorCode = error.code;
            });
        return errorCode;
    };

    // When logout is clicked
    logout = function (auth) {
        signOut(auth).then(() => {
            router.push("/login");
        });
    };

    // Firebase create authentication new user
    register = async function (auth, email, password) {
        const loginPath = "/";
        let errorCode = null;
        await createUserWithEmailAndPassword(auth, email, password)
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

                // Successfully login
                router.push(loginPath);
            })
            .catch((error) => {
                console.log(error);
                errorCode = error.code;
            });
        return errorCode;
    };
}

const FBInstanceAuth = new FirebaseAuthentication();
export default FBInstanceAuth;
