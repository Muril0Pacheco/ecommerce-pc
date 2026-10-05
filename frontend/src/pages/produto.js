import '../estilo.css';
import { montarCabecalho } from '../componentes/cabecalho.js';
import { api } from '../api/api.js';
import { formatarPreco, escapar } from '../utils.js';

montarCabecalho();

const id = new URLSearchParams(window.location.search).get('id');
const elMensagem = document.getElementById('mensagem');
const elProduto = document.getElementById('produto');

function desenharProduto(p) {
    document.title = `${p.nome} - PC Store`;

    const disponivel = p.estoque > 0;

    elProduto.innerHTML = `
        <h1>${escapar(p.nome)}</h1>
        <p class="categoria">${escapar(p.categoria)}</p>
        <p class="descricao">${escapar(p.descricao)}</p>
        <p class="preco-grande">${formatarPreco(p.preco)}</p>
        <p class="${disponivel ? 'em-estoque' : 'sem-estoque'}">
            ${disponivel ? `Em estoque: ${p.estoque} unidades` : 'Indisponível'}
        </p>
        <div class="acoes">
            ${p.modelo_3d
                ? `<a class="botao" href="/visualizador.html?id=${p.id}">Visualizar em 3D</a>`
                : ''}
            <button class="botao primario" id="btn-carrinho" ${disponivel ? '' : 'disabled'}>
                Adicionar ao carrinho
            </button>
        </div>
        <p id="aviso-carrinho"></p>
    `;
}

async function iniciar() {
    if (!id) {
        elMensagem.textContent = 'Produto não informado.';
        return;
    }

    elMensagem.textContent = 'Carregando...';

    try {
        const produto = await api(`/produtos/${encodeURIComponent(id)}`);
        elMensagem.textContent = '';
        desenharProduto(produto);
    } catch (erro) {
        // 404 e "ID inválido" chegam aqui com a mensagem do backend
        elMensagem.textContent = erro.message;
    }
}

iniciar();