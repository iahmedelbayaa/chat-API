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

//mongo Hint//
//The $all operator selects the documents where the value of a field is an array that contains all the specified elements.
//The $in operator selects the documents where the value of a field equals any value in the specified array.
export const getUserChats = async (userId: string) => {
    try {
        const result = await Chat.find({ members: { $in: [userId] } });
        return result;
    } catch (error) {
        throw ApiError.from(error);
    }
};


export const findChat = async (firstId: string, secondId: string) => {
    try {
        const result = await Chat.findOne({ members: { $all: [firstId, secondId] }, });
        return result;
    } catch (error) {
        throw ApiError.from(error);
    }
};