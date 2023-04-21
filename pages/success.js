import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout/AppLayout";
import { getAppProps } from "../utils/getAppProps";

export default function Success() {
    return (
    <div>
      <h1>Achat validé !</h1>
      </div>
      );
  }7



  Success.getLayout = function getLayout(page, pageProps) {
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

  
  