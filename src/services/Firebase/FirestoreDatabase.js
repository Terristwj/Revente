import { doc, setDoc, getDoc } from "firebase/firestore";
import { FirestoreDatabase } from "./../../main.js";

class FirebaseFirestore {
    GoogleLogin = async function (userID, userDisplayName, userEmail) {
        // console.log(userID);
        const docRef = doc(FirestoreDatabase, "users", userID);
        const docSnap = await getDoc(docRef);
        // console.log(docRef);
        // console.log(docSnap);

        // User has logged before
        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
        }

        // New user
        // docSnap.data() will be undefined in this case
        else {
            this.registerAccount(
                userID,
                userEmail,

                userDisplayName,
                "",

                "",
                "",
                "",
                ""
            );
            // console.log("Created Doc");
        }
    };

    // New user
    registerAccount = async function (
        userID,
        email,

        firstName,
        lastName,

        phone,
        address,
        city,
        region
    ) {
        await setDoc(doc(FirestoreDatabase, "users", userID), {
            image_src:
                "https://firebasestorage.googleapis.com/v0/b/smu-wad2.appspot.com/o/users%2FDefaultProfileImage.png?alt=media&token=1b1fc85e-3603-402a-8fb0-1df04f8addc4",
            userID,
            email,

            first_name: firstName,
            last_name: lastName,

            phone,
            address,
            city,
            region,

            description: "",
        });
        // console.log("Created Doc");
    };

    // For displaying Account info
    getAccount = async function (userID) {
        const docRef = doc(FirestoreDatabase, "users", userID);
        const docSnap = await getDoc(docRef);

        // console.log("Document data:", docSnap.data());
        return docSnap.data();
    };

    // Update
    updateAccount = async function (
        image_src,
        userID,
        email,

        firstName,
        lastName,

        phone,
        address,
        city,
        region,

        description
    ) {
        // Retrieve image filePath

        // New user
        await setDoc(doc(FirestoreDatabase, "users", userID), {
            image_src,
            userID,
            email,

            first_name: firstName,
            last_name: lastName,

            phone,
            address,
            city,
            region,

            description,
        });
        // console.log("Created Doc");
    };

    // Example codes
    // Add a new document in collection "cities"
    setDoc = async function () {
        await setDoc(doc(FirestoreDatabase, "cities", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA",
        });
    };

    getProducts = async function (productID) {
        // console.log(userID);
        const docRef = doc(FirestoreDatabase, "products", productID);
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data());
        return docSnap.data();
    };
}

const FBInstanceFirestore = new FirebaseFirestore();
export default FBInstanceFirestore;
