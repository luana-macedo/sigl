<template>
  <v-data-table
    :headers="titulos"
    :items="periodos"
    :search="search"
    class="elevation-2 data-table"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Gerenciamento de Período</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-ster></v-ster>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="400px">
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
                        v-model="itemEditado.periodo"
                        label="Periodo"
                        v-mask="'####/##'"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>
                      <!-- <v-text-field
                        v-model="itemEditado.dataCadastro"
                        label="Data de Cadastro"
                        v-mask="'####-##-##'"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field> -->
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
              <v-btn 
              small color="primary" 
              :disabled="!valid"
              class="mr-4"
              @click="salvar">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDesativar" max-width="450px">
          <v-card>
            <v-card-title class="text-h5"
              >Deseja {{mudarStatus}} este período?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color=" warning" dark @click="fecharDesativar"
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
    <template v-slot:[`item.acoes`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)" color="blue"> mdi-pencil </v-icon>
      <v-icon small @click="desativeItem(item)" color="red"> mdi-power-standby </v-icon>
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

.data-table {
  padding: 3%;
}
</style>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

var url = "http://api-sig-itpac-84633.herokuapp.com/api/periodo";
var urlPatch = "http://api-sig-itpac-84633.herokuapp.com/api/periodo/desativar/";
var urlDispatch = "http://api-sig-itpac-84633.herokuapp.com/api/periodo/ativar/";

export default {
  data: () => ({
    search: "",
    valid: true,
    dialog: false,
    dialogDesativar: false,
    titulos: [
      {
        text: "Periodo",
        align: "center",
        value: "periodo",
      },
      {
        text: "Data Cadastro",
        align: "center",
        value: "dataCadastro",
      },
      {
        text: "Status",
        align: "center",
        value: "ativo",
      },
      { text: "Ações", align: "center", value: "acoes" },
    ],
    periodos: [],
    editIndice: -1,
    itemEditado: {
      id: null,
      periodo: "",
      dataCadastro: "",
      ativo: true,
    },
    itemPadrao: {
      id: null,
      periodo: "",
      dataCadastro: "",
      ativo: true,
    },
  }),

  computed: {
    tituloForm() {
      return this.editIndice === -1 ? "Cadastrar Periodo" : "Editar Dados";
    },
    mudarStatus() {
      return this.itemEditado.ativo == "Ativado" ? "desativar " : "ativar";
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
      axios.get(url, this.periodos).then((res) => {
        this.periodos = res.data.map(p => {
          p.ativo = (p.ativo?"Ativado":"Desativado")
          return p;
        });
        console.log(res.data);
      });
    },

    reloadPage() {
      window.location.reload();
    },

    validate () {
      this.$refs.form.validate()
    },

    editItem(item) {
      this.editIndice = this.periodos.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialog = true;
    },

    desativeItem(item) {
      this.editIndice = this.periodos.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialogDesativar = true;
    },

    desativeItemConfirm() {
      if (this.itemEditado.ativo == "Ativado") {
      axios
        .patch(urlPatch + this.itemEditado.id, {
          id: this.itemEditado.id,
          // dataCadastro: this.itemEditado.dataCadastro,
          ativo: false,
        })
        .then((res) => {
          alert("O período foi desativado com sucesso !");
          console.log(res.data);
          this.reloadPage();
        })
        .catch((error) => {
          console.log(error);
        });
    }
         else {
       axios
          .patch(urlDispatch + this.itemEditado.id, {
            ativo: true,
          })
          .then((res) => {
            console.log(res.data);
            alert("O período foi ativado com sucesso !");
             this.reloadPage();
          })
          .catch((error) => {
            console.log(error);
          });
          }
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
            periodo: this.itemEditado.periodo,
            ativo: this.itemEditado.ativo === "Ativado",
          })
          .then((res) => {
            //this.periodos = res.data
            alert("Os dados foram atualizados com sucesso !");
            console.log(res.data);
          });
        Object.assign(this.periodos[this.editIndice], this.itemEditado);
      } else {
        axios
          .post(url, {
            periodo: this.itemEditado.periodo,
            ativo: true,
          })
          .then((res) => {
            this.periodos = res.data;
            alert("Os dados foram adicionados com sucesso !");
            console.log(res.data);
            this.reloadPage();
          });
        this.periodos.push(this.itemEditado);
      }

      this.fechar();
    },
  },
};
</script>
