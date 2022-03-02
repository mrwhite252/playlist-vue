<template>
  <div v-if="error" class="error">{{ error }}</div>

  <div v-if="playlist" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
    </div>
    <div class="song-list">
      <p>song list here</p>
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";

export default {
  props: ["id"],

  setup(props) {
    const { error, document: playlist } = getDocument("playlists", props.id);

    return { error, playlist };
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
</style>
