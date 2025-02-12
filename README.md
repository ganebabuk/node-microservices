# node-microservices

# Using docker to run the RabbitMQ
# latest RabbitMQ 4.0.x
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4.0-management
http://localhost:15672/
UN: guest
PWD: guest