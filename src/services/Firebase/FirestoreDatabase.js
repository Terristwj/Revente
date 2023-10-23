import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { FirestoreDatabase } from "./../../main.js";

class FirebaseFirestore {
    //
    // Firestore Handle User START
    //
    // Google Login
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

    // Update Account info
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
    //
    // Firestore Handle User END
    //

    //
    // Firestore Handle Product/Item START
    //

    createProduct = async function (
        // Seller
        seller_ID,

        // Product Details
        product_name,
        brand,
        description,

        // Category
        gender,
        category,

        // Condition
        condition,
        condition_notes,

        // Others
        drop_off_location,
        price
    ) {
        // (1) Add a new document with a generated id.
        const docRef = await addDoc(collection(FirestoreDatabase, "products"), {
            seller_ID,

            product_name,
            brand,
            description,

            gender,
            category,

            condition,
            condition_notes,

            drop_off_location,
            price,
        });

        // (2) Get product_ID
        let product_ID = docRef.id;
        // console.log("Document written with ID: ", docRef.id);

        // (3) Update product_ID into Firestore
        await setDoc(doc(FirestoreDatabase, "products", product_ID), {
            seller_ID,
            product_ID,

            product_name,
            brand,
            description,

            gender,
            category,

            condition,
            condition_notes,

            drop_off_location,
            price,
        });

        // (4) Return product_ID for other usage
        return product_ID;
    };

    // Adds/updates 'image_src' into a product's document
    updateProductImageSrc = async function (
        // Seller & Product
        seller_ID,
        product_ID,

        // Product Details
        product_name,
        brand,
        description,

        // Category
        gender,
        category,

        // Condition
        condition,
        condition_notes,

        // Others
        drop_off_location,
        price,

        // Image URL (To be Added)
        image_src
    ) {
        await setDoc(doc(FirestoreDatabase, "products", product_ID), {
            seller_ID,
            product_ID,

            product_name,
            brand,
            description,

            gender,
            category,

            condition,
            condition_notes,

            drop_off_location,
            price,

            // (To be Added)
            image_src,
        });
    };

    //
    // Firestore Handle Product/Item END
    //

    // Example codes
    // Add a new document in collection "cities"
    setDoc = async function () {
        await setDoc(doc(FirestoreDatabase, "cities", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA",
        });
    };

    // get a product
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
