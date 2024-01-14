import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { baseUrl, getRequest, postRequest } from '../utils/services';
import io from 'socket.io-client';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState({});

  console.log('notifications', notifications);
  // Connect to the WebSocket server.
  useEffect(() => {
    const newSocket = io.connect('http://localhost:3001');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);
  //add online users
  useEffect(() => {
    if (socket === null) return;
    socket.emit('addNewUser', user?._id);
    socket.on('getOnlineUsers', (res) => {
      setOnlineUsers(res);
    });
    return () => {
      socket.off('getOnlineUsers');
    };
  }, [socket]);

  //sendMessage
  useEffect(() => {
    if (socket === null) return;
    const recipientId = currentChat?.members?.find((id) => id !== user?._id);
    socket.emit('sendMessage', {
      ...newMessage,
      recipientId,
    });
  }, [newMessage]);

  //receive message and notification
  useEffect(() => {
    if (socket === null) return;
    socket.on('getMessage', (res) => {
      if (currentChat?.id !== res.chatId) return;
      setNewMessage((prev) => [...prev, res]);
    });
    socket.on('getNotification', (res) => {
      const isChatOpen = currentChat?.members?.some(
        (id) => id === res.senderid
      );
      if (isChatOpen) {
        setNotifications((prev) => [
          {
            ...res,
            isRead: true,
            ...prev,
          },
        ]);
      } else {
        setNotifications((prev) => [
          {
            ...res,
            ...prev,
          },
        ]);
      }
    });
    return () => {
      socket.off('getMessage');
      socket.off('getNotification');
    };
  }, [socket, currentChat]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users/getusers`);
      if (response.error) {
        return console.log('Error fetching users', response);
      }
      const pChat = response.filter((u) => {
        let isChatCreated = false;
        if (!user || !u || user?._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }
        return !isChatCreated;
      });

      setPotentialChats(pChat);
    };
    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);
        const response = await getRequest(
          `${baseUrl}/chat/getuserchats/${user?._id}`
        );
        setIsUserChatsLoading(false);
        if (response.error) {
          return setUserChatsError(response.error);
        }
        setUserChats(response);
      }
    };
    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);
      const response = await getRequest(
        `${baseUrl}/message/getmessage/${currentChat?._id}`
      );
      setIsMessagesLoading(false);

      if (response.error) {
        return setMessagesError(response.error);
      }

      setMessages(response);
    };

    if (currentChat) {
      getMessages();
    }
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log('You must type something');
      console.log('Sending message with senderId:', sender?._id);

      const response = await postRequest(
        `${baseUrl}/message/createmessage`,
        JSON.stringify({
          text: textMessage,
          senderId: sender?._id,
          chatId: currentChatId, // Corrected the property name
        })
      );

      if (response.error) {
        return setSendTextMessageError(response);
      }

      setNewMessage(response);

      setMessages((prev) => {
        return [...prev, response];
      });

      setTextMessage('');
    },
    []
  );

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chat/createchat`,
      JSON.stringify({
        firstId,
        secondId,
      })
    );
    if (response.error) {
      return console.log('Error creating chat', response);
    }
    setUserChats((prev) => {
      return [...prev, response];
    });
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        currentChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendTextMessage,
        sendTextMessageError,
        newMessage,
        setNewMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
