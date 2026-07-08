import express from 'express';
import './config/database';
import apiRoutes from './routes/api';

const app = express();
const port = Number(process.env.PORT || 8000);

const getBaseUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
};

const baseUrl = getBaseUrl();

app.use(express.json());
app.use(apiRoutes);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    port,
    baseUrl,
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
  console.log(`API base URL: ${baseUrl}`);
});
