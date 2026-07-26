#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { TotalPacsSystemStack } from '../lib/total-pacs-system-stack';

const app = new App();

new TotalPacsSystemStack(app, 'TotalPacsSystemStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
});
