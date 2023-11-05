<script setup>
import { ref } from "vue";
import Dialog from "primevue/dialog";
const visible = ref(false);
</script>

<script>
export default {
    name: "TermsAndConditions",
    created() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },
};
</script>

<template>
    <div class="terms-and-conditions">
        <h1 class="page-title">Terms and Conditions</h1>
        <p class="intro">
            Welcome to Revente, where style meets sustainability! These terms
            and conditions outline the rules and regulations for the use of
            Revente's Website.
        </p>

        <h2 class="section-title">1. Introduction</h2>
        <p>
            By accessing this website, we assume you accept these terms and
            conditions. Do not continue to use Revente if you do not agree to
            take all of the terms and conditions stated on this page.
        </p>

        <h2 class="section-title">2. Sustainability</h2>
        <p>
            At Revente, we are committed to sustainability. We promote the
            resale and reuse of thrifted goods as a way to reduce waste and
            minimize our environmental impact. By using our platform, you
            endorse our mission to protect the planet.
        </p>

        <h2 class="section-title">3. User Responsibilities</h2>
        <p>
            Users are responsible for maintaining the confidentiality of their
            account and password. We prohibit sharing your account information
            with others.
        </p>

        <h2 class="section-title">4. Products</h2>
        <p>
            Our products are curated with sustainability in mind. We aim to
            provide you with high-quality thrifted items and accurate
            descriptions. If you have any concerns, please contact our support
            team.
        </p>

        <h2 class="section-title">5. Privacy</h2>
        <p>
            Protecting your privacy is important to us. We have a detailed
            <button @click="visible = true">Privacy Policy</button> that
            outlines how we collect, use, and safeguard your information.
        </p>
        <Dialog
            v-model:visible="visible"
            modal
            header="Privacy Policy"
            :style="{ width: '50vw' }"
            :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
        >
            <p class="mb-4">
                <strong class="d-block my-2">Privacy Policy</strong>
                Last updated: [26/10/2023 18:38:00] Revente ("us," "we," or
                "our") operates the [Website Name] website (the "Service"). This
                page informs you of our policies regarding the collection, use,
                and disclosure of Personal Information we receive from users of
                the Service. We use your Personal Information only for providing
                and improving the Service. By using the Service, you agree to
                the collection and use of information in accordance with this
                policy.
            </p>

            <p class="mb-4">
                <strong class="d-block my-2">
                    Information Collection and Use</strong
                >
                While using our Service, we may ask you to provide us with
                certain personally identifiable information that can be used to
                contact or identify you. Personally identifiable information may
                include, but is not limited to, your name, email address, postal
                address, and phone number ("Personal Information").
            </p>

            <p class="mb-4">
                <strong class="d-block my-2">Log Data</strong>

                We collect information that your browser sends whenever you
                visit our Service ("Log Data"). This Log Data may include
                information such as your computer's Internet Protocol ("IP")
                address, browser type, browser version, the pages of our Service
                that you visit, the time and date of your visit, the time spent
                on those pages, and other statistics.
            </p>
            <p class="mb-4">
                <strong class="d-block my-2">Cookies</strong>

                Cookies are files with a small amount of data, which may include
                an anonymous unique identifier. Cookies are sent to your browser
                from a website and stored on your computer's hard drive. We use
                "cookies" to collect information. You can instruct your browser
                to refuse all cookies or to indicate when a cookie is being
                sent. However, if you do not accept cookies, you may not be able
                to use some portions of our Service.
            </p>
            <p class="mb-4">
                <strong class="d-block my-2">Service Providers</strong>

                We may employ third-party companies and individuals to
                facilitate our Service, to provide the Service on our behalf, to
                perform Service-related services, or to assist us in analyzing
                how our Service is used.
            </p>
            <p class="mb-4">
                <strong class="d-block my-2">Security</strong>
                The security of your Personal Information is important to us,
                but remember that no method of transmission over the Internet,
                or method of electronic storage, is 100% secure. While we strive
                to use commercially acceptable means to protect your Personal
                Information, we cannot guarantee its absolute security.
            </p>
            <p class="mb-4">
                <strong class="d-block my-2"
                    >Changes to This Privacy Policy</strong
                >

                This Privacy Policy is effective as of [26/10/2023 18:38:00] and
                will remain in effect except with respect to any changes in its
                provisions in the future, which will be in effect immediately
                after being posted on this page. We reserve the right to update
                or change our Privacy Policy at any time, and you should check
                this Privacy Policy periodically. Your continued use of the
                Service after we post any modifications to the Privacy Policy on
                this page will constitute your acknowledgment of the
                modifications and your consent to abide and be bound by the
                modified Privacy Policy.
            </p>
            <p class="mb-4">
                <strong class="d-block my-2">Contact Us</strong>
                If you have any questions about this Privacy Policy, please
                contact us via email at [info@revente.com].
            </p>
        </Dialog>

        <h2 class="section-title">6. User Content</h2>
        <p>
            Users can post content on our platform. Be responsible and
            respectful when creating and sharing content. We have the right to
            remove any content that violates our guidelines.
        </p>

        <h2 class="section-title">7. Governing Law</h2>
        <p>
            These terms are governed by and construed in accordance with the
            laws of your country.
        </p>

        <h2 class="section-title">8. Contact Information</h2>
        <p>
            If you have any questions or concerns about these terms and
            conditions, please contact us at info@revente.com.
        </p>
    </div>
</template>

<style scoped>
button {
    background-color: transparent;
    border: none;
    color: #007bff;
    cursor: pointer;
    padding: 0;
}
.terms-and-conditions {
    max-width: 1000px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.page-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
}

.intro {
    font-size: 16px;
    color: #555;
}

.section-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-top: 20px;
}

a {
    color: #007bff;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
