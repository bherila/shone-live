export default function handler(req, res) {
  console.log(`req.body`, req.body)
  res.send(req.body)
}
