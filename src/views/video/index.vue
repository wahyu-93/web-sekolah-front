<template>
    <div id="video">
        <Header />

        <!-- main content -->
        <header class="pt-5 border-bottom bg-light">
            <div class="container-fluid">
                <h1 class="bd-title mt-4 font-weight-bold">
                    <i class="fa fa-video" aria-hidden="true"></i>
                    Video
                </h1>

                <p class="bd-lead">Video Foto terbaru tentang SMK Indonesia</p>
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
                    <router-link :to="{name: 'video'}" class="text-decoration-none">
                        <i class="fa fa-video"></i>
                        Galeri Video
                    </router-link>
                </li>
            </ol>
        </nav>
        <!-- end breadcrumb -->

        <div class="container-fluid mt-3 mb-5">
            <div v-if="videos.length > 0">
                <div class="row">
                    <div class="col-md-6 mb-4" v-for="video in videos" :key="video.id">
                        <div class="card h-100 shadow-sm border-0 rounded-lg">
                            <div class="card-img">
                                <iframe
                                    style="width:100%;height:300px;border-top-left-radius:.3rem;border-top-right-radius:.3rem"
                                    :src="video.embed" frameborder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen></iframe>
                            </div>

                            <div class="card-body text-center">
                                <h6>{{ video.caption }}</h6>
                            </div>
                        </div>
                    </div>               
                </div>
            </div>

            <div v-else>
                <div class="row">
                    <div class="col-md-6 mb-4" v-for="loader in videos_loader" :key="loader">
                        <div class="card h-100 shadow-sm border-0 rounded-lg">
                            <ContentLoader />
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center" v-show="moreExists">
                <button class="btn btn-primary btn-md" @click="loadMore">
                    <i class="fa fa-arrow-down"></i>
                    Tampilkan Lebih Banyak
                </button>
            </div>
        </div>

        <!-- end main content -->

        <Footer />
    </div>
</template>

<script>

import { ContentLoader } from 'vue-content-loader'
import axios from 'axios'
import { ref, onMounted } from 'vue'

import Header from '@/components/header'
import Footer from '@/components/footer'

export default {
    name: 'VideoComponent',

    components: {
        Header,
        Footer,
        ContentLoader
    },

    setup(){
        let videos = ref([])
        let videos_loader = ref(4)

        let moreExists = ref(false)
        let nextPage = ref(0)

        const fetchvideos = () => {
            axios.get('api/video')
            .then(response => {
                videos.value = response.data.data.data
        
                if(response.data.data.current_page < response.data.data.last_page){
                    moreExists.value = true

                    nextPage.value = response.data.data.current_page + 1
                }
                else{
                    moreExists.value = false
                }
                
            })
            .catch(err => console.log(err))
        }

        const loadMore = () => {
            axios.get(`api/video?page=${nextPage.value}`)
            .then(response => {
                if(response.data.data.current_page < response.data.data.last_page){
                    moreExists.value = true

                    nextPage.value = response.data.data.current_page + 1
                }
                else{
                    moreExists.value = false
                }

                response.data.data.data.forEach(data => {
                    videos.value.push(data)
                })
                
            })
            .catch(err => console.log(err))  
        }

        onMounted(() => {
            fetchvideos()
        })

        return {
            videos,
            videos_loader,
            moreExists,
            loadMore
        }
    }
}
</script>