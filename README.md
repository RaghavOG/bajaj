# Chitkara Qualifier 1 - BFHL API

REST API implementation for Chitkara University Qualifier 1 assignment.

## API Endpoints

### POST /bfhl
Handles different operations based on the request key.

#### Supported Operations:
- `fibonacci`: Generate Fibonacci series
- `prime`: Filter prime numbers from array
- `lcm`: Calculate LCM of array
- `hcf`: Calculate HCF/GCD of array
- `AI`: Answer questions using OpenAI

#### Example Requests:

**Fibonacci:**
```json
POST /bfhl
{
  "fibonacci": 7
}
```
Response:
```json
{
  "is_success": true,
  "official_email": "raghav3912.beai23@chitkara.edu.in",
  "data": [0,1,1,2,3,5,8]
}
```

**Prime:**
```json
POST /bfhl
{
  "prime": [2,4,7,9,11]
}
```
Response:
```json
{
  "is_success": true,
  "official_email": "raghav3912.beai23@chitkara.edu.in",
  "data": [2,7,11]
}
```

**LCM:**
```json
POST /bfhl
{
  "lcm": [12,18,24]
}
```
Response:
```json
{
  "is_success": true,
  "official_email": "raghav3912.beai23@chitkara.edu.in",
  "data": 72
}
```

**HCF:**
```json
POST /bfhl
{
  "hcf": [24,36,60]
}
```
Response:
```json
{
  "is_success": true,
  "official_email": "raghav3912.beai23@chitkara.edu.in",
  "data": 12
}
```

**AI:**
```json
POST /bfhl
{
  "AI": "What is the capital city of Maharashtra?"
}
```
Response:
```json
{
  "is_success": true,
  "official_email": "raghav3912.beai23@chitkara.edu.in",
  "data": "Mumbai"
}
```

### GET /health
Health check endpoint.

Response:
```json
{
  "is_success": true,
  "official_email": "raghav3912.beai23@chitkara.edu.in"
}
```

## Setup Instructions

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment variables:**
Create a `.env` file:
```
PORT=3000
OFFICIAL_EMAIL=raghav3912.beai23@chitkara.edu.in
OPENAI_API_KEY=your_openai_api_key_here
```

3. **Run the server:**
```bash
npm start
```

## Project Structure
```
├── config/
│   └── index.js          # Configuration management
├── routes/
│   └── index.js          # API routes
├── services/
│   └── openai.js         # OpenAI service
├── utils/
│   ├── mathsUtils.js     # Math utility functions
│   └── aiAnswer.js       # AI answer handler
├── .env                  # Environment variables
├── .gitignore           # Git ignore rules
├── index.js             # Main server file
└── package.json         # Dependencies
```

## Deployment on Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Chitkara Qualifier API"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure Environment Variables:
   - `OFFICIAL_EMAIL` = `raghav3912.beai23@chitkara.edu.in`
   - `OPENAI_API_KEY` = `your_openai_api_key`
5. Click **Deploy**
6. Once deployed, copy your public URL (e.g., `https://your-project.vercel.app`)

### Testing Your Deployed API
Test with curl or Postman:
```bash
# Health check
curl https://your-project.vercel.app/health

# Fibonacci test
curl -X POST https://your-project.vercel.app/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 7}'
```

## Alternative Deployment Options
- **Railway**: New Project → Deploy from GitHub → Deploy
- **Render**: New Web Service → Select repository → Deploy

## Tech Stack
- Node.js
- Express.js
- OpenAI API
