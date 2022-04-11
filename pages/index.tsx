/* eslint-disable @next/next/no-page-custom-font */
import { useEffect, useState } from 'react'
import { GitHub, Moon, Sun } from 'react-feather'
import styles from '../styles/Home.module.scss'
import type { NextPage } from 'next'
import { useTheme } from 'next-themes'
import Head from 'next/head'
// import Image from 'next/image'

const Home: NextPage = () => {
 
  const { setTheme, theme } = useTheme()
  const [data, setData] = useState({})
  const [isConnected, setIsConnected] = useState(false)
  console.log("Data:", data)
  const initialdata = {
    PblcOrdrBooksDeltaRprt: {
      OrdrbookList: {
        OrdrBook:
          [
            {
              contractId: "12610502",
              dlvryAreaId: "10YNL----------L", lastPx: "41135",
              lastQty: "600",
              totalQty: "207000",
              lastTradeTime: "2021-12-18T13:59:00.719Z", pxDir: "-1",
              revisionNo: "10944",
              highPx: "45907",
              lowPx: "32238",
              SellOrdrList: {
                OrdrBookEntry: [
                  {
                    ordrId: "1411792036",
                    qty: "8600",
                    px: "230000"
                  }, {
                    ordrId: "1411792214",
                    qty: "0",
                    px: "380000"
                  }
                ]
              }
            },
            {
              contractId: "126105546502",
              dlvryAreaId: "10YNL-------HGL", 
              lastPx: "41135",
              lastQty: "600",
              totalQty: "207000",
              lastTradeTime: "2021-12-18T13:59:00.719Z",
              pxDir: "-1",
              revisionNo: "10944",
              highPx: "45907",
              lowPx: "32238",
              SellOrdrList: {
                OrdrBookEntry: [
                  {
                    ordrId: "1411792036",
                    qty: "8600",
                    px: "230000"
                  }, {
                    ordrId: "1411792214",
                    qty: "0",
                    px: "380000"
                  }
                ]
              }
            },
            {
              contractId: "12610475",
              dlvryAreaId: "10YNL-------LG---L", 
              lastPx: "35685",
              lastQty: "1600",
              totalQty: "135600",
              lastTradeTime: "2021-12-18T13:59:00.719Z", 
              pxDir: "1",
              revisionNo: "7578",
              highPx: "41676",
              lowPx: "32624",
              BuyOrdrList: {
                OrdrBookEntry: [
                  {
                    ordrId: "1412026191",
                    qty: "1300",
                    px: "35545"
                  },
                  {
                    ordrId: "12059435720",
                    qty: "0",
                    px: "35265"
                  },]
              }
            }
          ]
      }
    }
  }

  const handleSetWebSocketConnection = () => {
    const socket = new WebSocket(`ws://${process.env.NEXT_PUBLIC_IP_PORT}`)
    socket.onopen = (e) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(`Login ${process.env.NEXT_PUBLIC_IP_AUTH_TOKEN}`)
        socket.onmessage= function(e){
          console.log("Data2:", e.data)
          setData(e.data)
        }
        setIsConnected(true)
      }  else {
        setIsConnected(false)
      }
      
    };
   
  }
  const handleLoadDataFromServer = () => {
    // socket.connect();

  }
  useEffect(() => {
    handleLoadDataFromServer()

  }, [])
  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (

    <div className={styles.container}>
      <Head>
        <title>websocket|showcase</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="shortcut icon" href="favicon.png" type="image/png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header} >
          <div className={styles.subheader}>
            <strong>enspired</strong>
            <span >
              WebSocket showcase
            </span>
            
            <button onClick={handleChangeTheme}>{theme === 'dark' ? <Moon color="#CCCCCC" size={24} /> : <Sun color="#FFD130" size={24} />}</button>
          </div>
        </div>

        <div className={styles.content}>

          <button onClick={handleSetWebSocketConnection}>
            Oppen WebSocket
          </button>

          <strong >Connected: {!!isConnected ? <span>Yes</span> : <span>No</span>} </strong>

          <div className={styles.midle}>


            <div className={styles.cntradeliv} >

              <strong>Contract:</strong>
              <select>
                {initialdata.PblcOrdrBooksDeltaRprt.OrdrbookList.OrdrBook.map((i, data) => {
                  return (
                    <option key={data} value={`${i.contractId}`}>{i.contractId}</option>
                  )
                })}
              </select>

              <strong>Delivary area:</strong>
              <select>
                {initialdata.PblcOrdrBooksDeltaRprt.OrdrbookList.OrdrBook.map((i, data) => {
                  return (
                    <option key={data} value={`${i.dlvryAreaId}`}>{i.dlvryAreaId}</option>
                  )
                })}

              </select>
            </div>


            <span>1234567890 / 9876GFHJ98766</span>

            <table>
              <thead>
                <tr>
                  <th>Sell</th>
                  <th>Buy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>495969696</td>
                  <td>0897606G00BG</td>
                </tr>
                <tr>
                  <td>495969696</td>
                  <td>0897606G00BG</td>
                </tr>
                <tr>
                  <td>495969696</td>
                  <td>0897606G00BG</td>
                </tr>
                <tr>
                  <td>495969696</td>
                  <td>0897606G00BG</td>
                </tr>
                <tr>
                  <td>495969696</td>
                  <td>0897606G00BG</td>
                </tr>
                <tr>
                  <td>495969696</td>
                  <td>0897606G00BG</td>
                </tr>
              </tbody>
            </table>

          </div>

        </div>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/HoracioSA"
          target="_blank"
          rel="noopener noreferrer"
        >
          You can find the source code on my {' '}<GitHub color="#fff" size={24} />{' '}
          <span className={styles.logo}>
            HoracioSA
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
