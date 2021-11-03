<template>
  <v-data-table
    :headers="titulos"
    :items="professores"
    :search="search"
    class="elevation-2"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Gerenciamento de Professores</v-toolbar-title>
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
                        v-mask="'###.###.###-##'"
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
                        v-mask="'(##)#####-####'"
                        label="Telefone"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="8" sm="6" md="4">
                      <v-select
                          v-model="select1"
                           :items="status"
                            :error-messages="errors"
                             label="Status"
                            :rules="[(v) => !!v ||'Campo Obrigatório']"
                            maxlenght="20"
                            required
                            ></v-select>
                     </v-col> -->
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
        <v-dialog v-model="dialogDesativar" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Deseja desativar este professor?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="warning" dark @click="fecharDesativar"
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
  width: 5%;
  height: 5%;
}
body {
  padding: 2%;
}
</style>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

var url = "http://api-sig-itpac-84633.herokuapp.com/api/professores";
var url2 = "http://api-sig-itpac-84633.herokuapp.com/api/professores/desativar"
// var url3 = "http://api-sig-itpac-84633.herokuapp.com/api/professores/ativar/1";

export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDesativar: false,
    titulos: [
      { text: "Nome", value: "pessoa.nome" },
      { text: "CPF", value: "pessoa.cpf" },
      { text: "Telefone", value: "pessoa.telefone" },
      { text: "Email", value: "pessoa.email" },
      { text: "Matricula", value: "matricula" },
      { text: "Status", value: "ativo" },
      { text: "Ações", value: "acoes" },
    ],
   professores: [],
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
      ativo: true,
    },
   // select1: null,
    // status: ["ativo", "inativo"],
  }),
  computed: {
    tituloForm() {
      return this.editIndice === -1 ? "Cadastrar Professor" : "Editar Dados";
    },
  },
  props: {
    pessoa: {
      type: Object,
     default: function() {
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
    dialogDesativar(val) {
      val || this.fecharDesativar();
    },
  },

  created() {
    this.inicializar();
  },

  methods: {
    inicializar() {
      axios.get(url, this.professores).then((res) => {
        this.professores = res.data;
        console.log(res.data);
      });
    },
    editItem(item) {
      this.editIndice = this.professores.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialog = true;
    },

    desativeItem(item) {
      this.editIndice = this.professores.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialogDesativar = true;
    },

    desativeItemConfirm() {

      if (this.editIndice > -1) {
       axios
          .patch(url2 + this.itemEditado.id, {
            ativo: this.itemEditado.ativo,
          })
          .then((res) => {
            this.professores = res.data;
            alert("O professor foi desativado com sucesso !");
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } 
        this.fecharDesativar();

      }
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
        .put(url,{
          id: this.itemEditado.id,
          pessoa: {
            id: this.itemEditado.id,
            nome: this.itemEditado.nome,
            cpf: this.itemEditado.cpf,
            telefone: this.itemEditado.telefone,
            email: this.itemEditado.email,
            },
            matricula: this.itemEditado.matricula,
            ativo: this.itemEditado.ativo,
          })
          .then((res) => {
            this.professores = res.data;
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });

        Object.assign(this.professores[this.editIndice], this.itemEditado);
        alert("Os dados foram atualizados com sucesso !");
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
            this.professores = res.data;
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });

        this.professores.push(this.itemEditado);
        alert("Os dados foram adicionados com sucesso !");
      }

      this.fechar();
    },
};
</script>
