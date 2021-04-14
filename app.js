const moment = require('moment');
const fs = require('fs');
const nomeArquivo = 'pets.json';
const nomepetshop = "PETSHOP DH";

let petsJSON = fs.readFileSync(nomeArquivo); //lê o conteúdo do arquivo
let arquivoPets = JSON.parse(petsJSON); // converte para formato JS

// console.log(arquivoPets.pets);

const atualizarJson = () => {
    let listaJson = JSON.stringify(arquivoPets, null, 2); // objeto pra converter, null para não minificar, 2 para numero de linhas - converte o objeto literal para JSON
    fs.writeFileSync(nomeArquivo, listaJson, 'utf-8'); // caminho arquivo, conteudo novo, formato 
}

const listarPets = (listaDePets) => {
    for (let contador = 0; contador < listaDePets.length; contador++) {  
        console.log(`${listaDePets[contador].nome}, ${listaDePets[contador].idade} anos, ${listaDePets[contador].tipo}, ${listaDePets[contador].raca}, ${listaDePets[contador].vacinado ? 'vacinado' : 'não vacinado'} `);
        for (let index = 0; index < listaDePets[contador].servicos.length; index++) {
            console.log(`${listaDePets[contador].servicos[index].data} - ${listaDePets[contador].servicos[index].nome}`);    
    } }
};

const vacinarPet = (pet) => {
    if (!pet.vacinado) {
        pet.vacinado = true;
        atualizarJson();
        console.log (`${pet.nome} foi vacinado com sucesso!`);
    } else {
        console.log(`Ops, ${pet.nome} já está vacinado!`);
    }
};

const campanhaVacina = (listaPets) => {
    let totalVacinados = 0;
    for (let i = 0; i < listaPets.length; i++) {
        if (!listaPets[i].vacinado) {
            listaPets[i].vacinado = true;
            totalVacinados++;
        }
    }
    atualizarJson();
    console.log (`Parabéns, ${totalVacinados} pets foram vacinados nessa campanha!`);
};

const adicionarPet = (infoPet) => {
    arquivoPets.pets.push(infoPet);
    atualizarJson();

    console.log (`${infoPet.nome} está cadastrado no nosso sistema!`);
};

const darBanhoPet = pet => {
    pet.servicos.push({
        nome: 'banho',
        data: moment().format('DD-MM-YYYY')
    });
        atualizarJson();
        console.log(`${pet.nome} está de banho tomado!`);
}

const tosarPet = (pet) => {
    pet.servicos.push({
      nome: 'tosa',
      data: moment().format('DD-MM-YYYY')
    });
    atualizarJson();
    console.log(`${pet.nome} está com cabelinho na régua!`);
  };

  const apararUnhasPet = pet => {
    pet.servicos.push({
      nome: 'corte de unhas',
      data: moment().format('DD-MM-YYYY')
    })
    atualizarJson();
    console.log(`${pet.nome} está de unhas aparadas!`);
  }

const buscarPet = (nomePet) => {
    const petEncontrado = arquivoPets.pets.find((pet) => {
        return pet.nome == nomePet;
    });

    console.log(petEncontrado ? petEncontrado : `Nenhum pet encontrado com esse nome ${nomePet}`);
}

const atenderCliente = (pet, servico) => {
    console.log(`Olá, ${pet.nome}!`);
    servico(pet);
    console.log('Até mais!');
}

// atenderCliente(arquivoPets.pets[0], darBanhoPet);
// console.log('------------')
// atenderCliente(arquivoPets.pets[1], tosarPet);

const addInfoCastrado = () => {
    arquivoPets.pets = listaPets.map((pet) => {
        pet.castrado = true;
        return pet;
    })
    atualizarJson();
}


const listarVacinados = () => {
    console.log('**VACINADO**');

    let vacinados = arquivoPets.pets.filter((pet) => {
        return pet.vacinado;
    })

    console.log(vacinados)
    console.log(`Temos ${vacinados.length} pets vacinados!`);
} 

listarVacinados();
// addInfoCastrado(arquivoPets.pets);
// listarPets(arquivoPets.pets);

/*buscarPet('Bob');
atenderCliente(arquivoPets.pets[0], tosarPet);
buscarPet("Jaçom");
campanhaVacina(arquivoPets.pets)
listarPet(arquivoPets.pets);
darBanhoPet(arquivoPets.pets[0])
tosarPet(arquivoPets.pets[0])
apararUnhasPet(arquivoPets.pets[0])
*/

