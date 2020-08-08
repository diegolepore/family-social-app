<template>
  <div class="w-full max-w-screen-sm">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Crear artículo</h1>
    </div>
    <form @submit.prevent="submitPost">
      <div
        v-if="loading"
        class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"
      ></div>

      <input type="file" ref="uploadImageBtn" @change="searchImage($event)" />

      <div v-if="file && tempUrl">
        <h4>{{ file.name }}</h4>
        <img width="300" :src="tempUrl" alt="file.name" />
      </div>

      <label class="block mb-4">
        <span class="text-gray-700">Título del artículo</span>
        <input
          class="form-input mt-1 block w-full"
          type="text"
          placeholder="Este es el título"
          v-model="title"
        />
      </label>

      <label class="block mb-4">
        <span class="text-gray-700">Subtítulo del artículo</span>
        <input
          class="form-input mt-1 block w-full"
          type="text"
          placeholder="Y aquí el subtítulo"
          v-model="subtitle"
        />
      </label>

      <label class="block mb-4">
        <span class="text-gray-700">Cuerpo del artículo</span>
        <textarea
          class="form-textarea mt-1 block w-full"
          rows="3"
          placeholder="Escribe tu super artículo aquí"
          v-model="body"
        ></textarea>
      </label>

      <label class="flex justify-end mb-4">
        <button
          class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
          type="submit"
        >Publicar</button>
      </label>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { storage, db } from "@/plugins/firebase";

export default {
  name: "AddPost",
  data() {
    return {
      title: "",
      subtitle: "",
      body: "",
      file: null,
      tempUrl: null,
      loading: false,
      mainImage: null,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    ...mapActions("posts", ["ADD_POST"]),

    searchImage(event) {
      console.log(event.target.files[0]);
      this.file = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        console.log(e.target.result);
        this.tempUrl = e.target.result;
      };
    },

    async submitPost() {
      this.loading = true;

      const postData = {
        title: this.title,
        subtitle: this.subtitle,
        body: this.body,
        likes: []
      };

      try {
        if(this.file) {
          const refImage = storage
            .ref()
            .child(`${this.title}__${this.user.email}`)
            .child("Post main image");
          const res = await refImage.put(this.file);
          this.mainImage = await refImage.getDownloadURL();
        }
        
        this.ADD_POST({ ...postData, mainImage: this.mainImage});
        
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
        this.file = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>