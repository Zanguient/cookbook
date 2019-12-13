<template>
  <div class="posts">
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
          <div class="col-md-2">
            <img :src="image">
          </div>
          <label for="image" class="design-plus"></label>
        </div>
        <div>
          <button class="app_post_btn" @click="addPost">Add</button>
        </div>
      </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'NewPost',
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
    async addPost () {
      await PostsService.addPost({
        title: this.title,
        description: this.description,
        image: this.image
      })
      this.$router.push({ name: 'Posts' })
    }
  }
}
</script>
<style type="text/css" scoped>
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
.design-plus {
  border: 2px dashed rgba(0, 0, 0, 0.2);
  width: 120px;
  height: 120px;
  border-radius: 3px;
  cursor: pointer;
  background-image: url("../assets/plus.png");
  background-repeat: no-repeat;
  background-position: center;
  margin: 20px 0 20px 43px;
}
.hide_input {
  display: none;
}
</style>
