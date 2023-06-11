<template>
  <div>
    <v-row class="ma-3 justify-center"><v-btn @click="subscribe">Subscribe!</v-btn></v-row>
    <v-row class="ma-3 justify-center"><v-btn @click="sprechen">Appbeschreibung</v-btn></v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    sprechen() {
      const utterance = new SpeechSynthesisUtterance(
        "Mit dieser App können sie ihre Erlebnise festhalten."
      );
      utterance.lang = "de";
      speechSynthesis.speak(utterance);
    },
    async subscribe() {
      if (!("serviceWorker" in navigator)) {
        console.log("no service worker!");
        return;
      }
      const publicVapidKey =
        "BCPvI1rIu5yU54i8lxf_ak4Cca7LfBM90UiMZ6Eda9u6OVxm0bPjN4Z9nOM9P2aLuHM3xMUd5AKGM4v6dhanfoU";
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(publicVapidKey),
      });
      await axios.post("/subscribe", subscription);
    },
    urlBase64ToUint8Array(base64String) {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    },
  },
};
</script>

<style lang="scss" scoped></style>
