import '../estilo.css';
import { montarCabecalho } from '../componentes/cabecalho.js';
import { api } from '../api/api.js';

montarCabecalho();

// TEMPORÁRIO: só para provar que o proxy e a API estão funcionando
const teste = document.getElementById('teste-api');
api('/saude')
    .then((dados) => { teste.textContent = `API respondeu: ${dados.status}`; })
    .catch((erro) => { teste.textContent = `Erro: ${erro.message}`; });