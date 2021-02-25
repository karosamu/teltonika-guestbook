<template>
<div>

  <Input v-on:inputSubmitted="refetch(page)" v-show="!this.loggedIn"/>
  <div id="comments">
    <h1 class="h1">Atsiliepimai</h1>
    <div v-if="loaded">
      <Comment
        v-on:inputChange="refetch(page)"
        class="parent-comment"
        v-for="comment in list"
        v-bind:key="comment.id"
        :comment="comment"
        :parent="{}"
      />
    </div>
    <div class="paginator">
      <button v-on:click="refetch(n)" v-for="n in pages" v-bind:key="n">
        {{ n }}
      </button>
    </div>
  </div>
</div>
</template>

<script>
import Input from './Input'
import Comment from "./Comment";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

const url = `https://akademija.teltonika.lt/guestbook/index.php`

Vue.use(VueAxios, axios);

export default {
  name: "Comments",
  data() {
    return { list: undefined, loaded: false, page: 1, total: 0, pages: 0, loggedIn: false };
  },
  mounted() {
    if(localStorage.jwt !== undefined) {
      this.loggedIn = true
    }
    Vue.axios
      .get(url + `/reviews`)
      .then((resp) => {
        this.total = resp.data.reviews.length;
        this.pages = Math.ceil(this.total / 12);
      });

    Vue.axios
      .get( url + `/reviews?offset=${(this.page-1)*12}&limit=12`)
      .then((resp) => {
        this.list = resp.data.reviews;
        this.loaded = true;
      });
  },
  methods: {
    refetch(id) {
      this.page = id;
      Vue.axios
        .get( url + `/reviews?offset=${(this.page-1)*12}&limit=12`)
        .then((resp) => {
          this.list = resp.data.reviews;
          this.loaded = true;
        });
    },
  },
  components: {
    Comment,
    Input
  },
};
</script>

<style scoped>
#comments {
  margin: 50px;
}
.parent-comment {
  margin-bottom: 50px;
}

.paginator {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.paginator button {
  background-color: #ffffffff;
  border: 1px solid #aeaeae;
  border-radius: 2px;
}

.paginator button:not(:last-child) {
  margin-right: 10px;
}
</style>