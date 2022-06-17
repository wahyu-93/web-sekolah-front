<template>
    <div id="event-index">
        <Header />

        <!-- main content -->
        <header class="pt-5 border-bottom bg-light">
            <div class="container-fluid">
                <h1 class="bd-title mt-4 font-weight-bold">
                    <i class="fa fa-bell" aria-hidden="true"></i>
                    AGENDA
                </h1>

                <p class="bd-lead">Agenda terbaru tentang SMK Indonesia</p>
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
                    <router-link :to="{name: 'event'}" class="text-decoration-none">
                        <i class="fa fa-bell"></i>
                        Agenda
                    </router-link>
                </li>
            </ol>
        </nav>
        <!-- end breadcrumb -->

        <div v-if="events.length > 0">
            <div class="container-fluid mt-3 mb-0">
                <div class="row">
                    <div class="col-md-6" v-for="event in events" :key="event.id">
                        <a href="" class="text-decoration-none text-dark">
                            <div class="card mb-3 shadow-sm border-0">
                                <div class="card-body">
                                    <h6>{{ event.title }}</h6>
                                    <hr>
                                    <div>
                                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                                        {{ event.location }}
                                    </div>
                                    <div class="mt-2">
                                        <i class="fa fa-calendar" aria-hidden="true"></i> {{ event.date }}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <div class="container-fluid mt-3">
                <div class="row">
                    <div class="col-md-6 mb-3" v-for="loader in events_loader" :key="loader">
                        <a href="" class="text-decoration-none text-dark">
                            <div class="card mb-3 shadow-sm border-0">
                                <div class="card-body">
                                    <FacebookLoader />
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center mb-3" v-show="moreExists">
            <button class="btn btn-primary btn-md" @click="loadMore">
                <i class="fa fa-arrow-down"></i>
                Lihat Lebih Banyak
            </button>
        </div>



        <!-- end main content -->

        <Footer />
    </div>
</template>

<script>

// import 
import { FacebookLoader } from 'vue-content-loader'
import { ref,onMounted } from 'vue'
import axios from 'axios'

// import components
import Header from '@/components/header'
import Footer from '@/components/footer'

export default {
    name: 'EventComponent',
    components: {
        Header,
        Footer,
        FacebookLoader,
    },
    setup(){
        // set state
        let events = ref([])
        let events_loader = ref(4)
        let moreExists = ref(false)
        let nextPage = ref(0)

        const fatchEven = () => {
            // get events
            axios.get('api/event')
                .then(response => {
                    events.value = response.data.data.data

                    console.log(response.data.data)
                    if(response.data.data.current_page < response.data.data.last_page){
                        moreExists.value = true
                        nextPage.value = response.data.data.current_page + 1
                    }
                    else {
                        moreExists.value = false
                    }
                })  
                .catch(err => console.log(err))
        }

        const loadMore = () => {
            axios.get(`api/event?page=${nextPage.value}`)
                .then(response => {
                    if(response.data.data.current_page < response.data.data.last_page){
                        moreExists.value = true
                        nextPage.value = response.data.data.current_page + 1
                    }
                    else {
                        moreExists.value = false
                    }

                    response.data.data.data.forEach(data => {
                        console.log(data)
                        events.value.push(data)
                    })
                })  
                .catch(err => console.log(err))
        }


        onMounted(() => {
            fatchEven()
        })

        return {
            events,
            events_loader,
            moreExists,
            nextPage,
            loadMore
        }


    }
}
</script>