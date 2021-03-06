<template>
  <v-data-table
    :headers="titulos"
    :items="evidencias"
    :search="search"
    class="elevation-2 data-table"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Gerenciamento de Evidências</v-toolbar-title>
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
        <v-dialog v-model="dialog" max-width="500px">
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
                        v-model="itemEditado.sala"
                        label="Sala"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="itemEditado.data"
                        label="Data"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="itemEditado.subgrupoSelecionado"
                        label="Subgrupo" 
                        type="number"
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
             <v-btn small color="primary" 
              :disabled="!valid"
              class="mr-4"
              @click="salvar">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDesativar" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Deseja {{mudarStatus}} esta evidência?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="warning" dark @click="fecharDesativar">
                Não</v-btn
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

var url = "http://api-sig-itpac-84633.herokuapp.com/api/sala";
var urlPatch = "http://api-sig-itpac-84633.herokuapp.com/api/sala/desativar/";
var urlDispatch = "http://api-sig-itpac-84633.herokuapp.com/api/sala/ativar/";
var urlSubgrupo = "http://api-sig-itpac-84633.herokuapp.com/api/subgrupo";

export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDesativar: false,
    titulos: [
      { text: "Sala", value: "sala" },
      { text: "Data", value: "data" },
      { text: "Subgrupo", value: "subgrupo", sortable: false },
      { text: "Status", value: "ativo", sortable: false },
      { text: "Ações", value: "acoes", sortable: false },
    ],
    subgrupo: [],
    subgrupoRaw: [],
    evidencias: [],
    editIndice: -1,
    valid: true,
    itemEditado: {
      id: null,
      sala: "",
      data: "",
      subgrupo: null,
      ativo: true,
    },
    itemPadrao: {
      id: null,
      sala: "",
      data: "",
      subgrupo: null,
      ativo: true,
    },
    subgrupoSelecionado: null,
  }),

  computed: {
    tituloForm() {
      return this.editIndice === -1 ? "Cadastrar Evidência" : "Editar Evidência";
    },
    mudarStatus() {
      return this.itemEditado.ativo == "Ativado" ? "desativar " : "ativar ";
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
      this.axios.get(url, this.evidencias).then((res) => {
        this.evidencias = res.data.map(p => {
          p.ativo = (p.ativo?"Ativado":"Desativado")
          return p;
        });
        console.log(res.data);
      });
    },

    reloadPage() {
      window.location.reload();
    },

    async getSubgrupo() {
      const { data } = await this.axios.get(urlSubgrupo);
      this.subgrupoRaw = data;
      this.subgrupo = data
        .filter((d) => d.subgrupo)
        .map((d) => ({ ...d, idsubgrupo: d.id }))
        .filter(Boolean);
      //  console.log("periodo",data,data.map(d => d.periodo))
    },

    editItem(item) {
      this.editIndice = this.evidencias.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialog = true;
    },

    desativeItem(item) {
      this.editIndice = this.evidencias.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialogDesativar = true;
    },

    desativeItemConfirm() {
      if (this.itemEditado.ativo == "Ativado") {
      axios
        .patch(urlPatch + this.itemEditado.id, {
          ativo: false,
        })
        .then((res) => {
          this.salas = res.data;
          console.log(res.data);
          alert("Esta evidência foi desativada com sucesso !");
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
            alert("Esta evidência foi ativada com sucesso !");
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
            nome: this.itemEditado.sala,
            local: this.itemEditado.data,
            capacidade: this.itemEditado.subgrupo,
            ativo: this.itemEditado.ativo,
          })
          .then((res) => {
            //this.salas = res.data;
            alert("Os dados foram atualizados com sucesso !");
            console.log(res.data);
            this.reloadPage();
          })
          .catch((error) => {
            console.log(error);
          });

        Object.assign(this.evidencias[this.editIndice], this.itemEditado);
        
      } else {
        axios
          .post(url, {
            nome: this.itemEditado.sala,
            local: this.itemEditado.data,
            capacidade: this.itemEditado.subgrupo,
            ativo: this.itemEditado.ativo,
          })
          .then((res) => {
            this.evidencias = res.data;
            alert("Os dados foram adicionados com sucesso !");
            console.log(res.data);
             this.reloadPage();
          });

        this.evidencias.push(this.itemEditado);
      }
      this.fechar();
    },
  },
};
</script>

