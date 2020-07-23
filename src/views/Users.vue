<template>
  <div>

    <!-- eslint-disable -->
    <ul>
      <li v-for="(user, index) in users" :key="index">
        <div class="bg-white my-12 pb-6 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-sm mx-auto">
          <div class="relative h-40">
            <img class="absolute h-full w-full object-cover" src="https://images.unsplash.com/photo-1448932133140-b4045783ed9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80">
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
    ...mapActions("users", ["GET_USERS"])
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