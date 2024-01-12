import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';

const UserChat = ({chat, user}) => {
    const { recipientUser } = useFetchRecipientUser(chat, user);
  return <>UserChat</>;
};

export default UserChat;
