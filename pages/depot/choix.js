import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import { useRouter } from "next/router";
import { getAppProps } from "../../utils/getAppProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFingerprint } from "@fortawesome/free-solid-svg-icons";

const handleClick = async () => {
  const result = await fetch('/api/addTokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ keywords: keywords })
  });
  const json = await result.json();
  window.location.href = json.session.url;


    return (
    <div className="h-full-overflow-hidden">
      {!!generating && (
      <div className="text-green-500 flex h-full animate-pulse w-full flex-col justify-center items-center">
        <FontAwesomeIcon icon={faFingerprint} className="text-8xl"/>
        <h1>Generation...</h1>
      </div>
      )}
      {!generating && (
      <div className="w-full h-full flex flex-col overflow-auto">
      <form className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200">
        <div>
        <label>
            <strong>Montant du dépot :</strong>
          </label>
          <textarea className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" value={keywords} onChange={(e) => setKeywords(e.target.value)} maxLength={80}/>
          <small className="block mb-2">Des frais de 0.8% sont appliqués pour les dépots par carte bancaire</small>
          </div>
          <button className="btn" onClick={handleClick}>
        Déposer
      </button>
      </form>
      </div>      
        )}
    </div> 
    );
  }

  Choix.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
  };

  export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx){
      const props = await getAppProps(ctx);
      
      if(!props.availableTokens){

        
        return {
          redirect: {
            destination: "/token-topup",
            permanent:false,

          }
        }
      }

      
      return {
        props
      };
    }
  });