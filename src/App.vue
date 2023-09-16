<template>
  <v-app id="bg">
    <v-app-bar app color="primary" elevation="4" class="m-4">
      <v-app-bar-nav-icon color="secondary" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <!-- <router-link :to= "'/'" > -->
       
        <v-toolbar-title color="textoNegro">Hoy, cocino yo!</v-toolbar-title>
      <!-- </router-link> -->
      <v-spacer></v-spacer>

    </v-app-bar>
  
    <v-main >
      <v-navigation-drawer
      color="rosa"
      v-model="drawer"
      absolute
      temporary
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="./../public/img/foto_perfil_mabe.jpeg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Mabel Rodriguez</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          
          <router-link 
            v-for="item in items"
            :key="item.title"
            link
            :to= item.ruta
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="secondary">{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          
        </v-list>
      </v-navigation-drawer>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
      return {
        drawer: null,
        items: [
          { title: 'Home', icon: 'mdi-view-dashboard',ruta:'/' },
          { title: 'Cargar receta', icon: 'mdi-pen',ruta:'/formReceta' },
          { title: 'Recetas guardadas', icon: 'mdi-bookmark',ruta:'/recetasGuardadas' },
        ],
      }
    },
  
};
</script>
<style>
  #bg{
    background:#FFF8F7;
  }
</style>