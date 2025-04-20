<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter()

</script>

<template>
 <div class="main">
    <button>Главная</button>
    <input type="search" name="search" placeholder="Поиск по сайту"> <input type="submit" value="Найти" class="submit">
    <button>Профиль</button>

 </div>

</template>

<style scoped>
main{
    background-color: black;
    width: 1280px;
    height: 720px; 
   
}
button{
    border: none;
     outline: none;
     opacity: 0.5;
}
.submit{
     border: none; 
    outline: none;
    opacity: 0.5;
}
</style>
