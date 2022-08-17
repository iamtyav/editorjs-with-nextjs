import Head from 'next/head'
import Image from 'next/image'
import dynamic from "next/dynamic"
import React from 'react'
import { useRouter } from 'next/router'
// import { Editor2 } from '../component/third-editor'
// import { ReactEditor} from '../component/another_editor'
// import { ReactEditor } from '../component/another_editor'

const Editor = dynamic(() => import("../../component/editor"), { ssr: false })

export default function EditPost({ post }) {
  const router = useRouter()
  const { slug } = router.query

  React.useEffect(() => {}, [post])

  if (!post) {
   return <p>No Post to edit</p>
  }

  return <div className='custom'>
    <Editor data={post} url={`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`} method={'put'} isEdit={true} slug={slug} />
    </div>
}

export async function getServerSideProps({ query }) {
  console.log(query, "games")
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${query.slug}`);
  const post = await res.json();
  if (res.status >= 400) {
    return { props: {} }
  }
  return {
    props: {
      post
    },
  };
}


