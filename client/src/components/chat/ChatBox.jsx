// ChatBox.jsx
import moment from 'moment';
import InputEmoji from 'react-input-emoji';
import { useContext, useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { ChatContext } from '../../context/ChatContext';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';

const ChatBox = () => {
  const { currentChat, isMessagesLoading, messages, user ,sendTextMessage} =
    useContext(ChatContext);
  const {
    recipientUser,
    loading: recipientLoading,
    error: recipientError,
  } = useFetchRecipientUser(currentChat);
  const [textMessage , setTextMessage] = useState("")
console.log("text", textMessage)
  useEffect(() => {
    // Perform any additional actions when currentChat or recipientUser changes
  }, [currentChat, recipientUser]);

  if (isMessagesLoading || recipientLoading) {
    return (
      <p style={{ textAlign: 'center', width: '100%' }}>Loading Chat ...</p>
    );
  }

  if (recipientError) {
    return (
      <p style={{ textAlign: 'center', width: '100%', color: 'red' }}>
        Error loading recipient user: {recipientError}
      </p>
    );
  }

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name || 'No Name Available'}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages &&
          messages.map((message, index) => (
            <Stack
              key={index}
              className={`message ${
                message?.senderId === user?._id
                  ? 'self align-self-end flex-grow-0'
                  : 'align-self-start flex-grow-0'
              }`}
            >
              <span>{message.text}</span>
              <span className="message-footer">
                {moment(message.createdAt).calendar()}
              </span>
            </Stack>
          ))}
      </Stack>
      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="rgba(72,112,223,0.2)"
        />
        <button className="send-btn" onClick={()=> sendTextMessage(textMessage, user , currentChat?._id , setTextMessage)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send"
            viewBox="0 0 16 16"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
          </svg>
        </button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
