# total-pacs-system

React/Vite frontend with the shared portfolio-style layout and AWS serverless backend architecture.

## MVP scope

- Sites and doors CRUD endpoints
- Badge provisioning and status management
- Schedule creation and assignment

## Repository layout

```text
frontend/      React + Vite client
backend/       API implementation
infra/cdk/     AWS CDK (API Gateway + Lambda + DynamoDB + Cognito)
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## CDK infrastructure

```bash
cd infra/cdk
npm install
npm run bootstrap
npm run deploy
```

## Planned API routes

- `GET /api/sites`
- `POST /api/sites`
- `GET /api/doors`
- `POST /api/doors`
- `GET /api/badges`
- `POST /api/badges`
- `PATCH /api/badges/:id/status`
- `GET /api/schedules`
- `POST /api/schedules`
