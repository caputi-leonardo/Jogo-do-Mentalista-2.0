let resultado = document.getElementById('resultado');
let numeroCerto = document.getElementById('numeroCerto');
let descricaoPlace = document.getElementById('chute');
let historico = document.getElementById('historico');
let numeroSecreto;
let dificuldade;
let intervaloTexto;
let listaHistorico = [];
let tentativas;

function nMaximo() {
    return parseInt(Math.random() * 5000 + 1);
}

function nSecreto(numeroMaximo) {
    return parseInt(Math.random() * numeroMaximo + 1);
}

function novoJogo() {
    let numeroMaximo = nMaximo();
    numeroSecreto = nSecreto(numeroMaximo);
    listaHistorico = [];
    document.getElementById('Comecar').setAttribute('disabled', false);
    document.getElementById('dificuldade').setAttribute('disabled', false);
    document.getElementById('chute').removeAttribute('disabled');
    document.getElementById('chutar').removeAttribute('disabled');
    intervaloTexto = (`Escolha entre 01 a ${numeroMaximo}`);
    descricaoPlace.placeholder = intervaloTexto;
    resultado.innerHTML = ('');
    numeroCerto.innerHTML = ('');
    dificuldade = document.getElementById('dificuldade').value;
    tentativas = 1;
}

function chute() {
    let plural = tentativas > 1 ? 'tentativas' : 'tentativa';
    let numeroChute = document.getElementById('chute').value;

    if (numeroChute != 0) {
        if (numeroChute == numeroSecreto) {
            resultado.innerHTML = (`Parabéns!! Você acertou em ${tentativas} ${plural}`);
            numeroCerto.innerHTML = (`O Número era ${numeroSecreto}`);
            fimJogo()
        } else if (numeroChute > numeroSecreto) {
            resultado.innerHTML = (`escolha um número mais baixo.. essa foi a sua ${tentativas}° ${plural}`);
            historicoTentativas(numeroChute);
        } else if (numeroChute < numeroSecreto) {
            resultado.innerHTML = (`escolha um número mais alto.. essa foi a sua ${tentativas}° ${plural}`);
            historicoTentativas(numeroChute);
        }
        tentativas++;
        dificuldadeEscolhida()
        limparCampo()
    } else {
        alert('Informe um número para chute');
    }

    function dificuldadeEscolhida() {
        if (dificuldade == 2) {
            if (tentativas > 20) {
                
                resultado.innerHTML = (`Não foi dessa vez!!`);
                numeroCerto.innerHTML = (`O Número era ${numeroSecreto}`);
                fimJogo()
            }
        } else if (dificuldade == 3) {
            if (tentativas > 10) {
                
                resultado.innerHTML = (`Não foi dessa vez!!`);
                numeroCerto.innerHTML = (`O Número era ${numeroSecreto}`);
                fimJogo()
            }
        } else if (dificuldade == 4) {
            if (tentativas > 5) {
                
                resultado.innerHTML = (`Não foi dessa vez!!`);
                numeroCerto.innerHTML = (`O Número era ${numeroSecreto}`);
                fimJogo()
            }

        }
    }
}

function limparCampo() {
    campoChute = document.getElementById('chute');
    campoChute.value = '';
}

function historicoTentativas(numeroChute) {
    listaHistorico.push(numeroChute);
    exibirHistorico();
}

function exibirHistorico() {
    historico.innerHTML = '';
    if (listaHistorico.length > 3) {
        for (let i = listaHistorico.length - 3; i < listaHistorico.length; i++) {
            historico.innerHTML += `<p class="text-muted mb-0" id="historico">
        Tentativa ${i + 1}: ${listaHistorico[i]}
        </p>`
        }
    } else {
        for (let i = 0; i < listaHistorico.length; i++) {
            historico.innerHTML += `<p class="text-muted mb-0" id="historico">
        Tentativa ${i + 1}: ${listaHistorico[i]}
        </p>`
        }

    }
}

function fimJogo() {
    document.getElementById('Comecar').removeAttribute('disabled');
    document.getElementById('dificuldade').removeAttribute('disabled');
    document.getElementById('chute').setAttribute('disabled', true);
    document.getElementById('chutar').setAttribute('disabled', true);
    intervaloTexto = (` `);
    descricaoPlace.placeholder = intervaloTexto;
    historico.innerHTML = '';
}