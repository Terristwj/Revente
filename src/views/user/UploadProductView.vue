<script>
import router from "../../router/router.js";
import { userStore } from "../../main.js";
import FBInstanceFirestore from "../../services/Firebase/FirestoreDatabase.js";
import FBInstanceStorage from "../../services/Firebase/FirebaseStorage.js";
import BackendOpenAI from "../../services/Backend/OpenAI.js";
import GoogleMap from "../../components/GoogleMap.vue";

import confetti from "canvas-confetti";

export default {
    components: {
        GoogleMap,
    },
    data() {
        return {
            // Item Image
            imageSrc: "",
            imageFile: "",

            // Gender
            gender: "",
            genderOptions: ["Male", "Female", "Unisex"],

            // Category
            category: "",
            categories: [
                { name: "Top" },
                { name: "Bottom" },
                { name: "Dress" },
            ],

            // Condition
            condition: "",
            conditions: [
                { name: "Brand New" },
                { name: "Lightly Used" },
                { name: "Well Used" },
                { name: "Heavily Used" },
            ],
            conditionNotes: "",

            // Item Information
            itemName: "",
            itemBrand: "",
            itemDescription: "",

            // Others
            dropOffLocation: "",
            price: 0.0,

            // Code-related
            isLoading: false,
            isAIGenerating: false,
            isListing: false,
            firstError: "",
            isSuccessful: false,
        };
    },
    methods: {
        onFileChange(event) {
            if (event.target.files.length > 0) {
                this.imageFile = event.target.files[0];
                this.imageSrc = URL.createObjectURL(this.imageFile);

                const uploadBox = document.getElementById("upload_box");
                if (uploadBox.style.opacity != 1) uploadBox.style.opacity = 1;
            }
        },
        submitForm() {
            this.toggleLoadingUI();
            this.isListing = true;

            // If there are no errors, submit the form
            this.doSubmitForm();
        },
        // Disable 'List Now' and 'AI' when isLoading
        toggleLoadingUI() {
            let listNowBtn = document.getElementById("List-Now-Btn");
            let AIBtn = document.getElementById("AI-Button");

            this.isLoading = !this.isLoading;
            if (this.isLoading) {
                listNowBtn.disabled = true;
                AIBtn.disabled = true;
            } else {
                listNowBtn.disabled = false;
                AIBtn.disabled = false;
            }
        },
        async doSubmitForm() {
            if (this.isEverythingValid()) {
                setTimeout(async () => {
                    await this.firebaseAddItem();
                    this.toggleLoadingUI();
                    this.isListing = false;
                }, 2000);
            } else {
                this.showToastError(this.firstError);
                this.toggleLoadingUI();
                this.isListing = false;
            }
        },
        isEverythingValid() {
            // Validate form fields
            this.firstError = "";

            if (!this.imageFile) {
                this.firstError = "Please provide an item photo.";
                return false;
            }

            if (!this.gender) {
                this.firstError = "Please select the item's gender.";
                return false;
            }

            if (!this.category) {
                this.firstError = "Please tell us the category.";
                return false;
            } else if (!this.categories.includes(this.category)) {
                this.firstError = "Please select a proper category.";
                return false;
            }

            if (!this.condition) {
                this.firstError = "Please tell us the condition.";
                return false;
            } else if (!this.conditions.includes(this.condition)) {
                this.firstError = "Please select a proper category.";
                return false;
            }

            if (!this.conditionNotes) {
                this.firstError = "Please tell us more about the condition.";
                return false;
            }

            if (!this.itemName) {
                this.firstError = "What is the item's name?";
                return false;
            }

            if (!this.itemBrand) {
                this.itemBrand = "unbranded";
            }

            if (!this.itemDescription) {
                this.firstError = "Tell us more about this item.";
                return false;
            }

            if (!this.dropOffLocation) {
                this.firstError = "Where do you intend to deliver the item?";
                return false;
            }

            if (this.price == 0) {
                this.firstError = "Please enter a price.";
                return false;
            }

            return true;
        },
        async firebaseAddItem() {
            let hasError = false;

            // (1) Add doc into Firestore
            let category = this.category.name;
            let condition = this.condition.name;

            // (2) Retrieve the product_ID of add_doc
            const productID = await FBInstanceFirestore.createProduct(
                // Seller
                userStore.getUserID(),

                // Product Details
                this.itemName,
                this.itemBrand,
                this.itemDescription,

                // Category
                this.gender,
                category,

                // Condition
                condition,
                this.conditionNotes,

                // Others
                this.dropOffLocation,
                this.price
            );

            // (3) Upload item_image_file into Storage using product_ID
            // Upload image
            hasError = await FBInstanceStorage.uploadImage(
                "products",
                productID,
                this.imageFile
            );

            if (hasError) {
                this.firstError = "Please try again later.";
            } else {
                //
                // (4) Retrieve item_image_src from Storage
                //
                const url = await FBInstanceStorage.getImageUrl(
                    "products",
                    productID
                );

                //
                // (5) Set doc item_image_src into Firestore
                //
                // If there is no URL - Error
                if (!url) {
                    this.firstError = "Please try again later.";
                } else {
                    // Firebase Update User
                    let errorCode =
                        await FBInstanceFirestore.updateProductImageSrc(
                            // Document Key
                            productID,

                            // Image URL (Data to be Added)
                            url
                        );
                    // console.log(errorCode);
                    switch (errorCode) {
                        default:
                            this.firstError = errorCode;
                    }
                }
                // console.log(url);
            }

            // Debugging
            // await FBInstanceStorage.listImages();

            if (this.firstError) {
                this.showToastError(this.firstError);
            } else {
                confetti({
                    particleCount: 2000,
                    spread: 600,
                });
                this.showToastSuccess();
                this.isSuccessful = true;
                // Re-render data
                document.getElementById("file-upload").value = "";
            }
        },
        showToastError(detail) {
            this.$toast.add({
                severity: "error",
                summary: "Listing Failed",
                detail,
                life: 3000,
            });
        },
        showToastSuccess() {
            this.$toast.add({
                severity: "success",
                summary: "Your Listing was Successfully created!",
                life: 3000,
            });
        },
        clearPage() {
            // Item Image
            this.imageSrc = "";
            this.imageFile = "";

            // Gender
            this.gender = "";

            // Category
            this.category = "";

            // Condition
            this.condition = "";
            this.conditionNotes = "";

            // Item Information
            this.itemName = "";
            this.itemBrand = "";
            this.itemDescription = "";

            // Others
            this.dropOffLocation = "";
            this.address = "";
            this.price = 0.0;

            // Code-related
            this.isSuccessful = false;

            // Scroll to top
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        toCancel() {
            this.$router.push("/profile");
        },
        updateDropOff(loc) {
            this.dropOffLocation = loc;
            // console.log(loc);
        },
        async generateDescription() {
            this.toggleLoadingUI();
            this.isAIGenerating = true;

            let prompt = "Help me generate a description for a clothing ware.";
            prompt +=
                "Here are some additional information about the item, if any:";

            if (this.gender) prompt += `It is meant for ${this.gender}`;
            if (this.category) prompt += `It is a ${this.category}`;
            if (this.condition) prompt += `It is ${this.condition}`;
            if (this.conditionNotes)
                prompt += `Additional notes on its condition are: ${this.conditionNotes}`;
            if (this.itemName) prompt += `It is called ${this.itemName}`;
            if (this.itemBrand)
                prompt += `It's brand is from ${this.itemBrand}`;

            await BackendOpenAI.generatePrompt(prompt).then((res) => {
                // console.log(res.data);
                this.itemDescription = res.data.response;
            });

            this.toggleLoadingUI();
            this.isAIGenerating = false;
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
            }
        }, 1500);
    },
};
</script>

<template>
    <!-- Content START -->
    <div class="container-fluid mt-4 mb-5">
        <!-- Content Row 1 START -->
        <div class="row gap-3 justify-content-around mx-lg-2">
            <!-- Upload Box START -->
            <div
                style="height: 500px"
                class="col-11 col-md-6 col-xl-5 shadow p-3 bg-white rounded d-flex justify-content-center"
            >
                <label
                    id="upload_box"
                    class="d-flex justify-content-center text-center w-100 h-100 align-items-center"
                    for="file-upload"
                >
                    <!-- When Image is PROVIDED START -->
                    <div v-if="imageSrc" class="w-100 h-100">
                        <Image class="w-100 h-100" alt="Image" preview>
                            <!-- Image Hover START -->
                            <template #indicatoricon>
                                <div class="row d-flex gap-2">
                                    <i
                                        class="col pi pi-search-plus"
                                        style="font-size: 2rem"
                                    ></i>
                                    <i
                                        class="col pi pi-upload"
                                        style="font-size: 2rem"
                                    ></i>
                                </div>
                            </template>
                            <!-- Image Hover END -->

                            <!-- Image START -->
                            <template #image>
                                <img
                                    style="
                                        height: 100%;
                                        width: 100%;
                                        aspect-ratio: 1 / 1;
                                    "
                                    :src="imageSrc"
                                    alt="preview"
                                />
                            </template>
                            <!-- Image END -->

                            <!-- Preview START -->
                            <template #preview="slotProps">
                                <label
                                    for="file-upload"
                                    class="pointing position-relative"
                                    :style="slotProps.style"
                                    @click="slotProps.onClick"
                                >
                                    <!-- Zoomed Image Displayed -->
                                    <img
                                        style="
                                            height: 80vh;
                                            width: 100%;
                                            aspect-ratio: 1 / 1;
                                        "
                                        id="Item-Image"
                                        :src="imageSrc"
                                        alt="preview"
                                    />

                                    <!-- Image Overlay -->
                                    <div
                                        id="Item-Image-Overlay"
                                        class="w-100 h-100 position-absolute top-0 start-0 opacity bg-black d-flex justify-content-center align-items-center"
                                    >
                                        <i
                                            class="pi pi-upload text-white mb-3"
                                            style="font-size: 3rem"
                                        ></i>
                                    </div>
                                </label>
                            </template>
                            <!-- Preview END -->
                        </Image>
                    </div>
                    <!-- When Image is PROVIDED END -->

                    <!-- Upload Icon START -->
                    <div v-else>
                        <font-awesome-icon
                            :icon="['fas', 'upload']"
                            size="2xl"
                        />
                        <p class="button">Upload a Photo</p>
                    </div>
                    <!-- Upload Icon END -->

                    <!-- Upload Control Start -->
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        @change="onFileChange($event)"
                    />
                    <!-- Upload Control END -->
                </label>
            </div>
            <!-- Upload Box END -->

            <!-- Right of Row 1 START -->
            <div
                class="row flex-column gap-3 mx-md-0 px-4 px-md-0 col-12 col-md-5 col-xl-6 mb-5"
            >
                <!-- Categories START -->
                <div
                    class="col-12 shadow px-3 pt-3 pb-4 bg-white rounded categories"
                >
                    <h5 class="bold">Gender & Category</h5>
                    <div>
                        <SelectButton
                            v-model="gender"
                            :options="genderOptions"
                            aria-labelledby="basic"
                            :pt="{
                                button: ({ context }) => ({
                                    class: context.active
                                        ? 'bg-black'
                                        : undefined,
                                }),
                            }"
                        />
                        <div class="card flex justify-content-center">
                            <Dropdown
                                class="w-full md:w-14rem"
                                v-model="category"
                                :options="categories"
                                optionLabel="name"
                                placeholder="Select a Category"
                                editable
                                showClear
                                :pt="{
                                    list: { class: 'p-0' },
                                }"
                            />
                        </div>
                    </div>
                </div>
                <!-- Categories END -->

                <!-- Condition START -->
                <div class="col-12 shadow px-3 pt-3 pb-4 bg-white rounded">
                    <h5 class="bold">Condition</h5>
                    <div class="card flex justify-content-center">
                        <Dropdown
                            class="w-full md:w-14rem"
                            v-model="condition"
                            :options="conditions"
                            optionLabel="name"
                            placeholder="Condition"
                            editable
                            showClear
                            :pt="{
                                list: { class: 'p-0' },
                            }"
                        />
                    </div>
                    <h5 class="bold mt-3">Condition Note</h5>
                    <Textarea
                        class="form-control"
                        v-model="conditionNotes"
                        autoResize
                        rows="5"
                        cols="30"
                        placeholder="Fresh and new with a fragrant scent."
                    ></Textarea>
                </div>
                <!-- Condition END -->
            </div>
            <!-- Right of Row 1 END -->
        </div>
        <!-- Content Row 1 END -->

        <!-- Content Row 2 START -->
        <div class="row gap-3 justify-content-around mx-lg-2">
            <!-- Left of Row 2 START -->
            <div
                class="row flex-column gap-3 mx-md-0 px-4 px-md-0 col-12 col-md-6 col-xl-5"
            >
                <!-- Drop-off Location -->
                <div class="col-12 shadow p-3 bg-white rounded">
                    <h5 class="bold">Drop-off Location</h5>
                    <div class="pt-4">
                        <span class="p-float-label">
                            <InputText
                                id="Drop-Off-Location"
                                class="form-control"
                                v-model="dropOffLocation"
                                readonly
                                disabled
                            />
                            <label for="Warehouse-Location"
                                >Select from the map</label
                            >
                        </span>
                    </div>
                    <div class="pt-3">
                        <GoogleMap @drop-off="updateDropOff" />
                    </div>
                </div>
            </div>
            <!-- Left of Row 2 END -->

            <!-- Right of Row 2 START -->
            <div
                class="row flex-column gap-4 mx-md-0 px-4 px-md-0 col-12 col-md-5 col-xl-6"
            >
                <!-- Item-details START -->
                <div class="col-12 shadow p-3 pb-4 bg-white rounded">
                    <h5 class="bold">Item Information</h5>
                    <div class="pt-3">
                        <span class="p-float-label">
                            <InputText
                                id="Item-Name"
                                class="form-control"
                                v-model="itemName"
                            />
                            <label for="Item-Name">Item Name</label>
                        </span>
                    </div>
                    <div class="pt-4">
                        <span class="p-float-label">
                            <InputText
                                id="Item-Brand"
                                class="form-control"
                                v-model="itemBrand"
                            />
                            <label for="Item-Brand">Brand (Optional)</label>
                        </span>
                    </div>
                    <div class="d-flex gap-3">
                        <h5 class="bold mt-3">Description</h5>
                        <Button
                            id="AI-Button"
                            class="btn-danger my-2 py-0 rounded-2"
                            severity="help"
                            icon-pos="right"
                            size="small"
                            :pt="{
                                icon: {
                                    class: 'm-0',
                                },
                            }"
                            @click="generateDescription()"
                        >
                            <span class="fw-bold">AI</span>
                            <span class="pi pi-bolt"></span>

                            <div class="pt-1" v-if="isAIGenerating">
                                &nbsp;
                                <ProgressSpinner
                                    style="width: 15px; height: 100%"
                                    strokeWidth="8"
                                    animationDuration=".5s"
                                    aria-label="Custom ProgressSpinner"
                                    :pt="{
                                        circle: {
                                            style: {
                                                stroke: 'white',
                                                animation: 'none',
                                            },
                                        },
                                    }"
                                />
                            </div>
                        </Button>
                    </div>
                    <Textarea
                        class="form-control"
                        v-model="itemDescription"
                        autoResize
                        rows="5"
                        cols="30"
                        placeholder="A fabulous product with wonderful perks."
                    ></Textarea>
                </div>
                <!-- Item-details END -->

                <!-- Price START -->
                <div class="col-12 shadow p-3 pb-4 bg-white rounded">
                    <h5 class="bold">Price</h5>
                    <InputNumber
                        id="Price"
                        class="w-100"
                        v-model="price"
                        mode="decimal"
                        prefix="S$"
                        :minFractionDigits="2"
                        :maxFractionDigits="2"
                        :min="0"
                    />
                </div>
                <!-- Price END -->

                <!-- List Now Start -->
                <div class="row mx-0 px-0">
                    <button
                        type="button"
                        id="List-Now-Btn"
                        class="btn btn-dark py-2"
                        @click="submitForm()"
                    >
                        <ProgressSpinner
                            v-if="isListing"
                            style="
                                width: 15px;
                                height: 100%;
                                margin-bottom: -5px;
                            "
                            strokeWidth="8"
                            animationDuration=".5s"
                            aria-label="Custom ProgressSpinner"
                            :pt="{
                                circle: {
                                    style: {
                                        stroke: 'white',
                                        animation: 'none',
                                    },
                                },
                            }"
                        />
                        List Now
                    </button>
                </div>
                <!-- List Now END -->
            </div>
            <!-- Right of Row 2 END -->
        </div>
        <!-- Content Row 2 END -->
    </div>
    <!-- Content END -->

    <!-- Successful Followup -->
    <Dialog
        v-model:visible="isSuccessful"
        class="text-black"
        style="width: 80vw; max-width: 800px"
        :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
        modal
        :closable="false"
    >
        <template #header>
            <h5>
                <span class="bg-black text-white py-1 px-2 fw-bold">{{
                    itemName
                }}</span>
                &nbsp;is successfully listed!
            </h5>
        </template>

        <template #default>
            <h4 class="text-black fw-bold">What's Next?</h4>
            <p>
                Although your item has been listed,
                <mark><b>it has yet to be approved!</b></mark>
                <br />
                Come on down to our physical warehouse to deliver your items
                there.
            </p>
            <p>
                Once approved, your listed item will be displayed on our product
                catalogue for everyone to see!
            </p>
            <p>
                Do remember to check by from time-to-time on your listed items.
            </p>
            <div
                class="row d-flex justify-content-center gap-2 mt-4 w-100 mx-auto"
            >
                <button
                    class="col-12 col-sm btn btn-dark py-2"
                    style="max-width: 400px"
                    @click="clearPage()"
                >
                    Make New Listing
                </button>
                <button
                    class="col-12 col-sm btn btn-dark py-2"
                    style="max-width: 400px"
                    @click="toCancel()"
                >
                    Back To Profile
                </button>
            </div>
        </template>
    </Dialog>
</template>

<style scoped>
#Item-Image-Overlay {
    opacity: 0;
}

#Item-Image-Overlay:hover {
    opacity: 0.8;
}

input[type="file"] {
    display: none;
}

#upload_box {
    border: 1.5px dashed #000000;
    display: inline-block;
    cursor: pointer;
    background-color: rgba(180, 180, 180, 0.5);
    opacity: 0.9;
}

.button {
    border: 1px solid #000000;
    padding: 1rem 2rem;
    margin-top: 0.5rem;
    border-radius: 10px;
    color: white;
    background-color: black;
}
</style>
