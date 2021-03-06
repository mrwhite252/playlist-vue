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
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";
export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);
    // upload image
    const { url, filePath, uploadImage } = useStorage();

    // setup new collection of playlist
    const { error, addDoc } = useCollection("playlists");

    // get the id of the user
    const { user } = getUser();

    const router = useRouter();

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp(),
        });
        isPending.value = false;
        if (!error.value) {
          router.push({ name: "PlaylistDetails", params: { id: res.id } });
        }
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

    return {
      title,
      description,
      handleSubmit,
      handleChange,
      fileError,
      isPending,
    };
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
