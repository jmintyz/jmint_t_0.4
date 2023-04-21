import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import { getAppProps } from "../../utils/getAppProps";
import Link from "next/link";
import { faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faScroll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import QRCode from 'qrcode.react';

export default function All() {
  const handleClick = async () => {
    const result = await fetch(`/api/addTokens`, {
      method: 'POST',
    });
    const json = await result.json();
    console.log('Result: ', json);
    window.location.href = json.session.url;
  };

  const fixedText = "0x4324C907ce931356483885Fc3CC1f875E728DEb3";
    return (
      <div id="super" className="w-full mt-8 mb-0 flex flex-col overflow-auto">
      <div className="w-full  flex flex-col overflow-auto">
        <div className="m-auto w-full max-w-screen-sm flex">
          <div className="w-1/2 bg-slate-100 p-2 rounded-md py-4 shadow-slate-200 text-3xl text-center  max-w-screen-sm">
          <Link href="/activites/all" className="m-auto w-full max-w-screen-sm mb-4 "> 
          <FontAwesomeIcon icon={faPuzzlePiece} className="text-slate-400 pr-2 xl" />               
            </Link>
          </div>
          <div className="w-1/2 bg-slate-100 p-2 rounded-md py-4 shadow-slate-200 text-3xl text-center max-w-screen-sm">
          
          <Link disabeled href="/activites/new" className="m-auto w-full max-w-screen-sm mb-4">
          <FontAwesomeIcon icon={faPlusCircle} className="text-blue-500 pr-2 xl" />  
            </Link>
          </div>
        </div>
      </div>
      <div id="super" className="w-full my-0 flex flex-col overflow-auto">
      <form className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200">
        <div>
          <label>
            <p className="text-2xl pl-2">Montant à envoyer :</p>
          </label>
           </div>
        <div id="jo" className="text-2xl text-center align-middle flex items-center m-auto w-full max-w-screen-sm">
          <input className="mb-7 text-right m-auto w-full max-w-screen-sm ml-40 mr-4 px-2"/> <p className="mb-7 mr-40">€</p>
          </div>
          <div>
          <label>
            <p className="text-2xl pl-2">Adresse du destinataire :</p>
          </label>
           </div>
        <div id="jo" className="text-2xl text-center align-middle flex items-center m-auto w-full max-w-screen-sm">
          <input className="mb-7 text-right m-auto w-full max-w-screen-sm ml-4 mr-4 px-2"/> 
          </div>
          <div id="jo" className="text-2xl text-center flex items-center m-auto w-full max-w-screen-sm">
        <button className="btn" onClick={handleClick}>
        Envoyer
      </button>
          </div>
       
      </form>
      </div>
      </div>
      );
  }

  All.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
  };


  export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx){
      const props = await getAppProps(ctx);
      return {
        props
      };
    }
  });
  