<template>
  <v-data-table :headers="headers" :items="disciplinas" class="elevation-2 data-table">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Gerenciamento de Disciplina</v-toolbar-title>
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
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-form v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.descricao"
                        label="Apelido"
                        :rules="['Campo Obrigatório']"
                        maxlenght="20"
                        required
                      ></v-text-field>
                    </v-col>  
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Disciplina"
                        label="Disciplina"
                        :rules="['Campo Obrigatório']"
                        maxlenght="20"
                      ></v-text-field>
                    </v-col> 
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Periodo"
                        label="Período"
                        :rules="['Campo Obrigatório']"
                        maxlenght="20"
                        required
                      ></v-text-field>
                    </v-col> 
                    <v-col cols="8" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Nome"
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
              <v-btn small color="primary" dark  @click="save"> Salvar </v-btn>
              <v-btn small color="warning" dark @click="close">
                Cancelar
              </v-btn>
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
                <v-btn  small color="primary" dark  @click="deleteItemConfirm"
                >Sim</v-btn
              >
              <v-btn small color="warning" dark @click="closeDelete"
                >Não</v-btn
              >
            
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Modal Detalhar 
        <v-dialog v-model="dialogDelete" max-width="400px">
          <v-card class="card-modal">
            <v-card-title class="text-h6"
              >Disciplina</v-card-title>
 <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Apelido: </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
<v-list-item>
      <v-list-item-content>
        <v-list-item-title>Disciplina: </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
            <v-card-actions>
              <v-btn small color="warning" dark @click="closeDelete"
                >Sair</v-btn><v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
      </v-toolbar>
    </template>
    <template v-slot:item.acoes="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-message-text
      </v-icon>
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
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
</style>
<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Apelido",
        align: "start",
        value: "descricao",
      },
      { text: "Disciplina", value: "Disciplina" },
      { text: "Ações", value: "acoes", sortable: false },
    ],
    disciplinas: [],
    editedIndex: -1,
    editedItem: {
      descricao: "",
      Disciplina: "",
    },
    defaultItem: {
      descricao: "",
      Disciplina: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Cadastrar Disciplina" : "Editar Dados";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.disciplinas = [
        {
          descricao: "ALG 1",
          Disciplina: "Algoritmo 1",
        },
        {
          descricao: "CAL 1",
          Disciplina: "Cálculo 1",
        },
        {
          descricao: "IA",
          Disciplina: "Inteligência Artificial",
        },
        {
          descricao: "FIS",
          Disciplina: "Física",
        },
      ];
    },
    editItem(item) {
      this.editedIndex = this.disciplinas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.disciplinas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.disciplinas.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.disciplinas[this.editedIndex], this.editedItem);
      } else {
        this.disciplinas.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
