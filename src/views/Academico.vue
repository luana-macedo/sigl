<template>
  <v-data-table
    :headers="titulos"
    :items="alunos"
    :search="search"
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
                        v-model="itemEditado.pessoa.nome"
                        label="Nome"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>

                      <v-text-field
                        v-model="itemEditado.pessoa.cpf"
                        label="CPF"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="itemEditado.matricula"
                        label="Matricula"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>

                      <v-text-field
                        v-model="itemEditado.pessoa.email"
                        label="E-mail"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="itemEditado.pessoa.telefone"
                        label="Telefone"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>
                     <!--   <v-text-field
                        v-model="itemEditado.ativo"
                        label="Status"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field> -->

                    </v-col>
                    <v-col cols="8" sm="6" md="4"> </v-col>
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
              >Deseja desativar este aluno ?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="warning" dark @click="fecharDelete"
                >Não</v-btn
              >
              <v-btn small color="primary" dark @click="deleteItemConfirm"
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
      <v-icon small @click="deleteItem(item)"> mdi-power-standby </v-icon>
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
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

var url = "http://api-sig-itpac-84633.herokuapp.com/api/aluno";
var urlPatch = "http://api-sig-itpac-84633.herokuapp.com/api/aluno/desativar/"; 

export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    titulos: [
      { text: "Nome", value: "pessoa.nome" },
      { text: "CPF", value: "pessoa.cpf" },
      { text: "Telefone", value: "pessoa.telefone" },
      { text: "Email", value: "pessoa.email" },
      { text: "Matricula", value: "matricula" },
      { text: "Ações", value: "acoes" },
    ],
    alunos: [],
    editIndice: -1,
    itemEditado: {
      pessoa: {
        nome: "",
        cpf: "",
        telefone: "",
        email: "",
      },
      matricula: "",
      ativo: "",
    },
    itemPadrao: {
      pessoa: {
        nome: "",
        cpf: "",
        telefone: "",
        email: "",
      },
      matricula: "",
      ativo: "true",
    },
  }),
  computed: {
    tituloForm() {
      return this.editIndice === -1 ? "Cadastrar Academico" : "Editar Dados";
    },
  },
  props: {
    pessoa: {
      type: Object,
      default: function () {
        return {
          nome: "",
          cpf: "",
          telefone: "",
          email: "",
        };
      },
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
      axios.get(url, this.alunos).then((res) => {
        this.alunos = res.data;
        console.log(res.data);
      });
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
      if (this.editIndice > -1) {
       axios
          .patch(urlPatch + this.itemEditado.id, {
              pessoa: {
              nome: this.itemEditado.nome,
              cpf: this.itemEditado.cpf,
              email: this.itemEditado.email,
              telefone: this.itemEditado.telefone,
            },
            matricula: this.itemEditado.matricula, 
            ativo: this.itemEditado.ativo,
          })
          .then((res) => {
            this.alunos = res.data;
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
          .put(url + this.itemEditado.id, {
            pessoa: {
              nome: this.itemEditado.nome,
              cpf: this.itemEditado.cpf,
              email: this.itemEditado.email,
              telefone: this.itemEditado.telefone,
            },
            matricula: this.itemEditado.matricula,
            ativo: this.itemEditado.ativo,
          })
          .then((res) => {
            this.alunos = res.data;
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });

        Object.assign(this.alunos[this.editIndice], this.itemEditado);
      } else {
        axios
          .post(url, {
            pessoa: {
              nome: this.itemEditado.pessoa.nome,
              cpf: this.itemEditado.pessoa.cpf,
              email: this.itemEditado.pessoa.email,
              telefone: this.itemEditado.pessoa.telefone,
            },
            ativo: this.itemEditado.ativo,
            matricula: this.itemEditado.matricula,
          })
          .then((res) => {
            this.alunos = res.data;
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });

        this.alunos.push(this.itemEditado);
      }

      this.fechar();
    },
  },
};
</script>