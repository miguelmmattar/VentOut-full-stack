# VentOut

An easy to use emotional manager. Report anything you want and we will help you understand how you feel.

<img src="/VentOut-preview.png" />

You can access this app <a href="https://vent-out-front.vercel.app">here</a>

## About

This is a web application with which you can write to yourself how you feel when you feel it. The ideia is that you shouldn't have wait to describe your feelings and emotions, to your therapist or even a friend, so write them right on the moment and don't loose any detail. The app will compile all your reports and save them for whenever you want to revisit them. Also, to help you see a big picture of mental and physical health, it will automactically create a few charts based on what you are sharing. Below are the implemented features:

- Sign Up / Login
- Quickly pick your major mood for today
- See the information we have recently gathered from your past reports on the homepage
- Add a report, whriting down whatever you want and selecting, emotions and symptoms from a our list
- Check your history for a complete collection of your reports, moods and the charts we provide, filtering by last week, last month, last year or all time

By using this app you will never again miss your feelings by waiting to long to externalize them.

## Technologies
The following tools and frameworks were used in the construction of the project:<br>
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/styled-components%20-%2320232a.svg?&style=for-the-badge&color=b8679e&logo=styled-components&logoColor=%3a3a3a'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/axios%20-%2320232a.svg?&style=for-the-badge&color=informational'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/react-app%20-%2320232a.svg?&style=for-the-badge&color=60ddf9&logo=react&logoColor=%2361DAFB"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/react_route%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/react-icons%20-%2320232a.svg?&style=for-the-badge&color=f28dc7&logo=react-icons&logoColor=%2361DAFB'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/node-JS-critical?style=for-the-badge&logo=node"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/postgre-SQL-succes?style=for-the-badge&logo=postgresql&logoColor=success"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/prisma-ORM-lightgrey?style=for-the-badge&logo=prisma&logoColor=lightgrey"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/supertest-jest-important?style=for-the-badge&logo=jest&logoColor=important"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/amazon--web--services-AWS-yellow?style=for-the-badge"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/docker-docker--compose-informational?style=for-the-badge&logo=docker&logoColor=informational"/>
</p>

## How to run

1. Clone this repository
2. Create a .env file according to .env.example
3. Make sure you have docker and docker-compose installed
4. Build the docker with:
```bash
docker-compose up --build nginx
```

## Without Docker

1. Clone this repository

### On ventout-backend directory:
2. Create two PostgreSQL databases: "ventout" and "ventout_test"
3. Create a .env.test and a .env.development file according to .env.example pointing to the databases you have created
4. Open this directory on terminal and run:
```bash
npm run test:load-envs prisma migrate deploy
npm run test:load-envs prisma migrate dev
npm run test:load-envs prisma db seed
npm run dev:load-envs prisma migrate deploy
npm run dev:load-envs prisma migrate dev
npm run dev:load-envs prisma db seed
NODE_ENV=development nodemon --watch 'src/' --exec 'ts-node -r tsconfig-paths/register ./src/server.ts' -e ts
```
### On ventout-frontend directory:
5. Create a .env file according to .env.example pointing to the api (http://localhost:4000)
6. Open this directory on terminal and run:
```bash
npm start
```
7. Check your browser (the front-end interface should open on http://localhost:3000)
