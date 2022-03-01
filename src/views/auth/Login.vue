<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button>Log in</button>
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script>
import useLogin from "@/composables/useLogin";
import { ref } from "@vue/reactivity";

export default {
  setup() {
    const { error, login } = useLogin();

    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);

      if (!error.value) {
        console.log("the user is logged in");
      }
    };

    return { email, password, handleSubmit, error };
  },
};
</script>

<style></style>
