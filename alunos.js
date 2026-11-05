// Cálculo de notas - Módulo 2, Aula 2
// Variáveis, operadores aritméticos, saída e estrutura condicional

let nomeAluno = "Davi";

let nota1 = 8.0;
let nota2 = 6.0;
let nota3 = 7.0;

// Calcula a média das três notas
let media = (nota1 + nota2 + nota3) / 3;

// Exibe o resultado no console
console.log("Aluno: " + nomeAluno);
console.log("Média: " + media.toFixed(1));

// Vetores (arrays) para armazenar as notas do aluno
let notas = [8.0, 6.0, 7.0];

// Calcula a média usando o vetor
let mediaVetor = 0;
for (let i = 0; i < notas.length; i++) {
    mediaVetor += notas[i];
}
mediaVetor = mediaVetor / notas.length;

console.log("Notas do aluno: " + notas.join(", "));
console.log("Média do vetor: " + mediaVetor.toFixed(1));

// Verifica a situação do aluno
if (media >= 7) {
    console.log("Aluno aprovado!");
} else if (media >= 5) {
    console.log("Aluno em recuperação!");
} else {
    console.log("Aluno reprovado!");
}

// Exemplo de vetor com nomes
let nomes = ["Davi", "Maria", "Pedro"];
console.log("Lista de alunos: " + nomes.join(" - "));
 
