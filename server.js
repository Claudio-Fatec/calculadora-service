const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

const services = {
  "+": { url: 'http://localhost:3001/soma' },
  "-": { url: 'http://localhost:3002/subtrair' },
  "*": { url: 'http://localhost:3003/multiplicar' },
  "/": { url: 'http://localhost:3004/dividir' },
};

app.post('/calcular', async (req, res) => {
  const { a, b, operador } = req.body;

  const service = services[operador];
  if (!service) {
    return res.status(400).json({ erro: "Operador inválido" });
  }

  try {
    const resposta = await axios.post(service.url, { a, b });
    res.json({ a, b, operador, resultado: resposta.data.resultado });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao processar a operação", detalhes: err.message });
  }
});

app.listen(3000, () => {
  console.log('Calculadora Service rodando na porta 3000');
});
