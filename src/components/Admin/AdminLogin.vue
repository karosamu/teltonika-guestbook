<template>
    <div>
        <form v-if="!loggedIn" v-on:submit.prevent="onSubmit" id="input" class="login-container box-shadow">
            <h1 class="h1">Admin login</h1>
            <label class="login-label">Password</label>
            <input class="login-input" required type="password" v-model="password">
            <div class="login-button">
                <button class="send-button">Log-in</button>
            </div>
        </form>
        <form v-if="loggedIn" v-on:submit.prevent="changeName" id="username" class="login-container box-shadow">
            <h1 class="h1">Admin panel</h1>
            <label class="login-label">Username</label>
            <input class="login-input" required type="username" v-model="name">
            <div class="login-button">
                <button class="send-button">Set</button>
                <button class="send-button logout" v-on:click="logout">Logout</button>
                <button class="send-button back" v-on:click="goBack">To reviews</button>
            </div>
        </form>
    </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

const url = `https://akademija.teltonika.lt/guestbook/index.php`


Vue.use(VueAxios,axios)
export default {
    data() {
        return {password: "", loggedIn: false, name: ""}
    },
    methods: {
        onSubmit() {
            Vue.axios.post(url + `/login`, {password: this.password})
            .then((resp) => {
                console.log(resp)
                localStorage.jwt = resp.data.token
                localStorage.name = "admin"
                localStorage.surname = ""
                localStorage.email = "admin@teltonika.lt"
                this.password = ""
                this.loggedIn = true
                this.name = localStorage.name
                localStorage.removeItem("rated")
            })
            return false;
        },
        changeName() {
            localStorage.name = this.name
        },
        logout() {
            localStorage.name = ""
            localStorage.email = ""
            localStorage.surname = ""
            localStorage.removeItem("jwt")
            localStorage.removeItem("rated")
            this.$router.push("/")
        },
        goBack() {
            this.$router.push("/")
        }
    },
    mounted() {
        this.name = localStorage.name
        if(localStorage.jwt != undefined) {
            this.loggedIn = true
        }
    }
}
</script>

<style scoped>
    div h1, input, label, button {
        margin: 10px;
    }
    form {
        padding: 20px;
        width: 300px;
    }

    .login-label {
        margin-bottom: 2px;
        color: gray;
    }

    .login-container {
        display: flex;
        flex-direction: column;
    }
    .login-button {
        width: 100%;
        justify-content: center;
        display: flex;
    }
    .send-button {
        background-color: rgb(0, 132, 255);
        color: white;
        border: none;
        outline: none;
        height: 30px;
        width: 100px;
        border-radius: 5px;
        cursor: pointer;
    }

    .login-input {
        margin-top: 2px;
        margin-bottom: 50px;
        border: 1px solid rgb(185, 185, 185);
        border-radius: 5px;
        height: 30px;
    }

    .logout {
        background-color: rgb(224, 63, 63);
    }

    .back {
        background-color: rgb(84, 156, 55);
    }
</style>