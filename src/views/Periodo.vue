<template>
<div class="inicio">
 <div class="bg">
<section class="background">
  <div class="about">
    <h1></h1>
    <div class="table-container">
      <table class="tabela">
        <tr>
          <th>Período</th>
          <th>Ações</th>
        </tr>
        <tr>
          <td>2020/1</td>
          <td class="listar"><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/e536e038-b034-4cab-96f2-da7ed30bfc07.png"></button></td>
        </tr>
        <tr>
          <td>2020/1</td>
          <td class="listar"><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/e536e038-b034-4cab-96f2-da7ed30bfc07.png"></button></td>
        </tr>
        <tr>
          <td>2020/2</td>
            <td class="listar"><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/e536e038-b034-4cab-96f2-da7ed30bfc07.png"></button></td>
        </tr>
        <tr>
          <td>2020/2</td>
          <td class="listar"><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/e536e038-b034-4cab-96f2-da7ed30bfc07.png"></button></td>
        </tr>
        <tr>
          <td>2021/1</td>
          <td class="listar"><button><img src="https://static.overlay-tech.com/assets/01df22c7-27e9-4a24-a5ad-f6905d92c307.png"></button><button><img src="https://static.overlay-tech.com/assets/f7c20534-e6a3-4393-9663-7d263aa4329a.png"></button><button><img src="https://static.overlay-tech.com/assets/e536e038-b034-4cab-96f2-da7ed30bfc07.png"></button></td>
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
  name: 'Professor'
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
</style>
