import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  limit, 
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

  // Update Account info w/ retrieving image filePath
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
    // Update user by adding 'image_src' attribute
    // - Only adds 'image_src' attribute if it does not exist
    // - Else it will update the 'image_src' attribute
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
    const querySnapshot = await getDocs(collection(FirestoreDatabase, "users"));

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

  // (Seller) User uploads a product
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
    // (0) Default values
    //     - Remember to also update the values in 'updateProductImageSrc()'
    const modified_price = 0;
    const is_approved = false;
    const is_bought = false;
    const size = "";

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
    });

    // (4) Return product_ID for other usage
    return product_ID;
  };

  // Used together with - (Seller) User uploads a product
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
      const size = productData.size;

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
        size,

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
  // - Please do not abuse this overpowered command
  // - Please use proper queries to filter
  // - Please use proper limits to limit the number of results
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

  // (Homepage) - Get the first 20 products
  // (Homepage - Sale Products) - Get the first 5 products
  // (Homepage - Featured Products) - Get the next 10 products
  // (Homepage - New_Drops Products) - Get the next 5 products
  // Where:
  // - is_approved = true
  // - is_bought = false
  getHomepageProducts = async function () {
    const querySnapshot = await getDocs(
      query(
        collection(FirestoreDatabase, "products"),
        where("is_approved", "==", true),
        where("is_bought", "==", false),
        limit(20)
      )
    );

    let products = [];
    querySnapshot.forEach((doc) => {
      products.push(doc.data());
    });

    return {
      sale: products.slice(0, 5),
      featured: products.slice(5, 15),
      newDrops: products.slice(15),
    };
  };

  // (Search) - Get all products that match the buyer_id query
  getProductsBasedOnBuyerID = async function (buyer_ID) {
    const querySnapshot = await getDocs(
      query(
        collection(FirestoreDatabase, "products"),
        where("is_approved", "==", true),
        where("is_bought", "==", true),
        where("buyer_ID", "==", buyer_ID)
      )
    );
    let products = [];
    querySnapshot.forEach((doc) => {
      products.push(doc.data());
    });

    return products;
  };

  // (Listings) - Get all product listings and count
  // Where:
  // - is_approved = true
  // - is_bought = false
  getAllProductListingsAndCount = async function () {
    const querySnapshot = await getDocs(
      query(
        collection(FirestoreDatabase, "products"),
        where("is_approved", "==", true),
        where("is_bought", "==", false)
      )
    );

    let products = [];
    querySnapshot.forEach((doc) => {
      products.push(doc.data());
    });

    return {
      products,
      count: products.length,
    };
  };

  // (Profile View)
  // Get all products that match the seller_id query
  getAllListedProductByUser = async function (userID) {
    const querySnapshot = await getDocs(
      query(
        collection(FirestoreDatabase, "products"),
        where("is_approved", "==", true),
        where("is_bought", "==", false),
        where("seller_ID", "==", userID)
      )
    );

    let products = [];
    querySnapshot.forEach((doc) => {
      products.push(doc.data());
    });

    return products;
  };

  // (Profile View) Get items that sold by the user
  getAllBoughtProductByUser = async function (userID) {
    const querySnapshot = await getDocs(
      query(
        collection(FirestoreDatabase, "products"),
        where("is_approved", "==", true),
        where("is_bought", "==", true),
        where("seller_ID", "==", userID)
      )
    );

    let products = [];
    querySnapshot.forEach((doc) => {
      products.push(doc.data());
    });

    return products;
  };

  // Update Product Status/Information (Multi-Purpose)
  // Current uses:
  //      - AdminView: 'modifiedPrice', 'is_approved', 'size'
  //      - SuccessView(Checkout): 'is_bought'
  //
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
    size,
    image_src,

    // Status
    is_approved,
    is_bought
  ) {
    await setDoc(doc(FirestoreDatabase, "products", product_ID), {
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
      size,
      image_src,

      // Status
      is_approved,
      is_bought,
    });
  };

  // Update Product Status/Information & add SellerID and review
  // Current uses:
  //     - SuccessView(Checkout): 'is_bought'
  //   - Review: 'review'
  // -rating: 'rating'
  // -BuyerID: 'buyer_ID'

  updateProductStatusAndAddSellerID = async function (
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
    size,
    image_src,

    // Status
    is_approved,
    is_bought,

    // to be added
    buyer_ID,
    review_desc,
    rating
  ) {
    await setDoc(doc(FirestoreDatabase, "products", product_ID), {
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
      size,
      image_src,

      // Status
      is_approved,
      is_bought,

      //   to be added
      buyer_ID,
      review_desc,
      rating,
    });
  };

  // Update Review and Ratings in (ReviewView)
  updateRatingAndReview = async function (
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
    size,
    image_src,

    // Status
    is_approved,
    is_bought,

    // to be added
    buyer_ID,
    review_desc,
    rating
  ) {
    await setDoc(doc(FirestoreDatabase, "products", product_ID), {
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
      size,
      image_src,

      // Status
      is_approved,
      is_bought,

      //   to be added
      buyer_ID,
      review_desc,
      rating,
    });
  };

  // Firestore Handle Product/Item END

  // Example codes
  // Add a new document in collection "cities"
  setDoc = async function () {
    await setDoc(doc(FirestoreDatabase, "cities", "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
    });
  };
}

const FBInstanceFirestore = new FirebaseFirestore();
export default FBInstanceFirestore;
