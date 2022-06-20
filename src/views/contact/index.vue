<template>
    <div id="contact">
        <Header />

        <header class="pt-5 border-bottom bg-light">
            <div class="container-fluid">
                <h1 class="bd-title mt-4 font-weight-bold">
                    <i class="fa fa-phone" aria-hidden="true"></i>
                    KONTAK
                </h1>

                <p class="bd-lead"> Kontak SMK Indonesia</p>
            </div>
        </header>

        <!-- breadcrumb -->
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{name: 'home'}" class="text-decoration-none">
                        <i class="fa fa-home"></i>
                        Home
                    </router-link>
                </li>

                <li class="breadcrumb-item">
                    <router-link :to="{name: 'contact'}" class="text-decoration-none">
                        <i class="fa fa-phone"></i>
                        Kontak
                    </router-link>
                </li>
            </ol>
        </nav>
        <!-- end breadcrumb -->

        <div class="container-fluid mt-3 mb-5">
            <div class="row">
                <div class="col-md-7">
                    <div class="card border-0 shadow-sm rounded">
                        <div class="card-body">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253840.4878845067!2d106.6894283352192!3d-6.229728025238589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1594508000901!5m2!1sid!2sid" width="100%" height="400" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                        </div>
                    </div>
                </div>

            <div class="col-md-5">
                <div class="card border-0 shadow-sm rounded">
                    <div class="card-body">
                        <h3>KONTAK KAMI</h3>
                        <hr>
                        <p>
                            <i class="fa fa-map-marker" aria-hidden="true"></i>
                            Jl. Jendral Sudirman No. 83, Daerah Khusus Ibukota Jakarta, Indonesia
                        </p>

                        <p>
                            <i class="fas fa-phone"></i>
                            +62857-8585-2224
                        </p>   
                        
                        <p>
                            <i class="fas fa-envelope"></i>
                            info@smkindonesia.sch.id
                        </p>
                    </div>
                </div>
            </div>            
            </div>
        </div>

        <Footer />
    </div>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'

export default {
    name: 'ContactComponent',

    components: {
        Header, 
        Footer
    }
}
</script>