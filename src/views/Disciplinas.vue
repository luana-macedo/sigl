<template>
  <v-data-table :headers="titulos" :items="disciplinas" class="elevation-2 data-table">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Gerenciamento de disciplina</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="400px">
          <template v-slot:activator="{ on, attrs }" class="template-add">
            <!-- <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Adicionar</v-btn> -->
            <v-btn small
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
                        v-model="editarItem.descricao"
                        label="Apelido"
                        :rules="['Campo Obrigatório']"
                        maxlenght="20"
                        required
                      ></v-text-field>
                    </v-col>  
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="editarItem.disciplina"
                        label="disciplina"
                        :rules="['Campo Obrigatório']"
                        maxlenght="20"
                      ></v-text-field>
                    </v-col> 
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="editarItem.periodo"
                        label="Período"
                        :rules="['Campo Obrigatório']"
                        maxlenght="20"
                        required
                      ></v-text-field>
                    </v-col> 
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="editarItem.nome"
                        label="Nome do Professor"
                        :rules="['Campo Obrigatório']"
                        maxlenght="20"
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
              <v-btn small color="primary" dark  @click="save"> Salvar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="400px">
          <v-card class="card-modal">
            <v-card-title class="text-h6"
              >Deseja remover esta disciplina ?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
               <v-btn small color="warning" dark @click="fecharDelete"
                >Não</v-btn
              >
                <v-btn  small color="primary" dark  @click="deleteItemConfirm"
                >Sim</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.acoes="{ item }">
      <v-icon v-icon small class="mr-2" @click="inicializar">
        mdi-message-text
      </v-icon>
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
.template-add{
  padding-top:1%;
}
.data-table {
  padding: 3%;
}
#card-actions{
   padding-left:18%;
}
.card-modal{
  text-align: center;
}
</style>
<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    titulos: [
      {
        text: "Apelido",
        align: "start",
        value: "descricao",
      },
      { text: "disciplina", value: "disciplina" },
      { text: "Ações", value: "acoes", sortable: false },
    ],
    disciplinas: [],
    editarIndice: -1,
    editarItem: {
      descricao: "",
      disciplina: "",
    },
    defaultItem: {
      descricao: "",
      disciplina: "",
    },
  }),

  computed: {
    tituloForm() {
      return this.editarIndice === -1 ? "Cadastrar disciplina" : "Editar Dados";
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
      this.disciplinas = [
        {
          descricao: "ALG 1",
          disciplina: "Algoritmo 1",
        },
        {
          descricao: "CAL 1",
          disciplina: "Cálculo 1",
        },
        {
          descricao: "IA",
          disciplina: "Inteligência Artificial",
        },
        {
          descricao: "FIS",
          disciplina: "Física",
        },
      ];
    },
    editItem(item) {
      this.editarIndice = this.disciplinas.indexOf(item);
      this.editarItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editarIndice = this.disciplinas.indexOf(item);
      this.editarItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.disciplinas.splice(this.editarIndice, 1);
      this.fecharDelete();
    },

    fechar() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editarItem = Object.assign({}, this.defaultItem);
        this.editarIndice = -1;
      });
    },

    fecharDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editarItem = Object.assign({}, this.defaultItem);
        this.editarIndice = -1;
      });
    },

    save() {
      if (this.editarIndice > -1) {
        Object.assign(this.disciplinas[this.editarIndice], this.editarItem);
      } else {
        this.disciplinas.push(this.editarItem);
      }
      this.fechar();
    },
  },
};
</script>
