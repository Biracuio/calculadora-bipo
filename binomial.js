PosUnica.addEventListener('input', a); // 'click' não funcionou para valores digitados
NumTentativas.addEventListener('input', b);
NumSucessos.addEventListener('input', c);
NumSucessos2.addEventListener('input', d);
calc.addEventListener('click', calcular);
reiniciar.addEventListener('click', reset);
// pos = Número de possibilidade pra uma tentativa única;
// tent (n) = Número total de tentativas;
// sus (k) = Número de sucessos desejados dentro das tentativas;
// sus2 = intervalo final quando x estiver entre dois números
// prob (p ou 1/pos) = probabilidade de sucesso desejada;
// probQ (100% - prob) = probabilidade de insucesso;
// media (μ) = ;
// desv (σ) = desvio padrão;
// vari (σ^2) = variância;
// coef (cv) = coeficiênte de variação;
let pos, tent, sus, sus2, prob, media, desv, vari, coef, probQ;
function a() {
    pos = parseFloat(PosUnica.value);
}

function b() {
    tent = parseInt(NumTentativas.value);
}

function c() {
    sus = parseInt(NumSucessos.value);
}

function d() {
    sus2 = parseInt(NumSucessos2.value);
}

function reset() {
    pos = tent = sus = sus2 = prob = media = desv = coef = vari = probQ = undefined;
    res.innerHTML = " ";
    PosUnica.value = " ";
    NumTentativas.value = " ";
    NumSucessos.value = " ";
    NumSucessos2.value = " ";
    PosUnica.style.backgroundColor = 'aliceblue';
    NumTentativas.style.backgroundColor = 'aliceblue';
    NumSucessos.style.backgroundColor = 'aliceblue';
}

function fatorial (num) {
    if (num === 0 || num === 1) return 1;
    else {
        aux = 1;
        while (num > 1) {
            aux = num * aux;
            num--;
        }
        return aux;
    }
}

function igual(num) {
    prob = (fatorial(tent)/(fatorial(num)*fatorial(tent - num)))*
    ((pos/100)**num)*((1 - pos/100)**(tent - num));
    return prob;
}

function menor(num) {
    num--;
    let probIndividual = 0, probTotal = 0;
    while (num >= 0) {
        probIndividual = (fatorial(tent)/(fatorial((num))*fatorial(tent - (num))))*
        ((pos/100)**(num))*((1 - pos/100)**(tent - (num)));
        probTotal = probTotal + probIndividual;
        num--;
    }
    return probTotal;
}

function menorIgual(num) {
    let probIndividual = 0, probTotal = 0;
    while (num >= 0) {
        probIndividual = (fatorial(tent)/(fatorial((num))*fatorial(tent - (num))))*
        ((pos/100)**(num))*((1 - pos/100)**(tent - (num)));
        probTotal = probTotal + probIndividual;
        num--;
    }
    return probTotal;
}

function maior(num, cont) {
    num++;
    let probIndividual = 0, probTotal = 0;
    while (num <= cont) {
        probIndividual = (fatorial(tent)/(fatorial((num))*fatorial(tent - (num))))*
        ((pos/100)**(num))*((1 - pos/100)**(tent - (num)));
        probTotal = probTotal + probIndividual;
        num++;
    }
    return probTotal;
}

function maiorIgual(num, cont) {
    let probIndividual = 0, probTotal = 0;
    while (num <= cont) {
        probIndividual = (fatorial(tent)/(fatorial((num))*fatorial(tent - (num))))*
        ((pos/100)**(num))*((1 - pos/100)**(tent - (num)));
        probTotal = probTotal + probIndividual;
        num++;
    }
    return probTotal;
}

function menorMenor(ini, fim) {
    ini++;
    let probTotal = 0, probIndividual = 0;
    while (ini < fim) {
        probIndividual = (fatorial(tent)/(fatorial((ini))*fatorial(tent - (ini))))*
        ((pos/100)**(ini))*((1 - pos/100)**(tent - (ini)));
        probTotal = probTotal + probIndividual;
        ini++;
    }
    return probTotal;
}

function menorIgualMenor(ini, fim) {
    let probTotal = 0, probIndividual = 0;
    while (ini < fim) {
        probIndividual = (fatorial(tent)/(fatorial((ini))*fatorial(tent - (ini))))*
        ((pos/100)**(ini))*((1 - pos/100)**(tent - (ini)));
        probTotal = probTotal + probIndividual;
        ini++;
    }
    return probTotal;
}
function menorMenorIgual(ini, fim) {
    ini++;
    let probTotal = 0, probIndividual = 0;
    while (ini <= fim) {
        probIndividual = (fatorial(tent)/(fatorial((ini))*fatorial(tent - (ini))))*
        ((pos/100)**(ini))*((1 - pos/100)**(tent - (ini)));
        probTotal = probTotal + probIndividual;
        ini++;
    }
    return probTotal;
}
function menorIgualMenorIgual(ini, fim) {
    let probTotal = 0, probIndividual = 0;
    while (ini <= fim) {
        probIndividual = (fatorial(tent)/(fatorial((ini))*fatorial(tent - (ini))))*
        ((pos/100)**(ini))*((1 - pos/100)**(tent - (ini)));
        probTotal = probTotal + probIndividual;
        ini++;
    }
    return probTotal;
}

function calcular() {
    if (pos === undefined || tent === undefined || sus === undefined) { 
    res.innerHTML = "Adicione os valores obrigatórios antes!";
    PosUnica.style.backgroundColor = 'yellow';
    NumTentativas.style.backgroundColor = 'yellow';
    NumSucessos.style.backgroundColor = 'yellow';
    }
    else if (pos < 0 || tent < 0 || sus < 0 || sus2 < 0)
    res.innerHTML = "Apenas valores positivos são permitidos!";
    else if (sus > tent) res.innerHTML = "Você não pode acertar mais tentativas do que o total";
    else {
        media = tent * (pos/100);
        probQ = 100 - Math.round(prob * 10000) / 100;
        vari = Math.round(tent * pos * (100 - pos)) / 10000;
        desv = Math.round(Math.sqrt(vari) * 1000) / 1000;
        coef = Math.round(((100 * desv) / media) * 100) / 100;
        res.innerHTML = "Probabilidade de sucesso f(k; n; p): " + 
        "<br>k = número de sucessos desejados<br>n = número de tentativas no total" +
        "<br>p = probabilidade em cada tentativa" + 
        "<br><br>Média ( μ ) = " + tent * (pos/100) + "<br>Variância ( σ<sup>2</sup> ) = " + vari +
        "<br>Desvio padrão ( σ ) = " + desv + "<br>Coeficiênte de variação ( cv ) = " + coef;
        if (sus2 == undefined) {
            res.innerHTML = res.innerHTML + "<br><br>f(x = " + sus + "; " + tent + "; " + pos/100 + ") = " + Math.round(igual(sus) * 10000) / 100 + "%" +
            "<br>f(x < " + sus + "; " + tent + "; " + pos/100 + ") = " + Math.round(menor(sus) * 10000) / 100 + "%" +
            "<br>f(x <= " + sus + "; " + tent + "; " + pos/100 + ") = " + Math.round(menorIgual(sus) * 10000) / 100 + "%" +
            "<br>f(x > " + sus + "; " + tent + "; " + pos/100 + ") = " + Math.round(maior(sus, tent) * 10000) / 100 + "%" +
            "<br>f(x >= " + sus + "; " + tent + "; " + pos/100 + ") = " + Math.round(maiorIgual(sus, tent) * 10000) / 100 + "%";
        }
        else {
            if (sus2 < sus) res.innerHTML = "O intervalo final de X precisa ser maior que o inicial!";
            else {
            res.innerHTML = res.innerHTML + "<br><br>f(" + sus + " < x < " + sus2 + "; " + tent + "; " + pos/100 + ") = "
            + Math.round(menorMenor(sus, sus2) * 10000 ) / 100 + "%.";
            res.innerHTML = res.innerHTML + "<br><br>f(" + sus + " ≤ x < " + sus2 + "; " + tent + "; " + pos/100 + ") = "
            + Math.round(menorIgualMenor(sus, sus2) * 10000 ) / 100 + "%.";
            res.innerHTML = res.innerHTML + "<br><br>f(" + sus + " < x ≤ " + sus2 + "; " + tent + "; " + pos/100 + ") = "
            + Math.round(menorMenorIgual(sus, sus2) * 10000 ) / 100 + "%.";
            res.innerHTML = res.innerHTML + "<br><br>f(" + sus + " ≤ x ≤ " + sus2 + "; " + tent + "; " + pos/100 + ") = "
            + Math.round(menorIgualMenorIgual(sus, sus2) * 10000 ) / 100 + "%.";
            }
        }
    }
}