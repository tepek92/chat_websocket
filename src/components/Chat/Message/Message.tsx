import React, {FC} from 'react';
import s from './Message.module.css'
import {Avatar, Typography, Space} from "antd";

const { Text } = Typography;

type TProps = {
  name: string
  message: string
  avatar: string
}

export const Message: FC<TProps> =
  ({name, message, avatar}) => {


  return (
    <Space align="end" className={s.content}>
      <Avatar size={50} src={avatar} />
      <Space direction="vertical" align="start" className={s.textBlock}>
      <Text className={s.name}>{name}</Text>
      <Text className={s.text}>{message}</Text>
      </Space>
    </Space>
  );
};
