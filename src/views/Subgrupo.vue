<template>
  <v-data-table :headers="titulos" :items="subgrupos"  :search="search" class="elevation-2">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Gerenciamento de Subgrupo</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field class="barraPesquisa"
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
            <v-btn small
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
                    </v-col>
                    <v-col cols="8" sm="6" md="4"> 
                      <v-select
                        v-model="select2"
                        :items="status"
                        :error-messages="errors"
                        label="Status"
                        data-vv-name="select"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        maxlenght="20"
                        required
                      ></v-select>
                    </v-col>
                   <!-- <v-col cols="8" sm="6" md="4">
                      <v-select
                          v-model="select"
                           :items="prof"
                            :error-messages="errors"
                            :rules="[v => !!v || '*Campo Obrigatório*']"
                             label="Professor"
                            required
                            ></v-select>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-select
                          v-model="select1"
                           :items="disc"
                           :error-messages="errors"
                            :rules="[v => !!v || '*Campo Obrigatório*']"
                             label="Disciplina"
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
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Deseja remover este Subgrupo?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="warning" dark @click="fecharDelete"
                >Não</v-btn
              >
              <v-btn small color="primary" dark  @click="deleteItemConfirm"
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
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
.add {
  width: 40px;
  height: 40px;
}
.template-add{
  padding-top:1%;
}
.data-table {
  padding: 3%;
}
#card-actions{
   padding-left:18%;
}
.card-modal{
  text-align: center;
}
.barraPesquisa{
    padding-right: 830px;
}
</style>

<script>

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

var url = "http://api-sig-itpac-84633.herokuapp.com/api/subgrupo"
var urlPatch = "http://api-sig-itpac-84633.herokuapp.com/api/subgrupo/desativar/"; 

export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    titulos: [
      {
        text: "Subgrupo",
        align: "center",
        value: "nome",
      },
      {
        text: "Professor",
        align: "center",
        value: "professor",
      },
      {
        text: "Disciplina",
        align: "center",
        value: "disciplina",
      },
      {
        text: "Status",
        align: "center",
        value: "ativo",
      },
      { text: "Ações", 
        align:"center", 
        value: "acoes", 
        sortable: false },
    ],
    subgrupos: [],
    editIndice: -1,
    itemEditado: {
      nome: "",
      ativo: "",
    /*   professor: "",
      disciplina:"", */
    },
    itemPadrao: {
      nome: "",
      ativo: true,
   /*    professor: "",
      disciplina:"", */
    },
     select2: null,
     status: ["true", "false"],
  }),

  computed: {
    tituloForm() {
      return this.editIndice === -1 ? "Cadastrar Subgrupo" : "Editar Subgrupo";
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
      this.axios.get(url, this.subgrupos).then((res) => {
        this.subgrupos = res.data;
        console.log(res.data);
      }).catch((error) => {
        console.log(error);
      });

    },
 
   mounted() {
    this.inicializar();
   },

    editItem(item) {
      this.editIndice = this.subgrupos.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editIndice = this.subgrupos.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.subgrupos.splice(this.editIndice, 1);
      if (this.editIndice > -1) {
       axios
          .patch(urlPatch + this.itemEditado.id, {
              pessoa: {
              nome: this.itemEditado.nome,
            },
            ativo: this.itemEditado.ativo,
          })
          .then((res) => {
            this.subgrupos = res.data;
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      this.fecharDelete()
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
        axios.put(url,{ id : this.itemEditado.id, nome : this.itemEditado.nome, ativo: this.itemEditado.ativo}).then(res => {
				this.subgrupos = res.data
				console.log(res.data)
			}).catch((error) => {
        console.log(error);
      });
        Object.assign(this.subgrupos[this.editIndice], this.itemEditado);
      } else {
        axios.post(url,{nome: this.itemEditado.nome,ativo: this.itemEditado.ativo}).then(res => {
				this.subgrupos = res.data
				console.log(res.data)
			}).catch((error) => {
        console.log(error);
      });
        this.subgrupos.push(this.itemEditado);
      }
      this.fechar();
    },
  },
};
</script>
