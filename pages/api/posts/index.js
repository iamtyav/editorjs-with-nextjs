import data from '../../../data/post.json'
export default function handler(req, res) {
  if (req.method === 'GET') {
    let post = data;
    return res.status(200).json(post)
  }
  if (req.method === 'POST') {
    req.body = JSON.parse(req.body)
    req.body.id = Date.now()
    req.body.slug = (req.body.title || req.body.id.toString()).toLowerCase().replace(/\s/g, "-")
    data.push(req.body);
    
    return res.status(200).json({ message: 'Created successful'})
  }
  return res.status(404).json({ message: 'Route not found' })
}
