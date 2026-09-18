import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static production files from Vite build output directory 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback: render index.html for all client-side routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`CloudKitchen server running on port ${PORT}`);
});
