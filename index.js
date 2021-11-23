const request = require('request')
const argumentos = process.argv.slice(2)
const url = "https://pokeapi.co/api/v2/pokemon/"
const fs = require ('fs')

for(let item of argumentos){
    const numero = parseInt(item)
    if(numero < 1 || numero > 893){
        throw new Error("A lista de número está errada")
    }
}

//Requisição HTTP

for(let item of argumentos){
    request(url + item, function(err, resposta, corpo){
        if(!err){
            const objeto = JSON.parse(corpo)
            const pokemon = {
                id: objeto.id,
                nome: objeto.name,
                sprite: objeto.sprites.front_default,
                altura: objeto.height,
                peso: objeto.weight,
                tipo: objeto.types

            }
           
            const uri = "dados/pokemon" + pokemon.id + ".json"
            const dados = JSON.stringify(pokemon)
            const options = {
                encoding: 'utf-8',
                flag:'w'
            }
            fs.writeFileSync(uri, dados, options)
        
            console.log(`O Pokemon ${pokemon.nome} foi salvo com sucesso!`)
        
        }
    })
}
