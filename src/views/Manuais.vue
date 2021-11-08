<template>
  <v-data-table
    :headers="titulos"
    :items="manuais"
    :search="search"
    class="elevation-2 data-table"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Gerenciamento de Manuais</v-toolbar-title>
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
        <v-dialog v-model="dialog" max-width="350px">
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
              <span class="text-h6">Adicionar Manual</span>
            </v-card-title>

            <v-card-text>
              <v-form>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="8">
                      <v-text-field
                        v-model="itemEditado.descricao"
                        label="Descrição"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="8">
                      {{ itemEditado.fileName }}
                      <v-file-input
                        truncate-length="18"
                        v-model="itemEditado.fileName"
                        label="Arquivo"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions id="card-actions">
              <v-btn small color="warning" dark @click="fechar">
                Cancelar
              </v-btn>
              <v-btn small color="primary" dark @click="salvar"> Salvar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogEditar" max-width="350px">
          <v-card>
            <v-card-title>
              <span class="text-h6">Editar Descrição</span>
            </v-card-title>

            <v-card-text>
              <v-form>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="8">
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
            <v-card-actions id="card-actions">
              <v-btn small color="warning" dark @click="fecharEditar">
                Cancelar
              </v-btn>
              <v-btn small color="primary" dark @click="salvar"> Salvar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDesativar" max-width="400px">
          <v-card class="card-modal">
            <v-card-title class="text-h6"
              >Deseja {{ mudarStatus }} este manual ?</v-card-title
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
    <template v-slot:[`item.acoes`]="{ item }">
      <v-icon small class="mr-2" @click="editDescricao(item)" color="blue">mdi-pencil</v-icon>
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
</style>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

var url = "http://api-sig-itpac-84633.herokuapp.com/api/manual";
var urlPatch = "http://api-sig-itpac-84633.herokuapp.com/api/manual/desativar/";
var urlDispatch = "http://api-sig-itpac-84633.herokuapp.com/api/manual/ativar/";

export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogEditar: false,
    dialogDesativar: false,
    titulos: [
      {
        text: "Descrição",
        align: "center",
        value: "descricao",
      },
      { text: "Arquivo", align: "center", value: "fileName" },
      { text: "Status", align: "center", value: "ativo" },
      { text: "Ações", align: "center", value: "acoes" },
    ],
    manuais: [],
    editIndice: -1,
    itemEditado: {
      id: null,
      descricao: "",
      fileName: "",
      ativo: true,
    },
    itemPadrao: {
      id: null,
      descricao: "",
      fileName: "",
      ativo: true,
    },
  }),
  
   computed: {
      mudarStatus() {
      return this.itemEditado.ativo == true ? "desativar " : "ativar manual";
    },
   },
 

  watch: {
    dialog(val) {
      val || this.fechar();
    },

    dialogEditar(val) {
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
      axios.get(url, this.manuais).then((res) => {
        this.manuais = res.data;
        console.log(res.data);
      });
    },

    reloadPage() {
      window.location.reload();
    },

    /* editItem(item) {
      this.editIndice = this.manuais.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialog = true;
    }, */

    editDescricao(item) {
      this.editIndice = this.manuais.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialogEditar = true;
    },

    desativeItem(item) {
      this.editIndice = this.manuais.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialogDesativar = true;
    },

    desativeItemConfirm() {
      // this.manuais.splice(this.editIndice, 1);
      if (this.itemEditado.ativo == true) {
        axios
          .patch(urlPatch + this.itemEditado.id, {
            ativo: this.itemEditado.ativo,
          })
          .then((res) => {
            // this.manuais = res.data;
            console.log(res.data);
            alert("O manual foi desativado com sucesso !");
            this.reloadPage();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .patch(urlDispatch + this.itemEditado.id, {
            ativo: this.itemEditado.ativo,
          })
          .then((res) => {
            console.log(res.data);
            alert("O manual foi ativado com sucesso !");
            this.reloadPage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.fecharDesativar();
    },

    fechar() {
      this.dialogEditar = false;
      this.$nextTick(() => {
        this.itemEditado = Object.assign({}, this.itemPadrao);
        this.editIndice = -1;
      });
    },

    fecharEditar() {
      this.dialogEditar = false;
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
      const formData = new FormData();

      formData.set("descricao", this.itemEditado.descricao);

      if (this.editIndice > -1) {
        axios.patch(url + "/updateDescricao/"+this.itemEditado.id, formData)
        
        .then((res) => {
          this.itemEditado.descricao;
          console.log(res.data);
          this.reloadPage();
        });
        
        alert("A descrição do manual foi alterada com sucesso !");

        Object.assign(this.manuais[this.editIndice], this.itemEditado);
      } else {
        formData.append("file", this.itemEditado.fileName);

        axios.post(url, formData).then((res) => {
          this.manuais = res.data;
          console.log(res.data);
        });
        this.manuais.push(this.itemEditado);
        alert("O manual foi adicionado com sucesso !");
      }
      this.fechar();
    },
  },
};
</script>
