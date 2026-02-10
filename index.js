import express from 'express';
import config from './config/index.js';
import bfhlRoutes from './routes/index.js';

const app = express();

app.use(express.json({ limit: '10kb' }));

app.use('/', bfhlRoutes);

app.use('/health', (req, res) => {
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


app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
