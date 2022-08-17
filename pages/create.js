import Head from 'next/head'
import Image from 'next/image'
import dynamic from "next/dynamic"

const Editor = dynamic(() => import("../component/editor"), { ssr: false })

export default function Home() {
  return <div className='custom'>
    <Editor data={{}} url={`${NEXT_PUBLIC_BASE_URL}/api/posts`} method='post' isEdit={true}/>
    </div>
}
