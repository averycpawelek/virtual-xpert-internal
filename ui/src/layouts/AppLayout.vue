<template>
  <div id="app-container" :class="getMenuType">
    <topnav />
    <main>
      <div class="container-fluid">
        <slot></slot>
      </div>
    </main>
    <footer-component />
  </div>
</template>

<script>
import Topnav from "../containers/navs/Topnav";
import Footer from "../containers/navs/Footer";
import { mapGetters } from "vuex";

export default {
  components: {
    topnav: Topnav,
    "footer-component": Footer
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapGetters(["getMenuType"])
  },
  mounted() {
    setTimeout(() => {
      document.body.classList.add("default-transition");
    }, 100);
  }
};
</script>
