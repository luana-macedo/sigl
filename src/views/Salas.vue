<template>
  <v-data-table :headers="headers" :items="sala" class="elevation-2">
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>Gerenciamento de Sala</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
         <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field> 
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px"> 
          <template v-slot:activator="{ on, attrs }">
            <!-- <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Adicionar</v-btn> -->
            <v-btn class="mx-2 add" fab dark color="green" v-bind="attrs" v-on="on"><v-icon dark> mdi-plus</v-icon></v-btn> 
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
               <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
           cols="8"
                    sm="6"
                    md="4"
        >
          <v-text-field
            v-model="editedItem.numero"
            label="Sala"
            required
          ></v-text-field>
        </v-col>
        <v-col
           cols="8"
                    sm="6"
                    md="4"
        >
          <v-text-field
            v-model="editedItem.nome"
            label="Nome"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Deseja remover esta sala?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
       <template v-slot:item.acoes='{item}'>
       <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
       mdi-message-text
      </v-icon>
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<style>
.add{
  width:5%;
  height:5%;
}
body{
  padding:2%;
}
</style>
<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Descrição',
          align: 'start',
          value: 'numero',
        },
        { text: 'nome', value: 'nome' },
        { text: 'Ações', value: 'acoes', sortable: false },
      ],
      sala: [],
      editedIndex: -1,
      editedItem: {
        numero: '',
        nome: '',
      },
      defaultItem: {
        numero: '',
        nome: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Cadastrar Sala' : 'Editar Sala'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.sala = [
          {
            numero: '04',
            nome: 'Clinica',
          },
          {
            numero: '03',
            nome: 'Sala de Radiologia',
          },
          {
            numero: '02',
            nome: 'Sala de exames',
          },
          {
            numero: ' 01',
            nome: 'Laboratoria de Anatomia',
          }
        ]
      },
      editItem (item) {
        this.editedIndex = this.sala.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.sala.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.sala.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.sala[this.editedIndex], this.editedItem)
        } else {
          this.sala.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

