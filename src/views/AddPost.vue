<template>
  <div class="w-full max-w-screen-sm">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Crear artículo</h1>
    </div>
    <form @submit.prevent="ADD_POST({title, subtitle, body})">
    
      <label class="block mb-4">
        <span class="text-gray-700">Título del artículo</span>
        <input class="form-input mt-1 block w-full" type="text" placeholder="Este es el título" v-model="title">
      </label>

      <label class="block mb-4">
        <span class="text-gray-700">Subtítulo del artículo</span>
        <input class="form-input mt-1 block w-full" type="text" placeholder="Y aquí el subtítulo" v-model="subtitle">
      </label>

      <label class="block mb-4">
        <span class="text-gray-700">Cuerpo del artículo</span>
        <textarea class="form-textarea mt-1 block w-full" rows="3" placeholder="Escribe tu super artículo aquí" v-model="body"></textarea>
      </label>

      <label class="flex justify-end mb-4">
        <button class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" type="submit">
          Publicar
        </button>
      </label>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddPost",
  data() {
    return {
      title: "",
      subtitle: "",
      body: ""
    };
  },
  methods: {
    ...mapActions("posts", ["ADD_POST"])
  }
};
</script>

<style lang="scss" scoped>
</style>