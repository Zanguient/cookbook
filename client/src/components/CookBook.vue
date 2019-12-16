<template>
  <div class="cookbook">
    <p class="main-title">
      <router-link v-bind:to="{ name: 'Recipes' }" class="route">Cookbook</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Cookbook',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.cookbook {
  background-image: url('../assets/black.jpg');
  background-position: center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
.main-title {
  position: relative;
  margin: auto;
  top: 45%;
  font-size: 10vw;
  font-weight: 500
}
.route {
  text-decoration: none;
  color: white;
}
</style>
