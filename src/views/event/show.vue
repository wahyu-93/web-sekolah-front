<template>
    <div id="event-detail">
        <Header />

        <header class="pt-5 border-bottom bg-light">
            <div class="container-fluid">
                <h1 class="bd-title mt-4 font-weight-bold">
                    <i class="fa fa-bell" aria-hidden="true"></i>
                    Agenda
                </h1>

                <p class="bd-lead">{{ event.title }}</p>
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

                <li class="breadcrumb-item active">
                    <router-link :to="{name: 'detail_event'}" class="text-decoration-none">
                        {{ event.title }}
                    </router-link>
                </li>
            </ol>
        </nav>
        <!-- end breadcrumb -->

        <!-- main content -->
        <div class="container-fluid mt-3 mb-5">
            <div class="row">
                <div class="col-md-8">
                <div class="card border-0 shadow-sm rounded">
                    <div class="card-body">
                        <h3>{{ event.title }}</h3>
                        <hr>
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped">
                                <tbody>
                                    <tr>
                                        <td style="width: 20%;">LOKASI</td>
                                        <td>
                                            {{ event.location }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tanggal</td>
                                        <td>{{ event.date }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="mt-3" >
                            <p v-html="event.content"></p>
                        </div>
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

                    <div v-if="events.length > 0 ">
                        <router-link :to="{name: 'detail_event', params:{slug: event.slug}}" class="text-decoration-none text-dark" v-for="event in events" :key="event.id">
                            <div class="card mb-3 shadow-sm border-0">
                                <div class="card-body">
                                        <h6>{{ event.title }}</h6>
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
                        <div class="card mb-3 shadow-sm border-0" v-for="loading in events_loading" :key="loading">
                            <div class="card-body">
                                <FacebookLoader />
                            </div>
                        </div>
                    </div>
                    <!-- end agenda section -->
                </div>
            </div>
        </div>
        <!-- end main content -->

        <Footer />
    </div>
</template>

<script>

import { FacebookLoader } from 'vue-content-loader'
import axios from 'axios'

import Header from '@/components/header'
import Footer from '@/components/footer'

import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
    name: 'EvenDetailComponent',
    
    components: {
        Header,
        Footer,
        FacebookLoader,
    },

    setup(){
        let event = ref({})

        let events = ref([])
        let events_loading = ref(3)

        let route = useRoute()

        const getEventBySlug = () => {
            axios.get(`api/event/${route.params.slug}`)
            .then(response => {
                event.value = response.data.data
                console.log(response)
            })
            .catch(err => console.log(err))
        }

        onMounted(() => {
            // get event list
            getEventBySlug()

            axios.get('api/homepage/event')
            .then(response => {
                events.value = response.data.data
            })
            .catch(err => console.log(err))
        })

        watch(() => route.params.slug, () => {
            getEventBySlug()
        })

        return {
            event,
            events,
            events_loading,
        }
    }
}
</script>