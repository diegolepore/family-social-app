<template>
  <div class="fsn-user-profile w-full max-w-screen-xl">
    <div class="font-sans leading-tight min-h-screen bg-grey-lighter">
      <div class="mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <div
          class="bg-cover h-64 bg-center"
          :style="`background-image: url('${user.bannerPhoto}');`"
        ></div>
        <div class="border-b px-4 pb-6">
          <div class="text-center sm:text-left sm:flex mb-4">
            <input type="file" ref="uploadImageBtn" class="hidden" @change="searchImage($event)" />

            <img
              class="h-32 w-32 rounded-full border-4 border-white -mt-16 mr-4"
              :src="user.photo"
              alt
            />
            <div class="py-2">
              <h3 class="font-bold text-2xl mb-1">{{ user.name }} {{ user.lastname }}</h3>
              <div class="inline-flex text-grey-dark sm:flex items-center">
                <svg
                  width="20px"
                  height="20px"
                  id="Layer_1"
                  style="enable-background:new 0 0 128 128;"
                  version="1.1"
                  viewBox="0 0 128 128"
                  xml:space="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  class="mr-2"
                >
                  <g>
                    <path
                      d="M86.785,109.878   c-8.188,4.317-16.533,5.962-26.515,5.962c-24.428,0-45.133-17.879-45.133-46.479c0-30.687,21.299-57.201,54.376-57.201   c25.918,0,43.348,18.175,43.348,43.052c0,22.342-12.517,35.448-26.514,35.448c-5.968,0-11.475-4.021-11.025-13.105h-0.594   C69.514,86.342,62.66,90.66,53.721,90.66c-8.636,0-16.083-7-16.083-18.764c0-18.473,14.591-35.309,35.296-35.309   c6.403,0,12.067,1.34,15.937,3.13L83.813,66.68c-2.232,11.323-0.45,16.532,4.463,16.685c7.604,0.146,16.095-9.982,16.095-27.261   c0-21.602-12.964-37.09-36.06-37.09c-24.27,0-44.684,19.212-44.684,49.456c0,24.877,16.241,40.215,38.28,40.215   c8.491,0,16.387-1.783,22.499-5.21L86.785,109.878z M78.598,45.527c-1.493-0.449-4.027-1.043-7.446-1.043   c-13.112,0-23.689,12.366-23.689,26.812c0,6.556,3.275,11.322,9.836,11.322c8.637,0,16.532-11.025,18.169-20.256L78.598,45.527z"
                      style="fill:#2F3435;stroke:#2F3435;stroke-width:3;stroke-miterlimit:10;"
                    />
                  </g>
                </svg>
                {{ user.email }}
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              @click="$refs.uploadImageBtn.click()"
              class="mr-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
            >Cambiar foto de perfil</button>
            <button
              v-if="file"
              @click="uploadImage"
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >{{ this.loading ? 'Cargando...' : 'Aplicar foto seleccionada' }}</button>
          </div>
        </div>
        <div class="px-4 py-4">
          <div class="flex items-center text-grey-darker mb-4">
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
              <strong class="text-black">{{ user.followersLength }}</strong> Seguidores
            </span>
          </div>
          <Followers :user="user" />
        </div>
      </div>
    </div>

    <div v-if="file && tempUrl">
      <h4>{{ file.name }}</h4>
      <img :src="tempUrl" alt="file.name" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { firebase, storage, db } from "@/plugins/firebase";
import Followers from "../components/Followers";

export default {
  name: "UserProfile",
  components: {
    Followers,
  },
  data() {
    return {
      file: null,
      tempUrl: null,
      loading: false,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    searchImage(event) {
      this.file = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        this.tempUrl = e.target.result;
      };
    },

    async uploadImage() {
      this.loading = true;

      try {
        const refImage = storage
          .ref()
          .child(this.user.email)
          .child("profile image");

        const res = await refImage.put(this.file);
        const urlDescarga = await refImage.getDownloadURL();

        this.user.photo = urlDescarga;

        await db.collection("users").doc(this.user.uid).update({
          photo: urlDescarga,
        });
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