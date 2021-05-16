
/* 1 MAPEANDO O JASON 'PIZZAS.JS */

//console.log(pizzaJson);

// 5 -> AÇÕES DO MODAL = 'cancelar',

// 4
let modalQT = 1 // inicializando com o valor do modal com a quantidade 1

// 5.4
let carrinho=[];
let modalChave = 0;

// Macetinho =>  jogando os documents query selector em variáveis
const c = (elemento)=> document.querySelector(elemento);  // Vai retornar o item
const cs = (elemento)=> document.querySelectorAll(elemento); // Vai retornar um array com os itens
//////

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

// 3 setando o index das pizzas
    pizzaItem.setAttribute('data-key',index);    

    // 3.1 pegando o index das pizzas    
        let chave = e.target.closest('.pizza-item').getAttribute('data-key');
        //console.log(pizzaJson[chave]);

       // 4.1 -> chamando a variável
        modalQT = 1; // <- Inicia com a quantidade 1
        modalChave = chave; // 5.4

    // 3.2 preenchendo o campo 'img','nome','descrição','price','tamanhos'  da pizza 
        c('.pizzaBig img').src = pizzaJson[chave].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[chave].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[chave].description;
        c('.pizzaInfo--actualPrice').innerHTML = pizzaJson[chave].price.toFixed(2);
        c('.pizzaInfo--size.selected').classList.remove('selected'); // removendo a classe 'selected'
        

        cs('.pizzaInfo--size').forEach((size,sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[chave].sizes[sizeIndex];
        })

// 2 MODAL
        c('.pizzaInfo--qt').innerHTML = modalQT;  // 4.2 -> sempre que abrir o modal vai inicializar com a quantidade 1
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display ='flex';

       setTimeout(()=>{
           c('.pizzaWindowArea').style.opacity =1
       },200)
    })

    c('.pizza-area').append(pizzaItem); // pizza-area recebe a classe clonada

});

// 5 -> Eventos do Modal

// 5.1  função para  fechar o modal
function fecharModal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
         c('.pizzaWindowArea').style.display = 'none';
    }, 500);
};
// 5.1  Selecionando os  botões ou elementos que vai receber a  função 'fecharModal()'
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', fecharModal);
});

// 5.2  Função  para os botões + e - do Modal

c('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalQT++;   // modal recebe mais 1
    c('.pizzaInfo--qt').innerHTML = modalQT; // modal atualizado


});

c('.pizzaInfo--qtmenos').addEventListener('click',()=>{

    if(modalQT > 1){
        modalQT--;
        c('.pizzaInfo--qt').innerHTML = modalQT;
    };
   
});

// 5.3 Função para selecionar os tamanhos das pizzas
cs('.pizzaInfo--size').forEach((size,sizeIndex)=>{
    size.addEventListener('click',(e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected')
    })
    
})

// 5.4 Adicionar ao carrinho de compras
c('.pizzaInfo--addButton').addEventListener('click',()=>{
    // Qual a  pizza?
    console.log(`Pizza ${modalChave}`)
    // Qual tamanho selecionado?
    let tamanho= parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    console.log(`Tamanho: ${tamanho}`);
    // Quantas pizzas?
    console.log(`Quantidade de Pizzas ${modalQT}`);

    carrinho.push({
        id:pizzaJson[modalChave].id,
        tamanho,
        quantidade:modalQT,
    });
    fecharModal();



});
console.log(carrinho);