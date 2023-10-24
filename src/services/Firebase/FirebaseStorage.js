import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { FirestoreStorage } from "../../main.js";

class FirebaseStorage {
    // 'type' refers to 'users' or 'products'
    // 'filename' must be unique - Preferably the object_ID
    // 'file' comes from the Blob or File API
    uploadImage = async function (type, fileName, file) {
        let hasError = false;
        // File path in Firebase Storage
        let pathRef = ref(FirestoreStorage, `${type}/${fileName}`);
        // eslint-disable-next-line no-unused-vars
        await uploadBytes(pathRef, file)
            // eslint-disable-next-line no-unused-vars
            .then((snapshot) => {
                // console.log(snapshot);
                // console.log("Uploaded a blob or file!");
            })
            .catch((error) => {
                console.log(error);
                hasError = true;
            });

        return hasError;
    };

    // 'type' refers to 'users' or 'products'
    getImageUrl = async function (type, fileName) {
        let pathRef = ref(FirestoreStorage, `${type}/${fileName}`);
        let url = await getDownloadURL(pathRef)
            .then((url) => {
                return url;
            })
            .catch((error) => {
                // Handle any errors
                console.log(error);
                return false;
            });
        return url;
    };

    // For debugging
    listImages = async function () {
        // let pathRef = ref(FirestoreStorage);
        let pathRef = ref(FirestoreStorage, "users");
        // let pathRef = ref(FirestoreStorage, "products");
        listAll(pathRef)
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                    // All the prefixes under listRef.
                    // You may call listAll() recursively on them.
                    console.log(folderRef);
                });
                console.log(1);
                res.items.forEach(async (itemRef) => {
                    // All the items under listRef.
                    let cols = itemRef._location.path_.split("/");
                    await this.getImageUrl(cols[0], cols[1]).then((result) => {
                        console.log(result);
                    });
                    console.log(itemRef);
                    console.log(2);
                });
            })
            .catch((error) => {
                // Uh-oh, an error occurred!
                console.log(error);
            });
    };
}

const FBInstanceStorage = new FirebaseStorage();
export default FBInstanceStorage;
