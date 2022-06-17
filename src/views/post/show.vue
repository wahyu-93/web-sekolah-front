<template>
    <div id="post-detail">
        <Header />

        <!-- main content -->
        <header class="pt-5 border-bottom bg-light">
            <div class="container-fluid">
                <h1 class="bd-title mt-4 font-weight-bold">
                    <i class="fa fa-book-open" aria-hidden="true"></i>
                    BERITA
                </h1>

                <p class="bd-lead">{{ post.title }}</p>
            </div>
        </header>

         <!-- breadcrumb -->
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="#" class="text-decoration-none">
                        <i class="fa fa-home"></i>
                        Home
                    </a>
                </li>

                <li class="breadcrumb-item">
                    <a href="#" class="text-decoration-none">
                        <i class="fa fa-book-open"></i>
                        Berita
                    </a>
                </li>

                <li class="breadcrumb-item active">
                    <a href="#" class="text-decoration-none">
                        {{ post.title }}
                    </a>
                </li>
            </ol>
        </nav>
        <!-- end breadcrumb -->

        <div class="container-fluid mt-3 mb-5">
            <div class="row">
                <div class="col-md-8">
                    <div class="card border-0 shadow-sm rounded">
                        <div class="card-body">
                                <h3>{{ post.title }}</h3>
                                <hr>
                                <img :src="post.image" class="w-100 rounded">
                                <div class="mt-3" v-html="post.content"></div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <!-- agenda section -->
                    <div class="title mb-4">
                        <h4>
                            <i class="fas fa-calendar" aria-hidden="true"></i>
                            AGENDA TERBARU
                        </h4>
                    </div>

                    <div v-if="events.length > 0">
                        <router-link v-for="event in events" :key="event.id" :to="{name: 'detail_event', params: {slug: event.slug}}" class="text-decoration-none text-dark">
                            <div class="card mb-3 shadow-sm border-0">
                                <div class="card-body">
                                    <h6>{{ event.title}}</h6>
                                    <hr>
                                    <div>
                                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                                        {{ event.location }}
                                    </div>

                                    <div class="mt-2">
                                        <i class="fa fa-calendar" aria-hidden="true"></i>
                                        {{ event.date }}
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>

                    <div v-else>
                         <div class="card mb-3 shadow-sm border-0" v-for="loader in events_loader" :key="loader">
                            <div class="card-body">
                               <FacebookLoader />
                            </div>
                        </div>
                    </div>                    
                    
                    <!-- end agenda section -->

                    <!-- kategori section -->
                    <div class="title mb-4 mt-5">
                        <h4>
                            <i class="fa fa-folder" aria-hidden="true"></i>
                            KATEGORI BERITA
                        </h4>
                    </div>

                    <div v-if="categories.length > 0">
                        <div class="list-group">
                            <router-link :to="{name: 'detail_event', params:{slug: categori.slug}}" 
                                class="list-group-item list-group-item-action border-0 shadow-sm mb-2 rounded" 
                                v-for="categori in categories" :key="categori.id">
                                <i class="fa fa-folder-open" aria-hidden="true"></i>
                                {{ categori.name }}
                            </router-link>
                        </div>
                    </div>

                     <div v-else>
                         <div class="card mb-3 shadow-sm border-0" v-for="loader in categories_loader" :key="loader">
                            <div class="card-body">
                               <BulletListLoader />
                            </div>
                        </div>
                    </div>    
                    <!-- end kategori section -->
                </div>
            </div>
        </div>

        <!-- end main content -->

        <Footer />
    </div>
</template>

<script>
// import FacebookLoade, BulletListLoader
import { FacebookLoader, BulletListLoader } from 'vue-content-loader'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// import komponent
import Header from '@/components/header'
import Footer from '@/components/footer'

export default {
    name: 'PostDetailComponent',
    components: {
        Header,
        Footer,
        FacebookLoader,
        BulletListLoader,
    },
    setup(){
        // define state
        let post = ref({})
        let events = ref([])
        let categories = ref([])
        let events_loader = ref(2)
        let categories_loader = ref(1)

        // state route
        let route = useRoute()

        onMounted(() => {
            // get Post Detail
            axios.get(`api/post/${route.params.slug}`)
                .then(response => {
                    post.value = response.data.data
                })

            // get Agenda
            axios.get('api/homepage/event')
                .then(response => {
                    events.value = response.data.data
                })
        
            // get Kategori
            axios.get('api/category')
                .then(response => {
                    categories.value = response.data.data.data
                })
        })

        return {
            post,
            events,
            categories,
            events_loader,
            categories_loader
        }

    }
}
</script>