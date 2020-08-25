<template>
  <div class="w-full max-w-screen-sm">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Editar post</h1>
    </div>

    <form @submit.prevent="submitPost(post, 'EDIT_POST')">
      <div
        v-if="loadingState"
        class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"
      ></div>

      <input type="file" class="hidden" ref="uploadImageBtn" @change="searchImage($event)" /> 

      <div class="flex justify-center">
        <button
          type="button"
          @click="$refs.uploadImageBtn.click()"
          class="flex items-center mb-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
        >
          <svg class="mr-2" fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
          </svg>
          Subir una foto
        </button>
      </div>  
      <div class="flex justify-center mb-6" v-if="file && tempUrl">
        <img width="300" :src="tempUrl" alt="file.name" />
      </div>
      <div class="flex justify-center mb-6" v-else>
        <img width="300" :src="mainImage" alt="file.name" />
      </div>

      <label class="block mb-4">
        <span class="text-gray-700">Título del artículo</span>
        <input
          class="form-input mt-1 block w-full"
          type="text"
          placeholder="Este es el título"
          v-model="post.title"
        />
      </label>

      <label class="block mb-4">
        <span class="text-gray-700">Subtítulo del artículo</span>
        <input
          class="form-input mt-1 block w-full"
          type="text"
          placeholder="Y aquí el subtítulo"
          v-model="post.subtitle"
        />
      </label>

      <div class="AddPost__editor">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }" class="mb-2">
          <div class="menubar flex">
            <button type="button" class="px-2 mr-2" :class="{ 'is-active': isActive.heading({level: 1}) }" @click="commands.heading({level: 1})">
              H1
            </button>
            <button type="button" class="px-2 mr-2" :class="{ 'is-active': isActive.heading({level: 2}) }" @click="commands.heading({level: 2})">
              H2
            </button>
            <button type="button" class="px-2 mr-2" :class="{ 'is-active': isActive.heading({level: 3}) }" @click="commands.heading({level: 3})">
              H3
            </button>
            <button type="button" class="px-2 mr-2" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
              <svg height="20" version="1.1" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g id="layer1"><path d="M 5 4 L 5 17 L 11 17 C 12.704976 17 14 15.382037 14 13.5 C 14 11.97373 13.141496 10.63652 11.910156 10.179688 C 12.577077 9.5291236 13 8.5631208 13 7.5 C 13 5.6179626 11.704976 4 10 4 L 5 4 z M 6 5 L 7 5 L 7 9 L 8 9 L 8 5 L 10 5 C 11.056448 5 12 6.0683294 12 7.5 C 12 8.9316701 11.056448 10 10 10 L 6 10 L 6 5 z M 6 11 L 7 11 L 7 15 L 8 15 L 8 11 L 10 11 L 11 11 C 12.056448 11 13 12.068329 13 13.5 C 13 14.931671 12.056448 16 11 16 L 6 16 L 6 11 z " style="fill:#222222; fill-opacity:1; stroke:none; stroke-width:0px;"/></g></svg>
            </button>
            <button type="button" class="px-2 mr-2" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
              <svg height="20" version="1.1" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g id="layer1"><path d="M 7 4 L 7 5 L 9.9921875 5 L 8 15.955078 L 8 16 L 5 16 L 5 17 L 12 17 L 12 16 L 9.0078125 16 L 11 5.0449219 L 11 5 L 14 5 L 14 4 L 7 4 z " style="fill:#222222; fill-opacity:1; stroke:none; stroke-width:0px;"/></g></svg>
            </button>
            <button type="button" class="px-2 mr-2" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
              <svg height="20" version="1.1" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g id="layer1"><path d="M 10 4 C 8.664284 4 7.4473426 4.3676997 6.5351562 4.9960938 C 5.6229712 5.624488 5 6.5474404 5 7.5996094 C 5 8.1063156 5.1565453 8.5749455 5.4121094 9 L 6.6425781 9 C 6.2230102 8.5810115 6 8.100093 6 7.5996094 C 6 6.9396954 6.3850713 6.3138995 7.1015625 5.8203125 C 7.8180605 5.3267285 8.850435 5 10 5 L 14 5 L 14 4 L 10 4 z M 3 10 L 3 11 L 16 11 L 16 10 L 3 10 z M 12.357422 12 C 12.77699 12.418989 13 12.899907 13 13.400391 C 13 14.060305 12.614929 14.686101 11.898438 15.179688 C 11.18194 15.673272 10.149565 16 9 16 L 5 16 L 5 17 L 9 17 C 10.335716 17 11.552657 16.6323 12.464844 16.003906 C 13.377029 15.375512 14 14.45256 14 13.400391 C 14 12.893684 13.843455 12.425055 13.587891 12 L 12.357422 12 z " style="fill:#222222; fill-opacity:1; stroke:none; stroke-width:0px;"/></g></svg>
            </button>
            <button type="button" class="px-2 mr-2" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
              <svg height="20" version="1.1" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g id="layer1"><path d="M 5 4 L 5 13 C 5 15.24182 7.0544185 17 9.5 17 C 11.945581 17 14 15.24182 14 13 L 14 4 L 13 4 L 13 13 C 13 14.624174 11.472697 16 9.5 16 C 7.5273035 16 6 14.624174 6 13 L 6 4 L 5 4 z M 3 19 L 3 20 L 16 20 L 16 19 L 3 19 z " style="fill:#222222; fill-opacity:1; stroke:none; stroke-width:0px;"/></g></svg>
            </button>
            <button type="button" class="px-2 mr-2" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
              Bullet list
            </button>
          </div>
        </editor-menu-bar>
        <editor-content class="form-textarea mt-1 mb-6 block w-full" :editor="editor" />
      </div>

      <label class="flex justify-end mb-4">
        <button
          class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
          type="submit"
        >Publicar</button>
      </label>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap';
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'
import { submitPostMixin } from '../mixins/submitPostMixin'

export default {
  name: "EditPost",
    components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble
  },
  mixins: [submitPostMixin],
  data() {
    return {
      postId: this.$route.params.id,

      editor: new Editor({
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        onUpdate: ({ getJSON, getHTML }) => {
          this.post.body = getHTML()
        },
      }),
    };
  },
  methods: {
    ...mapActions("posts", ["GET_POST", "EDIT_POST"]),

    searchImage(event) {
      this.file = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        this.tempUrl = e.target.result;
      };
    },

    setContent({ body, bodyJSON, mainImage }) {
      // you can pass a json document
      this.editor.setContent(body, true)
      this.mainImage = mainImage
    },
  },
  computed: {
    ...mapState("posts", ["post"]),
    ...mapState("auth", ["user"])
  },
  async created() {
    await this.GET_POST(this.postId);
    this.setContent(this.post);
  },
  beforeDestroy() {
    this.editor.destroy()
  },
};
</script>

<style lang="scss" scoped>
</style>