<script>
export default {
};
</script>

<template>
    <div class="spacer"></div>
    <div class="center">
        <h1 class="error-msg">404</h1>
        <h1>Page not found</h1>
        <a href="/" class="btn btn-outline-dark mt-3">Back to Home</a>
    </div>
</template>

<style scoped>
.btn {
    border-radius: 23px;
}
.btn a {
    text-decoration: none;
}
.spacer {
    height: 90dvh;
}
.error-msg {
    display: block;
    font-weight: 900;
    font-size: 6rem;
}
.center {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
}
@media (min-width: 1024px) {
}
</style>
