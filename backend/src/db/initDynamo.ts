import dotenv from 'dotenv';
import { DynamoDBClient, CreateTableCommand } from '@aws-sdk/client-dynamodb';

dotenv.config();

const tableName = process.env.DYNAMO_TABLE || 'TotalPacsEntities';
const region = process.env.AWS_REGION || 'us-east-1';

const client = new DynamoDBClient({
  region,
  credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  } : undefined,
});

async function createTable() {
  try {
    const command = new CreateTableCommand({
      TableName: tableName,
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'type', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    });

    const response = await client.send(command);
    console.log('Created DynamoDB table:', response.TableDescription?.TableName);
  } catch (error) {
    console.error('Failed to create DynamoDB table:', error);
  }
}

createTable();
