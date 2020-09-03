<template>
  <div class="flex mx-auto items-center justify-center shadow-lg mt-32 mx-8 mb-4 max-w-md md:max-w-2xl">
    <form @submit.prevent="submitComment" class="w-full bg-white rounded-lg px-4 pt-2">
        <div class="flex flex-wrap -mx-3 mb-6">
          <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg">Agregar comentario</h2>
          <div class="w-full md:w-full px-3 mb-2 mt-2">
            <!-- <textarea class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Escribe tu comentario' required></textarea> -->
            <div class="CommentsBox__editor">
              <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }" class="mb-2">
                <div class="menubar flex justify-end">
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
                </div>
              </editor-menu-bar>
              <editor-content class="form-textarea mt-1 mb-6 block w-full" :editor="editor" />
            </div>
          </div>
          <div class="w-full md:w-full flex items-start md:w-full px-3 justify-end">
            <div class="-mr-1">
              <button type='submit' class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100">Publicar comentario</button>
            </div>
          </div>
        </div>
      </form>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
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
    name: "CommentsBox",
    props: ['postId'],
    components: {
      EditorContent,
      EditorMenuBar,
      EditorMenuBubble
    },
    data() {
      return {
        postComment: {
          body: "",
        },

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
            <h1>Agrega tu comentario aquí</h1>
          `,
          onUpdate: ({ getHTML }) => {
            this.postComment.body = getHTML()
          },
        }),
      }
    },
    methods: {
      ...mapActions('comments', ['ADD_COMMENT']),

      async submitComment() {
        const commentData = {
          body: this.postComment.body,
          postId: this.postId,
          timestamp: Date.now()
        }

        await this['ADD_COMMENT'](commentData)
        // alert("Comentario agregado satisfactoriamente")
        this.editor.setContent("")
      },
    }

  }
</script>

<style lang="scss" scoped>

</style>