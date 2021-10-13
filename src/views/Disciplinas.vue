<template>
<div class="inicio">
 <div class="bg">
<section class="background">
  <div class="about">
    <h1></h1>
    <div class="table-container">
      <div class="lado">
      <table class="tabela">
        <tr>
          <th>Apelido</th>
          <th>Disciplina</th>
          <th>Ações</th>
        </tr>
        <tr>
          <td>CAL</td>
          <td>CALCULO</td>
          <td class="listar"><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/e536e038-b034-4cab-96f2-da7ed30bfc07.png"></button></td>
        </tr>
        <tr>
          <td>IA</td>
          <td>INTELIGÊNCIA ARTIFICIAL</td>
          <td class="listar"><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/e536e038-b034-4cab-96f2-da7ed30bfc07.png"></button></td>
        </tr>
        <tr>
          <td>FIS</td>
          <td>FÍSICA</td>
            <td class="listar"><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/e536e038-b034-4cab-96f2-da7ed30bfc07.png"></button></td>
        </tr>
        <tr>
          <td>QUI</td>
          <td>QUÍMICA</td>
          <td class="listar"><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/e536e038-b034-4cab-96f2-da7ed30bfc07.png"></button></td>
        </tr>
        <tr>
          <td>POR</td>
          <td>PORTUGUÊS</td>
          <td class="listar"><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/e536e038-b034-4cab-96f2-da7ed30bfc07.png"></button></td>
        </tr>
      </table>
      </div>
    </div>
  </div>
</section>
</div>
</div>
</template>

<script>
export default {
  name: 'Disciplinas'
}
</script>

<style>
.table-container {
  overflow-x: auto;
}
.tabela {

  margin: auto;
  caption-side: top;
  empty-cells: hide;
  table-layout: auto;
}
.lado{
  padding: 5%;
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
.background{
  background-color:#e2e2e2;
  box-shadow: rgb(184, 184, 184) 0.1em 0.3em 0.7em;
  width: 50%
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
.search-container {
  width: 490px;
  display: block;
  margin: 0 auto;
}
input#search-bar {
  margin: 0 auto;
  width: 100%;
  height: 45px;
  padding: 0 10px;
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
  float: right;
  width: 75px;
  height: 75px;
  top: -62px;
  right: -45px;
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
