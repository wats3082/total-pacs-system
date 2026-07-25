import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { getAwsConfig } from '../utils/awsConfig';

const client = new DynamoDBClient(getAwsConfig());
const ddb = DynamoDBDocumentClient.from(client);
const tableName = process.env.DYNAMO_TABLE || 'TotalPacsEntities';

interface BaseEntity {
  id: string;
  type: string;
  name: string;
}

export interface Badge extends BaseEntity {
  badgeNumber: string;
  accessLevelIds: string[];
  maskedFunctions?: string[];
}

export interface AccessLevel extends BaseEntity {
  doors: string[];
  functions: string[];
}

export interface Schedule extends BaseEntity {
  rules: Array<{ day: string; start: string; end: string }>;
}

export interface Door extends BaseEntity {
  location: string;
  scheduleId?: string;
}

async function putEntity(entity: any) {
  await ddb.send(new PutCommand({ TableName: tableName, Item: entity }));
  return entity;
}

export async function createBadge(data: Partial<Badge>) {
  const badge: Badge = {
    id: uuidv4(),
    type: 'badge',
    name: data.name || `Badge-${Date.now()}`,
    badgeNumber: data.badgeNumber || `B-${Math.floor(Math.random() * 100000)}`,
    accessLevelIds: data.accessLevelIds || [],
    maskedFunctions: data.maskedFunctions || [],
  };
  return putEntity(badge);
}

export async function getBadges() {
  const result = await ddb.send(new ScanCommand({ TableName: tableName, FilterExpression: '#type = :type', ExpressionAttributeNames: { '#type': 'type' }, ExpressionAttributeValues: { ':type': 'badge' } }));
  return result.Items || [];
}

export async function getBadgeById(id: string) {
  const result = await ddb.send(new GetCommand({ TableName: tableName, Key: { id } }));
  return result.Item || null;
}

export async function createAccessLevel(data: Partial<AccessLevel>) {
  const accessLevel: AccessLevel = {
    id: uuidv4(),
    type: 'accessLevel',
    name: data.name || `AccessLevel-${Date.now()}`,
    doors: data.doors || [],
    functions: data.functions || [],
  };
  return putEntity(accessLevel);
}

export async function getAccessLevels() {
  const result = await ddb.send(new ScanCommand({ TableName: tableName, FilterExpression: '#type = :type', ExpressionAttributeNames: { '#type': 'type' }, ExpressionAttributeValues: { ':type': 'accessLevel' } }));
  return result.Items || [];
}

export async function createSchedule(data: Partial<Schedule>) {
  const schedule: Schedule = {
    id: uuidv4(),
    type: 'schedule',
    name: data.name || `Schedule-${Date.now()}`,
    rules: data.rules || [],
  };
  return putEntity(schedule);
}

export async function getSchedules() {
  const result = await ddb.send(new ScanCommand({ TableName: tableName, FilterExpression: '#type = :type', ExpressionAttributeNames: { '#type': 'type' }, ExpressionAttributeValues: { ':type': 'schedule' } }));
  return result.Items || [];
}

export async function createDoor(data: Partial<Door>) {
  const door: Door = {
    id: uuidv4(),
    type: 'door',
    name: data.name || `Door-${Date.now()}`,
    location: data.location || 'unknown',
    scheduleId: data.scheduleId,
  };
  return putEntity(door);
}

export async function getDoors() {
  const result = await ddb.send(new ScanCommand({ TableName: tableName, FilterExpression: '#type = :type', ExpressionAttributeNames: { '#type': 'type' }, ExpressionAttributeValues: { ':type': 'door' } }));
  return result.Items || [];
}

export async function updateBadgeAccess(id: string, accessLevelIds: string[]) {
  const result = await ddb.send(new UpdateCommand({
    TableName: tableName,
    Key: { id },
    UpdateExpression: 'SET accessLevelIds = :accessLevelIds',
    ExpressionAttributeValues: { ':accessLevelIds': accessLevelIds },
    ReturnValues: 'ALL_NEW',
  }));
  return result.Attributes;
}
