# Jogo da Memória das Cores

Este projeto é um jogo de memória em modo texto, desenvolvido em JavaScript com Node.js. O objetivo é encontrar todos os pares de cores escondidos no tabuleiro antes que o jogo termine.

## 🎮 Sobre o jogo

O jogador escolhe uma dificuldade e tenta descobrir onde estão os pares iguais de cores. Cada carta mostra uma cor diferente e, ao revelar duas posições, o sistema verifica se elas formam um par.

Se as cartas forem iguais:
- o par é marcado como encontrado;
- a posição permanece revelada;
- o jogador continua a busca.

Se forem diferentes:
- as cartas voltam para o estado escondido;
- o jogador precisa memorizar os locais;
- a partida segue até todos os pares serem encontrados.

## 🧠 Como funciona

- O tabuleiro é preenchido com cartas em pares.
- As cartas são embaralhadas aleatoriamente.
- O jogador informa a posição escolhida no formato: linha coluna.
- O jogo conta o número de tentativas e mede o tempo de partida.
- Há quatro níveis de dificuldade:
  - Fácil: 4x4
  - Médio: 6x6
  - Difícil: 8x8
  - Extremo: 10x10

## ▶️ Como executar

Certifique-se de ter o Node.js instalado.

No terminal, execute:

```bash
cd "c:\Users\TechJovem\Downloads\projetosjovemtech"
node .\Jovens\jogo.js
```

Ou, se preferir entrar na pasta do jogo:

```bash
cd "c:\Users\TechJovem\Downloads\projetosjovemtech\Jovens"
node jogo.js
```

## 🎯 Regras do jogo

1. O jogador deve escolher duas posições diferentes.
2. A entrada deve seguir o padrão: linha coluna.
3. Exemplo: `2 3` significa linha 2, coluna 3.
4. Cartas já reveladas não podem ser selecionadas novamente.
5. O jogo termina quando todos os pares forem encontrados.
6. Ao final, o programa mostra:
   - quantidade de tentativas;
   - total de pares encontrados;
   - tempo total da partida.

## 📁 Estrutura do projeto

- `Jovens/jogo.js` — lógica principal do jogo
- `Jovens/alunos.js` — exemplos de JavaScript e lógica básica
- `index.html` — página HTML simples do projeto
- `package.json` — dependências do projeto

## 🛠️ Tecnologias usadas

- JavaScript
- Node.js
- Módulo `readline` para entrada do usuário
- Códigos ANSI para colorir o terminal

## ✅ Objetivo educacional

Este projeto foi pensado como exercício de lógica de programação, trabalhando com:

- arrays;
- estruturas de repetição;
- lógica condicional;
- manipulação de tabuleiro;
- sorteio e embaralhamento de elementos;
- interação via terminal.

---

Se quiser, posso também criar uma versão visual do jogo com interface web em HTML/CSS/JavaScript para funcionar no navegador.
