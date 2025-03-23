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
            <input type="text" class="input" v-model="country" placeholder="">
            <button class="but" @click="Request">Отправить</button>
        </div>
        <div v-if="loading">Загрузка</div>
        <div v-else-if="error">Ошибка: {{ error }}</div>
        <div class="app3">
            <div v-for="university in universities" :key="university.name" class="app2"
                @click="routeToUni(university)">
                <h3>{{ university.name }}</h3>
                <p>Страна:<span :class="getflagclass(university.alpha_two_code)"></span></p>

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
    width: 300px;
    height: 200px;
    background-color: aliceblue;
}

.app3 {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
</style>
