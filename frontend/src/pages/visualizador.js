import { criarVisualizador } from '../viewer/viewer.js';
const container = document.getElementById('visualizador');
const visualizador = criarVisualizador(container);

// TEMPORÁRIO (só para testes): permite escolher o modelo pela URL,
// ex.: http://localhost:5173/?modelo=outro.glb
const parametros = new URLSearchParams(window.location.search);
const nomeArquivo = parametros.get('modelo') ?? 'rtx3090_gpu.glb';

visualizador
    .carregarModelo(`/modelos/${nomeArquivo}`)
    .catch((erro) => console.error('Erro ao carregar o modelo:', erro));

document
    .getElementById('btn-reset')
    .addEventListener('click', () => visualizador.resetarCamera());
    window.visualizador = visualizador;