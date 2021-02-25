<template>
  <div>
      <div class="title-div">
        <img class="image" height="40px" src="https://logos-download.com/wp-content/uploads/2019/11/Teltonika_Logo.png" alt="">
        <span class="spacer"></span>
        <h1 class="title">Svečių knyga</h1>
      </div>
      <div class="container box-shadow">
          <Comments/>
      </div>
  </div>
      
</template>

<script>
import Comments from './Comments'

export default {
  name: 'Content',
  data() {
    return {loggedIn: false}
  },
  mounted() {

  },
  components: {
    Comments
  }
}
</script>

<style scoped>
  .container {
      width: max(600px, 70vw);
      padding: 10px 0;
  }
  .title {
    color: rgb(30, 116, 228);
    font-weight: normal;
    padding-left: 20px;
    border-left: 3px solid rgb(30, 116, 228);
  }
  .image {
    margin-right: 25px;
  }
  .title-div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    align-items: center;
  }
</style>