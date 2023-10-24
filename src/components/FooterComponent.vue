<template>
    <div class="container-fluid">
        <footer class="py-4">

            <!-- Logo -->
            <div class="row mb-3">
                <div class="col-lg-5 col-md-4 col-sm-3 col-12">
                    <hr>
                </div>
                <div class="col-lg-2 text-center col-md-4 col-sm-6 col-12">
                    <img alt="Reventé logo" src="@/assets/logo.svg" width="125" height="35">
                </div>
                <div class="col-lg-5 col-md-4 col-sm-3 col-12">
                    <hr>
                </div>
            </div>

            <!-- Icons -->
            <div class="row">
                <div class="col mx-auto text-center py-1">
                    <ul class="list-unstyled d-inline-flex">
                        <li class="mx-1 px-2"><a class="link-body-emphasis" href="https://www.facebook.com/profile.php?id=61552687107509"><font-awesome-icon
                                    :icon="['fab', 'facebook-f']" size="2xl" /></a></li>
                        <li class="mx-1 px-2"><a class="link-body-emphasis" href="https://twitter.com/SG_Revente"><font-awesome-icon
                                    :icon="['fab', 'twitter']" size="2xl" /></a></li>
                        <li class="mx-1 px-2 "><a class="link-body-emphasis" href="https://www.instagram.com/revente_123/"><font-awesome-icon
                                    :icon="['fab', 'instagram']" size="2xl" /></a></li>
                        <li class="mx-1 px-2 "><a class="link-body-emphasis" href="https://www.tiktok.com/@sg_revente?lang=en"><font-awesome-icon
                                    :icon="['fab', 'tiktok']" size="2xl"/></a></li>
                    </ul>
                </div>
            </div>

            <!-- Content -->
            <div class="row justify-content-around">
                <div class="col-4 col-md-2 mb-3 text-center">
                    <h5>About Us</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Our Brand</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Our Story</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Reviews</a></li>
                    </ul>
                </div>
                <div class="col-md-5 mb-3 col-4 text-center">
                    <form>
                        <h5>We even send weekly updates!</h5>
                        <div class="d-flex flex-column flex-sm-row w-100 gap-2">
                            <label for="newsletter1" class="visually-hidden">Email address</label>
                            <div class="d-flex flex-column w-100">
                                <input id="newsletter1" type="text" class="form-control mb-2" placeholder="Email address">
                                <button class="btn btn-dark" type="button">SUBSCRIBE</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="col-4 col-md-2 mb-3 text-center">
                    <h5>Customer Care</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Contact</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Shipping Info</a>
                        </li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Terms and
                                Conditions</a></li>
                    </ul>
                </div>
            </div>

            <!-- Bottom -->
            <div class="d-flex flex-column flex-sm-row justify-content-between py-2 border-top">
                <p class="lead mx-auto mb-0">© 2023 Reventé, Inc. All rights reserved.</p>

            </div>
        </footer>
    </div>
</template>

<script>
</script>

<style scoped>
.container-fluid {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.form-control:focus {
    border-color: #000000;
    box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.2);
}
</style>