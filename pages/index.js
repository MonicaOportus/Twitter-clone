import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from '../components/Login';
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Widgets from '../components/Widgets';

export default function Home({ trendingResults, followResults, providers }) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  
  if (status === "authenticated") {
    return (
      <div>
        <Head>
          <title>Twitter</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
          <Sidebar/>
          <Feed/>
          <Widgets/>

          {isOpen && <Modal/>}
        </main>
      </div>
    );
  } else {
    return (<Login providers={providers}/>);
  }
}

export async function getServerSideProps(context) {

  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
}
