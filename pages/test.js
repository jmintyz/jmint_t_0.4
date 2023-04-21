import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout/AppLayout";
import { getAppProps } from "../utils/getAppProps";
import Link from "next/link";

export default function Test({children, availableTokens, mints, postId}) {
    return (
      <div className="flex w-full h-full">
      <div className="flex flex-col items-center justify-start w-1/3 h-full border-none">
        <button className="px-8 py-4 mt-8 font-bold text-white bg-blue-500 rounded-lg">
          Créer
        </button>
        <div className="px-4 flex-1 overflow-auto ">
                    {mints.map((post) => (
                        
                        <Link key={post._id} href={`/mint/${post._id}`} className={'py-1 border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-9 px-2 bg-gradient-to-b from-cyan-400 to-cyan-300 cursor-pointer rounded-sm ${postId === post._id ? "bg-white/20 border-white" : ""}'}>
                            {post.topic}
                        </Link>
                    ))}
                </div>
      </div>
      <div className="flex flex-col items-center justify-start w-1/3 h-full border-l-2 border-r-2 border-gray-500">
        <button className="px-8 py-4 mt-8 font-bold text-white bg-blue-500 rounded-lg">
          Transferer
        </button>
      </div>
      <div className="flex flex-col items-center justify-start w-1/3 h-full border-none">
        <button className="px-8 py-4 mt-8 font-bold text-white bg-blue-500 rounded-lg">
          Gérer
        </button>
      </div>
    </div>
      );
  }7



  Test.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
  };

  
  
  export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx){
      const props = await getAppProps(ctx);
      console.log()
      return {
        props
      };
    }
  });

  
  