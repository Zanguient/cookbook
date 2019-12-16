<template>
    <div class="cookbook">
      <router-link v-bind:to="{ name: 'Recipes' }"><h1>Cookbook</h1></router-link>
    </div>
</template>
<script>
export default {
  name: 'head-cook'
}
</script>
<style scoped>
a {
  text-decoration: none;
  text-transform: uppercase;
  color: white;
}
.cookbook {
  background-image: url('../assets/black.jpg');
  background-position: center;
  background-size: cover;
  padding: 5vw;
  color: white;
  font-size: 50px;
  text-transform: uppercase;
}

@media (max-width: 800px) {
  .cookbook {
    font-size: 30px;
    padding: 10vw;
  }
}

@media (max-width: 450px) {
  .cookbook {
    font-size: 16px;
    padding: 15vw;
  }
}
</style>
