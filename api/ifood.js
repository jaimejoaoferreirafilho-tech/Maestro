export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    // 1. Solcita o token de acesso ao iFood
    const authUrl = 'https://merchant-api.ifood.com.br/authentication/v1.0/oauth/token';
    const params = new URLSearchParams({
      grantType: process.env.IFOOD_GRANT_TYPE || 'client_credentials',
      clientId: process.env.IFOOD_CLIENT_ID,
      clientSecret: process.env.IFOOD_CLIENT_SECRET,
    });

    const tokenResponse = await fetch(authUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return res.status(tokenResponse.status).json({ error: 'Erro de Autenticação iFood', details: tokenData });
    }

    // 2. Com o token gerado, busca as lojas conectadas
    const merchantsResponse = await fetch('https://merchant-api.ifood.com.br/merchant/v1.0/merchants', {
      headers: {
        Authorization: `Bearer ${tokenData.accessToken}`,
      },
    });

    const merchantsData = await merchantsResponse.json();

    return res.status(200).json({
      auth: 'Sucesso',
      tokenData,
      merchants: merchantsData,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno no servidor', details: error.message });
  }
}