import apiClient from './api';
import axios from "axios";
const chatService = {
    getAllMessage: async (data) => {
        try {
            const response = await apiClient.post('/chatbot/conversation-thread', data)
            console.log(response.data)
            return response.data
        } catch (error) {

        }
    },
    sendMessage: async (data) => {
        try {
            const response = await apiClient.post('/chatbot-conversations', data)
            console.log(response)
            return response.data
        } catch (error) {
            return error
        }
    },
    test: async () => {
        try {
            const response = await apiClient.get('/test')
            return response.data
        } catch (error) {
            return error
        }
    },
    chatAI: async (question) => {
        try {
            const response = await axios.post('http://localhost:9000/chat',
                { question },
                { timeout: 600000 });
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
