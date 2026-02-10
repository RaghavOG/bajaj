# BFHL API

REST API for Chitkara University Qualifier 1 assignment.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
PORT=3000
OFFICIAL_EMAIL=your_email@chitkara.edu.in
OPENAI_API_KEY=your_openai_key
NODE_ENV=development
```

3. Run the server:
```bash
npm start
```

## API Endpoints

### POST /bfhl
Supports: `fibonacci`, `prime`, `lcm`, `hcf`, `AI`

Example:
```json
{ "fibonacci": 7 }
{ "prime": [2,4,7,9,11] }
{ "AI": "Your question here" }
```

### GET /health
Health check endpoint
