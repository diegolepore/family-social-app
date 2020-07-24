<template>
  <div class="fsn-user-profile w-full max-w-screen-xl">
    <div class="font-sans leading-tight min-h-screen bg-grey-lighter">
      <div class="mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <div class="bg-cover h-64 bg-center" :style="`background-image: url('${user.bannerPhoto}');`"></div>
        <div class="border-b px-4 pb-6">
            <div class="text-center sm:text-left sm:flex mb-4">

                <input 
                  type="file" 
                  ref="uploadImageBtn" 
                  class="hidden" 
                  @change="searchImage($event)"
                >

                <img class="h-32 w-32 rounded-full border-4 border-white -mt-16 mr-4" :src="user.photo" alt="">
                <div class="py-2">
                    <h3 class="font-bold text-2xl mb-1">{{ user.name }} {{ user.lastname }}</h3>
                    <div class="inline-flex text-grey-dark sm:flex items-center">
                        <svg class="h-5 w-5 text-grey mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
                        New York, NY
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <button class="rounded-full bg-blue-500 hover:bg-blue-700 text-white antialiased font-bold px-4 py-2 mr-2">Follow</button>
                <button @click="$refs.uploadImageBtn.click()" class="mr-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                  Buscar imagen
                </button>
                <button v-if="file" @click="uploadImage" class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                  {{ this.loading ? 'Loading' : 'Subir imagen' }}
                </button>
            </div>
        </div>
        <div class="px-4 py-4">
            <div class="flex items-center text-grey-darker mb-4">
                <svg class="h-6 w-6 text-grey mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"/></svg>
                <span><strong class="text-black">12</strong> Followers you know</span>
            </div>
            <div class="flex">
                <div class="flex flex-row-reverse justify-end mr-2">
                  <img class="border-2 border-white rounded-full h-10 w-10" src="https://randomuser.me/api/portraits/men/32.jpg" alt="">
                  <img class="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/women/31.jpg" alt="">
                  <img class="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/men/33.jpg" alt="">
                  <img class="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/women/32.jpg" alt="">
                  <img class="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/men/44.jpg" alt="">
                  <img class="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/women/42.jpg" alt="">
                </div>
                  <span class="flex items-center justify-center text-sm text-grey-darker font-semibold border-2 border-grey-light rounded-full h-10 w-10">+3</span>
            </div>
        </div>
      </div>
    </div>

    <div v-if="file && tempUrl">
      <h4>{{ file.name }}</h4>
      <img :src="tempUrl" alt="file.name">
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { firebase, storage, db } from '@/plugins/firebase'

export default {
  name: 'UserProfile',
  data() {
    return {
      file: null,
      tempUrl: null,
      loading: false
    }
  },
  computed: {
    ...mapState("auth", ["user"])
  },
  methods: {
    searchImage(event) {
      console.log(event.target.files[0])
      this.file = event.target.files[0]

      const reader = new FileReader()
      reader.readAsDataURL(this.file)
      reader.onload = (e) => {
        console.log(e.target.result)
        this.tempUrl = e.target.result
      }
    },

    async uploadImage() {
      this.loading = true

      try {
        
        const refImage = storage.ref()
          .child(this.user.email)
          .child('profile image')

        const res = await refImage.put(this.file)

        const urlDescarga = await refImage.getDownloadURL()
        console.log(urlDescarga)

        this.user.photo = urlDescarga

        await db.collection('users').doc(this.user.uid).update({
          photo: urlDescarga
        })

      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
        this.file = null
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>