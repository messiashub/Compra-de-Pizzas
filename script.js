
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
        console.log(pizzaJson[chave]);
        console.log(chave);

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
    let tamanho = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    console.log(`Tamanho: ${tamanho}`);
    // Quantas pizzas?
    console.log(`Quantidade de Pizzas ${modalQT}`);

    // 6 Identificando e contando pedidos iguais 
    let identificador = pizzaJson[modalChave].id+"#"+tamanho;
    let jaTem = carrinho.findIndex((item)=>item.identificador == identificador);

    if(jaTem >- 1){
        carrinho[jaTem].quantidade +=modalQT;

    }else{
        carrinho.push({
        identificador,
        id:pizzaJson[modalChave].id,
        tamanho,
        quantidade:modalQT,
    });
    }

    updateCarrinho() // 7.1 <-chamando a função de mostrar o carrinho atualizado
    fecharModal();

});
// 10.1  FUNÇÃO PARA MOSTRAR O CARRINHO NO CELULAR

    c('.menu-openner').addEventListener('click',()=>{
    if(carrinho.length > 0){
        c('aside').style.left = '0';
    }
    });

    c('.menu-closer').addEventListener('click',()=>{
        c('aside').style.left ='100vw';
    })

// 7 =>  FUNÇÃO PARA MOSTRAR O CARRINHO
function updateCarrinho(){
    

    c('.menu-openner span').innerHTML = carrinho.length; // 10  Celular

    if(carrinho.length > 0){
        // mostre o carrinho
        c('aside').classList.add('show');
        c('.cart').innerHTML =''; //8.1

// 9.1 => criando as variáveis para "subtotal","desconto" e "total"
        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in carrinho){ // < Para cada item no carrinho
            let pizzaItem = pizzaJson.find((item)=>item.id == carrinho[i].id);
            //console.log(pizzaItem);
            subtotal += pizzaItem.price * carrinho[i].quantidade;  // <= 9.2
// 8 => PREENCHENDO OS ITENS NO CARRINHO

            // 8.1 Fazendo  switch para indentificar os tamanhos com letras
            let pizzaTamanho; 
            switch(carrinho[i].tamanho){
                case 0:
                    pizzaTamanho = 'P';
                    break;
                case 1:
                    pizzaTamanho = 'M';
                    break;
                case 2:
                    pizzaTamanho = 'G';
                    break;

            }
            let pizzaNome = `${pizzaItem.name} (${pizzaTamanho})`;

            let carrinhoItem = c('.models .cart--item').cloneNode(true);
            carrinhoItem.querySelector('img').src=pizzaItem.img; // imagem
            carrinhoItem.querySelector('.cart--item-nome').innerHTML = pizzaNome;
            carrinhoItem.querySelector('.cart--item--qt').innerHTML =carrinho[i].quantidade;
// 9 => BOTÕES + E -  DO CARRINHO
            carrinhoItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(carrinho[i].quantidade > 1){
                    carrinho[i].quantidade--;
                }else{
                    carrinho.splice(i,1);
                }
                updateCarrinho();

            })
            carrinhoItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                carrinho[i].quantidade++;
                updateCarrinho();

            })

            c('.cart').append(carrinhoItem);

        } 

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML =`${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML =`${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML =`${total.toFixed(2)}`;

    }else{
        // esconda o carrinho
        c('aside').classList.remove('show');
        c('aside').style.left ='100vw'; // 10.2
    }

}
console.log(carrinho);