import router from "../../router/router.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import FBInstanceFirestore from "./FirestoreDatabase.js";

// Track userID
import { userStore } from "../../main.js";

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
        // console.log(auth);
        const loginPath = "/";
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
            // eslint-disable-next-line no-unused-vars
            .then(async (result) => {
                // console.log(result);
                // Refer to NavigationBar.vue
                // - Store is created with onAuthStateChanged
                const store = userStore;
                const userID = store.getUserID();
                const userDisplayName = result.user.displayName;
                const userEmail = result.user.email;

                await FBInstanceFirestore.GoogleLogin(
                    userID,
                    userDisplayName,
                    userEmail
                ).catch((error) => {
                    console.log(error);
                });
                router.push(loginPath);
            })
            .catch((error) => {
                // console.log(error);
                return error.code;
            });
    };

    // When logout is clicked
    logout = function (auth) {
        signOut(auth).then(() => {
            router.push("/login");
        });
    };

    // Firebase create authentication new user
    register = async function (
        auth,
        email,
        password,

        firstName,
        lastName,

        phone,
        address,
        city,
        region
    ) {
        const loginPath = "/";
        let errorCode = "";
        await createUserWithEmailAndPassword(auth, email, password)
            // eslint-disable-next-line no-unused-vars
            .then(async (userCredential) => {
                // Successfully login
                // console.log(userCredential);
                // Refer to NavigationBar.vue
                // - Store is created with onAuthStateChanged
                const store = userStore;
                const userID = store.getUserID();

                await FBInstanceFirestore.registerAccount(
                    userID,
                    email,

                    firstName,
                    lastName,

                    phone,
                    address,
                    city,
                    region
                );

                router.push(loginPath);
            })
            .catch((error) => {
                // console.log(error);
                // console.log(error.code);
                errorCode = error.code;
            });
        return errorCode;
    };
}

const FBInstanceAuth = new FirebaseAuthentication();
export default FBInstanceAuth;
