<template>
  <div class="w-full max-w-screen-sm">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Crear artículo</h1>
    </div>
    <form @submit.prevent="submitPost">
      <div
        v-if="loadingState"
        class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"
      ></div>

      <input type="file" ref="uploadImageBtn" @change="searchImage($event)" />

      <div v-if="file && tempUrl">
        <h4>{{ file.name }}</h4>
        <img width="300" :src="tempUrl" alt="file.name" />
      </div>

      <label class="block mb-4">
        <span class="text-gray-700">Título del artículo</span>
        <input
          class="form-input mt-1 block w-full"
          type="text"
          placeholder="Este es el título"
          v-model="title"
        />
      </label>

      <label class="block mb-4">
        <span class="text-gray-700">Subtítulo del artículo</span>
        <input
          class="form-input mt-1 block w-full"
          type="text"
          placeholder="Y aquí el subtítulo"
          v-model="subtitle"
        />
      </label>

      <!-- <label class="block mb-4">
        <span class="text-gray-700">Cuerpo del artículo</span>
        <textarea
          class="form-textarea mt-1 block w-full"
          rows="3"
          placeholder="Escribe tu super artículo aquí"
          v-model="body"
        ></textarea>
      </label> -->

      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar flex">
          <button type="button" class="px-2" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
            Bold
          </button>
          <button type="button" class="px-2" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
            Strike
          </button>
        </div>
      </editor-menu-bar>
      <editor-content class="form-textarea mt-1 mb-6 block w-full" :editor="editor" />

      <label class="flex justify-end mb-4">
        <button
          class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
          type="submit"
        >Publicar</button>
      </label>
    </form>
    
    <div class="actions">
      <button class="button" @click="clearContent">
        Clear Content
      </button>
      <button class="button" @click="setContent">
        Set Content
      </button>
    </div>

    <div class="export">
      <h3>JSON</h3>
      <pre><code v-html="json"></code></pre>

      <h3>HTML</h3>
      <pre><code>{{ html }}</code></pre>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { storage, db } from "@/plugins/firebase";
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

export default {
  name: "AddPost",
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble
  },
  data() {
    return {
      title: "",
      subtitle: "",
      file: null,
      tempUrl: null,
      loadingState: false,
      mainImage: null,
      body: null,

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
        content: `
          <h1>Yay Headlines!</h1>
          <p>All these <strong>cool tags</strong> are working now.</p>
        `,
        onUpdate: ({ getJSON, getHTML }) => {
          this.json = getJSON()
          this.html = getHTML()
        },
      }),

      json: 'Update content to see changes',
      html: 'Update content to see changes',
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    ...mapActions("posts", ["ADD_POST"]),

    searchImage(event) {
      console.log(event.target.files[0]);
      this.file = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        console.log(e.target.result);
        this.tempUrl = e.target.result;
      };
    },

    async submitPost() {
      this.loadingState = true;

      const postData = {
        title: this.title,
        subtitle: this.subtitle,
        body: this.html,
        likes: [],
      };

      try {
        if (this.file) {
          const refImage = storage
            .ref()
            .child(`${this.title}__${this.user.email}`)
            .child("Post main image");
          const res = await refImage.put(this.file);
          this.mainImage = await refImage.getDownloadURL();
        }

        this.ADD_POST({ ...postData, mainImage: this.mainImage });
      } catch (error) {
        console.error(error);
      } finally {
        this.loadingState = false;
        this.file = null;
      }
    },

    clearContent() {
      this.editor.clearContent(true)
      this.editor.focus()
    },
    setContent() {
      // you can pass a json document
      this.editor.setContent({
        type: 'doc',
        content: [{
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is some inserted text. 👋',
            },
          ],
        }],
      }, true)
      // HTML string is also supported
      // this.editor.setContent('<p>This is some inserted text. 👋</p>')
      // this.editor.focus()
    }
  },

  beforeDestroy() {
    this.editor.destroy()
  },
};
</script>

<style lang="scss" scoped>
</style>