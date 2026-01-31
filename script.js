const telefoneWhatsApp = "5517996567779"; // coloque seu número


const combos = [
  {
    nome: "Combo 2 X-Salada",
    descricao: "Pão, maionese, hambúrguer 120g, presunto, mussarela, milho, ervilha, alface, tomate, batata palha + Guaraná Poty 2L",
    preco: 40.00,
    imagem: "/public/combo.jpg"
  },
  {
    nome: "Combo 2 X-Salada Bacon",
    descricao: "Pão, maionese, hambúrguer 120g, presunto, mussarela, bacon, milho, ervilha, alface, tomate, batata palha + Guaraná Poty 2L",
    preco: 40.99,
    imagem: "/public/combo.jpg"
  },
  {
    nome: "Combo 2 X-Salada Egg",
    descricao: "Pão, maionese, hambúrguer, presunto, mussarela, ovo, milho, ervilha, alface, tomate, batata palha + Guaraná Poty 2L",
    preco: 42.99,
    imagem: "/public/combo.jpg"
  },
  {
    nome: "Combo 2 X-Egg",
    descricao: "Pão, maionese, hambúrguer 120g, ovo, presunto, mussarela, batata palha + Guaraná Poty 2L",
    preco: 41.99,
    imagem: "/public/combo.jpg"
  },
  {
    nome: "Combo 2 X-Egg Bacon",
    descricao: "Pão, maionese, hambúrguer 120g, ovo, bacon, presunto, mussarela, batata palha + Guaraná Poty 2L",
    preco: 45.99,
    imagem: "/public/combo.jpg"
  },
  {
    nome: "Combo 2 X-Bacon",
    descricao: "Pão, maionese, hambúrguer 120g, bacon, presunto, mussarela, batata palha + Guaraná Poty 2L",
    preco: 43.99,
    imagem: "/public/combo.jpg"
  },
  {
    nome: "Combo 2 X-Tudo",
    descricao: "Pão, maionese, hambúrguer 120g, ovo, bacon, presunto, mussarela, alface, tomate, milho, ervilha, batata palha + Guaraná Poty 2L",
    preco: 48.99,
    imagem: "/public/combo.jpg"
  },
  {
    nome: "Combo 2 X-Tudo Duplo",
    descricao: "Pão, maionese, 2 hambúrgueres, 2 ovos, 2 presuntos, 2 mussarelas, bacon, milho, ervilha, alface, tomate, batata palha + Guaraná Poty 2L",
    preco: 58.99,
    imagem: "/public/combo.jpg"
  }
];

const cardapio = document.getElementById("cardapio");
const listaCarrinho = document.getElementById("listaCarrinho");
const totalEl = document.getElementById("total");
const qtdCarrinho = document.getElementById("qtdCarrinho");
const taxaEntregaEl = document.getElementById("taxaEntrega");

let carrinho = [];

let tipoPedido = "retirada";
let enderecoEntrega = "";
let distanciaEntrega = 0;
let taxaEntrega = 0;


// Renderizar carrinho

combos.forEach((combo, index) =>{
    cardapio.innerHTML += `
      <article class="card">
          <img class="card-img" src="${combo.imagem}" alt="${combo.nome}"/>
          <div class="card-content">
            <h2>${combo.nome}</h2>
            <p class="article_p">${combo.descricao}</p>
            <p class="article_p">1 Guaraná Poty 2L</p>
            <button onclick="adicionarCarrinho(${index})" class="div1" ><span class="radio"><img src="/public/plus.svg" /></span> <p class="span_p"><span></span>${formatarReal(combo.preco)}<span></span></p></button>
          </div>
          
        </article>
    `
});

function formatarReal(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

function adicionarCarrinho(index){
     const item = carrinho.find(i => i.nome === combos[index].nome);

     if(item) {
        item.qtd++;
     } else{
        carrinho.push({
            nome: combos[index].nome,
            preco: combos[index].preco,
            qtd: 1
        })
     }

     atualizarCarrinho();
}

//Atualizar carrinho
function atualizarCarrinho(){
    listaCarrinho.innerHTML = "";
    let subtotal = 0;
    let quantidadeTotal = 0;

    carrinho.forEach((item, index) =>{
        subtotal += item.preco * item.qtd;
        quantidadeTotal += item.qtd;

        listaCarrinho.innerHTML +=`
            <li class="lista-car">
              <span>${item.nome}</span>
              <div>
                <button class="btn-menos" onclick="diminuir(${index})"><img class="icon" src="/public/minus.svg"/></button>
                <span>${item.qtd}</span>
                <button class="btn-mais" onclick="aumentar(${index})"><img class="icon" src="/public/plus.svg"/></button>
                <button class="btn-remover" onclick="remover(${index})"><img class="icon" src="/public/trash.svg"/></button>
              </div>
            </li> 
        `
    })

    calcularTaxaEntrega();

    const totalFinal = subtotal + taxaEntrega;

    totalEl.textContent = formatarReal(totalFinal);
    qtdCarrinho.textContent = quantidadeTotal;

    taxaEntregaEl.textContent = formatarReal(taxaEntrega);
}

// Controles 
function aumentar(index) {
    carrinho[index].qtd++;
    atualizarCarrinho();
}

function diminuir(index){
    if(carrinho[index].qtd > 1) {
      carrinho[index].qtd--;
    } else{
        carrinho.splice(index, 1)
    }
    atualizarCarrinho();
}

function remover(index){
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function escolherRetirada() {
  tipoPedido = "retirada";
  distanciaEntrega = 0;
  enderecoEntrega = "";
  document.getElementById("boxDistancia").style.display = "none";
  document.getElementById("boxEndereco").style.display = "none";
  atualizarCarrinho();
}

function escolherEntrega() {
  tipoPedido = "entrega";
  document.getElementById("boxDistancia").style.display = "block";
  document.getElementById("boxEndereco").style.display = "block";
  atualizarCarrinho();
}

function atualizarEndereco(valor) {
  enderecoEntrega = valor;
}

function atualizarDistancia(valor) {
  distanciaEntrega = Number(valor);
  atualizarCarrinho();
}


  // Abrir e fechar carrinho

function toggleCarrinho(){
    document.getElementById("carrinho").classList.toggle("ativo");
    document.getElementById("overlay").style.display = 
     document.getElementById("carrinho").classList.contains("ativo")
       ? "block"
       : "none";
}

function calcularTaxaEntrega(){
  if(tipoPedido === "entrega"){
    if(distanciaEntrega > 2) {
      taxaEntrega = 8;
    } else{
      taxaEntrega = 0;
    }
  }  else {
    taxaEntrega = 0;
  } 
  return taxaEntrega;
}



function enviarWhatsApp() {
  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  if (tipoPedido === "entrega" && (!enderecoEntrega || enderecoEntrega.trim() === "")) {
    alert("Por favor, informe o endereço para entrega.");
    return;
  }

  let mensagem = "🛒 *Pedido*\n\n";

  carrinho.forEach(item => {
    mensagem += `• ${item.nome} (${item.qtd} x ) - ${formatarReal(item.preco * item.qtd)}\n`;
  });

  mensagem += `\n📦 *Tipo:* ${tipoPedido === "entrega" ? "Entrega" : "Retirada"}`;

  if (tipoPedido === "entrega") {
    mensagem += `\n📍 *Endereço:* ${enderecoEntrega}`;
    mensagem += `\n📏 Distância: ${distanciaEntrega} km`;
    mensagem += `\n🚚 Taxa de entrega: ${formatarReal(taxaEntrega)}`;
  }

  mensagem += `\n\n💰 *Total:* ${totalEl.textContent}`;

  const url = `https://wa.me/${5517988159732}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}