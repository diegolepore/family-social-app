<template>
  <div>

    <!-- eslint-disable -->
    <ul class="flex flex-wrap justify-center">
      <li class="px-4 py-2" v-for="(user, index) in users" :key="index">
        <div class="bg-white mb-4 pb-6 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-sm mx-auto">
          <div class="relative h-40">
            <img class="absolute h-full w-full object-cover" :src="user.bannerPhoto">
          </div>
          <div class="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
            <img class="object-cover w-full h-full" :src="user.photo">
          </div>
          <div class="mt-16">
            <h1 class="text-lg text-center font-semibold">
              {{ user.name }} {{ user.lastname }}
            </h1>
            <p class="text-sm text-gray-600 text-center">
              {{ user.email }}
            </p>
            <div class="flex justify-center my-4 px-6">
              <button @click="FOLLOW_USER(user)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" type="button">
                Seguir
              </button>
            </div>
          </div>
          <div class="mt-6 pt-3 flex flex-wrap mx-6 border-t">
            <div class="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
              User experience
            </div>
            <div class="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
              VueJS
            </div>
            <div class="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
              TailwindCSS
            </div>
            <div class="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
              React
            </div>
            <div class="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
              Painting
            </div>
          </div>

        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Users",
  methods: {
    ...mapActions("users", ["GET_USERS","FOLLOW_USER"]),
  },
  created() {
    this.GET_USERS();
  },
  computed: {
    ...mapState("users", ["users"])
  }
};
</script>

<style lang="scss" scoped>

</style>