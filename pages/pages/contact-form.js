import Head from "next/head";
import Link from "next/link";
import { RichText } from "prismic-reactjs";
import styles from "../../styles/Home.module.css";
import { client } from "../../prismic-configuration";

export default function ContactForm(props) {
  const pageTitle = RichText.asText(props?.home?.data?.heading);
  const enterName = RichText.asText(props?.home?.data?.name);
  const enterEmail = RichText.asText(props?.home?.data?.email);
  const enterBodyText = RichText.asText(props?.home?.data?.bodytext);
  const disclaimer = RichText.asText(props?.home?.data?.disclaimer);

  return (
    <div className={styles.container}>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <main>
        <h1 className="mt-6 text-gray-900 font-semibold text-6xl leading-none">
          {pageTitle}
        </h1>
        <p className="mt-20 text-gray-900 font-semibold text-2xl leading-none">
          {enterName} <br />
          <input
            className="w-full mt-4 p-2 text-gray-900 bg-gray rounded-md font-thin text-xl"
            id="name"
            type="text"
            placeholder="Enter your full name"
          />
        </p>
        <p className="mt-6 text-gray-900 font-semibold text-2xl leading-none">
          {enterEmail}
          <br />
          <input
            className="w-full mt-4 p-2  text-gray-900 bg-gray rounded-md font-thin text-xl"
            id="email"
            type="email"
            placeholder="Enter your email address"
          />
        </p>
        <p className="mt-6 text-gray-900 font-semibold text-2xl leading-none">
          {enterBodyText}
          <br />
          <textarea
            className="w-full mt-4 p-2 text-gray-900 bg-gray rounded-md font-thin text-xl"
            id="bodyText"
            type="text"
            rows="5"
            placeholder="Enter your message"
          />
        </p>
        <button className="w-40 transition duration-500 ease-in-out bg-blue-500 hover:bg-blue-300 transform hover:-translate-y-1 hover:scale-110 text-white font-bold py-2 px-4 rounded-md mt-6">
          <a className="font-thin text-lg leading-snug">Send</a>
        </button>
      </main>
      <Link href={"/"}>
        <button className="mt-20 transition duration-500 ease-in-out bg-blue-500 hover:bg-blue-300 transform hover:-translate-y-1 hover:scale-110 text-white font-bold py-2 px-4 rounded-md mt-6">
          <a className="font-thin text-lg leading-snug">Back</a>
        </button>
      </Link>
      <footer className="mb-4">
        <h1 className="mt-6 text-gray-900 font-thin text-xs ">{disclaimer}</h1>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const home = await client.getSingle("contact-form");
  return {
    props: {
      home
    }
  };
}
