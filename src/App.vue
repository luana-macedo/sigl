<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
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

    <!-- <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>ITPAC</v-toolbar-title>
    </v-app-bar> -->
    
    <!-- ALTERAR COR DO FUNDO E IMAGEM -->
    <v-app-bar
      app
      color="#F3F3F3"
    >      
    <!-- CONTROLE DA IMAGEM -->

    <!--
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        width="120px"
        height="50px"
        background-position="center"
      ></v-img>
    </template>
    -->
      <v-app-bar-nav-icon  @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title><img src="./assets/img/itpac-logo.png" class="logo-itpac"></v-app-bar-title>

      <v-spacer></v-spacer>
        <img src="./assets/img/exit-to-app.png" class="sair">
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
          { title: 'PERÍODO', icon: 'mdi-view-dashboard', to:'/periodo' },
          { title: 'DISCIPLINA', icon: 'mdi-book-multiple', to:'/disciplinas' },
          { title: 'ACADÊMICO', icon: 'mdi-badge-account', to:'/academico'},
          { title: 'PROFESSOR', icon: 'mdi-account-tie', to:'/professor'},
          { title: 'SUBGRUPO', icon: 'mdi-account-group', to:'/subgrupo'},
          { title: 'MANUAL', icon: 'mdi-folder-cog', to:'/manuais'},
          { title: 'AGENDAMENTO', icon: 'mdi-notebook-edit', to:'/agendamento'},
          { title: 'EVIDÊNCIAS', icon: 'mdi-page-next', to:'/evidencias'},
          { title: 'SALA', icon: 'mdi-google-classroom', to:'/salas'},
          { title: 'STATUS', icon: 'mdi-list-status', to:'/status'},
          { title: 'CALENDÁRIO', icon: 'mdi-calendar-month-outline', to:'/calendario'},
        ],
    }),
  }
</script>

<style scoped>
.footer{
  position: relative;
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
.logo-itpac{
  padding-top: 2.5%;
  width:25%;
  height: 25%;
}
.sair{
  width:24px;
  height: 24px;
}
</style>