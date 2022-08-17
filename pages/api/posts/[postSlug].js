import data from '../../../data/post.json'
export default function handler(req, res) {
  let postSlug = req.query.postSlug
  if (!postSlug) {
    return res.status(404).json({ message: "postSlug not present" })
  }
  if (req.method === 'GET') {
    let post = data.find(postData => postData.slug == postSlug);
    if (!post) {
      return res.status(404).json({ message: 'Post not found'})
    }
    return res.status(200).json(post);
  }
  if (req.method === 'PUT') {
    req.body = JSON.parse(req.body)
    console.log(req.body)
    let postIndex = data.findIndex(postData => postData.slug == postSlug);
    if (postIndex >= 0) {
      data[postIndex] = req.body
      return res.status(200).json({ message: 'Update successful'})
    } else {
      return res.status(404).json({ message: "Post not found"})
    }
  }
  return res.status(404).json({ message: 'Route not found' })
}
