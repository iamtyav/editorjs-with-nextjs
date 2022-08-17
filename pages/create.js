import Head from 'next/head'
import Image from 'next/image'
import dynamic from "next/dynamic"

const Editor = dynamic(() => import("../component/editor"), { ssr: false })

export default function Home() {
  return <div className='custom'>
    <Editor data={{}} url='http://localhost:3000/api/posts' method='post' isEdit={true}/>
    </div>
}
