// ChatBox.jsx

import { useContext, useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { ChatContext } from '../../context/ChatContext';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';

const ChatBox = () => {
  const { currentChat, isMessagesLoading } = useContext(ChatContext);
  const {
    recipientUser,
    loading: recipientLoading,
    error: recipientError,
  } = useFetchRecipientUser(currentChat);

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
      {/* Render your chat messages here using the 'messages' state */}
    </Stack>
  );
};

export default ChatBox;
