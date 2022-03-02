<template>
  <div v-if="error" class="error">{{ error }}</div>

  <!-- the playlist -->
  <div v-if="playlist" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete">
        Delete the playlist
      </button>
    </div>
    <!-- the song -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">No song has been added yet.</div>
      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button v-if="ownership" @click="handleClick(song.id)">Delete</button>
      </div>
      <AddSong v-if="ownership" :playlist="playlist" />
    </div>
  </div>
</template>

<script>
import AddSong from "@/components/AddSong.vue";
import useStorage from "@/composables/useStorage";
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import getUser from "@/composables/getUser";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default {
  props: ["id"],
  components: { AddSong },
  setup(props) {
    const { error, document: playlist } = getDocument("playlists", props.id);
    const { user } = getUser();
    const { deleteDoc, updateDoc } = useDocument("playlists", props.id);
    const { deleteImage } = useStorage();
    const router = useRouter();

    const ownership = computed(() => {
      return (
        playlist.value && user.value && user.value.uid == playlist.value.userId
      );
    });

    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath);
      await deleteDoc();
      router.push({ name: "Home" });
    };

    const handleClick = async (id) => {
      const songs = playlist.value.songs.filter((song) => song.id != id);
      await updateDoc({ songs: songs });
    };

    return { error, playlist, ownership, handleDelete, handleClick };
  },
};
</script>

<style scoped>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 8em;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* max-width: 200%;
  max-height: 200%; */
  object-fit: cover;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 2em;
  margin-top: 1.5em;
}
.playlist-info p {
  margin-bottom: 1.5em;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}

.single-song {
  padding: 1em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 1.5em;
}
</style>
