/* eslint-disable @next/next/no-page-custom-font */
import { useEffect, useState } from 'react'
import { GitHub, Moon, Sun } from 'react-feather'
import styles from '../styles/Home.module.scss'
import type { NextPage } from 'next'
import { useTheme } from 'next-themes'
import Head from 'next/head'

// import Image from 'next/image'
type serverDataProps = {
  PblcOrdrBooksDeltaRprt: {
    OrdrbookList: {
      OrdrBook:

      {
        contractId: string,
        dlvryAreaId: string,
        lastPx: string,
        lastQty: string,
        totalQty: string,
        lastTradeTime: string,
        pxDir: string,
        revisionNo: string,
        highPx: string,
        lowPx: string,
        SellOrdrList: {
          OrdrBookEntry: [
            {
              ordrId: string,
              qty: string,
              px: string,
            },
          ]
        },
        BuyOrdrList: {
          OrdrBookEntry: [
            {
              ordrId: string,
              qty: string,
              px: string,
            },
          ]
        }
      },


    }
  }
}
const Home: NextPage = () => {

  const { setTheme, theme } = useTheme()
  const [isConnected, setIsConnected] = useState(false)

  const [parsedData, setParsedData] = useState<any>([])

  const [buyOrders, setBuyOrders] = useState<any>([])

  const [sellOrdrs, setSellOrdrs] = useState<any>([])

  const contratId = '@contractId'
  const dlvryAreaId = '@dlvryAreaId'
  const ordrId = '@ordrId'
  const qty = '@qty'
  const px = '@px'
  console.log("Parsed Data:", parsedData[contratId])
  const handleSetWebSocketConnection = () => {
    const socket = new WebSocket(`ws://${process.env.NEXT_PUBLIC_IP_PORT}`)
    socket.onopen = (e) => {

        if (socket.readyState === WebSocket.OPEN) {
          socket.send(`Login ${process.env.NEXT_PUBLIC_IP_AUTH_TOKEN}`)
          socket.onmessage = (data) => {
            setIsConnected(true)
            socket.send('pong')
            if (data.data !== "Handshake OK" && data.data !== "ping") {
              const extractValue = JSON.parse(data.data)
              const result = extractValue.PblcOrdrBooksDeltaRprt.OrdrbookList.OrdrBook
              setParsedData(result)
              setBuyOrders(result.BuyOrdrList?.OrdrBookEntry)
              setSellOrdrs(result.SellOrdrList?.OrdrBookEntry)
            }
            // setData(data.data)
          }

        } else {
          setIsConnected(false)
        }

    };
  }

  useEffect(() => {


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

                {parsedData === undefined ? null : parsedData.length === undefined ? <option value={parsedData[contratId]}>{parsedData[contratId]}</option>
                  : parsedData.map((data: any, index: number) => {
                    return <option key={index} value={data[contratId]}>{data[contratId]}</option>
                  }
                  )}
              </select>

              <strong>Delivary area:</strong>
              <select>
                {parsedData === undefined ? null : parsedData.length === undefined ? <option value={parsedData[dlvryAreaId]}>{parsedData[dlvryAreaId]}</option>
                  : parsedData.map((data: any, index: number) => {
                    return <option key={index} value={data[dlvryAreaId]}>{data[dlvryAreaId]}</option>
                  }

                  )}
              </select>
            </div>

            <span>{parsedData[contratId]} / {parsedData[dlvryAreaId]}</span>

            <div className={styles.table}>
              <div className={styles.tablehead}>

                <h3>Buy</h3>
                <h3>Sell</h3>

              </div>
              <div className={styles.tbody}>
                <div>
                  {buyOrders === undefined ? null : buyOrders.length === undefined ? <p>{`${buyOrders[px]}(${buyOrders[qty]})`}</p>
                    : buyOrders.map((data: any, index: number) => {

                      return (
                        <p key={index}>{`${data[px]}(${data[qty]})`}</p>)
                    })
                  }

                </div>
                <div>
                  {sellOrdrs === undefined ? null : sellOrdrs.length === undefined ? <p>{`${sellOrdrs[px]}(${sellOrdrs[qty]})`}</p>
                    : sellOrdrs.map((data: any, index: number) => <p key={index}>{`${data[px]}(${data[qty]})`}</p>
                    )}

                </div>

              </div>
            </div>
            {/* <p>{serverData === null ? "Nao ha dados" : serverData?.map((i, d) => {
              return (
                <p key={d}>{i.lastPx}</p>
              )
            })}</p> */}

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
