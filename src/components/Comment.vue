<template>
    <div>
        <div class="top-area">
            <img :src=comment.avatar_url>
            <div class="user-area">
                <div class="upper-name-area">
                    <h5>{{comment.first_name}} {{comment.last_name}}</h5>
                    <div v-if="!check(comment.id)" class="star-area">
                        <button class="rate-button" v-on:click="rate(n, comment.id)" v-for="n in 5" v-bind:key="n"><font-awesome-icon class="star" :icon="fastar"/></button>
                    </div>
                </div>
                <p class="comment-date">{{comment.created_at}}</p>
            </div>
        </div>
        <div>
            <p>{{comment.content}}</p>
        </div>
        <Comment class="comment" v-for="child in comment.child" v-bind:key="child.id" :comment="child" />
    </div>
</template>


<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(VueAxios,axios)


export default {
    name: 'Comment',
    props: {comment:Object},
    components: {
        FontAwesomeIcon,
    },
    data() {
        return {
            fastar: faStar,
        }
    },
    methods: {
        check(id) {
            if(localStorage.rated !== undefined){
                let ratedItems = localStorage.rated.split(",")
                ratedItems.forEach(element => {
                    if(id.toString() === element) {
                        return true;
                    }
                });
            }
            return false;
        },
        rate(rating, id) {
            Vue.axios.post(`https://akademija.teltonika.lt/guestbook/index.php/reviews/${id}?rate=${rating}`)
            .then((resp) => {
                console.log(resp)
                if(localStorage.rated === undefined) {
                    localStorage.rated = id
                } else {
                    localStorage.rated = `${localStorage.rated},${id}`
                }
                this.$forceUpdate();
            })
        },
    }
}
</script>

<style scoped>
    .top-area {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 30px;
    }

    .top-area img {
        margin-right: 20px;
        height: 50px;
        width: 50px;
    }

    .star {
        color: rgb(211, 205, 205);
        font-size: 10px;
    }

    .upper-name-area {
        display: flex;
        align-items: center;
    }

    .upper-name-area h5 {
        margin: 0 10px 0 0;

    }
    .comment {
        padding-left: 40px;
        margin-top: 40px;
        border-left: 3px solid rgb(236, 239, 243);
    }
    .user-area {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 50px;
    }
    .comment-date {
        font-size: 13px;
        color: rgb(135, 137, 145);
        margin: 0;
    }

    .rate-button {
        background-color: #ffffffff;
        outline: none;
        border: none;
        cursor: pointer;
        width: 18px;
    }

    .rate-button:hover .star {
        color: rgb(228, 207, 19);
    }
</style>