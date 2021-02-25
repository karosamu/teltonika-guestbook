<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
  .h1 {
    color: #a8a8a8;
    font-weight: normal;
    font-size: 25px;
    line-height: 50px;
    border-bottom: 2px solid #a8a8a8;
    margin-bottom: 50px;
  }
  .box-shadow {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    margin-top: 50px;
  }
  body {
    margin: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgb(236, 239, 243);
    overflow-x: hidden;
  }
</style>
