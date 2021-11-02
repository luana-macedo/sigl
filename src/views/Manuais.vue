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
        <v-spacer></v-spacer>
        <v-text-field class="barraPesquisa2"
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
              <span class="text-h6">{{ tituloForm }}</span>
            </v-card-title>

            <v-card-text>
              <v-form v-model="valid">
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
        <v-dialog v-model="dialogDelete" max-width="350px">
          <v-card class="card-modal">
            <v-card-title class="text-h6"
              >Deseja desativar este manual(is)?</v-card-title
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
      <v-icon small @click="removeItem(item)"> mdi-power-standby </v-icon>
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
.barraPesquisa2{
 padding-right:860px;
}
</style>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

var url = "http://api-sig-itpac-84633.herokuapp.com/api/manual"
var urlPatch = "http://api-sig-itpac-84633.herokuapp.com/api/manual/desativar/"

export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    titulos: [
      {
        text: "Descrição",
        align: "start",
        value: "descricao",
      },
      { text: "Arquivo", value: "fileName" },
      { text: "Ações", value: "acoes"},
    ],
    manuais: [],
    editIndice: -1,
    itemEditado: {
      descricao: "",
      fileName: "",
      ativo: "",
    },
    itemPadrao: {
      descricao: "",
      fileName: "",
      ativo: true ,
    },
  }),

  computed: {
    tituloForm() {
      return this.editIndice === -1 ? "Cadastrar Manual" : "Editar Manual";
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
   axios.get(url, this.manuais).then(res => {
				this.manuais = res.data
				console.log(res.data)
			})
    },
    editItem(item) {
      this.editIndice = this.manuais.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialog = true;
    },

    removeItem(item) {
      this.editIndice = this.manuais.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      // this.manuais.splice(this.editIndice, 1);
      if (this.editIndice > -1) {
       axios
          .patch(urlPatch + this.itemEditado.id, {
              ativo: this.itemEditado.ativo,
          })
          .then((res) => {
            this.manuais = res.data;
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

        axios.put(url+this.itemEditado.id,{manuais : this.itemEditado.manuais,descricao : this.itemEditado.descricao, fileName: this.itemEditado.fileName}).then(res => {
				this.manuais = res.data
				console.log(res.data)
			})

        Object.assign(this.manuais[this.editIndice], this.itemEditado);
      } else {
        axios.post(url,{manuais: this.itemEditado.manuais,descricao: this.itemEditado.descricao,fileName: this.itemEditado.fileName }).then(res => {
				this.manuais = res.data
				console.log(res.data)
			})
        this.manuais.push(this.itemEditado);
      }
      this.fechar();
    },
  },
};
</script>
