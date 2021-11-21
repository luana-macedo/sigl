<template>
  <v-data-table
    :headers="titulos"
    :items="status"
    :search="search"
    class="elevation-2 data-table"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Dashboard</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
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
                      <v-label>Professores</v-label>
                      <vue-select
                        :getOptionLabel="
                          (professores) => professores.pessoa.nome
                        "
                        v-model="profsSelecionados"
                        :options="professores"
                        label="professores"
                        :search="search"
                        :multiple="true"
                        required
                      ></vue-select>
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
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="itemEditado.descricao"
                        label="Descrição"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>
                    </v-col>  
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="itemEditado.data"
                        label="Data"
                        v-mask="'####-##-##'"
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
              <v-btn small color="warning" dark @click="fechar">
                Cancelar
              </v-btn>
              <v-btn small color="primary" dark @click="save"> Salvar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDesativar" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Deseja desativar este dashboard?</v-card-title
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
      <v-icon small class="mr-2" @click="editItem(item)" color="blue">
        mdi-pencil
      </v-icon>
      <v-icon small @click="desativeItem(item)" color="red">
        mdi-power-standby
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="inicializar"> Reset </v-btn>
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

//var urlProfessor = "http://api-sig-itpac-84633.herokuapp.com/api/professores";
//var urlDisciplina = "http://api-sig-itpac-84633.herokuapp.com/api/disciplina";
//var urlSala = "http://api-sig-itpac-84633.herokuapp.com/api/sala";

export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDesativar: false,
    multiple: {
      type: Boolean,
      default: false,
    },
    titulos: [
      //{ text: "Apelido", align: "start", value: "apelido", },
      { text: "Professor", value: "professores" },
      { text: "Disciplina", value: "nome" },
      { text: "Subgrupo", value: "subgrupo", sortable: false },
      { text: "Descrição" , value: "descricao" , sortable: false  },
      { text: "Horário" , value: "horario", sortable: false  },
      { text: "Data", value: "data" },
      { text: "Sala", value: "sala" },
      { text: "Status", value: "ativo" },
      { text: "Ações", value: "acoes" },
    ],

    professores: [],
    profsRaw: [],
    disciplinas: [],
    editIndice: -1,
    valid: true,
    itemEditado: {
      id: null,
      subgrupo: null,
      descricao: "",
      data: "",
      sala: "",
      profsSelecionados: [],
      ativo: true,
    },
    itemPadrao: {
      id: null,
      subgrupo: null,
      descricao: "",
      data: "",
      sala: "",
      ativo: true,
    },
    profsSelecionados: [],
  }),

  computed: {
    tituloForm() {
      return this.editIndice === -1 ? "Cadastrar Status" : "Editar Status";
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
      this.status = [
        {
          Status: "Pendente",
        },
        {
          Status: "Aprovado",
        },
      ];
    },
    editItem(item) {
      this.editIndice = this.status.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialog = true;
    },

    desativeItem(item) {
      this.editIndice = this.status.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialogDesativar = true;
    },

    desativeItemConfirm() {
      this.status.splice(this.editIndice, 1);
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

    save() {
      if (this.editIndice > -1) {
        Object.assign(this.status[this.editIndice], this.itemEditado);
      } else {
        this.status.push(this.itemEditado);
      }
      this.fechar();
    },
}
}
</script>