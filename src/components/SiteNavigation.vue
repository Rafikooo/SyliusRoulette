<template>
  <header class="sticky top-0 w-screen border-b border-stone-600 bg-white">
    <nav class="container mx-auto flex flex-row items-center gap-7 text-white py-5">
      <RouterLink :to="{name: 'home'}">
        <div class="flex items-center gap-3 px-4">
          <img alt="Sylius logo" src="@/assets/logo.png"
               class="object-contain h-10 w-10"
          />
          <p class="text-sylius-dark text-xl">SyliusLabs</p>
        </div>
      </RouterLink>
      <label for="password" class="text-black">Auth:</label>
      <input
        id="password"
        type="password"
        v-model="localPassword"
        @input="$emit('update:password', $event.target.value)"
        class="border border-2 rounded-lg text-black px-2"
      >
      <button @click="signInWithPassword" value="Confirm" class="text-black border rounded-lg px-2">Sign in</button>
      <button @click="signOutUser" value="Sign out" class="text-black border rounded-lg px-2">Sign out</button>
      <div class="justify-self-end">
          <i class="fa-sharp fa-solid fa-gear text-2xl hover:cursor-pointer duration-150 text-black"></i>
      </div>
    </nav>
  </header>
</template>
:value="dosage"

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

const emit = defineEmits(["update:password"]);

const props = defineProps({
  signInWithPassword: { type: Function, required: true },
  signOutUser: { type: Function, required: true },
  password: { type: String, required: true },
});

const localPassword = ref("");

// watch for changes to the password prop and update the localPassword ref accordingly
watch(() => localPassword, (newValue) => {
  console.log("Site nav event", newValue, localPassword);
  emit("update:password", newValue);
});

const signInWithPassword = () => {
  console.log("Site nav", localPassword.value);
  props.signInWithPassword(localPassword.value);
};

const signOutUser = () => {
  props.signOutUser();
};
</script>
