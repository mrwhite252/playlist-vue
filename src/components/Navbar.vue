<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/logo-img.svg" />
      <h1><router-link :to="{ name: 'Home' }">My Playlist</router-link></h1>
      <div class="links">
        <button @click="handleClick">Log Out</button>
        <router-link class="btn" :to="{ name: 'Signup' }">Sign Up</router-link>
        <router-link class="btn" :to="{ name: 'Login' }">Log In</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "@/composables/useLogout";

import { useRouter } from "vue-router";

export default {
  setup() {
    const { logout } = useLogout();

    const router = useRouter();

    const handleClick = async () => {
      await logout();
      console.log("the user is logged out");
      router.push({ name: "Login" });
    };

    return { handleClick };
  },
};
</script>

<style scoped>
.navbar {
  padding: 1em;
  margin-bottom: 4em;
  background: white;
}

nav {
  display: flex;
  align-items: center;
  max-width: 80vw;
  margin: 0 auto;
}

nav h1 {
  margin-left: 1.5em;
}

nav .links {
  margin-left: auto;
}

nav .links a,
button {
  margin-left: 1em;
  font-size: 0.8rem;
}

nav img {
  max-height: 4em;
}
</style>
