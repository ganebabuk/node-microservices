# Node Microservices

## Running Steps

### Running RabbitMQ using Docker

RabbitMQ is required for inter-service communication between microservices. To run RabbitMQ using Docker, use the following command:

```sh
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
```

This will start RabbitMQ with the management plugin enabled.

### Accessing RabbitMQ Management UI

Once RabbitMQ is running, you can access the management interface at:

[http://localhost:15672/](http://localhost:15672/)

**Default Credentials:**  
- **Username:** guest  
- **Password:** guest  

#run - **node server.js** under /user-service
# same run - **node server.js** under /order-service