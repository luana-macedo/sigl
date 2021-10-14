<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer
      v-model="drawer"
      app
    >
            -->
    <!-- </v-navigation-drawer> -->

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            SIGL
          </v-list-item-title>
          <v-list-item-subtitle>
            Sistema Gerencial de Laboratório
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>ITPAC</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

  <div class="footer">
    <h2 class="text-footer">SIGL - SISTEMA INTEGRADO DE GERENCIAMENTO DE LABORATÓRIOS</h2>
  </div>

  </v-app>

  

</template>

<script>
  export default {
    data: () => ({ drawer: null,
      items: [
          { title: 'PERÍODO', icon: 'mdi-view-dashboard', to:'/' },
          { title: 'DISCIPLINA', icon: 'mdi-image', to:'/disciplinas' },
          { title: 'ACADÊMICO', icon: 'mdi-help-box', to:'/academico'},
          { title: 'PROFESSOR', icon: 'mdi-help-box', to:'/professor'},
          { title: 'SUBGRUPO', icon: 'mdi-help-box', to:'/subgrupo'},
          { title: 'MANUAL', icon: 'mdi-help-box', to:'/salas'},
          { title: 'AGENDAMENTO', icon: 'mdi-help-box', to:'/'},
          { title: 'EVIDÊNCIAS', icon: 'mdi-help-box', to:'/'},
          { title: 'SALA', icon: 'mdi-help-box', to:'/'},
          { title: 'STATUS', icon: 'mdi-help-box', to:'/'},
          { title: 'CALENDÁRIO', icon: 'mdi-help-box', to:'/'},
        ],
    }),
  }
</script>

<style scoped>
.footer{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #e11b22;
  color: white;
  text-align: center;
  font-family: Roboto, sans-serif;
  font-size: 9px;
}
.text-footer{
  padding: 12px;
}
</style>