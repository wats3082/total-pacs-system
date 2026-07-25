# Total PACS System

A prototype physical access control system (PACS) modeled after Lenel OnGuard.

## Features
- Badge management
- Access levels and masking/functions
- Schedules for doors and events
- AWS backend integration using DynamoDB
- React + Vite frontend with REST API

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   npm install --prefix backend
   npm install --prefix frontend
   ```
2. Run in development:
   ```bash
   npm run dev
   ```
3. Backend runs on `http://localhost:4000`
4. Frontend runs on `http://localhost:5173`

## GitHub Pages Deployment
- The frontend is configured for GitHub Pages with relative assets.
- The GitHub Actions workflow is located at `.github/workflows/deploy-total-pacs.yml`.
- Push to `main` or `master` to deploy the frontend to the `gh-pages` branch.

## AWS Backend Setup
1. Add AWS credentials and region to `total-pacs-system/backend/.env`.
2. Run `npm install --prefix total-pacs-system/backend`.
3. Run `npm --prefix total-pacs-system/backend run create-table` to create the DynamoDB table.
4. Run `npm --prefix total-pacs-system/backend run dev` to start the backend.

## Notes
- The backend uses DynamoDB DocumentClient for entity storage.
- `AWS_ENDPOINT` may be added to `.env` for local DynamoDB testing.
- Expand domain models and security policies as needed for production.
