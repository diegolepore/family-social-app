<template>
  <div class="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto w-full max-w-md md:max-w-2xl">
    <div class="flex items-start px-4 py-6 w-full">
        <img class="w-12 h-12 rounded-full object-cover mr-4 shadow" :src="comment.author.photo" alt="avatar">
        <div class="w-full">
          <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900 -mt-1">{{comment.author.name}} {{comment.author.lastname}}</h2>
              <small class="text-sm text-gray-700">{{ formatDate(comment.timestamp) }}</small>
          </div>
          <p class="mt-3 text-gray-700 text-sm" v-html="comment.body"></p>
          <div class="mt-4 flex items-center">
              <div class="flex mr-2 text-gray-700 text-sm mr-3">
                <svg fill="none" viewBox="0 0 24 24"  class="w-4 h-4 mr-1" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                <span>12</span>
              </div>
              <div class="flex mr-2 text-gray-700 text-sm mr-8">
                <svg fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-1" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                </svg>
                <span>8</span>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import { formatDate } from "../helpers/formatDate.js"

  export default {
    props: ['comment'],
    methods: {
      formatDate
    }
  }
</script>

<style lang="scss" scoped>

</style>