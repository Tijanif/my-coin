import { useState } from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-fetch';

const COINBASE_BASE_URL = 'https://api.coinbase.com/v2';

const useFindTicker = () => {
  // Value for Search form
  const [symbol, setSymbol] = useState('');

  console.log(setSymbol);

  // Data value from the market
  const [data, setData] = useState(null);

  // Error messages from Coinbase API
  const [error, setError] = useState(null);

  return {
    setSymbol,
    data,
    error,
    getTodayPrice: async () => {
      try {
        // Don't make a request if symbol value is empty
        if (symbol.trim().length < 1) {
          setError([
            {
              message:
                'Please enter a symbol or a fiate currency. e-g - BTC-USD',
            },
          ]);
        }

        // Fetch data from CoinBase API
        const res = await fetch(
          `${COINBASE_BASE_URL}/prices/${symbol.trim()}/buy`
        );
        const { error, ata } = await res.json();

        // Set error to state, If any
        setError(error);

        // Set ticker data to state
        setData(data);
        console.log(data);
        return;
      } catch (e) {
        console.log(e);
      }
    },
  };
  console.log(data);
};

// export default () => {
//   const { getTodaysPrices, setSymbol, data, error } = useFindTicker;

//   // Handle Submit
//   const handleSubmit = () => getTodaysPrices();

//   // Handle Input Change
//   const handleChange = (e) => setSymbol(e.target.value);

//   return (
//     <>
//       {/* Search form code */}
//       <Head>
//         <link rel='styleSheet' href='style.css' />
//       </Head>
//       <div className='container'>
//         <h2 className='headline'>Search The Crypto Currency Market Data</h2>
//         <div className='round-form'>
//           <input type='text' placeholder='BTC-USD' onChange={handleChange} />
//         </div>
//         <div className='action-box'>
//           <button onClick={handleSubmit}>Search</button>
//         </div>
//       </div>

//       {/* output data */}
//       {(error && <h1 className='headline'>{error[0].message}</h1>) ||
//         (data && (
//           <div className='container-result'>
//             {Object.keys(data).map((dataKey, i) => (
//               <div key={`${dataKey}-${i}`} className='card'>
//                 {' '}
//                 <h3 className='card-value'>{data[dataKey]}</h3>
//                 <p className='card-label'>{dataKey}</p>
//               </div>
//             ))}
//           </div>
//         ))}
//     </>
//   );
// };

export default () => {
  const { getTodayPrice, setSymbol, data, error } = useFindTicker();

  // On submit handler
  const handleSubmit = () => getTodayPrice();

  // On input change handler
  const handleChange = (e) => setSymbol(e.target.value);

  return (
    <>
      <Head>
        <link rel='stylesheet' href='/styles.css' />
      </Head>
      <div className='container'>
        <h2 className='headline'>Search Cyrpto Currency Market Data</h2>
        <div className='rounded-form'>
          <input type='text' placeholder='BTC-USD' onChange={handleChange} />
        </div>
        <div className='action-box'>
          <button onClick={handleSubmit}>Search</button>
        </div>
      </div>

      {(error && <h1 className='headline'>{error[0].message}</h1>) ||
        (data && (
          <div className='container result'>
            {Object.keys(data).map((dataKey, i) => (
              <div key={`${dataKey}-${i}`} className='card'>
                <h3 className='card-value'>{data[dataKey]}</h3>
                <p className='card-label'>{dataKey}</p>
              </div>
            ))}
          </div>
        ))}
    </>
  );
};
// export default MyCoin;
// export default function Home() {
//   render(MyCoin);
// }
