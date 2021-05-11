/* 1 MAPEANDO O JASON 'PIZZAS.JS */

console.log(pizzaJson);

// Macetinho =>  jogando os documents query selector em variáveis
const c = (elemento)=> document.querySelector(elemento);  // Vai retornar o item
const cs = (elemento)=> document.querySelectorAll(elemento); // Vai retornar um array com os itens

pizzaJson.map((pizza,index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true); // Clonando a classe e jogando dentro da classe ".pizza-area"
    // preencher as informações em pizza-item

    c('.pizza-area').append(pizzaItem); // pizza-area recebe a classe clonada

});