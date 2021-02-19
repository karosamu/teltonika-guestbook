<template>
  <div id="comments">
    <h1 class="h1">Atsiliepimai</h1>
    <div v-if="loaded">
      <Comment
        class="parent-comment"
        v-for="comment in list"
        v-bind:key="comment.id"
        :comment="comment"
      />
    </div>
    <div class="paginator">
      <button v-on:click="refetch(n)" v-for="n in pages" v-bind:key="n">
        {{ n }}
      </button>
    </div>
  </div>
</template>

<script>
import Comment from "./Comment";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  name: "Comments",
  data() {
    return { list: undefined, loaded: false, page: 1, total: 0, pages: 0 };
  },
  mounted() {
    Vue.axios
      .get(`https://akademija.teltonika.lt/guestbook/index.php/reviews`)
      .then((resp) => {
        this.total = resp.data.reviews.length;
        this.pages = Math.ceil(this.total / 12);
      });

    Vue.axios
      .get(
        `https://akademija.teltonika.lt/guestbook/index.php/reviews?offset=${this.page}&limit=12`
      )
      .then((resp) => {
        this.list = resp.data.reviews;
        this.loaded = true;
      });
  },
  methods: {
    refetch(id) {
      this.page = id;
      Vue.axios
        .get(
          `https://akademija.teltonika.lt/guestbook/index.php/reviews?offset=${this.page}&limit=12`
        )
        .then((resp) => {
          this.list = resp.data.reviews;
          this.loaded = true;
        });
    },
  },
  components: {
    Comment,
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
  border-radius: 3px;
}

.paginator button:not(:last-child) {
  margin-right: 5px;
}
</style>