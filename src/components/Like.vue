<template>
  <div class="flex justify-end">
      <div v-if="post.likes"
        @click="likePost(post.id)"
        class="flex items-center px-2 mr-2 text-gray-700 text-sm mr-3 cursor-pointer"
      >
        <svg :fill="post.likes.length > 0 ? '#f56565': 'none'" viewBox="0 0 24 24" class="text-red-500 w-4 h-4 mr-1" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span>{{ post.likes.length }}</span>
      </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  
  export default {
    data() {
      return {
        likesLenth: ""
      }
    },
    props: {
      post: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      ...mapActions("posts", ["LIKE_POST"]),

      async likePost(postId) {
        await this.LIKE_POST(postId)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>