<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { VMap, VMapOsmTileLayer, VMapZoomControl } from 'vue-map-ui';
import 'leaflet/dist/leaflet.css';
import 'vue-map-ui/dist/normalize.css';
import 'vue-map-ui/dist/style.css';
import 'vue-map-ui/dist/theme-all.css';


const route = useRoute()
const universityName = route.params.name
const universityData = ref('')
const address = ref('')
const center = ref('null')
const zoom = ref('18')
const isLoading = ref(true)
const error = ref('')

onMounted(async () => {
    const aiRequest = axios.post('https://api.mistral.ai/v1/chat/completions',
        {
            model: "mistral-small-latest",
            messages: [
                {
                    
                    role: "user",
                    content: `${universityName} Кратко на рассуком`
                    
                }
            ]
        },
        {
            headers: { 'Authorization': 'Bearer YFaOR8oiLoVJ44VPWLLmHGvSmYFUlEtF', 'Content-Type': 'application/json' }
        })

    const geocodingRequest = axios.get(`https://api.geoapify.com/v1/geocode/search?text=${universityName}&apiKey=b20b3bbc8d084e48aa3b79c7f6b66b10`)
    try {
        const [aiResponse, geocodingResponse] = await Promise.all([aiRequest, geocodingRequest])

        universityData.value = aiResponse.data.choices[0].message.content
        console.log(geocodingResponse.data);
        console.log('0')

        if (geocodingResponse.data.features.length > 0) {
            address.value = geocodingResponse.data.features[0].properties.address_line2
            const { lat, lon } = geocodingResponse.data.features[0].properties
            center.value = [lat, lon]
            console.log(lat, lon)
        } else {
            address.value = null
            center.value = [0, 0]
            console.log('2')
        }

    } catch (err) {
        error.value = "Ошибка при загрузке."
        console.error('Error:', err)
    } finally {
        isLoading.value = false
    }
})
</script>
<template>
<div class="ocnova">
    <p v-if="isLoading">Загрузка...</p>
    <p v-else-if="error">{{ error }}</p>
    <div v-else class="ocnova" >
      <h2 class="main" >{{universityName}}</h2>
        <div class="container">
                <div class=" opis">
                    {{ universityData }}
                    {{ geocodingResponse }}
                </div>
             <div class="vmap">
                <VMap :center = "center" :zoom="zoom">
                <VMapOsmTileLayer />
                <VMapZoomControl />
                </VMap>
            </div>

        </div>
</div>
       
    
    
</div>
</template>

<style scoped>

.ocnova{
    height: 100%;
    background-color: #EBF1F4;      
}
.container{
    display: flex;
    background-color: white;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    width: 80%; 
    height: auto;
    max-width: 1200px; 
    margin: 20px auto; 
    border-radius: 10px; 
    padding: 20px; 
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
  
}
.main{
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 20px;
}
.vmap{
    width: 45%;
    background-color: white;
    overflow: scroll;

}   
.opis{
overflow: scroll;
width: 50%; 
  padding: 20px;
  border-radius: 10px;
  height: auto;

}
</style>