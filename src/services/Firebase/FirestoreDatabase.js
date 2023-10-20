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
                null,

                null,
                null,
                null,
                null
            );
            // console.log("Created Doc");
        }
    };

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
        // New user
        await setDoc(doc(FirestoreDatabase, "users", userID), {
            userID,
            email,

            first_name: firstName,
            last_name: lastName,

            phone,
            address,
            city,
            region,
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
    }
}

const FBInstanceFirestore = new FirebaseFirestore();
export default FBInstanceFirestore;
