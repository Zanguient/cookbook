<template>
  <div>
    <head-cook></head-cook>
    <div class="add">
      <h1>Add Recipe</h1>
      <div class="form">
        <div>
          <input type="text" name="title" placeholder="TITLE" v-model="title">
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
        </div>
        <div>
          <input @change="updateImage" class="hide_input" id="image" type="file" accept=".jpg, .jpeg, .png" name="upload-image">
          <label for="image"><div class="design-plus"></div></label>
          <img :src="image" class="image">
        </div>
        <div>
          <button class="app_recipe_btn" @click="addRecipe">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipesService from '@/services/RecipesService'
import HeadCook from './HeadCook'

export default {
  name: 'NewRecipe',
  components: {
    HeadCook
  },
  data () {
    return {
      title: '',
      description: '',
      image: ''
    }
  },
  methods: {
    updateImage (e) {
      const file = e.target.files[0]
      this.createImage(file)
    },
    createImage (file) {
      let reader = new FileReader()
      let vm = this
      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async addRecipe () {
      await RecipesService.addRecipe({
        title: this.title,
        description: this.description,
        image: this.image
      })
      this.$router.push({ name: 'Recipes' })
    }
  }
}
</script>
<style scoped>
.add {
  color: white;
  width: 80%;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}
.form input, .form textarea {
  width: 70vw;
  max-width: 900px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_recipe_btn {
  color:  rgb(53, 54, 54);
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 70vw;
  max-width: 900px;
  border: none;
  cursor: pointer;
}
.image {
  width: 70vw;
  max-width: 900px;
}
.design-plus {
  border: 2px dashed rgba(255, 255, 255, 0.5);
  width: 80px;
  height: 80px;
  margin: 0 auto;
  border-radius: 3px;
  cursor: pointer;
  background: url("../assets/plus.png");
  background-size: 40px;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  left: 0;
}
.hide_input {
  display: none;
}
</style>
