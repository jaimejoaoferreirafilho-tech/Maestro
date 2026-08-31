export default function handler(req, res) {
  if (req.method === 'POST') {
    // Responde 200 OK para o iFood confirmar a conexao
    return res.status(200).json({ message: 'Webhook ativo e recebendo dados com sucesso!' });
  }

  // Responde status 200 para testes simples de navegacao (GET)
  return res.status(200).json({ status: 'Webhook endpoint online' });
}
