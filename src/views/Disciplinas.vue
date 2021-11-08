<template>
  <v-data-table
    :headers="titulos"
    :items="disciplinas"
    :search="search"
    class="elevation-2 data-table"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Gerenciamento de Disciplina</v-toolbar-title>
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
              <v-form>
                <v-container>
                  <v-row>
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="itemEditado.nome"
                        label="Nome"
                        :rules="[(v) => !!v ||'Campo Obrigatório']"
                        maxlenght="100"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="itemEditado.apelido"
                        label="Apelido"
                        :rules="[(v) => !!v || 'Campo Obrigatório']"
                        required
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="8" sm="6" md="4"> 
                       </v-col>
                     <v-col cols="8" sm="6" md="4"> 
                      <v-select
                          v-model="select0"
                           :items="status"
                             label="Status"
                            data-vv-name="select"
                            :rules="[(v) => !!v ||'Campo Obrigatório']"
                            maxlenght="20"
                            required
                            ></v-select>
                     </v-col> -->
                    <v-col cols="8" sm="6" md="4">
                      <v-label>Periodo</v-label>
                      <vue-select
                        v-model="periodoSelecionado"
                        :options="periodo"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        label="periodo"
                        required
                      ></vue-select>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <!-- :rules="[(v) => !!v || '*Campo Obrigatório*']" -->
                      <v-label>Professor</v-label>
                      <vue-select
                        v-model="profSelecionado"
                        :options="professor"
                        label="professor"
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
        <v-dialog v-model="dialogDesativar" max-width="400px">
          <v-card class="card-modal">
            <v-card-title class="text-h6"
              >Deseja {{mudarStatus}} esta disciplina?</v-card-title
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
</style>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

var url = "http://api-sig-itpac-84633.herokuapp.com/api/disciplina";
var urlPeriodo = "http://api-sig-itpac-84633.herokuapp.com/api/periodo";
var urlProfessor = "http://api-sig-itpac-84633.herokuapp.com/api/professores";
var urlPatch ="http://api-sig-itpac-84633.herokuapp.com/api/disciplina/desativar/";
var urlDispatch = "http://api-sig-itpac-84633.herokuapp.com/api/disciplina/ativar/";

export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDesativar: false,
    titulos: [
      { text: "Disciplina", value: "nome" },
      {
        text: "Apelido",
        align: "start",
        value: "apelido",
      },
      { text: "Professor", value: "professor.pessoa.nome" },
      { text: "Período", value: "periodo.periodo" },
      { text: "Status", value: "ativo" },
      { text: "Ações", value: "acoes" },
    ],
    disciplinas: [],
    periodo: [],
    periodosRaw: [],
    professor: [],
    profsRaw: [],
    editIndice: -1,
    itemEditado: {
      id: null,
      nome: "",
      apelido: "",
      periodoSelecionado: null,
      profSelecionado: [],
      ativo: true,
    },
    itemPadrao: {
      id: null,
      nome: "",
      apelido: "",
      ativo: true,
    },
    profSelecionado:[],
    periodoSelecionado: null,
  }),

  computed: {
    tituloForm() {
      return this.editIndice === -1 ? "Cadastrar disciplina" : "Editar Dados";
    },
    mudarStatus() {
      return this.itemEditado.ativo == true ? "Desativar " : "Ativar ";
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
    this.getProfessores();
    this.getPeriodos();
  },

  methods: {
    inicializar() {
      this.axios
        .get(url, this.disciplinas)
        .then((res) => {
          console.log(res.data);
          this.disciplinas = res.data;
        })
        .catch((error) => {
          console.warn(error);
        });
    },

    reloadPage() {
      window.location.reload();
    },

    async getPeriodos() {
      const { data } = await this.axios.get(urlPeriodo);
      this.periodosRaw = data;
      this.periodo = data
        .filter((d) => d.periodo)
        .map((d) => ({ ...d, idperiodo: d.id }))
        .filter(Boolean);
      //  console.log("periodo",data,data.map(d => d.periodo))
    },

    //  achaidperiodo(){
    //     const [selectedPeriodo] = this.periodosRaw.filter(d => d.periodo ===  this.select[0])
    //     console.log(selectedPeriodo)
    //  },

    async getProfessores() {
      const { data } = await this.axios.get(urlProfessor);
      this.profsRaw = data;
      this.professor = data
        .filter((d) => d.pessoa.nome)
        .map((d) => ({ ...d.pessoa, idprofessor: d.id }));
    },

    // achaidprofessor() {
    //   const [selectedProfessor] = this.profs.filter(
    //     (d) => d.professor === this.select1[0]
    //   );
    //   console.log(selectedProfessor);
    // },

    editItem(item) {
      this.editIndice = this.disciplinas.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialog = true;
    },

    desativeItem(item) {
      this.editIndice = this.disciplinas.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialogDesativar = true;
    },

    desativeItemConfirm() {
       if (this.itemEditado.ativo == true) {
      axios
        .patch(urlPatch + this.itemEditado.id, {
          ativo: this.itemEditado.ativo,
        })
        .then((res) => {
          console.log(res.data);
          alert("A disciplina foi desativada com sucesso !");    
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
            alert("A disciplina foi ativado com sucesso !");
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
            nome: this.itemEditado.nome,
            apelido: this.itemEditado.apelido,
            // professor: {
            //   id: this.profSelecionado.idprofessor,
            // },
            ativo: this.itemEditado.ativo,
            periodo: {
              id: this.periodoSelecionado.idperiodo,
            },
          })
          .then((res) => {
            alert("Os dados foram atualizados com sucesso !");
            console.log(res.data);
             this.reloadPage();
          })
          .catch((error) => {
            console.log(error);
          });
        Object.assign(this.disciplinas[this.editIndice], this.itemEditado);
      } else {
        axios
          .post(url, {
            nome: this.itemEditado.nome,
            ativo: this.itemEditado.ativo,
            apelido: this.itemEditado.apelido,
            // professor: [{
            //   id: this.profSelecionado.idprofessor,
            // }],
            periodo: {
              id: this.periodoSelecionado.idperiodo,
            },
          })
          .then((res) => {
            this.disciplinas = res.data;
            alert("Os dados foram adicionados com sucesso !");
            console.log(res.data);
             this.reloadPage();
          })
          .catch((error) => {
            console.log(error);
          });
        this.disciplinas.push(this.itemEditado);
      }
      this.fechar();
      // this.reloadPage();
    },
  },
};
</script>