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
        <!-- <v-ster></v-ster> -->
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
                        :rules="[(v) => !!v || 'Campo Obrigatório']"
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
                    <v-col cols="8" sm="6" md="4">
                      <v-label>Periodo</v-label>
                      <vue-select
                        v-model="periodoSelecionado"
                        :options="periodo"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        :search="search"
                        label="periodo"
                        required
                      ></vue-select>
                    </v-col>
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

         <v-dialog v-model="dialogDetalhar" max-width="700px">
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="align-center">Disciplina</th>
                  <th class="align-center">Apelido</th>
                  <th class="align-center">Professor</th>
                  <th class="align-center">Periodo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ itemEditado.nome }}</td>
                  <td>{{ itemEditado.apelido }}</td>
                  <td>{{ profsSelecionados }}</td>
                  <td>{{ periodoSelecionado }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-dialog>

        <v-dialog v-model="dialogDesativar" max-width="400px">
          <v-card class="card-modal">
            <v-card-title class="text-h6"
              >Deseja {{ mudarStatus }} esta disciplina?</v-card-title
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
      <v-icon small class="mr-2" @click="detalharItem(item)" color="brown">mdi-eye</v-icon>
      <v-icon small class="mr-2" @click="editItem(item)" color="blue">mdi-pencil</v-icon>
      <v-icon small @click="desativeItem(item)" color="red">mdi-power-standby</v-icon>
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
var urlPatch =
  "http://api-sig-itpac-84633.herokuapp.com/api/disciplina/desativar/";
var urlDispatch =
  "http://api-sig-itpac-84633.herokuapp.com/api/disciplina/ativar/";

export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDesativar: false,
    dialogDetalhar: false,
    multiple: {
      type: Boolean,
      default: false,
    },
    titulos: [
      { text: "Disciplina", value: "nome" },
      {
        text: "Apelido",
        align: "start",
        value: "apelido",
      },
      { text: "Professor", value: "professores" },
      { text: "Período", value: "periodo.periodo" },
      { text: "Status", value: "ativo" },
      { text: "Ações", value: "acoes" },
    ],

    disciplinas: [],
    periodo: [],
    periodosRaw: [],
    professores: [],
    profsRaw: [],
    editIndice: -1,
    valid: true,
    itemEditado: {
      id: null,
      nome: "",
      apelido: "",
      periodoSelecionado: null,
      profsSelecionados: [],
      ativo: true,
    },
    itemPadrao: {
      id: null,
      nome: "",
      apelido: "",
      ativo: null,
    },
    profsSelecionados: [],
    periodoSelecionado: null,
  }),

  computed: {
    tituloForm() {
      return this.editIndice === -1 ? "Cadastrar disciplina" : "Editar Dados";
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

  mounted() {
    this.inicializar();
  },

  methods: {
    async inicializar() {
      this.axios
        .get(url, this.disciplinas)
        .then((res) => {
          console.log(res.data);
          this.disciplinas = res.data.map((p) => ({
            ...p,
            ativo: p.ativo ? "Ativado" : "Desativado",
            professores: p.professores
              .map((p) => p.pessoa.nome)
              .filter(Boolean),
          }));
        })
        .catch((error) => {
          console.warn(error);
        });
      await Promise.all([this.getProfessores(), this.getPeriodos()]);
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

    async getProfessores() {
      const { data } = await this.axios.get(urlProfessor);
      this.profsRaw = data;
      this.professores = data.filter((d) => d.pessoa.nome).filter(Boolean);
    },

    detalharItem(item) {
      this.editIndice = this.disciplinas.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      var id = this.itemEditado.id;
      axios.get(url + "/" + id).then((res) => {
        this.itemEditado = res.data;
        this.periodoSelecionado = this.itemEditado.periodo.periodo;
        this.profsSelecionados = this.itemEditado.professores.map((d) => d.pessoa.nome);
      });

      this.dialogDetalhar = true;
    },

    editItem(item) {
      this.editIndice = this.disciplinas.indexOf(item); //comando para mostrar o título "Editar Dados"
      this.itemEditado = Object.assign({}, item);
      var id = this.itemEditado.id;
      // console.log(id,"elementoo");
      axios.get(url + "/" + id).then((res) => {
        this.itemEditado = res.data;
        this.profsSelecionados = this.itemEditado.professores;
        console.log("prof", this.profsSelecionados);
        this.periodoSelecionado = this.itemEditado.periodo;
        console.log("periodooo", this.periodoSelecionado);
      });
      this.dialog = true;
    },

    desativeItem(item) {
      this.editIndice = this.disciplinas.indexOf(item);
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
            console.log(res.data);
            alert("A disciplina foi desativada com sucesso !");
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
         this.profsSelecionados = "";
            this.periodoSelecionado ="";
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
            ativo: this.itemEditado.ativo === "Ativado",
            periodo: this.periodoSelecionado,
            professores: this.profsSelecionados,
          })
          .then((res) => {
            alert("Os dados foram atualizados com sucesso !");
            
            console.log(res.data);
             this.profsSelecionados = "";
            this.periodoSelecionado ="";
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
            professores: this.profsSelecionados,
            periodo: {
              id: this.periodoSelecionado.idperiodo,
            },
          })
          .then((res) => {
            this.disciplinas = res.data;
            alert("Os dados foram adicionados com sucesso !");
            
            console.log(res.data);
            this.profsSelecionados = "";
            this.periodoSelecionado ="";
            this.reloadPage();
          })
          .catch((error) => {
            console.log(error);
          });
        this.disciplinas.push(this.itemEditado);
      }
      this.fechar();
    },
  },
};
</script>