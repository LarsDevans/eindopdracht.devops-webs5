# Kafka Integration

Integrate Kafka into your NestJS microservice for consuming messages.

## Steps to Integrate Kafka

### 1. Import `KafkaModule`
In your service module, import `KafkaModule` with the appropriate consumer group:

```ts
import { KafkaModule } from '@app/kafka';

@Module({
  imports: [
    KafkaModule.register({ groupId: 'your-consumer-group' }),
  ],
})
export class YourServiceModule {}
```

### 2. Consume Kafka Messages
Use `@MessagePattern()` in your controller to consume messages from the Kafka topic:

```ts
@MessagePattern('your_topic_name')
handleEvent(@Payload() message: any) {
  console.log('Consumed event:', message.value);
}
```

### 3. Attach Kafka Connection
In the `bootstrap()` function, attach Kafka connection:

```ts
import { attachKafka } from '@app/kafka';

async function bootstrap() {
  const app = await NestFactory.create(YourServiceModule);
  await app.listen(process.env.PORT || 3000);
  await attachKafka(app, 'your-service-name');
}
```

### 4. Testing

1. Start your service.
2. Go to the Kafka UI service.
3. In the UI, select the `your_topic_name` topic.
4. Publish the following example message:

```json
{
  "value": {
    "message": "Kafka is better",
  }
}
```

5. Check your service logs to see the consumed message.
