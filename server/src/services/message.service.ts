import messageSchema from '../models/message.model'

export const createMessage = async (chatId: string, senderId: string, text: string) => {
    try {
        const newMessage = new messageSchema({ chatId, senderId, text })
        await newMessage.save()
        return newMessage
    } catch (error) {
        throw error
    }
}
export const getMessage = async (chatId : string) => {
    try {
        const result = await messageSchema.find({ chatId });
        return result
    } catch (error) {
        throw error
    }
} 