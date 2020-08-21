<template>
  <div>
    <div class="flex">
      <div class="flex flex-row-reverse justify-end mr-2">
        <img
          v-for="follower in followers"
          :key="follower.uid"
          class="border-2 border-white rounded-full h-10 w-10 -mr-2"
          :src="follower.photo"
          alt
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Followers",
  data() {
    return {
      followers: [],
    };
  },
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState("users", ["allUsers"]),
  },
  created() {
    this.GET_USERS("all-users");
  },
  mounted() {
    this.setFollowers();
  },
  methods: {
    ...mapActions("users", ["GET_USERS"]),
    setFollowers() {
      this.allUsers.forEach((user) => {
        if (this.user.followers.includes(user.uid)) {
          this.followers.push(user);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>