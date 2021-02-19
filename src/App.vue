<template>
  <div id="app">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/admin">Login</router-link>
      </nav>
    <router-link></router-link>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
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
