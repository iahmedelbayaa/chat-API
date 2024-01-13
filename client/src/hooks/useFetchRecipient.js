// useFetchRecipient.jsx

import { useEffect, useState } from 'react';
import { baseUrl, getRequest } from '../utils/services';

export const useFetchRecipientUser = (chat) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipientId = () => {
      if (!chat) {
        setLoading(false);
        return null;
      }

      const recipientId = chat.members[1]; // Assuming the second member is the recipient
      return recipientId;
    };

    const getUser = async () => {
      const recipientId = getRecipientId();

      if (!recipientId) {
        setLoading(false);
        setRecipientUser(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await getRequest(
          `${baseUrl}/users/find/${recipientId}`
        );

        if (response.error) {
          setError(response.error);
        } else {
          setRecipientUser(response);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [chat]);

  // No more console logs in this file

  return { recipientUser, loading, error };
};
