<template>
  <main class="container mx-auto flex flex-col items-center bg-sylius-primary rounded-2xl self-center">
    <h3 class="text-center text-white text-2xl p-4 border-b w-4/5">Dev Team Roulette</h3>
    <ul class="text-center text-white text-2xl">
      <transition-group name="fade" tag="ul" class="text-center text-white text-2xl">
        <li @click="removeDev(index)" v-for="(dev, index) in devs" :key="dev.name"
            class="m-2 p-1 px-28 text-lg cursor-pointer
            hover:bg-rose-800 hover:line-through rounded-lg transition duration-300"
            :class="{'bg-sylius-medium rounded-lg': dev.isWinner}"
        >
            <p>{{dev.name}}</p>
        </li>
      </transition-group>
    </ul>
    <button :disabled="isDraw" @click="runRoll"
            class="border bg-sylius-primary drop-shadow-2xl text-white text-2xl rounded-lg p-1 m-4 w-60
            hover:bg-sylius-medium transition duration-300"
    >
      ROLL
    </button>
    <button @click="shuffle"
            class="border bg-sylius-primary drop-shadow-2xl text-white text-2xl rounded-lg p-1 m-4 w-60
            hover:bg-sylius-medium transition duration-300"
    >
      Shuffle
    </button>
  </main>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useCollection } from "vuefire";
import { db } from "@/firebase";
import { shuffle as _shuffle } from 'lodash-es'

const devs = useCollection(collection(db, 'devs'));

function shuffle() {
  devs.value = _shuffle(devs.value)
}

const isDraw = ref(false);
const removeDev = (index) => devs.value.splice(index, 1);

const runRoll = () => {
  isDraw.value = true
  if (devs.value.length === 0) {
    return;
  }
  const picks = Math.floor(Math.random() * devs.value.length) + devs.value.length;

  animate(picks);
  isDraw.value = false
};

const animate = (iterator) => {
  if (iterator === 0) {
    return;
  }

  setTimeout(() => {
    devs.value.forEach((dev) => {
      dev.isWinner = false;
    });
    animate(--iterator);
    devs.value[pickRandomDevId()].isWinner = true;
  }, 500 - (500 - iterator * 20));
}

const pickRandomDevId = () => {
  return Math.floor(Math.random() * devs.value.length);
}
</script>

<style scoped>
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}

</style>

