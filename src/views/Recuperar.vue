<!--
<template>
  <div class="Recuperar" > </div>
  <h1>
      LOGIN
  </h1>
  <!--
    <div id="login">
      <input class="usuario" type= "text" img src="https://static.overlay-tech.com/assets/403d272c-e387-4c09-bc34-ba3d6c46da2c.svg" placeholder="Nova Senha:">
     <br>
     <input class="senha" type="password" img src="https://static.overlay-tech.com/assets/403d272c-e387-4c09-bc34-ba3d6c46da2c.svg" placeholder="Confirmar Senha:">
     <br>
     <div class= "btn-login">
       <button class="entrar">Entrar</button>
     </div>
     <p>
       <a href=""> Esqueceu Senha ? </a>
     </p>
       </div>
</template>
<script>
export default {
  name: 'Recuperar',
  data () {
    return {
      input: {
        username: 'Usuário',
        password: 'Senha'
      }
    }
  },
  methods: {
    login () {
      if (this.input.username !== '' && this.input.password !== '') {
        if (this.input.username === this.$parent.mockAccount.username && this.input.password === this.$parent.mockAccount.password) {
          this.$emit('authenticated', true)
          this.$router.replace({ name: 'secure' })
        } else { console.log('The username and / or password is incorrect') }
      } else { console.log('A username and password must be present') }
    }
  },
  mounted () {
    if (!this.authenticated) {
      this.$router.replace({ name: 'login' })
    }
  },
  setAuthenticated (status) {
    this.authenticated = status
  },
  logout () {
    this.authenticated = false
  }
}
</script>
<style scoped>
#login {
        width: 200px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 80px;
        padding: 50px;
        text-align: center;
    }
h1{
    font-family: 'Roboto' 'Times New Roman', Times, serif;
    color: black;
    text-align: center;
}
.entrar{
  background-color: #c21a36;
  color: white;
  bottom: unset;
  padding: 13px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0.1em 0.2em 0.5em rgb(204, 204, 204);
}
.Usuario{
  padding: 8%;
}
.Senha{
  padding: 8%;
}
.senha{
  border-radius: 6px;
  padding: 6%;
}
.usuario{
  border-radius: 6px;
  padding: 6%;
}
.esqueceu{
  font-family: 'Times New Roman', Times, serif;
  text-decoration: none;
  text-align: center;
  padding: 8%;

}
</style>
