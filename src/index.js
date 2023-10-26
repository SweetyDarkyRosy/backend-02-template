const http = require('http');
const url = require('url');
const sendUserList = require('./modules/users');


const hostname = '127.0.0.1';
const port = 3003;


const server = http.createServer((request, response) => {
    // Написать обработчик запроса:
    // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
    // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
    // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
    // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
    // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500

    if (request.url !== '/')
    {
        const query = url.parse(request.url, true).query;

        if ('hello' in query)
        {
            const name = query.hello;
    
            if (name && (name.trim() !== ''))
            {
                response.statusCode = 200;
                response.statusMessage = "OK";
                response.setHeader('Content-Type', 'text/plain');
    
                response.write(`Hello, ${name}!`);
                response.end();
            }
            else
            {
                response.statusCode = 400;
                response.statusMessage = "NOPE";
                response.setHeader('Content-Type', 'text/plain');
    
                response.write(`Enter a name`);
                response.end();
            }
        }
        if ('users' in query)
        {
            response.statusCode = 200;
            response.statusMessage = "OK";
            response.setHeader('Content-Type', 'application/json');

            response.write(sendUserList());
            response.end();
        }
        else
        {
            response.statusCode = 500;
            response.statusMessage = "NOPE";
    
            response.end();
        }
    }
    else
    {
        response.statusCode = 200;
        response.statusMessage = "OK";
        response.setHeader('Content-Type', 'text/plain');

        response.write(`Hello, World!`);
        response.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server has been started at http://${hostname}:${port}`);
  });
