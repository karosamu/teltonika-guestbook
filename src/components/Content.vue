<template>
    <div class="container box-shadow">
        <div class="title-div">
            <img class="image" height="50px" src="https://logos-download.com/wp-content/uploads/2019/11/Teltonika_Logo.png" alt="">
            <span class="spacer"></span>
            <h1 class="title">Svečių knyga</h1>
        </div>
        <Input/>
        <Comments/>
    </div>
</template>

<script>
import Input from './Input'
import Comments from './Comments'

export default {
  name: 'Content',
  components: {
    Input,
    Comments
  }
}
</script>

<style scoped>
  .title {
    color: rgb(30, 116, 228);
    font-weight: normal;
    padding-left: 20px;
    border-left: 4px solid rgb(30, 116, 228);
  }
  .image {
    margin-right: 25px;
  }
  .title-div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    margin-left: 40vw;
    align-items: center;
  }
  .container {
      width: 60vw;
  }
  .box-shadow {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
  }
</style>