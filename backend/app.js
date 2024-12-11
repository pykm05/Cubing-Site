import express from 'express';
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("app is listening on port 3000")
});

app.get('/', (request, response) => {
  response.json({ data: "Hello from server" });
  console.log(request);
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/'));
  // res.json({ data: "hello" });
});