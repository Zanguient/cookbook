<template>
  <div class="posts">
    <h1>{{ title }}</h1>
    <img :src="image"/>
    <p>Description: {{ description }}</p>
    <p>Created: {{ showDate(created) }}</p>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'EditPost',
  data () {
    return {
      title: '',
      description: '',
      image: '',
      created: ''
    }
  },
  mounted () {
    this.getPost()
  },
  methods: {
    showDate (date) {
      return date.slice(4, 15)
    },
    async getPost () {
      const response = await PostsService.getPost({
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
</style>
