<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="pa-4">
            Mapa de Rotas em Tempo Real
          </v-card-title>
          <v-card-text>
            <div style="height: 600px; width: 100%;">
              <l-map ref="map" v-model:zoom="zoom" :center="center">
                <l-tile-layer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  layer-type="base"
                  name="OpenStreetMap"
                  attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                ></l-tile-layer>
                <l-marker :lat-lng="[-23.5505, -46.6333]"></l-marker>
                <l-marker :lat-lng="[-22.9068, -43.1729]"></l-marker>
              </l-map>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Importar os componentes do vue-leaflet
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

// ==========================================================
// --- CORREÇÃO DO BUG DO ÍCONE (MUITO IMPORTANTE) ---
// ==========================================================
// Importar o Leaflet 'puro' para corrigir os ícones
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';

// Esta 'mágica' corrige um bug do Leaflet com o Vite/Webpack
// onde ele não encontra os ícones de marcador padrão.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});
// --- FIM DA CORREÇÃO DO ÍCONE ---


export default {
  name: 'MapaView',
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      zoom: 7, 
      center: [-23.5505, -46.6333], // São Paulo
    };
  },
  
  // --- CORREÇÃO DO MAPA EM BRANCO (RECALCULAR TAMANHO) ---
  mounted() {
    this.$nextTick(() => {
      // Usamos um 'setTimeout' para dar 100% de certeza 
      // que a animação do Vuetify/Roteador terminou
      setTimeout(() => {
        if (this.$refs.map) {
          // Acessa o mapa Leaflet 'real' e força ele a recalcular seu tamanho
          this.$refs.map.leafletObject.invalidateSize();
        }
      }, 500); // Delay de 500 milissegundos (meio segundo)
    });
  }
}
</script>

<style>
/* Isso corrige um bug comum onde os "azulejos" do mapa não carregam direito */
.leaflet-container {
  z-index: 1;
}
</style>