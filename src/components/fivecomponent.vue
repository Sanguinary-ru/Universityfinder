<script setup>
import axios from "axios";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter()
const universities = ref([]);
const loading = ref(false);
const error = ref(null);
const country = ref('russia');

function getflagclass(countryCode) {
    return "fi fi-" + countryCode.toLowerCase();
}
const Request = async () => {
    loading.value = true;
    error.value = null;

    try {
        const response = await axios.get(`http://universities.hipolabs.com/search?name=${country.value}`);
        universities.value = response.data;
    } catch (err) {
        console.error('Ошибка:', error);
    } finally {
        loading.value = false;
    }
};


function routeToUni(item) {
    console.log(item.name);
    router.push({ name: 'opis', params: { name: item.name } })
}
</script>

<template>
    <div class="app1">
        <p>

        <div class="app4">
            <ui>
            <p style="display: flex; justify-content: center; align-items: center; margin-bottom: 10%;">База данных университета</p>
            <p><input type="text" class="input" v-model="country" placeholder="" style="color: white; background-color: #EA9A62; opacity:0.5;"> 
            <button class="but" @click="Request" style="color: white; background-color: #EA9A62;">Отправить</button>
            </p>
        </ui>
        </div>
        <div v-if="loading">Загрузка</div>
        <div v-else-if="error">Ошибка: {{ error }}</div>
        <div class="app3">
            
            <div v-for="university in universities" :key="university.name" class="app2"
                @click="routeToUni(university)">
                <ui>
                <p style="font-weight: bold;"><h3>Название университета: {{ university.name }}</h3></p>
                <p>Страна в которой он находится:<span :class="getflagclass(university.alpha_two_code)"></span></p>
            </ui>

            </div>
        </div>
        </p>
    </div>
</template>

<style scoped>
.app1 {
    border-radius: 10px;
    gap: 10px;

    align-items: center;
}

.input {
    width: 200px;
    height: 52px;
    border-radius: 10px;
    font-size: 20px;
}

.but {
    width: 120px;
    height: 58px;
    border-radius: 10px;
    margin-left: 5px;
    font-size: 20px;
}

.app2 {
    width: 800px;
    height: 100px;
    background-color: aliceblue;
}

.app3 {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.app4 {
 display: flex;
 justify-content: center;
 align-items: center;
 width:540px ;
 height:300px ;
 margin-left: 33%;
 background-color: white;
 border-radius: 10px;
 margin-bottom: 2.5%;
 margin-top: 2.5%;
}
div{
    display: flex;
  justify-content: center;
  align-items: center;  
  background-color: #EBF1F4;
}
body{
    background-color: #EBF1F4;
}

</style>
