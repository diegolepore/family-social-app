<template>
  <div class="fsn-nav">
    <nav class="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <svg
          class="fill-current h-8 w-8 mr-2"
          width="56"
          height="56"
          viewBox="0 0 56 56"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <rect fill="none" id="canvas_background" height="54" width="54" y="-1" x="-1" />
          </g>
          <g>
            <path
              fill="#ffffff"
              id="svg_1"
              d="m13.547352,17.886532c0.571364,0 1.123384,0.088942 1.642962,0.253944c1.962217,-2.260905 4.137846,-4.317602 6.493881,-6.143759c-0.098452,-0.427726 -0.1565,-0.871245 -0.1565,-1.330564c0,-0.634272 0.104713,-1.243382 0.290234,-1.813873c-2.638868,-1.947278 -5.509924,-3.580934 -8.56309,-4.844207c-2.863091,1.819138 -5.359689,4.19063 -7.349227,6.969947c1.477356,2.689213 3.23357,5.197621 5.229368,7.480174c0.730713,-0.362774 1.547356,-0.571663 2.412374,-0.571663zm-5.569685,5.725983c0,-0.803953 0.16333,-1.569288 0.454134,-2.263241c-1.78808,-2.017494 -3.406572,-4.195311 -4.825311,-6.515313c-1.779544,3.633595 -2.787403,7.735288 -2.787403,12.080972c0,5.033203 1.346467,9.740494 3.685425,13.769627c0.835423,-4.843033 2.420906,-9.418089 4.611338,-13.614567c-0.711934,-0.960768 -1.138183,-2.15617 -1.138183,-3.457478zm19.119709,-18.673516c1.471098,0 2.805044,0.590386 3.800381,1.548228c2.905783,-1.285508 5.966345,-2.27085 9.149836,-2.901026c-3.843063,-2.276701 -8.296768,-3.5862 -13.050945,-3.5862c-3.240396,0 -6.342506,0.61028 -9.207304,1.717912c2.274084,1.153856 4.440609,2.501972 6.479088,4.02153c0.829731,-0.505545 1.794909,-0.800445 2.828945,-0.800445zm8.329206,26.972271c0.346573,-0.74193 0.83884,-1.39785 1.447193,-1.919777c-1.643528,-5.202301 -4.248253,-9.959328 -7.602478,-14.052241c-0.667542,0.29139 -1.402235,0.452884 -2.173922,0.452884c-1.208178,0 -2.323025,-0.400221 -3.235844,-1.071938c-2.018562,1.577482 -3.886885,3.3463 -5.585617,5.276611c0.53039,0.875925 0.841682,1.908075 0.841682,3.015705c0,0.598579 -0.089914,1.174339 -0.254951,1.716156c4.885067,3.356251 10.507103,5.656942 16.563936,6.5826zm7.224026,7.730022c0.076828,1.084225 0.117229,2.178402 0.117229,3.281937c0,1.94318 -0.120647,3.857109 -0.348278,5.737103c4.438332,-3.334019 7.81929,-8.067051 9.523151,-13.570683c-2.018562,0.502029 -4.090622,0.860706 -6.20422,1.069595c-0.496819,1.566952 -1.631016,2.834904 -3.087883,3.482048zm-8.529518,-3.8811c-6.461452,-1.100613 -12.453402,-3.635353 -17.667969,-7.267776c-0.846233,0.53363 -1.839297,0.847839 -2.9052,0.847839c-0.391535,0 -0.772823,-0.042715 -1.142163,-0.121706c-2.496597,4.866442 -4.091759,10.294016 -4.550444,16.04867c2.492613,2.747723 5.533829,4.961231 8.950072,6.447441c4.240856,-6.706646 10.170773,-12.254169 17.315704,-15.954468zm10.449059,-28.793754c-4.194763,0.416021 -8.201721,1.498494 -11.93211,3.12571c0.01992,0.188994 0.029026,0.379744 0.029026,0.573421c0,0.90401 -0.209431,1.755943 -0.571941,2.5166c3.726406,4.4984 6.621368,9.741076 8.448719,15.479933c2.264404,0.041542 4.201015,1.468065 5.033592,3.493748c2.519936,-0.262716 4.97385,-0.758312 7.337849,-1.47333c0.167313,-1.231091 0.260075,-2.487343 0.260075,-3.767588c0,-7.910822 -3.320072,-15.024124 -8.605209,-19.948493zm-7.646862,31.853347c-6.669741,3.212303 -12.24625,8.159496 -16.28508,14.207878c2.035633,0.522511 4.1646,0.803959 6.35844,0.803959c3.948914,0 7.690685,-0.904594 11.047752,-2.514259c0.539497,-2.713203 0.825176,-5.519436 0.825176,-8.394135c0,-1.038586 -0.045528,-2.066647 -0.121216,-3.085339c-0.672665,-0.22176 -1.289558,-0.569321 -1.825073,-1.018105z"
            />
          </g>
        </svg>
        <span class="font-semibold text-xl tracking-tight">Family social network</span>
      </div>
      <div class="block lg:hidden">
        <button
          @click="navOpen = !navOpen"
          class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        :class="[!navOpen ? 'hidden' : '']"
        class="w-full block flex-grow lg:flex lg:items-center lg:w-auto"
      >
        <div class="text-sm lg:flex-grow mb-3 lg:mb-0">
          <router-link
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            v-if="IS_USER_ACTIVE"
            to="/"
          >Feed</router-link>
          <router-link
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            v-if="IS_USER_ACTIVE"
            :to="{name: 'AddPost'}"
          >Nuevo Post</router-link>
          <router-link
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            v-if="IS_USER_ACTIVE"
            :to="{name: 'Users'}"
          >Mi Red</router-link>
          <router-link
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            v-if="!IS_USER_ACTIVE"
            to="/signup"
          >Sign Up</router-link>
          <router-link
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            v-if="!IS_USER_ACTIVE"
            to="/login"
          >Sign In</router-link>
        </div>
        <div class="lg:flex">
          <router-link
            v-if="user"
            class="flex items-center text-sm lg:mx-6 block text-teal-200"
            :to="{name: 'UserProfile'}"
          >
            <img
              class="h-8 w-8 rounded-full object-cover mr-3 border"
              :src="user.photo"
              :alt="`${user.name} profile photo`"
            />
            {{ user.name }} {{ user.lastname }}
          </router-link>
          <button
            class="flex items-center text-sm px-3 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-blue-800 mt-4 lg:mt-0"
            v-if="IS_USER_ACTIVE"
            @click="LOG_OUT"
          >
            <svg class="mr-2" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g>
                <rect fill="none" id="canvas_background" height="402" width="582" y="-1" x="-1" />
              </g>
              <g>
                <path
                  fill="#ffffff"
                  id="svg_1"
                  d="m12,10c1.1,0 2,-0.9 2,-2l0,-4c0,-1.1 -0.9,-2 -2,-2s-2,0.9 -2,2l0,4c0,1.1 0.9,2 2,2z"
                />
                <path
                  fill="#ffffff"
                  id="svg_2"
                  d="m19.1,4.9l0,0c-0.3,-0.3 -0.6,-0.4 -1.1,-0.4c-0.8,0 -1.5,0.7 -1.5,1.5c0,0.4 0.2,0.8 0.4,1.1l0,0c0,0 0,0 0,0c0,0 0,0 0,0c1.3,1.3 2,3 2,4.9c0,3.9 -3.1,7 -7,7s-7,-3.1 -7,-7c0,-1.9 0.8,-3.7 2.1,-4.9l0,0c0.3,-0.3 0.5,-0.7 0.5,-1.1c0,-0.8 -0.7,-1.5 -1.5,-1.5c-0.4,0 -0.8,0.2 -1.1,0.4l0,0c-1.8,1.8 -2.9,4.3 -2.9,7.1c0,5.5 4.5,10 10,10s10,-4.5 10,-10c0,-2.8 -1.1,-5.3 -2.9,-7.1z"
                />
              </g>
            </svg>
            Salir
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      navOpen: false,
    };
  },
  methods: {
    ...mapActions("auth", ["LOG_OUT"]),
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapGetters("auth", ["IS_USER_ACTIVE", "GET_AUTH_ITEM"]),
  },
};
</script>

<style lang="css" scoped>
.fsn-nav {
  position: sticky;
  top: 0;
  z-index: 5;
}

.router-link-exact-active {
  color: #fff;
}
</style>