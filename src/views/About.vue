<template>
  <div class="about">
    <h2>Gerenciamento de Manuais</h2>
    <form class="search-container">
      <input type="text" id="search-bar" placeholder="Busca"/>
      <a href="#"><img class="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"/></a>
    </form>
    <Modal @close="toggleModal" :modalActive="modalActive">
      <div class="modal-content">
       <input type="text" id="nomeid" placeholder="Tiago Vale" required="required" name="nome" />
  <label for="nome">Nome</label>
 <label for="fone">Fone</label>
  <input type="tel" id="foneid" placeholder="(xx)xx-xx-xx-xx" name="fone" />
<label for="email">Email</label>
  <input type="email" id="emailid" placeholder="fulano@mail.com" name="email" />
  <textarea placeholder="Deixe sua opnião"></textarea>
  <input type="submit" class="enviar" onclick="Enviar();" value="Enviar" />
      </div>
    </Modal>
     <button @click="toggleModal" type="button">Open Modal</button>
<div class="table-container">
<table>
        <tr>
          <th>Descrição</th>
          <th>Arquivo</th>
          <th>Ações</th>
        </tr>
        <tr>
          <td>Manual da Aula 1</td>
          <td>Aula1.pdf</td>
          <td><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/e536e038-b034-4cab-96f2-da7ed30bfc07.png"></button></td>
        </tr>
        <tr>
          <td>Manual da Aula 2</td>
          <td>Aula2.pdf</td>
          <td><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/e536e038-b034-4cab-96f2-da7ed30bfc07.png"></button></td>
        </tr>
        <tr>
          <td>Manual da Aula 3</td>
          <td>Aula3.pdf</td>
          <td><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/e536e038-b034-4cab-96f2-da7ed30bfc07.png"></button></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import Modal from '@/components/Modal.vue'
export default {
  name: 'About',
  components: {
    Modal
  }
}
</script>
<style>
.table-container {
  overflow-x: auto;
}
.tabela {
  width: 50%;
  border-collapse: collapse;
  margin: auto;
  caption-side: top;
  empty-cells: hide;
  table-layout: auto;
}
button{
 background-color: Transparent;
 background-repeat:no-repeat;
 border: none;
 cursor:pointer;
 overflow: hidden;
outline: none;
}
th,
td {
  padding: 15px;
  text-align: left;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
.add-icon{
  left: -300px;
}
.bg{
 padding:5%;
}
.background{
  background-color:#e2e2e2;
  box-shadow: rgb(184, 184, 184) 0.1em 0.3em 0.7em;
  margin: auto;
  height:500px;
  width:100%;
}

.flex-wrapper-five {
  background-color: greenyellow;
  border-radius: 50%;
  padding: 14px 19px 13px 20px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
}

p {
  font-family: "Roboto";
  font-size: 24px;
  line-height: 20px;
  color: black;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}
.barraPesquisa{
  position: relative;
}
input#search-bar {
  margin: 0 auto;
  margin-left: 23%;
  margin-right: 40% ;
  width: 45%;
  height: 45px;
  padding: 0 20px;
  font-size: 1rem;
  border: 1px solid #d0cfce;
  outline: none;

}
input#search-bar:focus {
  border: 1px solid #000000;
  transition: 0.35s ease;
  color: #000000;
}
input#search-bar::-webkit-input-placeholder {
  transition: opacity 0.45s ease;
  opacity: 0;
}
input#search-bar::-moz-placeholder {
  transition: opacity 0.45s ease;
  opacity: 0;
}
input#search-bar::-ms-placeholder {
  transition: opacity 0.45s ease;
  opacity: 0;
}
.search-icon {
  position: relative;
  float:right;
  width: 75px;
  height: 75px;
  top: -62px;
  right: 250px;
}
.add-icon {
  position: relative;
  float:right;
  width: 50px;
  height: 50px;
  top: -20px;
  right: 150px;
}
</style>
