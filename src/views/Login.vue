<template>
  <div class="Login"> 
  <h1>Login</h1>
    <div id="login">
     <input class="usuario" type="text" placeholder="Usuario"><br>
     <input class="senha" type="password" placeholder="Senha"><br>
     <div class= "btn-login"><button class="entrar">Entrar</button>
     </div><p><a class="esqueceu" href=""> Esqueceu Senha?</a></p></div>
    </div>
</template>
<script>
export default {
  name:'Login'
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
  background-color: #E11B22;
  color: white;
  bottom: unset;
  padding: 12px;
  text-align: center;
  cursor: pointer;
}
.Usuario{
  padding: 8%;
}
.Senha{
  padding: 8%;
}
.senha{
  padding: 5%;
}
.usuario{
  padding: 5%;
}
.esqueceu{
  font-family: 'Times New Roman', Times, serif;
  text-align: center;
  padding: 8%;
  font-size: 0.5em;
}
</style>
