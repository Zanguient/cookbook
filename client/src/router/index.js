import Vue from 'vue'
import Router from 'vue-router'
import CookBook from '@/components/CookBook'
import Recipes from '@/components/Recipes'
import NewRecipe from '@/components/NewRecipe'
import EditRecipe from '@/components/EditRecipe'
import Recipe from '@/components/Recipe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CookBook',
      component: CookBook
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: Recipes
    },
    {
      path: '/recipes/new',
      name: 'NewRecipe',
      component: NewRecipe
    },
    {
      path: '/edit/:id',
      name: 'EditRecipe',
      component: EditRecipe
    },
    {
      path: '/recipe/:id',
      name: 'Recipe',
      component: Recipe
    }
  ]
})
