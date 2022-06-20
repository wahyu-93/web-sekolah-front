<template>
    <div id="tag">
        <Header />

        <!-- main content -->
        <header class="pt-5 border-bottom bg-light">
            <div class="container-fluid">
                <h1 class="bd-title mt-4 font-weight-bold">
                    <i class="fa fa-book-open" aria-hidden="true"></i>
                    BERITA
                </h1>

                <p class="bd-lead">Berita terbaru tentang SMK Indonesia</p>
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
                    <router-link :to="{name: 'post'}" class="text-decoration-none">
                        <i class="fa fa-book-open"></i>
                        Berita
                    </router-link>
                </li>
            </ol>
        </nav>
        <!-- end breadcrumb -->

        <div class="container-fluid mt-3 mb-5">
            <div v-if="posts.length > 0" class="row">
                <div class="col-md-4 mb-4" v-for="post in posts" :key="post.id">
                    <div class="card h-100 shadow-sm border-0 rounded-lg">
                        <div class="card-img">
                            <img :src="post.image"
                                    class="w-100"
                                    style="height: 200px; object-fit: cover; border-top-left-radius: .3rem; border-top-right-radius: .3rem;">
                        </div>

                        <div class="card-body">
                            <router-link :to="{name: 'detail_post', params: {slug: post.slug}}" class="text-dark text-decoration-none">
                                <h6>{{ post.title }}</h6>
                            </router-link>
                        </div>

                        <div class="card-footer bg-white">
                            <i class="fa fa-calender" aria-hidden="true"></i>
                            {{ post.created_at }}
                        </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <div class="alert alert-danger">
                    Data Berita Terbaru Belum Tersedia !
                </div>
            </div>

            <div class="text-center" v-show="moreExists">
                <button type="buttton" class="btn btn-primary btn-md" v-on:click="loadMore">
                    <span class="fa fa-arrow-down"></span>
                    Lihat Lebih Banyak
                </button>
            </div>
        </div>

        <!-- end main content -->

        <Footer />
    </div>
</template>

<script>

import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import Header from '@/components/header'
import Footer from '@/components/footer'

export default {
    name: 'TagComponent',

    components: {
        Header,
        Footer
    },

    setup(){
        let posts = ref([])
        let tagInfo  = ref({})
        let moreExist = ref(false)
        let nextPage = ref(0)

        let route = useRoute()

        const fetchDataPostByTag = () => {
            axios.get(`api/tag/${route.params.slug}`)
                .then(response => {
                    tagInfo.value = response.data.response
                    
                    posts.value = response.data.data.data

                    if(response.data.data.current_page < response.data.data.last_page){
                        moreExist.value = true

                        nextPage.value = response.data.data.current_page + 1
                    }
                    else {
                        moreExist.value = false
                    }
                })
        }

        const loadMore = () => {
            axios.get(`api/tag/${route.params.slug}?page=${nextPage.value}`)
                .then(response => {
                    tagInfo.value = response.data.response
                    
                    posts.value = response.data.data.data

                    if(response.data.data.current_page < response.data.data.last_page){
                        moreExist.value = true

                        nextPage.value = response.data.data.current_page + 1
                    }
                    else {
                        moreExist.value = false
                    }

                    response.data.data.data.forEach(data => {
                        posts.value.push(data)
                    })
                })
        }

        onMounted(() => {
            fetchDataPostByTag()
        })

        watch(() => route.params.slug, () => {
            fetchDataPostByTag()
        })

        return {
            posts,
            tagInfo,
            moreExist,
            loadMore
        }
    }
}
</script>