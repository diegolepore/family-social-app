<template>
  <div>
    <div class="w-full mx-auto max-w-screen-lg">
      <div class="mx-5 my-3 text-sm">
        <!-- <a href class="text-red-600 font-bold tracking-widest">CATEGORY</a> -->
      </div>
      <div class="w-full text-gray-800 text-4xl px-5 font-bold leading-none">{{ post.title }}</div>

      <div class="w-full text-gray-500 px-5 pb-5 pt-2">{{ post.subtitle }}</div>

      <div class="mx-5 my-2">
        <img
          :v-if="post.mainImage"
          :src="post.mainImage"
        />
      </div>

      <div class="flex justify-end">
        <Like :post="post" />

        <div>
          <svg class="inline fill-current" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
          </svg>
          {{ comments.length }}<span class="hidden md:inline">&nbsp;comentarios</span>
        </div>
      </div>

      <!-- <div class="w-full text-gray-600 text-normal mx-5">
        <p
          class="border-b py-3"
        >Georgia Gov. Brian Kemp speaks to the media during a press conference. | Kevin C. Cox/Getty Images</p>
      </div>-->

      <div v-if="post.user" class="w-full text-gray-600 font-thin italic px-5 pt-3">
        By
        <strong class="text-gray-700">{{ post.user.name }} {{ post.user.lastname }}</strong>
        <br />07/17/2020 09:57 AM EDT
        <br />Updated: 07/17/2020 10:33 AM EDT
      </div>

      <div class="px-5 w-full mx-auto">
        <p class="my-5" v-html="post.body"></p>
      </div>

      <CommentsBox :postId="postId" />

      <div v-for="(comment, index) in comments" :key="index" class="flex justify-center items-start mb-4 text-sm">
        <CommentCard :comment="comment" />
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Like from "../components/Like";
import CommentsBox from "../components/CommentsBox"
import CommentCard from "../components/CommentCard"

export default {
  components: {
    Like,
    CommentsBox,
    CommentCard
  },
  data() {
    return {
      postId: this.$route.params.id
    };
  },
  computed: {
    ...mapState("posts", ["post"]),
    ...mapState("comments", ["comments"]),
  },
  created() {    
    this.GET_USERS("all-users");
    this.GET_POST(this.postId);
    this.GET_COMMENTS(this.postId)
  },
  methods: {
    ...mapActions("posts", ["GET_POST", "LIKE_POST"]),
    ...mapActions("users", ["GET_USERS"]),
    ...mapActions("comments", ["GET_COMMENTS"]),
  },
};
</script>

<style lang="scss" scoped>
</style>