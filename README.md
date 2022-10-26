# Product API With RabbitMQ


## Requirements

[MongoDB](https://www.mongodb.com) <br />
[RabbitMQ](https://www.rabbitmq.com) <br />
[Postman](https://www.postman.com)



## Installation:
```
$ git clone https://github.com/karag00z/ProductAPI-With-RabbitMQ.git
$ cd productapi 
$ npm install
$ cd .. 
$ cd rabbitmq-consumer
$ npm install
```


#### You should change the .env-example to .env and configure your own String

## Run:
###### on the project root
### You should use two different terminal.

```
$ cd rabbitmq-consumer
$ npm start 
```
<img width="203" alt="2" src="https://user-images.githubusercontent.com/68037093/198083238-2f0f1be5-352d-4eaa-a37a-7d6aca237f1f.png">

##### Another Terminal
```
$cd productapi
$ npm start
```
<img width="188" alt="1" src="https://user-images.githubusercontent.com/68037093/198083024-edc7846b-4f97-4f97-af4d-dfdd82a1c573.png">
