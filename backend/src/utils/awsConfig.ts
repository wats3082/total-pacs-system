import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

export function getAwsConfig(): DynamoDBClientConfig {
  return {
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    } : undefined,
  };
}
