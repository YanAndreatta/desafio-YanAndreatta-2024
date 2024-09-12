class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];
        this.animais = {
            'LEAO': { tamanho: 3, bioma: 'savana', carnivoro: true },
            'LEOPARDO': { tamanho: 2, bioma: 'savana', carnivoro: true },
            'CROCODILO': { tamanho: 3, bioma: 'rio', carnivoro: true },
            'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, bioma: 'savana', carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: 'Animal inválido' };
        }

        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: 'Quantidade inválida' };
        }

        let recintosViaveis = [];

        for (let recinto of this.recintos) {
            let biomaAnimal = this.animais[animal].bioma;

            let biomaRecinto = recinto.bioma.split(' e ');
            let isCarnivoro = this.animais[animal].carnivoro;

            let conflitoCarnivoro = recinto.animais.some(a => {
                let especieNoRecinto = this.animais[a.especie];
                return (isCarnivoro && !especieNoRecinto.carnivoro) || (!isCarnivoro && especieNoRecinto.carnivoro);
            });

            if (conflitoCarnivoro) {
                continue;
            }

            let biomaAdequado = Array.isArray(biomaAnimal) ? biomaRecinto.some(b => biomaAnimal.includes(b)) : biomaRecinto.includes(biomaAnimal)

            if (!biomaAdequado) {
                continue;
            }

            let espacoOcupado = recinto.animais.reduce((total, a) => total + (this.animais[a.especie].tamanho * a.quantidade), 0);

            let espacoExtra = recinto.animais.length > 0 && !recinto.animais.some(a => a.especie === animal) ? 1 : 0;

            let espacoLivre = recinto.tamanhoTotal - (espacoOcupado + espacoExtra);

            if (espacoLivre >= this.animais[animal].tamanho * quantidade) {
                recintosViaveis.push({ numero: recinto.numero, descricao: `Recinto ${ recinto.numero } (espaço livre: ${ espacoLivre - this.animais[animal].tamanho * quantidade} total: ${ recinto.tamanhoTotal })`
            });
        }
    }

            return recintosViaveis.length > 0 ? { recintosViaveis: recintosViaveis.map(r => r.descricao) } : { erro: 'Não há recinto viável' };
    }
}

export { RecintosZoo as RecintosZoo };