import { storage } from "@/plugins/firebase";

export const submitPostMixin = {
  data() {
    return {
      file: null,
      tempUrl: null,
      loadingState: false,
      mainImage: null,
    }
  },

  methods: {
    async submitPost(postData, vuexAction) {
      this.loadingState = true;
    
      try {
        if (this.file) {
          const refImage = storage
            .ref()
            .child(`${postData.title}__${this.user.email}`)
            .child("Post main image");
          // const res = await refImage.put(this.file);
          this.mainImage = await refImage.getDownloadURL();
        }
    
        this[vuexAction]({ ...postData, mainImage: this.mainImage });
      } catch (error) {
        console.error(error);
      } finally {
        this.loadingState = false;
        this.file = null;
      }
    }
  }
}

