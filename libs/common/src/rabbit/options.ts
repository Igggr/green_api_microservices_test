import { Transport } from '@nestjs/microservices';

export const RABBIT_OPTIONS = (queue: string, target: string) => {
    const host =
        target === 'DOCKER'
          ? 'rabbit'     // микросервис запущен из контейнера
            : 'localhost'; // микросервис запущен из командной строки

    return {
        transport: Transport.RMQ as const,
        options: {
            urls: [`amqp://${host}:5672`],
            queue,
            queueOptions: {
                durable: true,
            },
            noAck: true,
            prefetchCount: 1
        },
    };
};