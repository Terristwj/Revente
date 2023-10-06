<script>
export default {
    data() {},
    mounted() {},
    methods: {},
};
</script>

<template>
    <div class="faq">
        <div class="card">
            <Card>
                <template #title> Frequently Asked Questions </template>
                <template #content
                    ><Accordion>
                        <AccordionTab header="Shopping">
                            <Accordion>
                                <AccordionTab
                                    header="Do I need an account to purchase with Reventé"
                                >
                                    <p>
                                        Yes, you will need to register for a
                                        Reventé account to start shopping with
                                        us. Please click
                                        <a href="#">here</a> to sign up!
                                    </p>
                                </AccordionTab>
                                <AccordionTab
                                    header="I'm unsure about the size or fit. What should I do?"
                                >
                                    <p>
                                        We know this may get a little tricky.
                                        Please refer to our given measurements
                                        stated on each individual product page.
                                        If you have any further queries about
                                        sizing, please chat with
                                        <a href="#">Claire</a>.
                                    </p>
                                </AccordionTab>
                                <AccordionTab
                                    header="Does Reventé have a retail store?"
                                >
                                    <p>
                                        unfortunately no. As we are an
                                        imaginative company, we do not actually
                                        exist. However, do try out Reventé
                                        Website to experience our array of
                                        features!
                                    </p>
                                </AccordionTab>
                            </Accordion>
                        </AccordionTab>
                        <AccordionTab header="Order & Payment">
                            <Accordion>
                                <AccordionTab
                                    header="How do I pay for my order?"
                                >
                                    <p>
                                        We accept payment via all Visa,
                                        Mastercard, and American Express debit
                                        or credit cards.
                                    </p>
                                </AccordionTab>
                                <AccordionTab
                                    header="How long does it take for order confirmation after I've made payment?"
                                >
                                    <p>
                                        Your order will be confirmed
                                        immediately. An order confirmation email
                                        will be sent to your inbox.
                                    </p>
                                </AccordionTab>
                                <AccordionTab
                                    header="Can I make any changes to my order after confirmation?"
                                >
                                    <p>
                                        We are sorry that we are unable to make
                                        any changes once your order has been
                                        confirmed in order to process your order
                                        efficiently.
                                    </p>
                                </AccordionTab>
                            </Accordion>
                        </AccordionTab>
                        <AccordionTab header="Returns & Exchanges">
                            <Accordion>
                                <AccordionTab header="Do you accept returns?">
                                    <p>
                                        At the moment, we do not accept returns
                                        and purchases are final.
                                    </p>
                                </AccordionTab>
                                <AccordionTab
                                    header="Do you accept size exchanges?"
                                >
                                    <p>
                                        Size exchanges are not available for
                                        orders placed online.
                                    </p>
                                </AccordionTab>
                            </Accordion>
                        </AccordionTab>
                    </Accordion>
                </template>
            </Card>
        </div>
    </div>
</template>

<style scoped></style>
