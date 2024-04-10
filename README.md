## SAG-API (Sistema acadêmico gamificado API)
### Objectivo
  Criar uma api (Application programmars interface) para disponibilizar recursos 
para front-end, rotas, sistema de autenticação, upload de imagen e mas...

### Pré-requesitos
Para que este projecto funcione e necessário que o `NodeJS` estéja instalado 
na versão 18.20.x e o `Mysql`.

### Executando o projecto
 Depois de ter instalado o node.js e o mysql clona o repositório `clone https://sag-api.github.git` e executa o comando `cd ./sag-api` para entrar no directório do projecto, nota caso clonaste e  renomaste-o falo deste jeito `clone https://sag-api.github.git exemplo` o `cd ./exemplo`

Todo projecto nodejs contém um ficheiro `package.json` este ficheiro é no formato json(javascript object notation) que consiste em chave valor, para saber mais sobre o formato json visite o [site oficial](https://www.json.org/json-en.html), E é a porta de entrada para qualquer aplicação node.

#### para que serve o `package.json`
Este arquivo contém a configuração do seu projecto node como o nome, versão, dependencias e scripts é muito mais.
O arquivo `package.json` do projecto:
~~~
{
  "name": "sag-api",
  "version": "0.0.1",
  "description": "API do Sistema acadêmico gamificado",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "npx tsup src",
    "start": "nodejs dist/index.cjs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^20.12.7",
    "tsup": "^8.0.2",
    "tsx": "^4.7.2",
    "typescript": "^5.4.4"
  }
}
~~~
Neste caso o nome do projecto é `sag-api` a versão é 0.0.1. na parte final do arquivo tem o campo `devDependencies` são as dependencia de desenvolvimento, ou seja as dependências que serão usadas enquanto o projecto estiver no processo de desenvolvimento. E claro há as dependencias de produção `dependencies` que são instaladas assim que o projecto sobe em produção.

Para instalar as dependencias de `dependencies` e as `devDependencies` entra no projecto abre o terminal e executa o comando `npm install`, este responsável por instalar todos os pacotes que estão listado em `dependencies` é incluir na pasta `node_modules` localizado na raiz do projecto.



