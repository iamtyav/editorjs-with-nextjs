import Head from 'next/head'
import Image from 'next/image'
import dynamic from "next/dynamic"
import { useRouter } from 'next/router'
// import { Editor2 } from '../component/third-editor'
// import { ReactEditor} from '../component/another_editor'
// import { ReactEditor } from '../component/another_editor'

const Editor = dynamic(() => import("../component/editor"), { ssr: false })


export default function Home({ posts }) {
  const router = useRouter()

  return <div className='custom'>
    <div><button onClick={() => router.push('/create')}>
      Create a Post
    </button></div>
 {posts.map(post => <p key={post.slug} onClick={() => router.push(`/edit/${post.slug}`)}>{post.slug}</p>)}
    </div>
}

export async function getServerSideProps({ query }) {
  console.log(query)
  const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/posts`);
  console.log({res})
  const posts = await res.json();

  return {
    props: {
      posts
    },
  };
}
