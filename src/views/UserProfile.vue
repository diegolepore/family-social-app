<template>
  <div>
    <div class="flex flex-col items-center">
			<img
				class="h-40 w-40 rounded-full object-cover mt-4"
				:src="user.photo"
				:alt="`${user.name} profile photo`" />

        <div class="capitalize mt-6 mb-2 text-grey-500">
				  {{ user.name }} {{ user.lastname }}
        </div>
        <div class="mb-6 text-grey-500">
          {{ user.email }}
        </div>

        <div class="flex mb-6">

          <input 
            type="file" 
            ref="uploadImageBtn" 
            class="hidden" 
            @change="searchImage($event)"
          >

          <button @click="$refs.uploadImageBtn.click()" class="mr-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
            Buscar imagen
          </button>
          <button @click="uploadImage" :disabled="file == null" :class="[(file == null) ? 'pointer-events-none opacity-50' : '']" class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            {{ this.loading ? 'Loading' : 'Subir imagen' }}
          </button>

        </div>

        <div v-if="file && tempUrl">
          <h4>{{ file.name }}</h4>
          <img :src="tempUrl" alt="file.name">
        </div>
		
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
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>