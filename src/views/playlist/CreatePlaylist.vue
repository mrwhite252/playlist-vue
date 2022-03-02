<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input
      type="text"
      placeholder="Enter the title of the playlist"
      required
      v-model="title"
    />
    <textarea
      placeholder="Description of the playlist..."
      required
      v-model="description"
    ></textarea>

    <!-- upload cover image -->
    <label>Upload playlist cover image</label>
    <input type="file" @change="handleChange" />
    <div class="error">{{ fileError }}</div>
    <button>Create</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";

import useStorage from "@/composables/useStorage";
export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);

    // upload image
    const { url, filePath, uploadImage } = useStorage();

    const handleSubmit = async () => {
      if (file.value) {
        await uploadImage(file.value);
        console.log("image uploaded, url: ", url.value);
      }
    };

    const types = ["image/png", "image/jpeg", "image/jpg", "image/svg"];

    const handleChange = (e) => {
      const selected = e.target.files[0];

      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value =
          "Please select the correct format (png, jpeg, jpg, svg)";
      }
    };

    return { title, description, handleSubmit, handleChange, fileError };
  },
};
</script>

<style scoped>
input[type="file"] {
  padding: 0;
  border: none;
}

label {
  font-size: 0.8rem;
  display: block;
  margin-top: 2.5em;
}

button {
  margin-top: 2em;
}
</style>
