export default function handler(req, res) {
  // Permite conexões de qualquer origem (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Trata a pre-verificação CORS do navegador/servidor
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Responde status 200 OK tanto para POST (eventos reais) quanto para GET (testes de URL)
  return res.status(200).json({
    status: 'OK',
    message: 'Webhook ativo e pronto para receber dados do iFood.'
  });
}