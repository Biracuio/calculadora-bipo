tax.addEventListener('input', setLamb);
numInter.addEventListener('input', setInter);
finalInter.addEventListener('input', setInter2);
reiniciar.addEventListener('click', reset);
calc.addEventListener('click', calcular);
// lamb (λ) = taxa média por intervalo
// inter = número de intervalos em que a probabilidade se baseia
// inter2 = intervalo final quando ambos x são adicionados

let lamb, inter, inter2, prob;

function setLamb() {
    lamb = parseInt(tax.value);
}

function setInter() {
    inter = parseInt(numInter.value);
}

function setInter2() {
    inter2 = parseInt(finalInter.value);
}

function reset() {
    lamb = inter = inter2 = prob = undefined;
    res.innerHTML = " ";
    tax.value = " ";
    numInter.value = " ";
    finalInter.value = " ";
    tax.style.backgroundColor = 'aliceblue';
    numInter.style.backgroundColor = 'aliceblue';
}

function fatorial(num) {
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
    prob = ((Math.E**-lamb)*(lamb**num))/fatorial(num);
    return prob;
}

function menor(num) {
    num--;
    let probIndividual = 0, probTotal = 0;
    while (num >= 0) {
        probIndividual = ((Math.E**-lamb)*(lamb**num))/fatorial(num);
        probTotal = probTotal + probIndividual;
        num--;
    }
    return probTotal;
}

function menorIgual(num) {
    let probIndividual = 0, probTotal = 0;
    while (num >= 0) {
        probIndividual = ((Math.E**-lamb)*(lamb**num))/fatorial(num);
        probTotal = probTotal + probIndividual;
        num--;
    }
    return probTotal;
}

function maior(num) {
    num++;
    let probIndividual = 0, probTotal = 0, teste = true;
    while (teste) {
        probIndividual = ((Math.E**-lamb)*(lamb**num))/fatorial(num);
        probTotal = probTotal + probIndividual;
        num++;
        if (probIndividual == 0) teste = false;
    }
    return probTotal;
}

function maiorIgual(num) {
    let probIndividual = 0, probTotal = 0, teste = true;
    while (teste) {
        probIndividual = ((Math.E**-lamb)*(lamb**num))/fatorial(num);
        probTotal = probTotal + probIndividual;
        num++;
        if (probIndividual == 0) teste = false;
    }
    return probTotal;
}

function menorMenor(ini, fim) {
    ini++;
    let probIndividual = 0, probTotal = 0;
    while (ini < fim) {
        probIndividual = ((Math.E**-lamb)*(lamb**ini))/fatorial(ini);
        probTotal = probTotal + probIndividual;
        ini++;
    }
    return probTotal;
}

function menorIgualMenor(ini, fim) {
    let probIndividual = 0, probTotal = 0;
    while (ini < fim) {
        probIndividual = ((Math.E**-lamb)*(lamb**ini))/fatorial(ini);
        probTotal = probTotal + probIndividual;
        ini++;
    }
    return probTotal;
}

function menorMenorIgual(ini, fim) {
    ini++;
    let probIndividual = 0, probTotal = 0;
    while (ini <= fim) {
        probIndividual = ((Math.E**-lamb)*(lamb**ini))/fatorial(ini);
        probTotal = probTotal + probIndividual;
        ini++;
    }
    return probTotal;
}

function menorIgualMenorIgual(ini, fim) {
    let probIndividual = 0, probTotal = 0;
    while (ini <= fim) {
        probIndividual = ((Math.E**-lamb)*(lamb**ini))/fatorial(ini);
        probTotal = probTotal + probIndividual;
        ini++;
    }
    return probTotal;
}

function calcular() {
    if (lamb === undefined || inter === undefined) {
        res.innerHTML = "Adicione todos os valores obrigatórios antes!";
        tax.style.backgroundColor = 'yellow';
        numInter.style.backgroundColor = 'yellow';
    }
    else if (lamb < 0 || inter < 0 || inter2 < 0)
        res.innerHTML = "Apenas valores positivos são permitidos!";
    else {
        res.innerHTML = "Sendo p( x ) = (e<sup>-λ</sup> × λ<sup>x</sup>) / x!" +
        "<br> Média ( μ ) = " + lamb + 
        "<br> Variância ( σ<sup>2</sup> ) = " + lamb + 
        "<br> Desvio padrão ( σ ) = " + Math.round(Math.sqrt(lamb) * 100) / 100 +"<br>Probabilidade de:";
        if (inter2 === undefined) {
            res.innerHTML = res.innerHTML + 
            "<br> p( x = " + inter + " ) = " + Math.round(igual(inter) * 10000) / 100 + "%." +
            "<br> p( x < " + inter + " ) = " + Math.round(menor(inter) * 10000) / 100 + "%." +
            "<br> p( x <= " + inter + " ) = " + Math.round(menorIgual(inter) * 10000) / 100 + "%." +
            "<br> p( x > " + inter + " ) = " + Math.round(maior(inter) * 10000) / 100 + "%." +
            "<br> p( x >= " + inter + " ) = " + Math.round(maiorIgual(inter) * 10000) / 100 + "%.";
        }
        else {
            if (inter > inter2) res.innerHTML = "O intervalo final de X precisa ser maior que o inicial!"
            else {
            res.innerHTML = res.innerHTML + 
                "<br> p(" + inter + " < x < " + inter2 + " ) = " + Math.round(menorMenor(inter, inter2) * 10000) / 100 + "%." +
                "<br> p(" + inter + " ≤ x < " + inter2 + " ) = " + Math.round(menorIgualMenor(inter, inter2) * 10000) / 100 + "%." +
                "<br> p(" + inter + " < x ≤ " + inter2 + " ) = " + Math.round(menorMenorIgual(inter, inter2) * 10000) / 100 + "%." +
                "<br> p(" + inter + " ≤ x ≤ " + inter2 + " ) = " + Math.round(menorIgualMenorIgual(inter, inter2) * 10000) / 100 + "%.";
            }
        }
    }
}