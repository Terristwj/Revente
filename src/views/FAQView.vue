<script>
import router from "../router/router.js";
export default {
    // data() {},
    methods: {
        toRegistration() {
            router.push("/register");
        },
        scrollToChatBot() {
            const content5 = document.getElementById("chat");
            content5.scrollIntoView({ behavior: "smooth" });
        },
    },
};
</script>


<template>
    <div id="faq">
        <Card>
            <template #title> Frequently Asked Questions </template>
            <template #content>
                <Accordion>
                    <AccordionTab header="My Account">
                        <Accordion>
                            <AccordionTab header="How do I create an account?">
                                <p>
                                    If you do not have an account. Please
                                    click
                                    <a href="#" @click="toRegistration()">here</a>
                                    to sign up!
                                </p>
                            </AccordionTab>
                            <AccordionTab header="I cant access my account. What can I do?">
                                <p>
                                    Please check that the email and password you have entered are correct. If you don't
                                    remember your password, you can reset it by selecting the Forgot your password? option
                                    For any other issue that does not allow you to access your account, please contact us so
                                    we can help you.
                                </p>
                            </AccordionTab>
                        </Accordion>
                    </AccordionTab>
                    <AccordionTab header="Shopping">
                        <Accordion>
                            <AccordionTab header="Do I need an account to purchase with Reventé">
                                <p>
                                    Yes, you will need to register for a Reventé
                                    account to start shopping with us. Please
                                    click
                                    <a href="#" @click="toRegistration()">here</a>
                                    to sign up!
                                </p>
                            </AccordionTab>
                            <AccordionTab
                                header="Does Reventé only sell secondhand goods? How clean and are the products defective.">
                                <p>
                                    Reventé offers a curated selection of both secondhand and sustainable fashion items. Our
                                    commitment to sustainability extends beyond just pre-owned clothing. We take great care
                                    to ensure that all our products are thoroughly inspected and cleaned to meet high
                                    quality and hygiene standards. We work diligently to eliminate any defects or
                                    imperfections, providing you with stylish, high-quality, and eco-conscious fashion
                                    choices. Your satisfaction and our planet's well-being are our top priorities.
                                </p>
                            </AccordionTab>
                            <AccordionTab header="I'm unsure about the size or fit. What should I do?">
                                <p>
                                    We know this may get a little tricky. Please
                                    refer to our given measurements stated on
                                    each individual product page. If you have
                                    any further queries about sizing, please
                                    chat with
                                    <button id="button_claire" @click="scrollToChatBot()">Claire</button>,
                                    your personal Assistant!!


                                </p>
                            </AccordionTab>
                            <AccordionTab header="What is my size and how do I compare it with the measurements given?">
                                <p>
                                    You may not know your exact sizing for clothes however we do not provide any means to
                                    check your sizing. Please use a measuring tape to measure your body and compare it with
                                    the measurements given on each individual product page. Thank you!

                                </p>
                            </AccordionTab>
                            <AccordionTab header="Does Reventé have a retail store?">
                                <p>
                                    Unfortunately no. As we are an imaginative
                                    company, we do not actually exist. However,
                                    do try out Reventé Website to experience our
                                    array of features!
                                </p>
                            </AccordionTab>
                        </Accordion>
                    </AccordionTab>
                    <AccordionTab header="Sellers">
                        <Accordion>
                            <AccordionTab header="How do I list my order?">
                                <p>
                                    You will have to fill out a form and send our admins a request. Once approved please
                                    make your way down to any of our outlets to drop off your items and we will do the rest!
                                </p>
                            </AccordionTab>
                            <AccordionTab header="Can I get back my item after I send it off to your outlets?">
                                <p>
                                    Unfortunately no. As part of our company policy, we do not allow any returns of items
                                    that has been dropped off as we will be doing the necessary to sell your items.
                                </p>
                            </AccordionTab>
                            <AccordionTab header="When will I get paid based on the amount we agreed on">
                                <p>
                                    You will be paid in 3-5 working days after your item has been dropped off at our
                                    outlets.
                                </p>
                            </AccordionTab>
                        </Accordion>
                    </AccordionTab>
                    <AccordionTab header="Order & Payment">
                        <Accordion>
                            <AccordionTab header="How do I pay for my order?">
                                <p>
                                    We accept payment via all Visa, Mastercard,
                                    and American Express debit or credit cards.
                                </p>
                            </AccordionTab>
                            <AccordionTab header="How long does it take for order confirmation after I've made payment?">
                                <p>
                                    Your order will be confirmed immediately. An
                                    order confirmation email will be sent to
                                    your inbox.
                                </p>
                            </AccordionTab>
                            <AccordionTab header="Can I make any changes to my order after confirmation?">
                                <p>
                                    We are sorry that we are unable to make any
                                    changes once your order has been confirmed
                                    in order to process your order efficiently.
                                </p>
                            </AccordionTab>
                        </Accordion>
                    </AccordionTab>
                    <AccordionTab header="Returns & Exchanges">
                        <Accordion>
                            <AccordionTab header="Do you accept returns?">
                                <p>
                                    At the moment, we do not accept returns and
                                    purchases are final.
                                </p>
                            </AccordionTab>
                            <AccordionTab header="Do you accept size exchanges?">
                                <p>
                                    Size exchanges are not available for orders
                                    placed online.
                                </p>
                            </AccordionTab>
                        </Accordion>
                    </AccordionTab>
                </Accordion>
            </template>
        </Card>
    </div>

    <div id="faq">
        <Card>
            <template #title> Claire: Your personal AI Assistant </template>
            <template #content>
                <div id="chat">
                    <Accordion>
                        <AccordionTab header="Ask me anything">
                            <iframe allow="microphone;"
                                src="https://console.dialogflow.com/api-client/demo/embedded/ae2dede1-2cfa-4ba7-8458-062aaf47c01b"
                                class="chatbot"></iframe>
                        </AccordionTab>
                    </Accordion>

                </div>

            </template>
        </Card>
    </div>
</template>

<style scoped>
#faq {
    margin: auto;
    max-width: 1200px;
}

/* X-Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
    #faq {
        margin: 5% auto;
        max-width: 1200px;
    }
}

.chatbot {
    /* z-index: -1; */
    border: none;
    overflow: hidden;
    margin: auto;
    display: block;
    width: 100%;
    height: 75dvh;
}

#button_claire {
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: blue;
    padding: 0;
}

#button_claire:hover {
    color: red;
}</style>
