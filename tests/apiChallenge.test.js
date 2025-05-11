import { test, expect, } from '@playwright/test';
import { MainPage,SignUpPage,FeedPage,ArticleEditorPage,SettingPage,LoginPage,ArticlePage } from '../src/pages/index';
import { UserFieldBuilder,ArcticleBuilder,ApiHelper } from '../src/builder/builder/index';
import { json } from 'stream/consumers';
import { get } from 'http';
import { faker } from '@faker-js/faker';

// Тренировка апи 

/*
test('id9', { 
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      await apiHelper.apiRequest({
         method: '',
         endpoint: '',
         pathParams: '',
         quaryParams: '',
         body: {
            
         },
         testInfo,
         needStatus: ,
         consoleLog : 
         
       })
});
}) */

test.describe.configure({ mode: 'serial' }); // <--- Вот эта строка делает тесты последовательными
test.describe.only('challengeV1', () => {
    const URL = 'https://apichallenges.herokuapp.com/'
    let token;
test.beforeAll('GetToken', async ({ request }, ) => { 
         const apiHelper = new ApiHelper (request,URL,token)
         const tokenRequest = await apiHelper.getToken()
         token = tokenRequest
});
/*test('getToken', async ({ request }) => {
      const response = await request.post(`${URL}challenger`);
      const headers = await response.headers() 
      token = headers['x-challenger']; 
});*/
test('id2', {                                 // это пробник типа
   tag : "@challenge"}, async ({ request }) => {
   const response = await request.get(`${URL}challenges`, {
      headers : {
         'x-challenger' : token
      }  
   })
   const body = await response.body();
   expect(response.status()).toBe(200);
});
test('id33', {  // попытка без хелпера
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const response = await request.get(`${URL}todos`, {
         headers : {
            'x-challenger' : token
         }
      })
      const body = await response.json();
      expect(response.status()).toBe(200);
})
test('id3', { // через хелпер, далее уберу классы
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      await apiHelper.apiRequest({
         method: 'GET',
         endpoint: 'todos',
         needStatus: 200
       })
});
test('id4', {
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      await apiHelper.apiRequest({
         method: 'GET',
         endpoint: 'todo',
         needStatus: 404,
         testInfo
       })
});
test('id5', {
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      await apiHelper.apiRequest({
         method: 'GET',
         endpoint: 'todos',
         needStatus: 200,
         pathParams : '1', // пока такой костыль хз как исправить
         testInfo,
         consoleLog : false
      });
});
test('id6', {
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      await apiHelper.apiRequest({
         method: 'GET',
         endpoint: 'todos',
         needStatus: 404,
         pathParams : '/312312312',
         testInfo
       })
});
test('id9', {
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      await apiHelper.apiRequest({
         method: 'POST',
         endpoint: 'todos',
         body: {
            title: faker.lorem.words(2),
            doneStatus : true,
            description: faker.lorem.words(15)
         },
         testInfo,
         needStatus: 201,
         consoleLog : false
       })
});
test('id7', { //фикс очередностью выполнения 
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      await apiHelper.apiRequest({
         method: 'GET',
         endpoint: 'todos',
         needStatus: 200,
         queryParams : 'doneStatus=true',
         testInfo,
         consoleLog : false
       })
});
test('id10', {
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      await apiHelper.apiRequest({
         method: 'POST',
         endpoint: 'todos',
         body: {
            title: faker.lorem.words(2),
            doneStatus : 'invalid',
            description: faker.lorem.words(15)
         },
         testInfo,
         needStatus: 400,
         consoleLog : false
       })
});
test('id11', {
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      await apiHelper.apiRequest({
         method: 'POST',
         endpoint: 'todos',
         body: {
            title: faker.lorem.words(50),
            doneStatus : true,
            description: faker.lorem.words(15)
         },
         testInfo,
         needStatus: 400,
         consoleLog : false
       })
});
test('id12', {
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      await apiHelper.apiRequest({
         method: 'POST',
         endpoint: 'todos',
         body: {
            title: faker.lorem.words(1),
            doneStatus : true,
            description: faker.lorem.words(250)
         },
         testInfo,
         needStatus: 400,
         consoleLog : false
       })
});
test('id13', {
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      await apiHelper.apiRequest({
         method: 'POST',
         endpoint: 'todos',
         body: {
            title: faker.string.alphanumeric(50),
            doneStatus : true,
            description: faker.string.alphanumeric(200)
         },
         testInfo,
         needStatus: 201,
         consoleLog : false
       })
});
test('id14', {
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      await apiHelper.apiRequest({
         method: 'POST',
         endpoint: 'todos',
         body: {
            title: faker.string.alphanumeric(25),
            doneStatus : true,
            description: faker.string.alphanumeric(5000)
         },
         testInfo,
         needStatus: 413,
         consoleLog : false
       })
});
test('id15', {
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      await apiHelper.apiRequest({
         method: 'POST',
         endpoint: 'todos',
         body: {
            title: faker.string.alphanumeric(30),
            doneStatus : true,
            description: faker.string.alphanumeric(25),
            priority: 'super'
         },
         testInfo,
         needStatus: 400,
         consoleLog : false
       })
});
test('id17', { // сначала создаем, потом забираем из респонса
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      const newTask = await apiHelper.apiRequest({
         method: 'POST',
         endpoint: 'todos',
         body: {
            title: faker.lorem.words(2),
            doneStatus : true,
            description: faker.lorem.words(15)
         },
         testInfo,
         consoleLog : false
         
       })
       const id = newTask.id
       await apiHelper.apiRequest({
         method: 'POST',
         endpoint: 'todos',
         pathParams : id,
         body: {
            title: 'updated title',
         },
         testInfo,
         needStatus: 200,
         consoleLog : false
       })
});
test('id18', {
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      const newTask = await apiHelper.apiRequest({
         method: 'POST',
         endpoint: 'todos',
         body: {
            title: faker.lorem.words(2),
            doneStatus : true,
            description: faker.lorem.words(15)
         },
         testInfo,
         consoleLog : false
         
       })
       const id = newTask.id
       await apiHelper.apiRequest({
         method: 'POST',
         endpoint: 'todos',
         pathParams : 100,
         body: {
            title: 'updated title',
         },
         testInfo,
         needStatus: 404,
         consoleLog : false
       })
});
test('id19', {
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      const newTask = await apiHelper.apiRequest({
         method: 'POST',
         endpoint: 'todos',
         body: {
            title: faker.lorem.words(2),
            doneStatus : true,
            description: faker.lorem.words(15)
         },
         testInfo,
         consoleLog : false
         
       })
       const id = newTask.id
       await apiHelper.apiRequest({
         method: 'PUT',
         endpoint: 'todos',
         pathParams : id,
         body: {
            title: 'updated title',
            title: faker.lorem.words(2),
            doneStatus : false,
            description: faker.lorem.words(15)

         },
         testInfo,
         needStatus: 200,
         consoleLog : false
       })
});
test('id20', {
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      const newTask = await apiHelper.apiRequest({
         method: 'POST',
         endpoint: 'todos',
         body: {
            title: faker.lorem.words(2),
            doneStatus : true,
            description: faker.lorem.words(15)
         },
         testInfo,
         consoleLog : false
         
       })
       const id = newTask.id
       await apiHelper.apiRequest({
         method: 'PUT',
         endpoint: 'todos',
         pathParams : id,
         body: {
            title: faker.lorem.words(2)
         },
         testInfo,
         needStatus: 200,
         consoleLog : false
       })
})
test('id21', {
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      const newTask = await apiHelper.apiRequest({
         method: 'POST',
         endpoint: 'todos',
         body: {
            title: faker.lorem.words(2),
            doneStatus : true,
            description: faker.lorem.words(15)
         },
         testInfo,
         consoleLog : false
         
       })
       const id = newTask.id
       await apiHelper.apiRequest({
         method: 'PUT',
         endpoint: 'todos',
         pathParams : id,
         body: {
            doneStatus : true,
            description: faker.lorem.words(15)
         },
         testInfo,
         needStatus: 400,
         consoleLog : false
       })
})
test('id22', {
   tag : "@challenge"}, async ({ request }, testInfo) => { 
      const apiHelper = new ApiHelper (request,URL,token)
      const newTask = await apiHelper.apiRequest({
         method: 'POST',
         endpoint: 'todos',
         body: {
            title: faker.lorem.words(2),
            doneStatus : true,
            description: faker.lorem.words(15)
         },
         testInfo,
         consoleLog : true
         
       })
       const id = newTask.id
       const newTaskV2 = await apiHelper.apiRequest({
         method: 'PUT',
         endpoint: 'todos',
         pathParams : id,
         body: {
            id : 25,
            doneStatus : true,
            description: faker.lorem.words(15)
         },
         testInfo,
         needStatus: 400,
         consoleLog : true,
         responseMessage : `Can not amend id from ${newTask.id} to 25`
       })
})
});
