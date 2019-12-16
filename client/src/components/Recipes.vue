<template>
  <div>
    <head-cook></head-cook>
    <div>
      <router-link v-bind:to="{ name: 'NewRecipe' }"><button type="button" class="btn btn-add">Add Recipe</button></router-link>
    </div>
    <div v-if="recipes.length > 0" class="wrap" :key="componentKey">
      <div v-for="recipe in recipes" :key="recipe.title" class="recipe">
        <router-link v-bind:to="{ name: 'Recipe', params: { id: recipe._id } }">
        <img :src="recipe.image" class="image" :alt="recipe.title">
        <p>{{ recipe.title }}</p>
        <p class="date">Created: {{ showDate(recipe.created) }}</p>
        </router-link>
        <div class="flex">
          <router-link v-bind:to="{ name: 'EditRecipe', params: { id: recipe._id } }"><button class="btn">Edit</button></router-link>
          <a href="#" @click="deleteRecipe(recipe._id)"><button class="btn">Delete</button></a>
        </div>
      </div>
    </div>
    <div v-else>
      There are no recipes.. Lets add one now <br /><br />
    </div>
  </div>
</template>

<script>
import RecipesService from '@/services/RecipesService'
import HeadCook from './HeadCook'

export default {
  name: 'recipes',
  components: {
    HeadCook
  },
  data () {
    return {
      recipes: [],
      componentKey: 0
    }
  },
  mounted () {
    this.getRecipes()
  },
  methods: {
    forceRerender () {
      this.componentKey += 1
    },
    showDate (date) {
      return date.slice(4, 15)
    },
    async getRecipes () {
      const response = await RecipesService.fetchRecipes()
      this.recipes = response.data.recipes
    },
    async deleteRecipe (id) {
      await RecipesService.deleteRecipe(id)
      this.$router.push({ name: 'Recipes' })
    }
  }
}
</script>
<style type="text/css" scoped>
.btn {
  width: 49.6%;
  height: 40px;
  cursor: pointer;
  font-size: 30px;
  text-transform: uppercase;
  color: rgb(53, 54, 54);
  border: none;
}
.btn-add {
  width: 80vw;
  margin: 30px auto;
}
.wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.recipe {
  width: 80%;
  max-width: 700px;
  margin: 0 auto;
  padding: 30px 0;
}
.image {
  width: 100%;
  max-width: 700px;
}
a {
  text-decoration: none;
  text-transform: uppercase;
  color: white;
  font-size: 20px;
}
.date {
  text-align: right;
  font-size: 14px;
  color: lightslategray;
}

@media (max-width: 450px) {
  .btn {
    width: 46%;
    height: 30px;
    font-size: 18px;
  }
  .btn-add {
    width: 80%;
  }
  .date {
    font-size: 10px;
  }
}
</style>
