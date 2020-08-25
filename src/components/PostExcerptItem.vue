<template>
  <div class="mb-10 w-full max-w-screen-lg m-auto lg:flex">
    <div
      v-if="post.mainImage"
      class="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center bg-no-repeat rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      :style="`background-image: url('${post.mainImage}')`"
      :title="post.title"
    ></div>

    <div
      :class="[post.mainImage ? 'lg:border-l-0 lg:rounded-l-none lg:rounded-b-none' : '']"
      class="w-full border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-l lg:rounded-r p-4 flex flex-col justify-between leading-normal"
    >
      <div class="mb-8">
        <div v-if="(post.user.uid === user.uid)" class="flex justify-end">
          <div v-click-outside="{method: clickedOutside}" class="PostExcerpt__options relative">
            <button
              class="PostExcerpt__options-button"
              data-options-button
              type="button"
              @click="showDropdown = !showDropdown"
            >...</button>
            <ul
              class="PostExcerpt__options-dropdown absolute right-0 border border-gray-400 rounded"
              v-if="showDropdown"
            >
              <li class="PostExcerpt__options-item">
                <router-link
                  class="block"
                  :to="{ name: 'EditPost', params: {id: post.id} }"
                >Editar artículo</router-link>
              </li>
              <li class="PostExcerpt__options-item">
                <button class="w-full text-left" @click="DELETE_POST(post.id)">Eliminar artículo</button>
              </li>
            </ul>
          </div>
        </div>
        <div class="text-gray-900 font-bold text-xl mb-2">
          <router-link :to="{name: 'PostDetail', params: {id: post.id}}">{{ post.title }}</router-link>
        </div>
        <p class="text-gray-700 text-base" v-html="post.body"></p>
      </div>
      <div class="flex items-center">
        <div class="flex-1 flex items-center justify-between text-sm">
          <div class="flex items-center">
            <div class="rounded-full w-8 h-8 mr-3 overflow-hidden flex">
              <img :src="post.user.photo" height="32" alt />
            </div>
            <p
              class="text-sm text-gray-600 flex items-center"
            >{{ post.user.name }} {{ post.user.lastname }}</p>
          </div>

          <div class="flex">
            <Like :post="post" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Like from "../components/Like";
import clickOutside from "../directives/clickOutside";

export default {
  components: {
    Like,
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  directives: {
    clickOutside,
  },
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    ...mapActions("posts", ["DELETE_POST"]),
    clickedOutside() {
      this.showDropdown = false;
    },
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
};
</script>

<style lang="scss" scoped>
.PostExcerpt {
  &__options {
    &-dropdown {
      background-color: #e2e8f0;
      overflow: hidden;
      width: 150px;
    }
    &-item {
      font-size: 12px;
      padding: 5px 10px;

      &:hover {
        background-color: #ebf0f7;
      }
    }
  }
}
</style>