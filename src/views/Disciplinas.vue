<template>
  <v-data-table :headers="titulos" :items="disciplinas" :search="search" class="elevation-2">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Gerenciamento de Disciplina</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field class="barraPesquisa"
          v-model="pesquisa"
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
                        :rules="['Campo Obrigatório']"
                        maxlenght="20"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="itemEditado.apelido"
                        label="Apelido"
                        :rules="['Campo Obrigatório']"
                        maxlenght="20"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="itemEditado.ativo"
                        label="Status"
                        :rules="['Campo Obrigatório']"
                        maxlenght="20"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="8" sm="6" md="4"> 
                      <v-select
                        v-model="select"
                        :items="disciplina"
                        :error-messages="errors"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        label="Disciplina"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-select
                        v-model="select1"
                        :items="professor"
                        :error-messages="errors"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        label="Professor"
                        required
                      ></v-select>
                    </v-col> -->
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
              >Deseja remover esta disciplina?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="warning" dark @click="fecharDelete"
                >Não</v-btn
              >
              <v-btn small color="primary" dark @click="desativeItemConfirm"
                >Sim</v-btn
              >
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
  width: 40px;
  height: 40px;
}
.template-add {
  padding-top: 1%;
}
.data-table {
  padding: 3%;
}
#card-actions {
  padding-left: 18%;
}
.card-modal {
  text-align: center;
}

.barraPesquisa{
    padding-right:930px;
}
</style>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

var url = "http://api-sig-itpac-84633.herokuapp.com/api/disciplina";
var urlPatch = "http://api-sig-itpac-84633.herokuapp.com/api/disciplina/3";

export default {
  data: () => ({
  search: "",
    dialog: false,
    dialogDelete: false,
    titulos: [
      {
        text: "Apelido",
        align: "start",
        value: "nome",
      },
      { text: "Disciplina", value: "nome" },
      { text: "Status", value: "ativo" },
      { text: "Professor", value: "professor" },
      { text: "Período", value: "periodo" },
      { text: "Ações", value: "acoes" },
    ],
    disciplinas: [],
    editIndice: -1,
    itemEditado: {
      nome: "",
      apelido: "",
      ativo: "",
    },
    itemPadrao: {
      nome: "",
      apelido: "",
      ativo: true,
    },

    /* select: null,
    disciplina: ["Item 1", "Item 2", "Item 3", "Item 4"],
    select1: null,
    professor: ["Item 1", "Item 2", "Item 3", "Item 4"], */
  }),

  computed: {
    tituloForm() {
      return this.editIndice === -1 ? "Cadastrar disciplina" : "Editar Dados";
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
      this.axios.get(url, this.disciplinas).then((res) => {
        this.disciplinas = res.data;
        console.log(res.data);
      });
    },

    editItem(item) {
      this.editIndice = this.disciplinas.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialog = true;
    },

    desativeItem(item) {
      this.editIndice = this.disciplinas.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialogDelete = true;
    },

    desativeItemConfirm() {
      this.disciplinas.splice(this.editIndice, 1);

      axios.patch(urlPatch + this.itemEditado.id, {
       nome: this.itemEditado.nome,
       ativo: this.itemEditado.ativo,
       apelido: this.itemEditado.apelido,
      }).then((res) => {
        this.disciplinas = res.data;
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    this.fecharDelete();
       if (this.editIndice > -1) {
       axios
          .patch(urlPatch + this.itemEditado.id, {
            nome: this.itemEditado.nome,
            ativo: this.itemEditado.ativo,
            apelido: this.itemEditado.apelido,
          })
          .then((res) => {
            this.disciplinas = res.data;
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      this.fecharDelete();
      }
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
        axios
          .put(url, {
            id: this.itemEditado.id,
            nome: this.itemEditado.nome,
            ativo: this.itemEditado.ativo,
            apelido: this.itemEditado.apelido,
          })
          .then((res) => {
            this.disciplinas = res.data;
            console.log(res.data);
          });

        Object.assign(this.disciplinas[this.editIndice], this.itemEditado);
      } else {
        axios.post(url, {nome: this.itemEditado.nome,ativo: this.itemEditado.ativo, apelido: this.itemEditado.apelido,})
          .then((res) => {
            this.disciplinas = res.data;
            console.log(res.data);
          });

        this.disciplinas.push(this.itemEditado);
      }

      this.fechar();
    },
  },
};
</script>