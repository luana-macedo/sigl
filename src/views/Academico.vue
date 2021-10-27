<template>
  <v-data-table
    :headers="titulos"
    :items="alunos"
    class="elevation-2 data-table"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Gerenciamento de Aluno</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="400px">
          <template v-slot:activator="{ on, attrs }" class="template-add">
            <!-- <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Adicionar</v-btn> -->
            <v-btn
              small
              class="mx-2 add"
              fab
              dark
              color="green"
              v-bind="attrs"
              v-on="on"
              ><v-icon dark> mdi-plus</v-icon></v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ tituloForm }}</span>
            </v-card-title>

            <v-card-text>
              <v-form v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="itemEditado.nome"
                        label="Nome"
                        :rules="[v => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>

                      <v-text-field
                        v-model="itemEditado.cpf"
                        label="CPF"
                        :rules="[v => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="itemEditado.matricula"
                        label="Matricula"
                        :rules="[v => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>

                      <v-text-field
                        v-model="itemEditado.email"
                        label="E-mail"
                        :rules="[v => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="itemEditado.telefone"
                        label="Telefone"
                        :rules="[v => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>
                    </v-col>
                     <v-col cols="8" sm="6" md="4">
                    </v-col>
                    <v-col cols="8" sm="6" md="4"> </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
               <v-btn small color="warning" dark @click="fechar">
                Cancelar
              </v-btn>
              <v-btn small color="primary" dark @click="salvar"> Salvar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="400px">
          <v-card class="card-modal">
            <v-card-title class="text-h6"
              >Deseja remover esta alunos ?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
               <v-btn small color="warning" dark @click="fecharDelete">Não</v-btn>
              <v-btn small color="primary" dark @click="deleteItemConfirm"
                >Sim</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Modal Detalhar 
        <v-dialog v-model="dialogDelete" max-width="400px">
          <v-card class="card-modal">
            <v-card-title class="text-h6"
              >nome</v-card-title>
 <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Apelido: </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
<v-list-item>
      <v-list-item-content>
        <v-list-item-title>nome: </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
            <v-card-actions>
              <v-btn small color="warning" dark @click="fecharDelete"
                >Sair</v-btn><v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
      </v-toolbar>
    </template>
    <template v-slot:item.acoes="{ item }">
      <v-icon v-icon small class="mr-2" @click="inicializar">
        mdi-message-text
      </v-icon>
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<style>
.add {
  width: 40px;
  height: 40px;
}
.template-add {
  padding-top: 1%;
}
.data-table {
  padding: 3%;
}
</style>
<script>

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios) 

var url = "http://api-sig-itpac-84633.herokuapp.com/api/aluno"

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    titulos: [
      {
        text: "Matricula",
        align: "start",
        value: "matricula",
      },
      { text: "Nome", value: "nome" },
      { text: "Ações", value: "acoes" },
    ],
    alunos: [],
    editIndice: -1,
    itemEditado: {
      matricula: "",
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
    },
    itemPadrao: {
      matricula: "",
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
    },
  }),

  computed: {
    tituloForm() {
      return this.editIndice === -1 ? "Cadastrar Academico" : "Editar Dados";
    },
  },

  watch: {
    dialog(val) {
      val || this.fechar();
    },
    dialogDelete(val) {
      val || this.fecharDelete();
    },
  },

  created() {
    this.inicializar();
  },

  methods: {
    inicializar() {
        axios.get(url, this.alunos).then(res => {
				this.alunos = res.data
				console.log(res.data)
			})
    },
    editItem(item) {
      this.editIndice = this.alunos.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editIndice = this.alunos.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.alunos.splice(this.editIndice, 1);
      this.fecharDelete();
    },

    fechar() {
      this.dialog = false;
      this.$nextTick(() => {
        this.itemEditado = Object.assign({}, this.itemPadrao);
        this.editIndice = -1;
      });
    },

    fecharDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.itemEditado = Object.assign({}, this.itemPadrao);
        this.editIndice = -1;
      });
    },

    salvar() {
      if (this.editIndice > -1) {
        Object.assign(this.alunos[this.editIndice], this.itemEditado);
      } else {
        this.alunos.push(this.itemEditado);
      }
      this.fechar();
    },
  },
};
</script>