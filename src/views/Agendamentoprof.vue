<template>
  <v-data-table
    :headers="titulos"
    :items="agendamentos"
    :search="search"
    class="elevation-2 data-table"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Agendamento de Laboratório - Aluno</v-toolbar-title>
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
                    <template>
                      <v-col cols="12" sm="6">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="dates"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-combobox
                              v-model="dates"
                              chips
                              small-chips
                              label="Multiple picker in menu"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-combobox>
                          </template>
                          <v-date-picker
                            v-model="dates"
                            multiple
                            no-title
                            scrollable
                          >
                           <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(dates)"
          >
            OK
          </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col
      cols="11"
      sm="5"
    >
      <v-menu
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            label="Picker in menu"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu2"
          v-model="time"
          full-width
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
          <v-btn
            text
            color="primary"
            @click="modal2 = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(time)"
          >
            OK
          </v-btn> 
      </v-menu>
    </v-col>
                    </template>
                    
                    <v-col cols="8" sm="6" md="4">
                      <v-label>Sala</v-label>
                      <vue-select
                        v-model="salaSelecionada"
                        :options="sala"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        :search="search"
                        label="Sala"
                        required
                      ></vue-select>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-label>Professor</v-label>
                      <vue-select
                        v-model="profSelecionado"
                        :options="professor"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        :search="search"
                        label="Professor"
                        required
                      ></vue-select>
                    </v-col>
                    <v-col cols="8" sm="6" md="4">
                      <v-label>Subgrupo</v-label>
                      <vue-select
                        v-model="subgrupoSelecionado"
                        :options="subgrupo"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        :search="search"
                        label="Subgrupo"
                        required
                      ></vue-select>
                    </v-col>
                     <v-col cols="8" sm="6" md="4">
                      <v-label>Manual</v-label>
                      <vue-select
                        v-model="manualSelecionado"
                        :options="manual"
                        :rules="[(v) => !!v || '*Campo Obrigatório*']"
                        :search="search"
                        label="Manual"
                        required
                      ></vue-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="warning" dark @click="fechar">Cancelar</v-btn>
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
        <v-dialog v-model="dialogDesativar" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Deseja {{ mudarStatus }} este agendamento?</v-card-title
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
      <v-icon small class="mr-2" @click="editItem(item)" color="blue">
        mdi-pencil
      </v-icon>
      <v-icon small @click="desativeItem(item)" color="red">
        mdi-power-standby
      </v-icon>
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

var url = "http://api-sig-itpac-84633.herokuapp.com/api/periodo/Agendamentos";

export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDesativar: false,
    menu2: false,
    modal2: false,
    titulos: [
      { text: "Sala", value: "sala" },
      { text: "Data", value: "data" },
      { text: "Horario", value: "horario", sortable: false },
      { text: "Subgrupo", value: "subgrupo", sortable: false },
      { text: "Manual", value: "manual", sortable: false },
      { text: "Status", value: "ativo", sortable: false },
      { text: "Ações", value: "acoes", sortable: false },
    ],
    dates:new Date(new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    menu:false,
    subgrupo: [],
    manual:[],
    subgruposRaw: [],
    agendamentos: [],
    editIndice: -1,
    valid: true,
    itemEditado: {
      id: null,
      salaSelecionada: "",
      date:null,
      time: null,
      subgrupoSelecionado: null,
      manualSelecionado: null,
      ativo: true,
    },
    itemPadrao: {
      id: null,
      date: null,
      time:null,
      salaSelecionada:null,
      subgrupoSelecionado: null,
      manualSelecionado:null,
      ativo: true,
    },
    subgrupoSelecionado: null,
  }),

  computed: {
    tituloForm() {
      return this.editIndice === -1
        ? "Cadastrar Agendamento"
        : "Editar Agendamento";
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
    inicializar() {
      this.axios.get(url, this.agendamentos).then((res) => {
        this.agendamentos = res.data.map((p) => {
          p.ativo = p.ativo ? "Ativado" : "Desativado";
          return p;
        });
        console.log(res.data);
      });
    },

    reloadPage() {
      window.location.reload();
    },

    async getSubgrupo() {
      /*   const { data } = await this.axios.get(urlSubgrupo);
      this.subgrupoRaw = data;
      this.subgrupo = data
        .filter((d) => d.subgrupo)
        .map((d) => ({ ...d, idsubgrupo: d.id }))
        .filter(Boolean); */
      //  console.log("periodo",data,data.map(d => d.periodo))
    },

    editItem(item) {
      this.editIndice = this.agendamentos.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialog = true;
    },

    desativeItem(item) {
      this.editIndice = this.agendamentos.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialogDesativar = true;
    },

    desativeItemConfirm() {
      if (this.itemEditado.ativo == "Ativado") {
        axios
          .patch(url + "/desativar" + this.itemEditado.id, {
            ativo: false,
          })
          .then((res) => {
            console.log(res.data);
            alert("Este agendamento foi desativado com sucesso !");
            this.reloadPage();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .patch(url + "/desativar" + this.itemEditado.id, {
            ativo: true,
          })
          .then((res) => {
            console.log(res.data);
            alert("Esta agendamento foi ativado com sucesso !");
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
            // id: this.itemEditado.id,
            // sala: this.itemEditado.sala,
            // ativo: this.itemEditado.ativo === "Ativado",
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
            // id: this.itemEditado.id,
            // sala: this.itemEditado.sala,
            // data: this.itemEditado.data,
            // ativo: this.itemEditado.ativo === "Ativado",
          })
          .then((res) => {
            // this.agendamentos = res.data;
            alert("Os dados foram adicionados com sucesso !");
            console.log(res.data);
            this.reloadPage();
          });

        this.agendamentos.push(this.itemEditado);
      }
      this.fechar();
    },
  },
};
</script>

