import { expect } from "allure-playwright";


export class ApiHelper {
  constructor(request, baseURL, token) {
    this.request = request;
    this.baseURL = baseURL;
    this.token = token;
  }

  async getToken() {
    const response = await this.request.post(`${this.baseURL}challenger`);
    const headers = await response.headers();
    this.token = headers['x-challenger'];
    return this.token
}

  async apiRequest({
    method = '',
    endpoint = '',
    needStatus = '',
    pathParams = '',
    queryParams = '',
    body = '',
    consoleLog = false,
    testInfo = null,
    responseMessage= false
  }) {
    // Формируем URL 
    let URL = `${this.baseURL.replace(/\/$/, '')}/${endpoint.replace(/^\/+/, '')}`;

    //  Добавляем path-параметры (например: /12)
    if (pathParams) {
        URL += `/${pathParams.toString().replace(/^\/+/, '')}`;
    }

    //  Добавляем query-параметры (например: ?id=12)
    if (queryParams) {
        URL += `?${queryParams.toString().replace(/^\?+/, '')}`; //вернуться и сделать чтобы несколько параметров передавались
    }
    
    // Создаем options для хедеров
    const options = {
      headers: {
        'x-challenger': this.token,
        'content-type': 'application/json',
      }
    };

    //  Добавляем body если передан
    if (body) {
      options.data = body;
    }

    // Выполняем запрос
    const response = await this.request[method.toLowerCase()](URL, options);

    // Обрабатываем тело ответа
    let responseBody = null;
    try {
      responseBody = await response.json();
    } catch (w) {
      responseBody = await response.text();
    }

    // Лог в консоль (если включён) для отладки
    if (consoleLog) {
      console.log(`ApiChallenges: ${this.baseURL}gui/challenges/${this.token}`) //-------- для практики апи 
      console.log(`URL:${URL}`);
      console.log('Body:\n',JSON.stringify(body,null,2));
      console.log(`Resposne status: ${response.status()}`)
      console.log('Response body:\n', JSON.stringify(responseBody,null,2));
    }

    // Проверка статуса (если нужно)
    if (needStatus) {
      await expect(response.status()).toBe(needStatus);
    }
    // Проверка сообщения 
    if (responseMessage){ 
        await expect(JSON.stringify(responseBody)).toContain(responseMessage);
    }

    // Прикрепление ответа к отчёту (с аллюром разберемся позже)
    if (testInfo) {
      await testInfo.attach(`Response: ${method} ${endpoint}`, {
        body: JSON.stringify(responseBody, null, 2),
        contentType: 'application/json',
      });
    }
    //Возвращаем тело либо текстом либо джсоном
    return responseBody;
  }
}