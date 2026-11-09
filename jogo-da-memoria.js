// JOGO DA MEMÓRIA DAS CORES
// Projeto final - Módulo 2: Lógica de Programação
// Execução: node jogo.js
// Contribuidores: Davi, Markson, Rafael

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Códigos ANSI: cada cor é encerrada com RESET.
const RESET = "\x1b[0m";
const CORES = [
  // 1-16: Cores Básicas e de Alta Intensidade (4-bit)
  { nome: "PRETO", codigo: "\x1b[30m", simbolo: "●" },
  { nome: "VERMELHO", codigo: "\x1b[31m", simbolo: "●" },
  { nome: "VERDE", codigo: "\x1b[32m", simbolo: "●" },
  { nome: "AMARELO", codigo: "\x1b[33m", simbolo: "●" },
  { nome: "AZUL", codigo: "\x1b[34m", simbolo: "●" },
  { nome: "MAGENTA", codigo: "\x1b[35m", simbolo: "●" },
  { nome: "CIANO", codigo: "\x1b[36m", simbolo: "●" },
  { nome: "BRANCO", codigo: "\x1b[37m", simbolo: "●" },
  { nome: "CINZA_ESCURO", codigo: "\x1b[90m", simbolo: "●" },
  { nome: "VERMELHO_CLARO", codigo: "\x1b[91m", simbolo: "●" },
  { nome: "VERDE_CLARO", codigo: "\x1b[92m", simbolo: "●" },
  { nome: "AMARELO_CLARO", codigo: "\x1b[93m", simbolo: "●" },
  { nome: "AZUL_CLARO", codigo: "\x1b[94m", simbolo: "●" },
  { nome: "MAGENTA_CLARO", codigo: "\x1b[95m", simbolo: "●" },
  { nome: "CIANO_CLARO", codigo: "\x1b[96m", simbolo: "●" },
  { nome: "BRANCO_BRILHANTE", codigo: "\x1b[97m", simbolo: "●" },

  // 17-30: Tons Específicos e Cores Vibrantes (256-bit)
  { nome: "LARANJA", codigo: "\x1b[38;5;208m", simbolo: "●" },
  { nome: "ROSA_CHOQUE", codigo: "\x1b[38;5;198m", simbolo: "●" },
  { nome: "LAVANDA", codigo: "\x1b[38;5;183m", simbolo: "●" },
  { nome: "LIMA", codigo: "\x1b[38;5;118m", simbolo: "●" },
  { nome: "TURQUESA", codigo: "\x1b[38;5;45m", simbolo: "●" },
  { nome: "DOURADO", codigo: "\x1b[38;5;220m", simbolo: "●" },
  { nome: "SALMAO", codigo: "\x1b[38;5;209m", simbolo: "●" },
  { nome: "VIOLETA", codigo: "\x1b[38;5;93m", simbolo: "●" },
  { nome: "MARROM_CHOCOLATE", codigo: "\x1b[38;5;130m", simbolo: "●" },
  { nome: "BORDO", codigo: "\x1b[38;5;88m", simbolo: "●" },
  { nome: "AZUL_MARINHO", codigo: "\x1b[38;5;19m", simbolo: "●" },
  { nome: "VERDE_MUSGO", codigo: "\x1b[38;5;64m", simbolo: "●" },
  { nome: "CORAL", codigo: "\x1b[38;5;203m", simbolo: "●" },
  { nome: "ORQUIDEA", codigo: "\x1b[38;5;170m", simbolo: "●" },

  // 31-50: Cores Reais / Truecolor (24-bit RGB)
  { nome: "VERMELHO_TOMATE", codigo: "\x1b[38;2;255;99;71m", simbolo: "●" },
  { nome: "VERDE_ESMERALDA", codigo: "\x1b[38;2;80;200;120m", simbolo: "●" },
  { nome: "AZUL_REAL", codigo: "\x1b[38;2;65;105;225m", simbolo: "●" },
  { nome: "AMARELO_CANARIO", codigo: "\x1b[38;2;255;239;0m", simbolo: "●" },
  { nome: "ROXO_IMPERIAL", codigo: "\x1b[38;2;102;2;60m", simbolo: "●" },
  { nome: "CIANO_PROFUNDO", codigo: "\x1b[38;2;0;139;139m", simbolo: "●" },
  { nome: "LARANJA_TANGERINA", codigo: "\x1b[38;2;255;128;0m", simbolo: "●" },
  { nome: "ROSA_BEBE", codigo: "\x1b[38;2;255;192;203m", simbolo: "●" },
  { nome: "AZUL_CELESTE", codigo: "\x1b[38;2;135;206;235m", simbolo: "●" },
  { nome: "VERDE_OLIVA", codigo: "\x1b[38;2;128;128;0m", simbolo: "●" },
  { nome: "MAGENTA_VIVO", codigo: "\x1b[38;2;255;0;127m", simbolo: "●" },
  { nome: "AMBAR", codigo: "\x1b[38;2;255;191;0m", simbolo: "●" },
  { nome: "AZUL_TURQUESA", codigo: "\x1b[38;2;0;206;209m", simbolo: "●" },
  { nome: "SALMAO_CLARO", codigo: "\x1b[38;2;255;160;122m", simbolo: "●" },
  { nome: "LILAS", codigo: "\x1b[38;2;200;162;200m", simbolo: "●" },
  { nome: "AZUL_PETROLEO", codigo: "\x1b[38;2;0;92;116m", simbolo: "●" },
  { nome: "VERDE_MENTA", codigo: "\x1b[38;2;152;255;152m", simbolo: "●" },
  { nome: "CAQUI", codigo: "\x1b[38;2;189;183;107m", simbolo: "●" },
  { nome: "AREIA", codigo: "\x1b[38;2;244;164;96m", simbolo: "●" },
  { nome: "INDIGO", codigo: "\x1b[38;2;75;0;130m", simbolo: "●" }
];

const DIFICULDADES = {
  facil: 4,
  medio: 6,
  dificil: 8,
  extremo: 10
};

let tamanho = 4;
let totalPares = 8;
let tabuleiro = [];
let reveladas = [];
let tentativas = 0;
let paresEncontrados = 0;

function limparTerminal() {
  console.log('\x1Bc');
}

function perguntar(texto) {
  return new Promise(resolve => rl.question(texto, resolve));
}

function limparConsole() {
  process.stdout.write("\x1B[2J\x1B[3J\x1B[H");
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
  const cartas = [];
  for (let par = 0; par < totalPares; par++) {
    const cor = CORES[par % CORES.length];
    cartas.push(cor, cor);
  }
  embaralhar(cartas);
  tabuleiro = [];

  for (let linha = 0; linha < tamanho; linha++) {
    const novaLinha = [];
    for (let coluna = 0; coluna < tamanho; coluna++) {
      novaLinha.push(cartas[linha * tamanho + coluna]);
    }
    tabuleiro.push(novaLinha);
  }

  reveladas = Array.from({ length: tamanho }, () =>
    Array(tamanho).fill(false)
  );
}

function colorir(carta) {
  return `${carta.codigo}${carta.simbolo} ${carta.nome}${RESET}`;
}

function mostrarTabuleiro(posicoesTemporarias = []) {
  console.log("\n========== JOGO DA MEMÓRIA ==========");
  // Ajuste de espaçamento para caber colunas de dois dígitos (como o 10)
  console.log("     " + Array.from(
    { length: tamanho },
    (_, coluna) => String(coluna + 1).padStart(2, " ")
  ).join("   "));

  for (let linha = 0; linha < tamanho; linha++) {
    let saida = `${String(linha + 1).padStart(2, " ")} | `;

    for (let coluna = 0; coluna < tamanho; coluna++) {
      const temporaria = posicoesTemporarias.some(
        p => p.linha === linha && p.coluna === coluna
      );

      if (reveladas[linha][coluna] || temporaria) {
        // Exibe o símbolo colorido. Nota: para economizar espaço horizontal no modo extremo 10x10, 
        // exibimos apenas o símbolo e a cor de forma compacta caso prefira, mas mantemos o formato original:
        saida += `[${colorir(tabuleiro[linha][coluna])}] `;
      } else {
        saida += "[  ?  ] ";
      }
    }
    console.log(saida);
  }

  console.log("--------------------------------------------------");
  console.log(`Tentativas: ${tentativas} | Pares encontrados: ${paresEncontrados}/${totalPares}`);
  console.log("==================================================\n");
}

function converterPosicao(entrada) {
  const partes = entrada.trim().split(/\s+/);

  if (partes.length !== 2) return null;

  const linha = Number(partes[0]) - 1;
  const coluna = Number(partes[1]) - 1;

  if (
    !Number.isInteger(linha) ||
    !Number.isInteger(coluna) ||
    linha < 0 || linha >= tamanho ||
    coluna < 0 || coluna >= tamanho
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
      console.log(`Posição inválida. Digite dois números entre 1 e ${tamanho}.`);
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

function formatarTempo(tempoMs) {
  const totalSegundos = Math.floor(tempoMs / 1000);
  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;

  if (horas > 0) {
    return `${horas} h ${minutos} min ${segundos} s`;
  }

  return `${minutos} min ${segundos} s`;
}

async function jogar() {
  console.log("\nBem-vindo ao JOGO DA MEMÓRIA DAS CORES!");
  console.log("Escolha a dificuldade:");
  console.log("Fácil (4x4), Médio (6x6), Difícil (8x8) ou Extremo (10x10).");

  while (true) {
    const escolha = (await perguntar("Dificuldade: "))
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (Object.prototype.hasOwnProperty.call(DIFICULDADES, escolha)) {
      tamanho = DIFICULDADES[escolha];
      break;
    }
    console.log("Opção inválida. Digite fácil, médio, difícil ou extremo.");
  }

  totalPares = (tamanho * tamanho) / 2;
  console.log(`Encontre os ${totalPares} pares de cores.`);
  console.log("Informe primeiro a linha e depois a coluna.");
  console.log("Exemplo: 2 3 significa linha 2, coluna 3.");

  criarTabuleiro();
  const inicio = Date.now();

  while (paresEncontrados < totalPares) {
    limparConsole();
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
      limparTerminal();
    }
  }

  const tempoDecorrido = Date.now() - inicio;
  limparConsole();
  mostrarTabuleiro();
  console.log("==================================================");
  console.log("PARABÉNS! VOCÊ ENCONTROU TODOS OS PARES!");
  console.log(`Total de tentativas: ${tentativas}`);
  console.log(`Total de pares: ${paresEncontrados}`);
  console.log(`Tempo: ${formatarTempo(tempoDecorrido)}`);
  console.log("==================================================");
  rl.close();
}

jogar().catch(erro => {
  console.error("Ocorreu um erro durante o jogo:", erro.message);
  rl.close();
});
