import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    addDoc,
} from "firebase/firestore";
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

    // Get all Users IDs
    getAllUsers = async function () {
        const querySnapshot = await getDocs(
            collection(FirestoreDatabase, "users")
        );

        let users = [];

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            users.push(doc.data());
        });

        // console.log("Document data:", docSnap.data());
        return users;
    };

    //get specific user
    getUser = async function (userID) {
        // console.log(productID);
        const docRef = doc(FirestoreDatabase, "users", userID);
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data());
        return docSnap.data();
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
        // (o) Default values
        const modified_price = 0;
        const is_approved = false;
        const is_bought = false;
        const size = '';
        const addToCart = false;

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

            // Default values
            modified_price,
            is_approved,
            is_bought,
            size,
            addToCart

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

            // Default values
            modified_price,
            is_approved,
            is_bought,
            size,
            addToCart
           
        });

        // (4) Return product_ID for other usage
        return product_ID;
    };

    // Adds/updates 'image_src' into a product's document
    updateProductImageSrc = async function (
        // Document Key
        product_ID,

        // Image URL (To be Added)
        image_src
    ) {
        await this.getProduct(product_ID).then(async (productData) => {
            // console.log(productData);
            const seller_ID = productData.seller_ID;
            const product_ID = productData.product_ID;

            const product_name = productData.product_name;
            const brand = productData.brand;
            const description = productData.description;

            const gender = productData.gender;
            const category = productData.category;

            const condition = productData.condition;
            const condition_notes = productData.condition_notes;

            const drop_off_location = productData.drop_off_location;
            const price = productData.price;

            const modifiedPrice = productData.modified_price;
            const is_approved = productData.is_approved;
            const is_bought = productData.is_bought;

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

                modifiedPrice,
                is_approved,
                is_bought,

                // (To be Added)
                image_src,
                
            });
        });
    };

    // Get a specific product
    getProduct = async function (productID) {
        // console.log(productID);
        const docRef = doc(FirestoreDatabase, "products", productID);
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data());
        return docSnap.data();
    };

    // Get all Product_ID
    getAllProducts = async function () {
        const querySnapshot = await getDocs(
            collection(FirestoreDatabase, "products")
        );

        let products = [];

        // For each doc (product) in collection (products)
        querySnapshot.forEach((doc) => {
            products.push(doc.data());
        });

        return products;
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

    //update product status.. is_approved:true;false and will auto update the size
    updateProductStatus = async function (
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
        modifiedPrice,
        is_approved,
        is_bought,

        // Image URL (To be Added)
        image_src,
        size,
        
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
            modifiedPrice,
            is_approved,
            is_bought,

            // (To be Added)
            image_src,
            size,
        });
    };

    //add to cart, add user_ID and change bought to true
    addToCart = async function (
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
        modifiedPrice,
        is_approved,
        is_bought,

        // Image URL (To be Added)
        image_src,
        size,
        user_ID,
        addToCart
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
            modifiedPrice,
            is_approved,
            is_bought,

            // (To be Added)
            image_src,
            size,
            user_ID,
            addToCart
        });
    };
    //remove from cart, remove user_ID and change bought to false
    removeCart = async function (
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
        modifiedPrice,
        is_approved,
        is_bought,

        // Image URL (To be Added)
        image_src,
        size,
        user_ID
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
            modifiedPrice,
            is_approved,
            is_bought,

            // (To be Added)
            image_src,
            size,
            user_ID
        });
    };
}

const FBInstanceFirestore = new FirebaseFirestore();
export default FBInstanceFirestore;
