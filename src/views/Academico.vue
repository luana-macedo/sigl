<template>
<div class="inicio">
 <div class="bg">
<section class="background">
    <div class="cadastro">
         <a href="#"><img class="add-icon" src="https://static.overlay-tech.com/assets/437c836f-a723-4f7e-aad2-111d3b374d67.png"></a>
     </div>
     <div class="barraPesquisa">
        <input type="text" id="search-bar" placeholder="Busca">
    <a href="#"><img class="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"></a>
    </div>
  <div class="about">
    <h1></h1>
    <div class="table-container">
      <table class="tabela">
        <tr>
          <th>Matricula</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
        <tr>
          <td>010203040506</td>
          <td>Jose Antônio</td>
          <td class="listar"><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/4a1697c7-ea60-40b1-920b-d5fc41d1bd1c.png"></button></td>
        </tr>
        <tr>
          <td>102030405060</td>
          <td>Samara Pereira</td>
          <td class="listar"><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/4a1697c7-ea60-40b1-920b-d5fc41d1bd1c.png"></button></td>
        </tr>
        <tr>
          <td>142536070809</td>
          <td>Priscilla Alencar</td>
            <td class="listar"><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/4a1697c7-ea60-40b1-920b-d5fc41d1bd1c.png"></button></td>
        </tr>
        <tr>
          <td>586947415263</td>
          <td>Steve McGarrett</td>
          <td class="listar"><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/4a1697c7-ea60-40b1-920b-d5fc41d1bd1c.png"></button></td>
        </tr>
        <tr>
          <td>741258963023</td>
          <td>Catherine Rollins</td>
          <td class="listar"><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/4a1697c7-ea60-40b1-920b-d5fc41d1bd1c.png"></button></td>
        </tr>
      </table>
    </div>
  </div>
</section>
</div>
</div>
</template>
<script>
export default {
  name: 'inicio'
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
input#search-bar {
  margin: 0 auto;
  margin-left: 23%;
  margin-right: 40% ;
  width: 30%;
  height: 45px;
  padding: 0 20px;
  font-size: 1rem;
  border: 1px solid #d0cfce;
  outline: none;
border-radius: 4px;
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
  right: 450px;
}
.add-icon {
  position: relative;
  float:right;
  width: 50px;
  height: 50px;
  top: -20px;
  right: 250px;
}
</style>
