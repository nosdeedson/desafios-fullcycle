## criar package.json rodar: npm init
## instalaro typescript: npm install typescript --save-dev

## criar o projeto: npx tsc --init

## install tslint: npm install tslint --save-dev

## rodar: npx tslint --init

## criar um arquivo test.ts criar uma function "hello" 
## rodar: npx tsc "para ver se o projeto está funcionando"


## preparando testes automatizados

## instalação: npm install -D jest @types/jest ts-node --save-dev 

## o comando acima instala o jest responsável pelos testes no typescript e ts-node para manipular arquivos em javascript puro

## instalar o swc: npm install -D @swc/jest @swc/cli @swc/core

## swc é um compilador javascript mais rápido

## rodar o comando npx jest --init (responder as perguntas) no arquivo criardo adicionar: 
##   transform:{ "^.+\.(t|j)sx?$": ["@swc/jest"]   },

## comando para rodar os tests: npm test
## ou adicionar o plugin (extension) Jest Runner

## instalando o sequelize 
## comando: npm install sequelize reflect-metadata sequelize-typescript

## instalando o sqlite3: npm install sqlite3