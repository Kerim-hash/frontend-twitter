import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
const SocketContext = createContext();
// const socket = io("ws://localhost:8000");
const socket = io('https://twitterchat-node-2020.herokuapp.com/');
// const socket = io('ws://twitter-socket-server-743cgcksu-kerim-frontend.vercel.app/');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [call, setCall] = useState({});
  const [receiver, setReceiver] = useState({})
  const userVideo = useRef();
  const connectionRef = useRef();
  useEffect(() => {
    socket.on("callUser", ({ from, signal, senderName, avatar }) => {
      setCall({ isReceivingCall: true, from, signal });
      setReceiver({senderName, avatar})
    });
    socket.on("getCallBack", ({ CallBack }) => {
      if (CallBack) {
        setCallEnded(true);
      }
    });
  }, []);
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (senderName, avatar, id, me) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        senderName,
        avatar
      });
      me !== id &&
        socket.emit("sendNotification", {
          senderName,
          receiverID: id,
          type: 3,
          avatar: avatar,
        });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = async (receiverId) => {
    setCallEnded(true);
    setCallAccepted(false)
    setCall({})
    await socket.emit("callBack", { receiverId });
    // connectionRef.current.destroy();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        userVideo,
        stream,
        callEnded,
        callUser,
        leaveCall,
        answerCall,
        socket,
        setStream,
        setCallEnded, 
        setCallAccepted, 
        setCall,
        receiver
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
