import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout/AppLayout";
import { getAppProps } from "../utils/getAppProps";
import Link from "next/link";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faScroll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TokenTopup() {
  const [balances, setBalances] = useState([]);
  const [pricesInUSDT, setPricesInUSDT] = useState([]);
  const [eurUsdtPrice, setEurUsdtPrice] = useState(0);

  useEffect(() => {
    async function fetchBalancesAndPrices() {
      try {
        const response = await axios.get('/api/binance');
        const nonZeroBalances = response.data.balances.filter(
          (balance) => parseFloat(balance.free) > 0 || parseFloat(balance.locked) > 0
        );
        setBalances(nonZeroBalances);
        setPricesInUSDT(response.data.pricesInUSDT);
        setEurUsdtPrice(response.data.eurUsdtPrice);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBalancesAndPrices();
  }, []);

  function getAssetPriceInUSDT(asset) {
    const priceData = pricesInUSDT.find((price) => price.symbol === `${asset}USDT`);
    return priceData ? parseFloat(priceData.price) : 0;
  }

  function getTotalValueInUSDT() {
    return balances.reduce((total, balance) => {
      const assetPriceInUSDT = getAssetPriceInUSDT(balance.asset);
      const totalBalance = parseFloat(balance.free) + parseFloat(balance.locked);
      const balanceInUSDT = assetPriceInUSDT * totalBalance;

      return total + balanceInUSDT;
    }, 0);
  }

  function convertUsdtToEur(usdtValue) {
    return usdtValue / eurUsdtPrice;
  }

    return (
    
    <div id="super" className="w-full my-8 flex flex-col overflow-auto">
      <div className="w-full  flex flex-col overflow-auto">
        <div className="m-auto w-full max-w-screen-sm flex">
          <div className="w-1/3 bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200 text-xl text-center max-w-screen-sm">
          <FontAwesomeIcon icon={faWallet} className="text-slate-500 pr-2" />  <br/>
          <Link href="/token-topup" className="m-auto w-full max-w-screen-sm mb-4">
                         
              <span className="pl-1">Recevoir</span>       
            </Link>
          </div>
          <div className="w-1/3 bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200 text-xl text-center max-w-screen-sm">
          <FontAwesomeIcon icon={faPaperPlane} className="text-slate-500 pr-2" />   <br/>
          <Link disabeled href="/token-topup" className="m-auto w-full max-w-screen-sm mb-4">
                        
              <span className="pl-1">Envoyer</span>       
            </Link>
          </div>
          <div className="w-1/3 bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200 text-xl text-center max-w-screen-sm">
          <FontAwesomeIcon icon={faScroll} className="text-slate-500 pr-2" /> <br/>
          <Link href="/token-topup" className="m-auto w-full max-w-screen-sm mb-4">
                         
              <span className="pl-1">Historique</span>       
            </Link>
          </div>
        </div>
      </div>
      <form className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200">
      <div>
      <h1>Soldes Binance en USDT et EUR</h1>
      <ul>
        {balances.map((balance) => {
          const assetPriceInUSDT = getAssetPriceInUSDT(balance.asset);
          const totalBalance = parseFloat(balance.free) + parseFloat(balance.locked);
          const balanceInUSDT = assetPriceInUSDT * totalBalance;
          const balanceInEUR = convertUsdtToEur(balanceInUSDT);

          return (
            <li key={balance.asset}>
              {balance.asset}: {totalBalance.toFixed(6)} ({balanceInUSDT.toFixed(2)} USDT / {balanceInEUR.toFixed(2)} EUR)
            </li>
          );
        })}
      </ul>
      <p>
        <strong>Total: {getTotalValueInUSDT().toFixed(2)} USDT / {convertUsdtToEur(getTotalValueInUSDT()).toFixed(2)} EUR</strong>
      </p>
    </div>
       
      </form>
      </div>
      
      );
  }

  TokenTopup.getLayout = function getLayout(page, pageProps) {
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
  