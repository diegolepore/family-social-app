<template>
  <div class="w-full max-w-screen-xl">
    <template v-if="usersFollowing.length > 0">
      <div class="mb-6 pb-4">
        <h2 class="text-lg font-semibold text-gray-600">Personas a las que sigues</h2>
      </div>
      <ul class="flex flex-wrap mb-12">
        <li
          class="px-4 py-2 w-full md:w-3/6 lg:w-2/6"
          v-for="user in usersFollowing"
          :key="user.uid"
        >
          <div
            class="bg-white mb-4 pb-6 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-sm mx-auto"
          >
            <div class="relative h-40">
              <img class="absolute h-full w-full object-cover" :src="user.bannerPhoto" />
            </div>
            <div
              class="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4"
            >
              <img class="object-cover w-full h-full" :src="user.photo" />
            </div>
            <div class="mt-16">
              <h2 class="text-lg text-center font-semibold">{{ user.name }} {{ user.lastname }}</h2>
              <p class="text-sm text-gray-600 text-center">{{ user.email }}</p>
              <div class="flex justify-center my-4 px-6">
                <!-- TODO: @click="UNFOLLOW_USER(user)" -->
                <button
                  @click="UNFOLLOW_USER(user)"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                  type="button"
                >Dejar de seguir</button>
              </div>
              <div class="mt-6 pt-3 flex flex-wrap justify-between mx-6 border-t">
                <div class="flex items-center text-grey-darker">
                  <svg
                    class="h-6 w-6 text-grey mr-1"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      class="heroicon-ui"
                      d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
                    />
                  </svg>
                  <span>
                    <strong class="text-black">{{ user.followersLength }}</strong>
                    {{ user.followersLength == 1 ? 'Seguidor' : 'Seguidores' }}
                  </span>
                </div>
                <div>
                  <strong class="text-black">{{ user.followingsLength }}</strong> Siguiendo
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </template>

    <div class="mb-6 pb-4">
      <h2 class="text-lg font-semibold text-gray-600">Personas que quizás conozcas</h2>
    </div>
    <ul class="flex flex-wrap">
      <li
        class="px-4 py-2 w-full md:w-3/6 lg:w-2/6"
        v-for="user in notFollowingUsers"
        :key="user.ui"
      >
        <div
          class="bg-white mb-4 pb-6 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-sm mx-auto"
        >
          <div class="relative h-40">
            <img class="absolute h-full w-full object-cover" :src="user.bannerPhoto" />
          </div>
          <div
            class="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4"
          >
            <img class="object-cover w-full h-full" :src="user.photo" />
          </div>
          <div class="mt-16">
            <h2 class="text-lg text-center font-semibold">{{ user.name }} {{ user.lastname }}</h2>
            <p class="text-sm text-gray-600 text-center">{{ user.email }}</p>
            <div class="flex justify-center my-4 px-6">
              <button
                @click="FOLLOW_USER(user)"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                type="button"
              >Seguir</button>
            </div>
          </div>
          <div class="mt-6 pt-3 flex flex-wrap justify-between mx-6 border-t">
            <div class="flex items-center text-grey-darker">
              <svg
                class="h-6 w-6 text-grey mr-1"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  class="heroicon-ui"
                  d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
                />
              </svg>
              <span>
                <strong class="text-black">{{ user.followersLength }}</strong>
                {{ user.followersLength == 1 ? 'Seguidor' : 'Seguidores' }}
              </span>
            </div>
            <div>
              <strong class="text-black">{{ user.followingsLength }}</strong> Siguiendo
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
    ...mapActions("users", ["GET_USERS", "FOLLOW_USER", "UNFOLLOW_USER"]),
  },
  mounted() {
    this.GET_USERS("not-following-users");
    this.GET_USERS("users-following");
  },
  computed: {
    ...mapState("users", ["notFollowingUsers", "usersFollowing"]),
  },
};
</script>

<style lang="scss" scoped>
</style>