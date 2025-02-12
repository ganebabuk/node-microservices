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

### API Endpoints

- [http://localhost:5001/api/users](http://localhost:5001/api/users) - Retrieves the list of users from the User Service.
- [http://localhost:5002/api/orders/john@example.com](http://localhost:5002/api/orders/john@example.com) - Fetches order details for the user from the Order Service.
- [http://localhost:5001/api/users/john@example.com](http://localhost:5001/api/users/john@example.com) - Retrieves user details along with their respective order. The User Service communicates with the Order Service through RabbitMQ to fetch the order details for the respective user.

