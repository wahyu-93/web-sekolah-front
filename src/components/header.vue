<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark" style="border-top: 5px solid rgb(175,140,226)">
        <div class="container-fluid">
            <router-link :to={name: 'home'} class="navbar-brand">
                <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                SMK INDONESIA
            </router-link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" 
                    aria-controls="navbarCollapse" aria-expended="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mr-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <router-link :to={name: 'post'} class="nav-link">
                            <i class="fa fa-book-open" aria-hidden="true"></i>
                            BERITA
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to={name: 'event'} class="nav-link">
                            <i class="fa fa-calender" aria-hidden="true"></i>
                            AGENDA
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to={name: 'photo'} class="nav-link">
                            <i class="fa fa-image" aria-hidden="true"></i>
                            GALERI
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to={name: 'video'} class="nav-link">
                            <i class="fa fa-video" aria-hidden="true"></i>
                            VIDEO
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to={name: 'contact'} class="nav-link">
                            <i class="fa fa-phone" aria-hidden="true"></i>
                            KONTAK
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'HeaderComponent'
}
</script>