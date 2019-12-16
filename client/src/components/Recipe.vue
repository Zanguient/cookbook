<template>
  <div>
    <head-cook></head-cook>
    <div class="recipe">
      <h1>{{ title }}</h1>
      <img :src="image" class="image" :alt="title"/>
      <p>Description: {{ description }}</p>
      <p class="date">Created: {{ showDate(created) }}</p>
    </div>
  </div>
</template>

<script>
import RecipesService from '@/services/RecipesService'
import HeadCook from './HeadCook'

export default {
  name: 'EditRecipe',
  components: {
    HeadCook
  },
  data () {
    return {
      title: '',
      description: '',
      image: '',
      created: ''
    }
  },
  mounted () {
    this.getRecipe()
  },
  methods: {
    showDate (date) {
      return date.slice(4, 15)
    },
    async getRecipe () {
      const response = await RecipesService.getRecipe({
        id: this.$route.params.id
      })
      this.title = response.data.title
      this.description = response.data.description
      this.image = response.data.image
      this.created = response.data.created
    }
  }
}
</script>
<style type="text/css" scoped>
.recipe {
  color: white;
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
}
h1 {
  margin: 50px;
  font-size: 60px;
}
.image {
  width: 100%;
  margin-bottom: 30px;
}
p {
  text-align: justify;
}
.date {
  text-align: right;
  font-size: 14px;
  color: lightslategray;
}

@media (max-width: 600px) {
  h1 {
    font-size: 30px;
  }
}
</style>
