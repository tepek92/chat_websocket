import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import s from './Chat.module.css'
import {Input, Button, Space} from 'antd';
import {Message} from "./Message/Message";
import {useDispatch, useSelector} from "react-redux";
import {resetMessages, setMessages, TMessage} from "../../state/chat-reducer";
import {TRootState} from "../../state/store";

const {TextArea} = Input

export const Chat: FC = () => {

  const [message, setMessage] = useState('')
  const [ws, setWs] = useState<WebSocket | null>(null)

  const messages = useSelector<TRootState, TMessage[]>(state => state.chat)
  const dispatch = useDispatch()

  const bottomChatRef = useRef<null | HTMLDivElement>(null)

  const changeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value)
  }

  const sendMessageHandler = () => {
    ws && ws.send(message)
    setMessage('')
  }


  useEffect(() => {
    const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    setWs(ws)
    ws.onmessage = (ev: MessageEvent) => {
      const data: TMessage[] = JSON.parse(ev.data);
      dispatch(setMessages(data))
      window.scrollTo(0, document.body.scrollHeight);
    }
    return () => {
      dispatch(resetMessages())
      ws.close()
    }
  }, [])

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomChatRef.current && bottomChatRef.current.scrollIntoView({behavior: 'smooth'})
  }, [messages]);

  const elements = messages.map((m, i) =>
    <Message key={i + 1} name={m.userName} message={m.message} avatar={m.photo}/>)

  return (
    <div className={s.content}>
      <div className={s.messages}>
        {elements}
        <div ref={bottomChatRef}/>
      </div>
      <Space align="end">
        <TextArea
          size="small"
          autoSize
          className={s.textArea}
          value={message}
          onChange={changeMessageHandler}
        />
        <Button
          type="primary"
          onClick={sendMessageHandler}
        >
          SEND
        </Button>
      </Space>
    </div>
  );
};

