# Poke-test

Crud básico em Node.js de pokémon.
Foi-se pensado em fazer desse CRUD uma api, portanto, caso queira usar outra forma de comunicação REST, poderá
acessar as URLs citadas aqui.

## URL para acesso direto

Foi feito um client para que possa ver as funcionalidades da API. tanto o client como a própria API foram
hospedadas no Heroku, acesse a url abaixo para visualizar.
```
poke-teste.herokuapp.com
```

## Documentação

Para acessar a documentação acesse : [HOST]/doc

Exemplo:
```
www.hostdaapi.com.br/doc
```

## Começando

Para rodar a API localmente será necessário executar o comando <code>npm install</code>, após instalado
todos os módulos necessários, configure o arquivo config.json com os parâmetros necessários para a
conexão com o banco de dados.

```
{
  "host" : {
    "url" : "URL" // Caso rode a API localmente poderá colocar o endereço local "http://localhost:3000/"
  },

  "dbConfig" : {
    "dbName" : "NOME_DO_BANCO",
    "username" : "USERNAME_DO_BANCO",
    "password" : "SENHA_DO_BANCO",
    "options" : {
      "host" : "HOST_DO_BANCO_DE_DADOS",
      "dialect": "mssql", // Dialect usado para definir a linguagem do banco.
      "dialectOptions" : {
        "encrypt": true
      }
    }
  }
}
```

OBS: A configuração do banco acima é de acordo com a necessidade do framework sequelizejs.

Após isso, rode a aplicação com o comando <code>node app.js</code>.

## URLs para acesso REST

Listar todos os pokémon
```
[HOST]/api/pokemon/
```

Carregar Pokémon específico
```
[HOST]/api/pokemon/:id
```

Registrar novo pokemon
```
[HOST]/api/pokemon/create/
```
```
    data : {
        trainer : 'NONE_DO_TREINADOR',
        type : 'NOME_DO_POKEMON' // Nomes válidos : 'MEWTWO', 'PIKACHU', 'CHARIZARD'
    }

```

Atualizar pokémon
```
[HOST]/api/pokemon/update/

    data : {
        id : 'ID_DO_REGISTRO',
        parameter : {
            treinador : "NOME_ATUALIZADO"
        }
    }
```

Deletar Pokemon
```
[HOST]/api/pokemon/delete/
```
```
    data : {
        id : 'ID_DO_REGISTRO'
    }
```


Batalha Pokémon
```
[HOST]/api/pokemon/battle/:idA/:idB
```

### Prérequisitos

Para rodar essa API será obrigatório ter instalado em seu sistema a plataforma Node.js.

## Rodando os testes

Para rodar os testes, execute o comando <code>mocha</code>.

Caso não exista o comando instale o módulo globalmente com o comando <code>npm install mocha -g</code>
