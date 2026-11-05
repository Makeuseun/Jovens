// JOGO DA MEMÓRIA DAS CORES
// Projeto final - Módulo 2: Lógica de Programação
// Execução: node jogo.js

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Códigos ANSI: cada cor é encerrada com RESET.
const RESET = "\x1b[0m";
const CORES = [
  { nome: "VERMELHO", codigo: "\x1b[31m", simbolo: "●" },
  { nome: "VERDE",    codigo: "\x1b[32m", simbolo: "●" },
  { nome: "AMARELO",  codigo: "\x1b[33m", simbolo: "●" },
  { nome: "AZUL",     codigo: "\x1b[34m", simbolo: "●" },
  { nome: "MAGENTA",  codigo: "\x1b[35m", simbolo: "●" },
  { nome: "CIANO",    codigo: "\x1b[36m", simbolo: "●" },
  { nome: "BRANCO",   codigo: "\x1b[37m", simbolo: "●" },
  { nome: "LARANJA",  codigo: "\x1b[33m", simbolo: "◆" }
];

const TAMANHO = 4;
let tabuleiro = [];
let reveladas = [];
let tentativas = 0;
let paresEncontrados = 0;

function perguntar(texto) {
  return new Promise(resolve => rl.question(texto, resolve));
}

// Embaralha as cartas usando o algoritmo Fisher-Yates.
function embaralhar(vetor) {
  for (let i = vetor.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [vetor[i], vetor[j]] = [vetor[j], vetor[i]];
  }
  return vetor;
}

function criarTabuleiro() {
  const cartas = embaralhar([...CORES, ...CORES]);
  tabuleiro = [];

  for (let linha = 0; linha < TAMANHO; linha++) {
    const novaLinha = [];
    for (let coluna = 0; coluna < TAMANHO; coluna++) {
      novaLinha.push(cartas[linha * TAMANHO + coluna]);
    }
    tabuleiro.push(novaLinha);
  }

  reveladas = Array.from({ length: TAMANHO }, () =>
    Array(TAMANHO).fill(false)
  );
}

function colorir(carta) {
  return `${carta.codigo}${carta.simbolo} ${carta.nome}${RESET}`;
}

function mostrarTabuleiro(posicoesTemporarias = []) {
  console.log("\n========== JOGO DA MEMÓRIA ==========");
  console.log("       1       2       3       4");

  for (let linha = 0; linha < TAMANHO; linha++) {
    let saida = `${linha + 1}  `;

    for (let coluna = 0; coluna < TAMANHO; coluna++) {
      const temporaria = posicoesTemporarias.some(
        p => p.linha === linha && p.coluna === coluna
      );

      if (reveladas[linha][coluna] || temporaria) {
        saida += `[${colorir(tabuleiro[linha][coluna])}] `;
      } else {
        saida += "[   ?   ] ";
      }
    }
    console.log(saida);
  }

  console.log("-------------------------------------");
  console.log(`Tentativas: ${tentativas} | Pares encontrados: ${paresEncontrados}/8`);
  console.log("=====================================\n");
}

function converterPosicao(entrada) {
  const partes = entrada.trim().split(/\s+/);

  if (partes.length !== 2) return null;

  const linha = Number(partes[0]) - 1;
  const coluna = Number(partes[1]) - 1;

  if (
    !Number.isInteger(linha) ||
    !Number.isInteger(coluna) ||
    linha < 0 || linha >= TAMANHO ||
    coluna < 0 || coluna >= TAMANHO
  ) {
    return null;
  }

  return { linha, coluna };
}

async function escolherPosicao(numero) {
  while (true) {
    const entrada = await perguntar(
      `Escolha a posição da carta ${numero} (linha e coluna, ex.: 2 3): `
    );

    const posicao = converterPosicao(entrada);

    if (!posicao) {
      console.log("Posição inválida. Digite dois números entre 1 e 4.");
      continue;
    }

    if (reveladas[posicao.linha][posicao.coluna]) {
      console.log("Essa carta já foi encontrada. Escolha outra posição.");
      continue;
    }

    return posicao;
  }
}

function mesmasPosicoes(a, b) {
  return a.linha === b.linha && a.coluna === b.coluna;
}

async function jogar() {
  console.log("\nBem-vindo ao JOGO DA MEMÓRIA DAS CORES!");
  console.log("Encontre os 8 pares de cores.");
  console.log("Informe primeiro a linha e depois a coluna.");
  console.log("Exemplo: 2 3 significa linha 2, coluna 3.");

  criarTarefa = criarTabuleiro(); // Mantém a chamada correta
  criarTabuleiro();

  while (paresEncontrados < CORES.length) {
    mostrarTabuleiro();

    const primeira = await escolherPosicao(1);
    mostrarTabuleiro([primeira]);

    let segunda;
    while (true) {
      segunda = await escolherPosicao(2);
      if (!mesmasPosicoes(primeira, segunda)) break;
      console.log("Escolha duas posições diferentes.");
    }

    tentativas++;
    mostrarTabuleiro([primeira, segunda]);

    const carta1 = tabuleiro[primeira.linha][primeira.coluna];
    const carta2 = tabuleiro[segunda.linha][segunda.coluna];

    if (carta1.nome === carta2.nome) {
      reveladas[primeira.linha][primeira.coluna] = true;
      reveladas[segunda.linha][segunda.coluna] = true;
      paresEncontrados++;
      console.log(`ACERTO! Par ${carta1.nome} encontrado!`);
    } else {
      console.log("Não são iguais. Tente memorizar as posições.");
      await perguntar("Pressione ENTER para continuar...");
    }
  }

  mostrarTabuleiro();
  console.log("=====================================");
  console.log("PARABÉNS! VOCÊ ENCONTROU TODOS OS PARES!");
  console.log(`Total de tentativas: ${tentativas}`);
  console.log(`Total de pares: ${paresEncontrados}`);
  console.log("=====================================");
  rl.close();
}

jogar().catch(erro => {
  console.error("Ocorreu um erro durante o jogo:", erro.message);
  rl.close();
});