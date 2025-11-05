import express from 'express';
import sharp from 'sharp';

const app = express();
app.use(express.text({ type: '*/*' }));

app.post('/convert', async (req, res) => {
  try {
    const svg = req.body;
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(pngBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Conversion failed: ' + err.message);
  }
});

app.get('/', (req, res) => res.send('SVG → PNG converter is running 🚀'));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
