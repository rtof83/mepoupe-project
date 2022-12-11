# Projeto Me Poupe!
## Cálculo de Média e Consulta CEP

&nbsp;

## Foi utilizado para contrução:
- API -> Node.js;
- Testes -> Jest;
- DB (embedded) -> LowDB;
- Conteinerização -> Docker;
- Ferramentas:
    - Visual Studio Code 1.74.0;
    - viacep.com.br
    - Console de Gerenciamento da AWS;

&nbsp;

## Instalação e Inicialização:

- npm (/api):
  - npm install;
  - npm run dev;

- npm (/web):
  - npm install;
  - npm start;

- Docker (build /api e /web):
  - docker build -t {imagem} .;
  - docker run -p {porta}:{porta} -d {imagem};

- Docker (compose):
  - construção de ambos os projetos (/raiz):
    - docker-compose up;

- Testes:
  - npm install;
  - npx jest;

&nbsp;

- ### a aplicação pode ser acessada através dos links:
  - api:
    - http://18.234.224.108:3001/media/3/7;
    - http://18.234.224.108:3001/media/3/7?log;
    - http://18.234.224.108:3001/cep/01310200;

  - web:
    - http://mepoupe-project.s3-website-us-east-1.amazonaws.com

&nbsp;

## Configurações
- [.env](https://github.com/rtof83/mepoupe-project/blob/main/.env):

    ```javascript
        PORT = 3001

        viaCEP_URL = https://viacep.com.br/ws/
        viacep_format = /json 
    ```

---

- [Dockerfile (api)](https://github.com/rtof83/mepoupe-project/blob/main/api/Dockerfile);

    ``` javascript
    FROM node:alpine

    WORKDIR /app/mepoupe-project

    COPY package*.json ./

    RUN npm install

    COPY . .

    EXPOSE 3001

    CMD ["npm", "run", "dev"]
    ```

- [Dockerfile (web)](https://github.com/rtof83/mepoupe-project/blob/main/web/Dockerfile);

    ``` javascript
    FROM node:16

    WORKDIR /app/mepoupe-web

    COPY ./package*.json ./

    RUN npm install

    COPY . .

    EXPOSE 3000

    CMD ["npm", "start"]
    ```

- [docker-compose](https://github.com/rtof83/mepoupe-project/blob/main/docker-compose.yml);

    ``` javascript
    version: "3"

    services:

    dockerapi:
        build: ./api
        ports:
        - "3001:3001"
        
    dockerweb:
        build: ./web
        ports:
        - "3000:3000"
    ```
&nbsp;


### Implementações API:
- [Collections Postman](https://github.com/rtof83/mepoupe-project/blob/main/samples/mepoupe.postman_collection.json);

&nbsp;

- Rotas de acesso:

    - GET (media):

        - {baseURL}/media/{num1}/{num2} -> verifica se a entrada é válida e retorna a média com dois dígitos dos valores informados:

            - exemplo de saída:

            ```javascript
            {
                "media": "10.00"
            }
            ```

        &nbsp;

        - {baseURL}/media/{num1}/{num2}?log -> retorna, além da média, log sobre os parâmetros utilizados:

            - exemplo de saída:

            ```javascript
            {
                "media": "5.00",
                "log": {
                    "num1": "3",
                    "num2": "7",
                    "media_simples": 5
                }
            }
            ```

    &nbsp;

    - GET (cep):

        - {baseURL}/cep/00000000 -> verifica se a entrada é válida e retorna o endereço do CEP informado:

            - exemplo de saída:

            ```javascript
            {
                "cep": "00000-000",
                "logradouro": "Rua Exemplo",
                "complemento": "de 1500 a 2000 - lado par",
                "bairro": "Bairro Exemplo",
                "localidade": "Cidade Exemplo",
                "uf": "AA",
                "ibge": "9999999",
                "gia": "1004",
                "ddd": "11",
                "siafi": "7107"
            }
            ```

    &nbsp;

    - GET (lista log média):

        - {baseURL}/log/media -> retorna lista de logs:

            - exemplo de saída:

            ```javascript
            [
              {
                 "id": "71099770-7997-11ed-a957-392d016338a6",
                 "num1": "2",
                 "num2": "3",
                 "avg": "2.50",
                 "datetime": "2022-12-11T21:04:46.183Z"
              }
            ]
            ```

    &nbsp;

    - GET (lista log cep):

        - {baseURL}/log/cep -> retorna lista de logs:

            - exemplo de saída:

            ```javascript
            [
              {
                  "id": "71482710-7997-11ed-9e73-b3d5c2169071",
                  "cep": "01310-200",
                  "log": "Avenida Paulista",
                  "uf": "SP",
                  "datetime": "2022-12-11T21:04:46.593Z"
              }
            ]
            ```

    &nbsp;

    - DELETE (média e cep):

        - {baseURL}/log/media -> exlcui toda a lista de logs média;
        - {baseURL}/log/cep -> exlcui toda a lista de logs cep;

&nbsp;

- Middlewares:
    - [checkMedia](https://github.com/rtof83/mepoupe-project/blob/main/src/middleware/checkMedia.ts):
        - valida se os parâmetros informados são numéricos;

    - [checkCEP](https://github.com/rtof83/mepoupe-project/blob/main/src/middleware/checkCEP.ts):
        - valida se os parâmetros informados são numéricos e tamanho;

&nbsp;

- Testes:
  - [media](https://github.com/rtof83/mepoupe-project/blob/main/src/tests/media/media.test.ts):

    - teste de endpoint;
    - verificação numérica;
    - retorno de log;
    - retorno de lista log;

  - [cep](https://github.com/rtof83/mepoupe-project/blob/main/src/tests/cep/cep.test.ts):

    - teste de endpoint e retorno de bairro;
    - retorno de endereço sem bairro;
    - endereço não localizado;
    - retorno de lista log;
