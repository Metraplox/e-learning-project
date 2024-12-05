import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export const rabbitmqConfig: ClientsModuleOptions = [
  {
    name: 'USERS_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [
        process.env.RABBITMQ_URI || 'amqp://admin:admin123@localhost:5672',
      ],
      queue: 'users_queue',
      queueOptions: {
        durable: false,
      },
    },
  },
];
