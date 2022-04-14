socket.onopen = (e) => {
      console.log(e.type === 'open')
      if(e.type ==='open'){
        socket.send(`Login ${process.env.NEXT_PUBLIC_IP_AUTH_TOKEN}`)
        setIsConnected(true)
        socket.onmessage =(data)=>{console.log("Server Data:"+JSON.parse(data.data)) }
      }
       else {
        setIsConnected(false)
      }