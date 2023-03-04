<template>
  <main class="container w-80 mx-auto flex gap-2 flex-col items-center bg-sylius-dark rounded-2xl">
    <p class="w-52 text-white text-center text-2xl p-4 border-b">Scoreboard</p>
    <ul class="text-center text-white text-lg">
      <li v-for="dev in sortedDevs" :key="dev.name">
        <p class="p-2">{{dev.name}}: {{dev.meetingsConducted}}</p>
      </li>
    </ul>
  </main>
</template>

<style scoped>
</style>
<script setup>
import { useCollection } from "vuefire";
import { collection } from "firebase/firestore";
import { db } from "@/firebase";
import {computed} from "vue";

const devs = useCollection(collection(db, 'devs'));

const sortedDevs = computed(() => {
  return devs.value.sort((a, b) => b.meetingsConducted - a.meetingsConducted);
});

</script>
