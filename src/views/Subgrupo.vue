<template>
  <v-data-table
    :headers="titulos"
    :items="subgrupos"
    :search="search"
    class="elevation-2 data-table"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Gerenciamento de Subgrupo</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <!-- <v-ster></v-ster> -->
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
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
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-label>Professor</v-label>
                      <vue-select
                        :getOptionLabel="(professor) => professor.pessoa.nome"
                        v-model="profSelecionado"
                        :options="professor"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        :search="search"
                        label="professor"
                        required
                      ></vue-select>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-label>Alunos</v-label>
                      <!-- :getOptionLabel="(alunos) => alunos.pessoa.nome" -->
                      <vue-select
                        :getOptionLabel="(alunos) => alunos.pessoa.nome"
                        v-model="alunosSelecionados"
                        :options="alunos"
                        label="aluno"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        :multiple="true"
                        required
                      ></vue-select>
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
              <v-btn
                small
                color="primary"
                :disabled="!valid"
                class="mr-4"
                @click="salvar"
                >Salvar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDetalhar" max-width="400px">
          <!-- <v-card class="mx-auto"
   > -->
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">Subgrupo</th>
                  <th class="text-center">Professor</th>
                  <th class="text-center">Alunos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> {{ itemEditado.nome }}</td>
                  <td>{{ profSelecionado.pessoa.nome }}</td>
                  
                  <td v-for="(item, index) in alunosSelecionados " :key="index">
                    {{item}}
                    
                </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-dialog>

        <v-dialog v-model="dialogDesativar" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Deseja {{ mudarStatus }} este Subgrupo?</v-card-title
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
      <v-icon small class="mr-2" @click="detalharItem(item)" color="brown"
        >mdi-eye</v-icon
      >
      <v-icon small class="mr-2" @click="editItem(item)" color="blue"
        >mdi-pencil</v-icon
      >
      <v-icon small @click="desativeItem(item)" color="red"
        >mdi-power-standby</v-icon
      >
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
.td-alunos {
  display: block;
}
.td-alunos ul li {
  list-style: none;
}
</style>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

var url = "http://api-sig-itpac-84633.herokuapp.com/api/subgrupo";
var urlProfessor = "http://api-sig-itpac-84633.herokuapp.com/api/professores";
var urlALuno = "http://api-sig-itpac-84633.herokuapp.com/api/aluno";
var urlPatch =
  "http://api-sig-itpac-84633.herokuapp.com/api/subgrupo/desativar/";
var urlDispatch =
  "http://api-sig-itpac-84633.herokuapp.com/api/subgrupo/Ativar/";

export default {
  data() {
    return {
      search: "",
      dialog: false,
      dialogDesativar: false,
      dialogDetalhar: false,
      multiple: {
        type: Boolean,
        default: false,
      },
      titulos: [
        {
          text: "Subgrupo",
          value: "nome",
        },
        {
          text: "Professor",
          value: "professor.pessoa.nome",
        },
        {
          text: "Alunos",
          value: "alunos",
        },
        {
          text: "Status",
          value: "ativo",
        },
        { text: "Ações", align: "center", value: "acoes", sortable: false },
      ],
      subgrupos: [],
      professor: [],
      profsRaw: [],
      alunos: [],
      alunosRaw: [],
      editIndice: -1,
      valid: true,
      itemEditado: {
        id: null,
        nome: "",
        profSelecionado: null,
        alunosSelecionados: [],
        ativo: true,
      },
      itemPadrao: {
        id: null,
        nome: "",
        ativo: true,
      },
      alunosSelecionados: [],
      profSelecionado: null,
    };
  },

  computed: {
    tituloForm() {
      return this.editIndice === -1 ? "Cadastrar Subgrupo" : "Editar Subgrupo";
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
    // dialogDetalhar(val) {
    //   val || this.fecharDetalhar();
    // },
  },

  mounted() {
    this.inicializar();
  },

  methods: {
    async inicializar() {
      this.axios
        .get(url, this.subgrupos)
        .then((res) => {
          console.log(res);
          this.subgrupos = res.data
            .map((d) => ({
              ...d,
              alunos: d.alunos.map((a) => a.pessoa.nome).filter(Boolean),
            }))
            .map((p) => {
              p.ativo = p.ativo ? "Ativado" : "Desativado";
              return p;
            });
        })
        .catch((error) => {
          console.warn(error);
        });

      await Promise.all([this.getProfessores(), this.getAlunos()]);
    },

    reloadPage() {
      window.location.reload();
    },

    async getProfessores() {
      const { data } = await this.axios.get(urlProfessor);
      this.profsRaw = data;
      this.professor = data.filter((d) => d.pessoa.nome).filter(Boolean);
    },

    async getAlunos() {
      const { data } = await this.axios.get(urlALuno);
      this.alunosRaw = data;
      this.alunos = data.filter((d) => d.pessoa.nome).filter(Boolean);
    },

    detalharItem(item) {
      this.editIndice = this.subgrupos.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      var id = this.itemEditado.id;
      axios.get(url + "/" + id).then((res) => {
        this.itemEditado = res.data;
        this.alunosSelecionados = this.itemEditado.alunos.map((d) => d.pessoa.nome);
        this.profSelecionado = this.itemEditado.professor;
      });

      this.dialogDetalhar = true;
    },

    editItem(item) {
      this.editIndice = this.subgrupos.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      var id = this.itemEditado.id;

      // console.log(id,"elementoo");
      axios.get(url + "/" + id).then((res) => {
        this.itemEditado = res.data;
        this.profSelecionado = this.itemEditado.professor;
        console.log("prof", this.profSelecionado);
        this.alunosSelecionados = this.itemEditado.alunos;

        console.log("alunos", this.alunosSelecionados);
      });

      this.dialog = true;
    },

    desativeItem(item) {
      this.editIndice = this.subgrupos.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialogDesativar = true;
    },

    desativeItemConfirm() {
      // this.subgrupos.splice(this.editIndice, 1);
      if (this.itemEditado.ativo == "Ativado") {
        axios
          .patch(urlPatch + this.itemEditado.id, {
            ativo: false,
          })
          .then((res) => {
            //this.subgrupos = res.data;
            console.log(res.data);
            alert("O subgrupo foi desativado com sucesso !");
            this.reloadPage();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .patch(urlDispatch + this.itemEditado.id, {
            ativo: true,
          })
          .then((res) => {
            console.log(res.data);
            alert("O subgrupo foi ativado com sucesso !");
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
         this.profSelecionado = "";
            this.alunosSelecionados = "";
      });
    },

    //  fecharDetalhar() {
    //   this.dialogDetalhar = false;
    //   this.$nextTick(() => {
    //     this.itemEditado = Object.assign({}, this.itemPadrao);
    //     this.editIndice = -1;
    //   });
    // },

    fecharDesativar() {
      this.dialogDesativar = false;
      this.$nextTick(() => {
        this.itemEditado = Object.assign({}, this.itemPadrao);
        this.editIndice = -1;
      });
    },

    salvar() {
      if (this.editIndice > -1) {
        // var profId = null;
        // if (
        //   this.profSelecionado !== null &&
        //   this.profSelecionado !== undefined
        // ) {
          
        //   profId = {
            
        //     id: this.profSelecionado.pessoa.id,
        //   };
       // }
        const request = {
          id: this.itemEditado.id,
          nome: this.itemEditado.nome,
          ativo: this.itemEditado.ativo === "Ativado",
          professor: this.profSelecionado,
          alunos: this.alunosSelecionados,
        };
        console.log("request", request);

        axios
          .put(url, request)
          .then((res) => {
            console.log(res.data);
            alert("Os dados foram atualizados com sucesso !");
            this.reloadPage();
            this.profSelecionado = "";
            this.alunosSelecionados = "";
          })
          .catch((error) => {
            console.log(error);
          });

        Object.assign(this.subgrupos[this.editIndice], this.itemEditado);
      } else {
        axios
          .post(url, {
            nome: this.itemEditado.nome,
            ativo: true,
            professor: {
              id: this.profSelecionado.pessoa.id,
            },
            alunos: this.alunosSelecionados,
          })
          .then((res) => {
            this.subgrupos = res.data;
            console.log(res.data);
            alert("Os dados foram adicionados com sucesso !");
              this.profSelecionado = "";
            this.alunosSelecionados = "";
            this.reloadPage();
          })
          .catch((error) => {
            console.log(error);
          });
        this.subgrupos.push(this.itemEditado);
      }
      this.fechar();
    },
  },
};
</script>