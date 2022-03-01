<template>
  <Navbar />
  <div class="content">
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: { Navbar },
};
</script>

<style>
.content {
  margin: 0 auto;
  max-width: 80vw;
  padding: 0 1em;
}
</style>
