<template>
  <section class="section-form">
    <h1 class="text-h5 title-login">Login</h1>
    <v-card width="400" class="mx-auto mt-5 card-login p-1" id="login">
      <v-card-title class="pb-0"> </v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field label="Usuário" prepend-icon="mdi-account-circle" color="red"/>
          <v-text-field label="Senha" prepend-icon="mdi-lock" color="red" />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-dialog v-model="recuperar" max-width="400">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on"> Esqueceu a senha? </v-btn>
            <v-spacer></v-spacer>
          </template>

          <v-card width="400" class="mx-auto mt-5 card-login p-1">
            <v-card-title class="pb-0"> </v-card-title>
            <v-card-text>
              <v-form>
                <h5 class="text-h5">Recuperação de Senha</h5>
                <v-text-field
                  label="E-mail"
                  prepend-icon="mdi-account-circle"
                  color="red"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn id="btn-enviar">Enviar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn center id="btn-logar">Login</v-btn>
      </v-card-actions>
    </v-card>
  </section>
</template>

<style>
.section-form {
  padding: 5% 0;
  text-align: center;
  font-family: "Roboto", "Times New Roman", Times, serif;
}
#btn-logar {
  width: 50%;
  color: white;
  background-color: #e11b22;
  display: block !important;
  padding-inline: 1%;
}
.card-login {
  height: 250px;
}
.v-card-actions {
  align-items: center;
  text-align: center;
  padding-right: 2%;
}
#btn-enviar {
  width: 100%;
  color: white;
  background-color: #e11b22;
  display: block !important;
  padding-inline: 1%;
}
.v-card-actions {
  align-items: center;
  text-align: center;
  padding-right: 2%;
}
.text-h5{
  padding-bottom: 5%;
  text-align: center;
  font-family: "Roboto", "Times New Roman", Times, serif;
}
</style>

<script>
export default {
  name: "Login",
};
</script>