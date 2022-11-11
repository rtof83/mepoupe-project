# Projeto Me Poupe!
## Cálculo de Média e Consulta CEP

&nbsp;

## Foi utilizado para contrução:
- API -> Node.js;
- Testes -> Jest;
- Conteinerização -> Docker;
- Ferramentas:
    - Visual Studio Code 1.73.1;
    - Console de Gerenciamento da AWS;

&nbsp;

## Instalação e Inicialização:

- npm (nodemon):
  - npm install;
  - npm run dev;

- npm (build):
  - npm install;
  - npm run build;
  - npm start;

- Docker (build):
  - docker build -t {imagem} .;
  - docker run -p {porta}:{porta} -d {imagem};

- Docker (compose):
  - docker-compose up;

- Testes:
  - npm install;
  - npx jest;

&nbsp;

- ### a aplicação pode ser acessada através dos links:
    - http://18.234.224.108:3001/media/3/7;
    - http://18.234.224.108:3001/media/3/7?log;
    - http://18.234.224.108:3001/cep/01310200;
    
    - API instanciada em EC2 AWS (http://18.234.224.108:3001);

&nbsp;

## Configurações
- [.env](https://github.com/rtof83/mepoupe-project/blob/main/.env):

    ```javascript
        PORT = 3001

        viaCEP_URL = https://viacep.com.br/ws/
        viacep_format = /json 
    ```

---

- [Dockerfile](https://github.com/rtof83/mepoupe-project/blob/main/Dockerfile);

    ``` javascript
    FROM node:alpine

    WORKDIR /app/mepoupe-project

    COPY package*.json ./

    RUN npm install

    COPY . .

    EXPOSE 3001

    CMD ["npm", "run", "dev"]
    ```

- [docker-compose](https://github.com/rtof83/mepoupe-project/blob/main/docker-compose.yml);

    ``` javascript
       version: "3"

        services:
        dockernode:
          build: .
          command: npm run dev
          ports:
            - "3001:3001"
          volumes:
            - .:/app/mepoupe-project
            - /app/mepoupe-project/node_modules
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

  - [cep](https://github.com/rtof83/mepoupe-project/blob/main/src/tests/cep/cep.test.ts):

    - teste de endpoint e retorno de bairro;
    - retorno de endereço sem bairro;
    - endereço não localizado;
