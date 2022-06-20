<template>
    <div id="photo">
        <Header />

        <!-- main content -->
        <header class="pt-5 border-bottom bg-light">
            <div class="container-fluid">
                <h1 class="bd-title mt-4 font-weight-bold">
                    <i class="fa fa-image   " aria-hidden="true"></i>
                    Galeri
                </h1>

                <p class="bd-lead">Galeri Foto terbaru tentang SMK Indonesia</p>
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
                    <router-link :to="{name: 'photo'}" class="text-decoration-none">
                        <i class="fa fa-image"></i>
                        Galeri Foto
                    </router-link>
                </li>
            </ol>
        </nav>
        <!-- end breadcrumb -->

        <div class="container-fluid mt-3 mb-5">
            <div v-if="photos.length > 0">
                <div class="row">
                    <div class="col-md-4 mb-4" v-for="photo in photos" :key="photo.id">
                        <div class="card h-100 shadow-sm border-0 rounded-lg">
                            <div class="card-img">
                                <img :src="photo.image" class="w-100"
                                    style="height: 300px; object-fit: cover; border-top-left-radius: .3rem; border-top-right-radius: .3rem;">
                            </div>

                            <div class="card-body text-center">
                                <h6>{{ photo.caption }}</h6>
                            </div>
                        </div>
                    </div>               
                </div>
            </div>

            <div v-else>
                <div class="row">
                    <div class="col-md-4 mb-4" v-for="loader in photos_loader" :key="loader">
                        <div class="card h-100 shadow-sm border-0 rounded-lg">
                            <FacebookLoader />
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

import { FacebookLoader } from 'vue-content-loader'
import axios from 'axios'
import { ref, onMounted } from 'vue'

import Header from '@/components/header'
import Footer from '@/components/footer'

export default {
    name: 'PhotoComponent',

    components: {
        Header,
        Footer,
        FacebookLoader
    },

    setup(){
        let photos = ref([])
        let photos_loader = ref(6)

        let moreExists = ref(false)
        let nextPage = ref(0)

        const fetchPhotos = () => {
            axios.get('api/photo')
            .then(response => {
                photos.value = response.data.data.data
        
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
            axios.get(`api/photo?page=${nextPage.value}`)
            .then(response => {
                if(response.data.data.current_page < response.data.data.last_page){
                    moreExists.value = true

                    nextPage.value = response.data.data.current_page + 1
                }
                else{
                    moreExists.value = false
                }

                response.data.data.data.forEach(data => {
                    photos.value.push(data)
                })
                
            })
            .catch(err => console.log(err))  
        }

        onMounted(() => {
            fetchPhotos()
        })

        return {
            photos,
            photos_loader,
            moreExists,
            loadMore
        }
    }
}
</script>