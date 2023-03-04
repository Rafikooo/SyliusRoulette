<template>
  <div class="flex flex-col gap-y-12 min-h-screen font-Roboto bg-sylius-medium">
    <SiteNavigation v-model:password="password" :signInWithPassword="signInWithPassword" :signOutUser="signOutUser" />

    <DevTeamRoulette v-if="user" :devs="devs" />

    <ScoreBoard v-if="user" />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import DevTeamRoulette from "@/components/DevTeamRoulette.vue";
import { RouterView } from "vue-router";
import SiteNavigation from "@/components/SiteNavigation.vue";
import ScoreBoard from "@/components/ScoreBoard.vue";
import {signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
import {auth, db} from "@/firebase";
import {collection, getDocs} from "firebase/firestore";
import {onMounted, ref} from "vue";

const password = ref('');
const devs = ref([]);
const user = ref();

const signInWithPassword = () => {
  devsAuth();
}
const devsAuth = async () => {
  console.log("Password: ", password.value);
  await signInWithEmailAndPassword(auth, 'PLACEHOLDER', password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User: ", user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error: ", errorCode, errorMessage);
    });
  const querySnapshot = await getDocs(collection(db, 'devs'));
  const m_devs: any = [];
  querySnapshot.forEach((doc) => {
    m_devs.push({id: doc.id, ...doc.data()});
  });
  devs.value = m_devs.sort((a: any, b: any) => a.name.localeCompare(b.name));
  // devs.value.forEach((dev: any) => console.log(dev));
}

onMounted(async () => {
  // await devsAuth();
});

const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error(error);
  }
};

// listen for auth state changes
onAuthStateChanged(auth, (authUser) => {
  user.value = authUser;
});


</script>

<style lang="scss" scoped>
</style>
