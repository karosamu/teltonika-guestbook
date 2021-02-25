<template>
    <form v-on:submit.prevent="onSubmit" id="input">
        <h1 class="h1">Atsiliepimo forma</h1>
        <div class="upper-input">
            <div class="input-flex">
                <label>Vardas</label>
                <input maxlength="40" v-model="name" required class="input upper">
            </div>
            <div class="input-flex">
                <label>Pavardė</label>
                <input maxlength="40" v-model="surname" required class="input upper">
            </div>
            <div class="input-flex">
                <label>E-paštas</label>
                <input maxlength="60" v-model="email" type="email" required class="input upper">
            </div>
        </div>
        <label>Atsiliepimas</label>
        <textarea v-model="content" required class="input lower" maxlength="300"/>
        <div class="button-container">
            <button class="send-button">Siųsti</button>
        </div>
    </form>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

const url = `https://akademija.teltonika.lt/guestbook/index.php`

Vue.use(VueAxios,axios)

export default {
    
    data() {
        return {name: "", surname: "", email: "", content: ""}
    },
    mounted() {
        if(localStorage.name != undefined) this.name = localStorage.name
        if(localStorage.surname != undefined) this.surname = localStorage.surname
        if(localStorage.email != undefined) this.email = localStorage.email 
    },
    methods: {
        onSubmit() {
            Vue.axios.post(url + `/reviews`, {
                last_name: this.surname,
                first_name: this.name,
                email: this.email,
                content: this.content})
            .then((resp) => {
                console.log(resp)
                if(localStorage.email !== this.email) {
                    localStorage.removeItem('rated')
                }
                localStorage.name = this.name
                localStorage.surname = this.surname
                localStorage.email = this.email
                this.content=""
                this.$emit('inputSubmitted')
            })
            return false;
        }
    }
}
</script>

<style scoped>
    #input {
        margin: 50px;
        display: flex;
        flex-direction: column;
    }
    .input {
        margin-bottom: 20px;
        border: 1px solid #e7e7e7;
        border-radius: 5px;
        resize: none;
    }
    .upper {
        height: 30px;
        width: 90%;
    }
    .lower {
        height: 100px;
    }
    label {
        font-size: 14px;
        color: gray;
    }
    .upper-input {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .send-button {
        width: 100px;
        height: 30px;
        background-color: rgb(30, 116, 228);
        color: white;
        border-radius: 5px;
        border: none;
        outline: none;
        cursor: pointer;
    }
    .button-container {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .input-flex {
        display: flex;
        flex-direction: column;
    }
</style>