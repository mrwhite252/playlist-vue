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
    <input type="file" />
    <button>Create</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const title = ref("");
    const description = ref("");

    const handleSubmit = () => {
      console.log(title.value, description.value);
    };

    return { title, description, handleSubmit };
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
