<template>
  <v-app id="inspire">

    <v-navigation-drawer v-model="drawer" app>
      <v-list-item 
        :prepend-avatar="userStore.userPhotoUrl"
        :title="userStore.userName" 
        subtitle="Menu Principal"
      ></v-list-item>
      
      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="/" color="blue-darken-1"></v-list-item>
        <v-list-item prepend-icon="mdi-truck-delivery" title="Entregas" to="/entregas" color="orange-darken-1"></v-list-item>
        <v-list-item prepend-icon="mdi-map-marker" title="Mapa de Rotas" to="/mapa" color="red-darken-1"></v-list-item>
        <v-list-item prepend-icon="mdi-account-group" title="Clientes" to="/clientes" color="green-darken-1"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Painel de Controle</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-btn icon>
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>

      <v-btn icon to="/perfil">
        <v-avatar v-if="userStore.userPhotoUrl" size="36">
          <v-img :src="userStore.userPhotoUrl" alt="Foto do usuário"></v-img>
        </v-avatar>
        <v-icon v-else>mdi-account-circle</v-icon>
      </v-btn>
      </v-app-bar>

    <v-main class="bg-grey-lighten-2">
      <router-view />
    </v-main>

  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/user' // 1. Importamos o "cérebro"

// 2. Inicializamos o "cérebro"
const userStore = useUserStore()

// 3. Controlamos o menu lateral
const drawer = ref(true)

// 4. 'onMounted' é executado assim que o app carrega
onMounted(() => {
  // 5. Dizemos ao "cérebro" para buscar os dados do Supabase
  userStore.fetchUserProfile()
})
</script>
<style>
  .v-navigation-drawer .v-list-item:hover {
    transition: all 0.2s ease-in-out;
    transform: translateX(4px);
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .v-navigation-drawer .v-list-item:hover .v-icon {
    transition: transform 0.2s ease-in-out;
    transform: scale(1.2);
  }
</style>