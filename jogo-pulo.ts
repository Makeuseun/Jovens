class Personagem {
    nome: string;
    posicaoY: number; // 0 = no chão, > 0 = no ar
    velocidadeY: number;
    pulando: boolean;

    constructor(nome: string) {
        this.nome = nome;
        this.posicaoY = 0;
        this.velocidadeY = 0;
        this.pulando = false;
    }

    pular(): void {
        if (!this.pulando) {
            this.velocidadeY = 2; // Força inicial do pulo
            this.pulando = true;
            console.log(`\n> ${this.nome} pulou! 🚀\n`);
        }
    }

    atualizar(): void {
        if (this.pulando) {
            this.posicaoY += this.velocidadeY;
            this.velocidadeY -= 0.5; // Gravidade puxando para baixo

            // Se atingir o chão novamente
            if (this.posicaoY <= 0) {
                this.posicaoY = 0;
                this.velocidadeY = 0;
                this.pulando = false;
            }
        }
    }

    renderizar(): void {
        // Cria uma representação visual simples no terminal
        const alturaMaxima = 5;
        let cenario = "";

        for (let i = alturaMaxima; i >= 0; i--) {
            let linha = `${i.toString().padStart(2, '0')} | `;
            if (Math.round(this.posicaoY) === i) {
                linha += " 🧑 ";
            } else {
                linha += "    ";
            }
            cenario += linha + "\n";
        }

        cenario += "    " + "-".repeat(20) + "\n";
        console.clear();
        console.log(`--- JOGO DO TERMINAL ---`);
        console.log(`Pressione 'ESPAÇO' + 'ENTER' para pular (ou digite 'p' e Enter)\n`);
        console.log(cenario);
        console.log(`Status -> No ar: ${this.pulando} | Altura: ${this.posicaoY.toFixed(1)}`);
    }
}

// --- LOOP DO JOGO ---
const jogador = new Personagem("Heroi");
const readline = require("readline");

// Configura a leitura do terminal
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

process.stdin.on("keypress", (str, key) => {
    if (key.ctrl && key.name === "c") {
        process.exit();
    }
    // Se apertar espaço ou a tecla 'p'
    if (str === " " || str === "p") {
        jogador.pular();
    }
});

// Game Loop (atualiza a cada 100ms)
setInterval(() => {
    jogador.atualizar();
    jogador.renderizar();
}, 100);