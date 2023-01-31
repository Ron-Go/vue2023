<template>
  <router-view></router-view>
</template>

<style lang="scss">

@import './assets/all.scss';
@import 'sweetalert2/src/sweetalert2.scss';


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: $green;
    }
  }
}
</style>

<script>
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const toAdmin = () => {
      router.push('/login');
    };
    return {
      toAdmin,
    };
  }
}

</script>