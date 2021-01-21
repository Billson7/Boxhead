import Head from "next/head";
import styles from "../styles/Home.module.css";
import { client } from "../prismic-configuration";
import { RichText } from "prismic-reactjs";
import Link from "next/link";

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{RichText.asText(props?.home?.data?.heading)}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-h-screen m-auto w-8/12 flex flex-row sm:flex-col md:flex-row lg:flex-row xl:flex-row">
        <div className="m-auto w-auto">
          <h1 className="font-sans text-gray-900 font-thin text-lg leading-snug">
            {RichText.asText(props?.home?.data?.aboveheading)}
          </h1>
          <h1 className="text-gray-900 font-semibold text-6xl leading-none">
            {RichText.asText(props?.home?.data?.heading)}
          </h1>
          <h1 className="text-gray-900 font-semibold text-6xl leading-none">
            {RichText.asText(props?.home?.data?.subheading)}
          </h1>
          <h1 className="mt-6 text-gray-900 font-thin text-xs ">
            {RichText.asText(props?.home?.data?.disclaimer)}
          </h1>
          <div className="flex lex-row">
            <button className="transition duration-500 ease-in-out bg-blue-500 hover:bg-blue-300 transform hover:-translate-y-1 hover:scale-110 text-white font-bold py-2 px-4 rounded-md mt-6">
              {/* Todo - add a contact form page, add a portfolio page */}
              <Link href={"/pages/contact-form"}>
                <a className="font-thin text-lg leading-snug">Get in touch</a>
              </Link>
            </button>
            <button className="ml-6 transition duration-500 ease-in-out font-thin hover:font-normal transform hover:-translate-y-1 hover:scale-110 text-black text-lg leading-snug py-2 px-4 rounded-md mt-6">
              <Link href={`/pages/portfolio`}>
                <a className="">See my work &rarr;</a>
              </Link>
            </button>
          </div>
        </div>
        <div className="m-auto">
          <img
            className="object-contain m-4"
            src={props?.home?.data?.heroimage?.url}
          />
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const home = await client.getSingle("headline-hero");

  return {
    props: {
      home
    }
  };
}
