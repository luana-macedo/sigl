<template>
  <v-data-table :headers="headers" :items="manuais" class="elevation-2 data-table">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Gerenciamento de Manuais</v-toolbar-title>
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
        <v-dialog v-model="dialog" max-width="350px">
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
              <span class="text-h6">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-form v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="8">
                      <v-text-field
                        v-model="editedItem.descricao"
                        label="Descrição"
                        required
                      ></v-text-field>
                    </v-col>  
                    <v-col cols="12" sm="4" md="8">
                      <v-file-input truncate-length="18" 
                      v-model="editedItem.arquivo"
                        label="Arquivo"
                        required
                      ></v-file-input>
                    </v-col> 
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions id="card-actions">
              <v-btn small color="primary" dark  @click="save"> Salvar </v-btn>
              <v-btn small color="warning" dark @click="close">
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="350px">
          <v-card class="card-modal">
            <v-card-title class="text-h6"
              >Deseja remover este manual ?</v-card-title
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
        <v-dialog max-width="350px" v-model="dialogdetalhar">
          <v-card>
            <v-card-title>
              <span class="text-h6">Detalhar</span>
            </v-card-title>

            <v-card-text>
              <v-form v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="8">
                      <v-text-field> Descrição : Manual da Aula </v-text-field>
                    </v-col>  
                    <v-col cols="12" sm="4" md="8">
                      <v-text-field> Arquivo : Manualdaaula.pdf</v-text-field>
                    </v-col> 
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions id="card-actions">
              <v-btn small color="primary" dark  @click="save"> Salvar </v-btn>
              <v-btn small color="warning" dark @click="close">
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> 
      </v-toolbar>
    </template>
    <template v-slot:item.acoes="{ item }">
      <v-icon small class="mr-2" @click="initialize">
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
    dialogdetalhar: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Descrição",
        align: "start",
        value: "descricao",
      },
      { text: "Arquivo", value: "arquivo" },
      { text: "Ações", value: "acoes", sortable: false },
    ],
    manuais: [],
    editedIndex: -1,
    editedItem: {
      descricao: "",
      arquivo: "",
    },
    defaultItem: {
      descricao: "",
      arquivo: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Cadastrar Manual" : "Editar Manual";
    },
  },

  watch: {
     dialogdetalhar(val) {
      val || this.close();
    },
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
      this.manuais = [
        {
          descricao: "Manual da Aula",
          arquivo: "manualdaaula2.pdf",
        },
        {
          descricao: "Manual Anatomia",
          arquivo: "manualanatomia.pdf",
        },
        {
          descricao: "Manual Clinico",
          arquivo: "manualclinico.pdf",
        },
        {
          descricao: "Manual ",
          arquivo: "manual",
        },
      ];
    },
    editItem(item) {
      this.editedIndex = this.manuais.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.manuais.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.manuais.splice(this.editedIndex, 1);
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
        Object.assign(this.manuais[this.editedIndex], this.editedItem);
      } else {
        this.manuais.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
