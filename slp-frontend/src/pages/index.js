import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from "next/head";
import ProjectHeading from "@/components/project_heading";
import MappedAccordion from "@/components/mapped_accordion";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <>
        <Head>
          <title>Trial Page</title>
        </Head>

        <ProjectHeading/>
        <MappedAccordion/>

      </>
  )
}
