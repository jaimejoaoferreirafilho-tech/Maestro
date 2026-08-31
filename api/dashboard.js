export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    sistema: "Maestro",
    empresa: "Casa do Estrogonofe",
    versao: "0.1"
  });
}