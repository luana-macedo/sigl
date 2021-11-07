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
              <v-form>
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
                      <v-label>Alunos</v-label>
                      <vue-select
                        v-model="selectAluno"
                        :options="alunos"
                        label="nome"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        required
                      ></vue-select>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-label>Professor</v-label>
                      <vue-select
                        v-model="profSelecionado"
                        :options="professor"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        label="nome"
                        required
                      ></vue-select>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-label>Disciplina</v-label>
                      <vue-select
                        v-model="discSelecionada"
                        :options="disciplina"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        label="Disciplina"
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
              <v-btn small color="primary" dark @click="salvar"> Salvar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDesativar" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Deseja {{mudarStatus}} este Subgrupo?</v-card-title
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
      <v-icon small class="mr-2" @click="editItem(item)" color="blue"> mdi-pencil </v-icon>
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
.card-modal {
  text-align: center;
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
var urlDisciplina = "http://api-sig-itpac-84633.herokuapp.com/api/disciplina";
var urlPatch =
  "http://api-sig-itpac-84633.herokuapp.com/api/subgrupo/desativar/";
var urlDispatch = "http://api-sig-itpac-84633.herokuapp.com/api/subgrupo/Ativar/";

export default {
  data() {
    return {
      search: "",
      dialog: false,
      dialogDesativar: false,
      titulos: [
        {
          text: "Subgrupo",
          align: "center",
          value: "nome",
        },
        {
          text: "Professor",
          align: "center",
          value: "professor.pessoa.nome",
        },
        {
          text: "Disciplina",
          align: "center",
          value: "disciplina.nome",
        },
        {
          text: "Alunos",
          align: "center",
          value: "alunos",
        },
        {
          text: "Status",
          align: "center",
          value: "ativo",
        },
        { text: "Ações", align: "center", value: "acoes", sortable: false },
      ],
      subgrupos: [],
      professor: [],
      profsRaw: [],
      alunos: [],
      disciplina: [],
      disciplinasRaw: [],
      editIndice: -1,
      itemEditado: {
        id: null,
        nome: "",
        profSelecionado: null,
        discSelecionada: null,
        ativo: "",
      },
      itemPadrao: {
        id: null,
        nome: "",
        ativo: true,
      },
      selectAluno: [],
      profSelecionado: null,
      discSelecionada: null,
    };
  },

  computed: {
    tituloForm() {
      return this.editIndice === -1 ? "Cadastrar Subgrupo" : "Editar Subgrupo";
    },
    mudarStatus() {
      return this.itemEditado.ativo == true ? "Desativar " : "Ativar Subgrupo";
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

  mounted() {
    this.inicializar();
  },

  methods: {
    async inicializar() {
      this.axios
        .get(url, this.subgrupos)
        .then((res) => {
          console.log(res);
          this.subgrupos = res.data.map((d) => ({
            ...d,
            alunos: d.alunos.map((a) => a.pessoa.nome).filter(Boolean),
          }));
        })
        .catch((error) => {
          console.warn(error);
        });
      await Promise.all([
        this.getProfessores(),
        this.getDisciplinas(),
        this.getAlunos(),
      ]);
    },

    reloadPage() {
      window.location.reload();
    },

    async getProfessores() {
      const { data } = await this.axios.get(urlProfessor);
      this.profsRaw = data;
      this.professor = data
        .filter((d) => d.pessoa.nome)
        .map((d) => ({ ...d.pessoa, idprofessor: d.id }));
    },

    async getDisciplinas() {
      const { data } = await this.axios.get(urlDisciplina);
      this.disciplinasRaw = data;
      this.disciplina = data.map((d) => ({
        ...d,
        disciplina: d.disciplina.map((a) => a.nome).filter(Boolean),
      }));

      // .filter((d) => d.nome)
      // .map((d) => ({ ...d, iddisciplina: d.id }));
    },

    // achaiddisciplina() {
    //   const [selectedDisciplina] = this.disciplinas.filter(
    //     (d) => d.disciplina === this.select1[0]
    //   );
    //   console.log(selectedDisciplina);
    // },

    async getAlunos() {
      const { data } = await this.axios.get(urlALuno);
      console.log(data);
      this.aluno = data;
      const alunos = data
        .filter((d) => d.pessoa.nome)
        .map((d) => ({ ...d.pessoa, idaluno: d.id }));
      console.log(alunos);
      this.alunos = alunos;
    },

    // achaidaluno() {
    //   const [selectedAluno] = this.alunos.filter(
    //     (d) => d.aluno === this.selectAluno[0]
    //   );
    //   console.log(selectedAluno);
    // },

    valorStatus() {
      if (this.itemEditado.ativo) {
        color = "green";
      } else {
        color = "red";
      }
    },

    editItem(item) {
      this.editIndice = this.subgrupos.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialog = true;
    },

    desativeItem(item) {
      this.editIndice = this.subgrupos.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialogDesativar = true;
    },

    desativeItemConfirm() {
      // this.subgrupos.splice(this.editIndice, 1);
      if (this.itemEditado.ativo == true) {
        axios
          .patch(urlPatch + this.itemEditado.id, {
            ativo: this.itemEditado.ativo,
          })
          .then((res) => {
            //this.subgrupos = res.data;
            alert("O subgrupo foi desativado com sucesso !");
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
            ativo: this.itemEditado.ativo,
          })
          .then((res) => {
            console.log(res.data);
            alert("O subgrupo foi ativado com sucesso !");
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
            nome: this.itemEditado.nome,
            ativo: this.itemEditado.ativo,
          })
          .then((res) => {
            //this.subgrupos = res.data;
            console.log(res.data);
            this.reloadPage();
          })
          .catch((error) => {
            console.log(error);
          });
        Object.assign(this.subgrupos[this.editIndice], this.itemEditado);
        alert("Os dados foram atualizados com sucesso !");
      } else {
        axios
          .post(url, {
            nome: this.itemEditado.nome,
            ativo: this.itemEditado.ativo,
            professor: {
              id: this.profSelecionado.idprofessor,
            },
            disciplina: {
              id: this.discSelecionada.iddisciplina,
            },
          })
          .then((res) => {
            this.subgrupos = res.data;
            console.log(res.data);
            this.reloadPage();
          })
          .catch((error) => {
            console.log(error);
          });
        this.subgrupos.push(this.itemEditado);
        alert("Os dados foram adicionados com sucesso !");
      }
      this.fechar();
    },
  },
};
</script>
