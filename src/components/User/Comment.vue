<template>
    <div>
        <div class="top-area">
            <img :src=comment.avatar_url>
            <div class="user-area">
                    <div class="upper-name-area">
                        <h5>{{comment.first_name}} {{comment.last_name}}</h5>
                        <div v-show="!this.rated" class="star-area">
                            <button class="rate-button" v-on:click="rate(n)" v-for="n in 5" v-bind:key="n"><font-awesome-icon class="star" :icon="fastar"/></button>
                        </div>
                    </div>

                <p class="comment-date">{{comment.created_at}}</p>
            </div>
            <div class="action-container">
                <div v-show="canReply">
                    <button class="action-button" v-on:click="toggledReply = !toggledReply" >Reply</button>
                </div>
                <div v-if="this.author && this.canEdit">
                    <button class="action-button" v-on:click="deleteComment"><font-awesome-icon class="trash" :icon="fatrash"/></button>
                    <button class="action-button" v-on:click="toggle"><font-awesome-icon class="pencil" :icon="fapencil"/></button>
                </div>
            </div>
        </div>
        <div>
            <p class="content-text" v-show="!this.toggled">{{comment.content}}</p>
            <textarea class="textarea" required maxlength="300" v-show="this.toggled" v-model="content" /><button class="submit-button" v-show="this.toggled" v-on:click="updateComment">Submit</button>
        </div>
        <div class="reply-container" v-show="this.toggledReply">
            <h4><span v-if="this.loggedIn">Admin </span>Reply</h4>
            <textarea class="textarea" required maxlength="300" v-model="replyContent"/><button class="submit-button" v-on:click="reply">Submit</button>
        </div>
        <Comment v-on:inputChange="sendSignal" class="comment" v-for="child in comment.child" v-bind:key="child.id" :comment="child" :parent="comment"/>
    </div>
</template>


<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { faStar, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(VueAxios,axios)

const url = `https://akademija.teltonika.lt/guestbook/index.php`

export default {
    name: 'Comment',
    props: {comment: Object, parent: Object},
    components: {
        FontAwesomeIcon,
    },
    data() {
        return {
            fastar: faStar, fatrash: faTrash, fapencil: faPencilAlt, rated: false, loggedIn: false, author: false, content: "", toggled: false, replyContent: "", toggledReply: false, canReply: false, canEdit: true
        }
    },
    mounted() {
        if(this.parent.email === localStorage.email && this.comment.child.length === 0) {
            this.canReply = true
        }
        if(localStorage.jwt !== undefined && localStorage.email === 'admin@teltonika.lt') {
                this.canReply = true
        }
        this.comment.child.forEach(element => {
            if(element.email === 'admin@teltonika.lt') {
                this.canEdit = false
            }
        });
        if(localStorage.rated !== undefined){
            let ratedItems = localStorage.rated.split(",")
            ratedItems.forEach(element => {
                if(this.comment.id == element) {
                    this.rated = true
                }
            });
        }
        
        if(localStorage.email === this.comment.email) {
            this.author = true
        }
        if(localStorage.jwt !== undefined){
            this.loggedIn = true
            this.adminName = localStorage.name
        }
    },
    methods: {
        sendSignal() {
            this.$emit('inputChange')
        },
        reply() {
            this.toggledReply = false
            if(localStorage.jwt !== undefined && localStorage.email === "admin@teltonika.lt"){
                Vue.axios(`https://akademija.teltonika.lt/guestbook/index.php/reviews/adminanswer?admin_name=${localStorage.name}&content=${this.replyContent}&parent_id=${this.comment.id}`, {
                    method: 'post',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.jwt
                    }}
                ).then((resp) => {
                    console.log(resp)
                    this.$emit('inputChange')
                });
            } else {
                Vue.axios.post(url + `/reviews`, {
                    last_name: localStorage.surname,
                    first_name: localStorage.name,
                    email: localStorage.email,
                    content: this.replyContent,
                    parent_id: this.comment.id})
                .then((resp) => {
                    console.log(resp)
                    this.$emit('inputChange')
                });
            }

        },
        toggle() {
            this.toggled = !this.toggled
            this.content = this.comment.content
        },
        updateComment() {
            Vue.axios.put(url + `/reviews/${this.comment.id}`, {content: this.content})
            .then((resp) => {
                console.log(resp)
                this.toggled=false
                this.content=""
                this.$emit('inputChange')
            })
        },
        deleteComment() {
            Vue.axios.delete(url + `/reviews/${this.comment.id}`)
            .then((resp) => {
                console.log(resp)
                this.$emit('inputChange')
            })
        },
        toggleEdit() {
            this.toggled = true
        },
        rate(rating) {
            Vue.axios.post(url + `/reviews/${this.comment.id}`, { rate: rating })
            .then((resp) => {
                console.log(resp)
                if(localStorage.rated === undefined) {
                    localStorage.rated = this.comment.id
                } else {
                    localStorage.rated = `${localStorage.rated},${this.comment.id}`
                }
                this.rated = true
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

    .action-button:hover .trash, .action-button:hover .pencil {
        transition: 0.3s;
        color: rgb(41, 120, 223);
    }

    .action-button {
        background-color: #ffffffff;
        border: none;
        outline: none;
        cursor: pointer;
    }

    .trash, .pencil {
        color: gray;
    }

    .action-container {
        height: 100%;
        margin-bottom: 30px;
        margin-left: 10px;
        display: flex;
        align-items: center;
    }

    .content-text {
        color: gray;
    }

    .textarea {
        resize: none;
        width: 100%;
        height: 100px;
        border: 1px solid rgb(202, 202, 202);
        border-radius: 5px;
    }

    .submit-button {
        color: #ffffff;
        height: 30px;
        width: 100px;
        background-color: #1682e7;
        border: none;
        outline: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .reply-container {
        margin-left: 40px;
    }

    .reply-container h4 {
        color: gray;
        line-height: 10px;
        margin-bottom: 8px;
    }
</style>