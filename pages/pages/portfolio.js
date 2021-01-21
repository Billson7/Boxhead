import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { client } from "../../prismic-configuration";
import { RichText } from "prismic-reactjs";
import Link from "next/link";
import Prismic from "prismic-javascript";

export default function Portfolio(props) {
  const pageHeading = "Portfolio";

  return (
    <div className={styles.container}>
      <Head>
        <title>Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className="mt-6 text-gray-900 font-semibold text-6xl leading-none">
          {pageHeading}
        </h1>
      </main>

      <div className="flex mt-6 grid grid-cols-3 grid-rows-3 gap-4">
        {props?.posts?.results.map(post => (
          <div
            key={post?.uid}
            className="bg-white opacity-100 max-w-sm m-4 p-4 rounded-md shadow-xl"
          >
            <Link href={`${post?.data?.externalurl?.url}`}>
              <a>
                <img className="object-cover" src={post?.data?.image?.url} />
                <div className="pl-3">
                  <p className="text-gray-900 mt-4 font-semibold text-lg leading-tight truncate">
                    {RichText.asText(post?.data?.title)}
                  </p>
                  <p className="text-gray-600 mt-1 text-sm leading-tight truncate">
                    {RichText.asText(post?.data?.description)}
                  </p>

                  <p className="text-gray-900 text-sm ml-0 m-4">
                    More information &rarr;
                  </p>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
      <Link href={"/"}>
        <button className="transition duration-500 ease-in-out bg-blue-500 hover:bg-blue-300 transform hover:-translate-y-1 hover:scale-110 text-white font-bold py-2 px-4 rounded-md mt-6">
          <a className="font-thin text-lg leading-snug">Back</a>
        </button>
      </Link>
      <footer className="mb-4">
        <h1 className="mt-6 text-gray-900 font-thin text-xs ">
          {RichText.asText(props?.home?.data?.disclaimer)}
        </h1>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const home = await client.getSingle("headline-hero");
  const posts = await client.query(
    Prismic.Predicates.at("document.type", "page"),
    { orderings: "[my.post.date desc]" }
  );

  return {
    props: {
      home,
      posts
    }
  };
}
