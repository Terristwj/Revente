<script>
import router from "../../router/router.js";
import { userStore } from "../../main.js";
import FBInstanceFirestore from "../../services/Firebase/FirestoreDatabase.js";
import FBInstanceStorage from "../../services/Firebase/FirebaseStorage.js";

export default {
    data() {
        return {
            FBQuotaReached: false,
            isLoading: true,

            imageSrc: "",
            imageFile: "",

            userID: userStore.getUserID(),
            email: "",

            fName: "",
            lName: "",
            phone: "",

            address: "",
            city: "",
            region: "",

            description: "",

            firstError: "",
        };
    },
    methods: {
        async getAccountData() {
            this.userID = userStore.getUserID();
            await FBInstanceFirestore.getAccount(this.userID)
                .then((data) => {
                    this.imageSrc = data.image_src;
                    this.userID = data.userID;
                    this.email = data.email;

                    // console.log(data.first_name);
                    this.fName = data.first_name;
                    this.lName = data.last_name;
                    this.phone = data.phone;

                    this.address = data.address;
                    this.city = data.city;
                    this.region = data.region;

                    this.description = data.description;
                    // console.log(data);
                })
                .catch((error) => {
                    // Handle any errors that occur during the promise execution
                    console.log(error);
                    this.FBQuotaReached = true;
                });
        },
        onFileChange(event) {
            if (event.target.files.length > 0) {
                this.imageFile = event.target.files[0];
                this.imageSrc = URL.createObjectURL(this.imageFile);
            }
        },
        submitForm() {
            // If there are no errors, submit the form
            if (this.isEverythingValid()) {
                this.firebaseUpdate();
            } else {
                this.showToastError(this.firstError);
            }
        },
        isEverythingValid() {
            // Validate form fields
            this.firstError = "";

            if (!this.fName) {
                this.firstError = "Please enter your first name.";
                return false;
            }

            if (!this.lName) {
                this.firstError = "Please enter your last name.";
                return false;
            }

            if (!this.phone) {
                this.firstError = "Please enter your phone number.";
                return false;
            } else if (!this.isValidPhone(this.phone)) {
                this.firstError = "Not a valid phone number";
                return false;
            }

            if (!this.address) {
                this.firstError = "Please enter your address.";
                return false;
            }

            if (!this.city) {
                this.firstError = "Please enter your city.";
                return false;
            }

            if (!this.region) {
                this.firstError = "Please enter your region.";
                return false;
            }

            if (!this.description) {
                this.firstError = "Please enter your description.";
                return false;
            }

            return true;
        },
        isValidPhone(phone) {
            // Phone validation logic
            phone = phone.replaceAll(" ", "");

            return /^\d{8}$/.test(phone);
        },

        async firebaseUpdate() {
            // Upload image
            let hasError = false;

            // If no change in image -> do nothing DUH
            if (this.imageFile) {
                hasError = await FBInstanceStorage.uploadImage(
                    "users",
                    this.userID,
                    this.imageFile
                );
            }

            if (hasError) {
                this.firebaseErrorMsg = "Please try again later.";
            } else {
                // Get uploaded image URL
                const url = await FBInstanceStorage.getImageUrl(
                    "users",
                    this.userID
                );

                // If there is no URL - Error
                if (!url) {
                    this.firebaseErrorMsg = "Please try again later.";
                } else {
                    // Firebase Update User
                    let errorCode = await FBInstanceFirestore.updateAccount(
                        url,
                        this.userID,
                        this.email,

                        this.fName,
                        this.lName,

                        this.phone,
                        this.address,
                        this.city,
                        this.region,

                        this.description
                    );
                    // console.log(errorCode);
                    switch (errorCode) {
                        default:
                            this.firebaseErrorMsg = errorCode;
                    }
                }
                // console.log(url);
            }

            // Debugging
            // await FBInstanceStorage.listImages();

            if (this.firebaseErrorMsg) {
                this.showToastError(this.firebaseErrorMsg);
            } else {
                this.showToastSuccess();
                // Re-render data
                document.getElementById("Img-file").value = "";
            }
        },
        toCancel() {
            router.go(-1);
        },
        showToastError(detail) {
            this.$toast.add({
                severity: "error",
                summary: "Account Update Failed",
                detail,
                life: 3000,
            });
        },
        showToastSuccess() {
            this.$toast.add({
                severity: "success",
                summary: "Account Update Successful!",
                life: 3000,
            });
        },
    },
    created() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },
    mounted() {
        setTimeout(() => {
            if (!userStore.getUserID()) {
                router.push("/login");
            } else {
                setTimeout(async () => {
                    await this.getAccountData();
                    if (this.FBQuotaReached) {
                        this.$toast.add({
                            severity: "error",
                            summary: "Database Quota Reached",
                            detail: "Database Quota will reset at SGT 3pm.",
                            life: 15000,
                        });
                    } else {
                        this.isLoading = false;
                    }
                }, 1000);
            }
        }, 500);
    },
};
</script>

<template>
    <div id="Profile" class="container">
        <div
            class="border border-3 mx-auto my-5 px-5 py-4 d-flex flex-column gap-4 shadow"
        >
            <!-- Profile Image START -->
            <div class="row d-flex align-items-center">
                <Image
                    class="profile-Img-Container col-12 col-md-4 img-thumbnail p-2"
                    alt="Image"
                    preview
                >
                    <template #indicatoricon>
                        <i class="pi pi-search-plus"></i>
                    </template>
                    <template #image>
                        <Skeleton
                            v-if="isLoading"
                            class="w-100"
                            size="10rem"
                        ></Skeleton>
                        <img
                            v-show="!isLoading"
                            style="width: 100%; aspect-ratio: 1 / 1"
                            :src="imageSrc"
                            alt="image"
                        />
                    </template>
                    <template #preview="slotProps">
                        <img
                            style="
                                height: 80vh;
                                width: 100%;
                                aspect-ratio: 1 / 1;
                            "
                            :src="imageSrc"
                            alt="preview"
                            :style="slotProps.style"
                            @click="slotProps.onClick"
                        />
                    </template>
                </Image>
                <input
                    id="Img-file"
                    class="col-8 col-md"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    @change="onFileChange($event)"
                />
            </div>
            <!-- Profile Image END -->

            <!-- Skeleton START -->
            <div v-if="isLoading" class="row d-flex gap-3">
                <Skeleton class="w-100" height="2rem"></Skeleton>
                <Skeleton class="w-100" height="2rem"></Skeleton>
                <Skeleton class="w-100" height="2rem"></Skeleton>
                <Skeleton class="w-100" height="15rem"></Skeleton>
            </div>
            <!-- Skeleton END -->

            <!-- First Name, Last Name, Phone START -->
            <div v-if="!isLoading" class="row d-flex gap-3">
                <input
                    id="First-Name"
                    class="col-12 col-md-4 py-1"
                    type="text"
                    placeholder="First Name"
                    v-model="fName"
                />
                <input
                    id="Last-Name"
                    class="col-12 col-md-4 py-1"
                    type="text"
                    placeholder="Last Name"
                    v-model="lName"
                />
                <InputMask
                    id="phone"
                    class="col-12 col-md py-1 border-black"
                    placeholder="Phone"
                    date="phone"
                    mask="9999 9999"
                    v-model="phone"
                />
            </div>
            <!-- First Name, Last Name, Phone END -->

            <!-- Address, City, Region START -->
            <div v-if="!isLoading" class="row d-flex gap-3">
                <input
                    id="Address"
                    class="col-12 col-md-4 py-1"
                    type="text"
                    placeholder="Address"
                    v-model="address"
                />
                <input
                    id="City"
                    class="col-12 col-md-4 py-1"
                    type="text"
                    placeholder="City"
                    v-model="city"
                />
                <input
                    id="Region"
                    class="col-12 col-md py-1"
                    type="text"
                    placeholder="Region"
                    v-model="region"
                />
            </div>
            <!-- Address, City, Region END -->

            <!-- Description START -->
            <div v-if="!isLoading" class="row">
                <Textarea
                    v-model="description"
                    placeholder="Description"
                    autoResize
                    rows="5"
                    cols="30"
                />
            </div>
            <!-- Description END -->

            <!-- Update Button -->
            <div class="d-flex justify-content-center gap-3">
                <button class="btn btn-dark" @click="submitForm()">
                    Update
                </button>
                <button class="btn btn-dark" @click="toCancel()">Cancel</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
#Profile-Top {
    width: 75%;
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .profile-Img-Container {
        max-height: 300px;
        max-width: 300px;
    }
}
button {
    width: 200px;
    padding: 7px 5px;
}

#phone {
    border-radius: 3px;
}
#phone:focus {
    outline: none;
    box-shadow: 0px 0px 2px black;
    border: 1.5px solid black;
}
</style>
