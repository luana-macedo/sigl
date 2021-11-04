<template>
  <v-data-table 
  :headers="titulos" 
  :items="salas" 
  :search="search" 
  class="elevation-2">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Gerenciamento de Sala</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field class="barraPesquisa3"
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <!-- <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Adicionar</v-btn> -->
            <v-btn
              small
              class="mx-2 add"
              fab
              dark
              color="green"
              v-bind="attrs"
              v-on="on"
              ><v-icon dark> mdi-plus</v-icon></v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ tituloForm }}</span>
            </v-card-title>

            <v-card-text>
              <v-form>
                <v-container>
                  <v-row>
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="itemEditado.nome"
                        label="Nome"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="itemEditado.local"
                        label="Local"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="itemEditado.capacidade"
                        label="Capacidade"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="itemEditado.descricao"
                        label="Descrição"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="warning" dark @click="fechar">Cancelar</v-btn>
              <v-btn small color="primary" dark @click="salvar"> Salvar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDesativar" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Deseja desativar esta sala?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="warning" dark @click="fecharDesativar"> Não</v-btn>
              <v-btn small color="primary" dark @click="desativeItemConfirm">Sim</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.acoes="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="desativeItem(item)"> mdi-power-standby </v-icon>
    </template>
  </v-data-table>
</template>

<style>
.add {
  width: 5%;
  height: 5%;
}
body {
  padding: 2%;
}
.barraPesquisa3{
 padding-right: 950px;
}
</style>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

var url = "http://api-sig-itpac-84633.herokuapp.com/api/sala";
var urlPatch = "http://api-sig-itpac-84633.herokuapp.com/api/sala/desativar/";

export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDesativar: false,
    titulos: [
      { text: "Sala", value: "nome" },
      { text: "Local", value: "local" },
      { text: "Capacidade", value: "capacidade", sortable: false },
      { text: "Descrição", value: "descricao", sortable: false },
      { text: "Status", value: "ativo", sortable: false },
      { text: "Ações", value: "acoes", sortable: false },
    ],
    salas: [],
    editIndice: -1,
    itemEditado: {
      nome: "",
      local: "",
      capacidade: 0,
      descricao: "",
      ativo: "",
    },
    itemPadrao: {
      nome: "",
      local: "",
      capacidade: 0,
      descricao: "",
      ativo: true,
    },
  }),

  computed: {
    tituloForm() {
      return this.editIndice === -1 ? "Cadastrar Sala" : "Editar Sala";
    },
  },

  watch: {
    dialog(val) {
      val || this.fechar();
    },
    dialogDesativar(val) {
      val || this.fecharDesativar();
    },
  },

  created() {
    this.inicializar();
  },

  methods: {
    inicializar() {
      this.axios.get(url, this.salas).then((res) => {
        this.salas = res.data;
        console.log(res.data);
      });
    },
    editItem(item) {
      this.editIndice = this.salas.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialog = true;
    },

    desativeItem(item) {
      this.editIndice = this.salas.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialogDesativar = true;
    },

    desativeItemConfirm() {
      // this.salas.splice(this.editIndice, 1);

      axios.patch(urlPatch + this.itemEditado.id, {
       ativo: this.itemEditado.ativo}).then((res) => {
        this.salas = res.data;
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

      this.fecharDesativar();
    },

    fechar() {
      this.dialog = false;
      this.$nextTick(() => {
        this.itemEditado = Object.assign({}, this.itemPadrao);
        this.editIndice = -1;
      });
    },

    fecharDesativar() {
      this.dialogDesativar = false;
      this.$nextTick(() => {
        this.itemEditado = Object.assign({}, this.itemPadrao);
        this.editIndice = -1;
      });
    },

    salvar() {
      if (this.editIndice > -1) {
        axios
          .put(url, {
            id: this.itemEditado.id,
            nome: this.itemEditado.nome,
            local: this.itemEditado.local,
            capacidade: this.itemEditado.capacidade,
            descricao: this.itemEditado.descricao,
            ativo: this.itemEditado.ativo,
          })
          .then((res) => {
            this.salas = res.data;
            console.log(res.data);
          });

        Object.assign(this.salas[this.editIndice], this.itemEditado);
        alert("Os dados foram atualizados com sucesso !");
      } else {
        console.log(this.itemEditado);
        
        axios
          .post(url, {
            nome: this.itemEditado.nome,
            local: this.itemEditado.local,
            capacidade: this.itemEditado.capacidade,
            descricao: this.itemEditado.descricao,
            ativo: this.itemEditado.ativo,
          })
          .then((res) => {
            this.salas = res.data;
            console.log(res.data);
          });

        this.salas.push(this.itemEditado);
        alert("Os dados foram adicionados com sucesso !");
      }

      this.fechar();
    },
  },
};
</script>

