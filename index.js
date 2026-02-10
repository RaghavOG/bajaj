import express from 'express';
import config from './config/index.js';
import bfhlRoutes from './routes/index.js';

const app = express();


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});


app.use(express.json({ limit: '10kb' }));


app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      is_success: false,
      official_email: config.officialEmail,
      error: 'Invalid JSON format',
    });
  }
  next();
});

app.use('/', bfhlRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: config.officialEmail,
  });
});

app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    official_email: config.officialEmail,
  });
});


if (process.env.NODE_ENV !== 'production') {
  const PORT = config.port;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


export default app;