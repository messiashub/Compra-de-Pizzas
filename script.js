/* 1 MAPEANDO O JASON 'PIZZAS.JS */

console.log(pizzaJson);

// Macetinho =>  jogando os documents query selector em variáveis
const c = (elemento)=> document.querySelector(elemento);  // Vai retornar o item
const cs = (elemento)=> document.querySelectorAll(elemento); // Vai retornar um array com os itens


// 1
pizzaJson.map((pizza,index)=>{ // Para cada objeto dentro de pizzaJson mapeie e adciona a classe ".pizza-item"
    let pizzaItem = c('.models .pizza-item').cloneNode(true); // Clonando a classe e jogando dentro da classe ".pizza-area"
    // preencher as informações em pizza-item

    pizzaItem.querySelector('.pizza-item--img img').src = pizza.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `RS:${pizza.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.description;
    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault();
        console.log('clicou');
// 2 MODAL
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display ='flex';

       setTimeout(()=>{
           c('.pizzaWindowArea').style.opacity =1
       },200)
        

    })


    c('.pizza-area').append(pizzaItem); // pizza-area recebe a classe clonada

});