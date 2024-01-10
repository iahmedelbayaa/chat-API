import chatSchema from '../models/chat.model'
import ApiError from '../utils/api-error';
const Chat = chatSchema;

export const createChat = async (firstId: string, secondId: string) => {
    try {
        const chat = await Chat.findOne({ members: { $all: [firstId, secondId] }, })
        if (chat) {
            return chat;
        }
        const newChat = new Chat({ members: [firstId, secondId] });
        await newChat.save();
        return newChat;
    } catch (error) {
        throw ApiError.from(error);
    }
    
};

//getUserChats
export const getUserChats = async (userId: string) => {
    try {
        const result = await Chat.find({ members: { $in: [userId] } });
        return result;
    } catch (error) {
        throw ApiError.from(error);
    }
};


//findChat
export const findChat = async (firstId: string, secondId: string) => {
    try {
        const result = await Chat.findOne({ members: { $all: [firstId, secondId] }, });
        return result;
    } catch (error) {
        throw ApiError.from(error);
    }
};