import apiClient from './api';

const chatService = {
    getAllMessage : async(data) => {
        try {
            const response = await apiClient.post('/chatbot/conversation-thread',data)
            console.log(response.data)
            return response.data
        } catch (error) {
            
        }
    },
    sendMessage : async(data) => {
        try {
            const response = await apiClient.post('/chatbot-conversations',data)
            return response.data
        } catch (error) {
            return error
        }   
    },
    test : async () => {
        try {
                    const response = await apiClient.get('/test')
                    return response.data
                } catch (error) {
                    return error
                }
    }
    // sendMessageAi : async(data) => {
    //     try {
    //         const response = await apiClient.post('/chatbot-conversations/ai',data)
    //         return response.data
    //     } catch (error) {
    //         return error
    //     }   
    // }
}
export default chatService
