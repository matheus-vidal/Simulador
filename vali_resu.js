function sb(x){ // sb de sobrancelha :) brincadeira eu esqueçi a sigla
    return Number(x).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
}

function simular(){
    var saida = document.getElementById('resultados')
    saida.style.display = "block"
    saida.innerHTML = '' //zera o resultado

    //variaveis
    //dados do fundo
    var preco = Number(document.getElementById('preco').value)
    var dividendo = Number(document.getElementById('dividendos').value)

    //dados da compra
    var fiicompradosm1 = Number(document.getElementById('fiicompradosm1').value)
    var fiicompradosmx = Number(document.getElementById('fiicompradosmx').value)
    var mesesapli = document.getElementById('mesesapli').value

    //dados da simulação
    var variacao_preco = Number(document.getElementById('varpre').value)
    var variacao_dividen = Number(document.getElementById('vardiv').value)
    var dividendo_novasfii = document.getElementsByName('compra')
    var tipo_output = document.getElementsByName('output')

    //variaveis internas
    var valor_investido = 0
    var valor_total_investido = 0
    var dividendo_recebido = 0
    var dividendo_total = 0
    var preco_medio = 0
    var dinheiro_novasfii = 0
    var quantidade_fii = fiicompradosm1

    if(variacao_preco != 0){
        var variacao_preco_min = preco - (variacao_preco / 100 * preco)
        var variacao_preco_max = preco + (variacao_preco / 100 * preco)
    }

    if(variacao_dividen != 0){
        var variacao_dividen_min = dividendo - (variacao_dividen / 100 * dividendo)
        var variacao_dividen_max = dividendo + (variacao_dividen / 100 * dividendo)
    }

    //validação
    if(preco == '' || dividendo == ''){
        confirm("Ocorreu um erro. Verifique os dados e tente novamente.")
        return 0
    }
    else if (fiicompradosm1 == '' || mesesapli == ''){
        confirm("Ocorreu um erro. Verifique os dados e tente novamente.")
        return 0
    }

    //Tipo de saída
    if(tipo_output[0].checked || tipo_output[1].checked){
        var tabela = document.createElement('table')

        if(tipo_output[0].checked){
            tabela.innerHTML = '<thead><tr><th>Mês</th><th>Valor do Fundo</th><th>Valor Investido</th><th>Quantidade de FII</th><th>Dividendos Recebidos no Mês</th></tr></thead>'
        }
        else{
            tabela.innerHTML = '<thead><tr><th>Ano</th><th>Valor do Fundo no Ano</th><th>Valor Investido no Ano</th><th>Quantidade de FII</th><th>Dividendos Recebidos no Ano</th></tr></thead>'

            var valor_investido_ano = 0
            var dividendo_total_ano = 0
        }
    
        var tbody = document.createElement("tbody")
        var tfoot = document.createElement("tfoot")
    }
    else{
        var paragrafo = document.createElement("p")
    }

    //Gerando os dados
    valor_investido = preco * fiicompradosm1 // primeiro mês
    for(var loop = 1; loop <= parseInt(mesesapli); loop++){
        preco_medio += preco
        dividendo_recebido = dividendo * quantidade_fii
        dividendo_total += dividendo_recebido
        dividendo_total_ano += dividendo_recebido

        dinheiro_novasfii += dividendo_recebido
        quantidade_fii += fiicompradosmx
        
        if(variacao_preco != 0){
            preco = Math.random() * (variacao_preco_max - variacao_preco_min) + variacao_preco_min
        }

        if(variacao_dividen != 0){
            dividendo = Math.random() * (variacao_dividen_max - variacao_dividen_min) + variacao_dividen_min
        }

        valor_investido = preco * fiicompradosmx

        valor_total_investido += valor_investido
        valor_investido_ano += valor_investido

        if(dividendo_novasfii[0].checked){
            
            while(dinheiro_novasfii >= preco){
                dinheiro_novasfii -= preco
                quantidade_fii += 1
            }

        }

        if(tipo_output[0].checked){
            tbody.innerHTML += `<tr><td>${loop}º <td>${sb(preco)} <td>${sb(valor_investido)} <td>${quantidade_fii} <td>${sb(dividendo_recebido)} </tr>`
        }

        if(tipo_output[1].checked && loop % 12 == 0){
            tbody.innerHTML += `<tr><td>${loop/12}º<td>${sb(preco_medio / loop)}<td>${sb(valor_investido_ano)}<td>${quantidade_fii}<td>${sb(dividendo_total_ano)}</tr>`

            valor_investido_ano = 0
            dividendo_total_ano = 0
        }
    } // fim do loop for

    if(tipo_output[0].checked || tipo_output[1].checked){
        tfoot.innerHTML = `<th>Total<th>${sb(preco_medio / mesesapli)}<th>${sb(valor_total_investido)}<th>${quantidade_fii}<th>${sb(dividendo_total)}`

        tabela.appendChild(tbody)
        tabela.appendChild(tfoot)
        saida.appendChild(tabela)
    }
    else{
        paragrafo.innerHTML = `O preço médio do fundo na simulação foi de: ${sb(preco_medio / mesesapli)}<br> O valor total investido foi: ${sb(valor_total_investido)}<br> A quantidade final de FIIs na simulação é: ${quantidade_fii}<br>O valor ganho de dividendos em um mês com essa quantidade fundos seria de: ${sb(quantidade_fii * dividendo)}<br> Por fim, o dividendo total ganho foi de ${sb(dividendo_total)}`

        saida.appendChild(paragrafo)
    }
}