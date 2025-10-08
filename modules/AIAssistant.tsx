import React, { useState, useRef, useEffect } from 'react';
import ModuleContainer from '../components/ModuleContainer';
import { GoogleGenAI } from "@google/genai";

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const AIAssistant: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [csvData, setCsvData] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(scrollToBottom, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        if (!csvData.trim()) {
            setError('請先在左側的文字區域貼上您的 CSV 格式數據。');
            return;
        }

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const prompt = `
                你是一位專業的數據分析師。請根據使用者提供的以下 CSV 格式的數據來回答問題。
                你的回答應該簡潔、專業，並直接針對問題。如果問題無法從數據中回答，請禮貌地說明。請用繁體中文回答。

                使用者提供的數據:
                \`\`\`csv
                ${csvData}
                \`\`\`

                使用者的問題: "${input}"
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            
            const aiMessage: Message = { sender: 'ai', text: response.text };
            setMessages(prev => [...prev, aiMessage]);

        } catch (err) {
            console.error(err);
            setError('與 AI 的通訊發生錯誤，請稍後再試。');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ModuleContainer title="通用 AI 數據助手">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    這是一個強大的工具，能讓您分析自己的數據！請在左側的輸入框中貼上您的 CSV 格式數據，然後就可以在右側的對話框中，用自然語言向 AI 提問。
                </p>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <strong>提示：</strong>請確保您的 CSV 數據包含標頭 (header)，這有助於 AI 更準確地理解您的數據。
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
                <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">貼上您的數據 (CSV)</h3>
                    <textarea 
                        value={csvData}
                        onChange={(e) => setCsvData(e.target.value)}
                        placeholder="在此貼上您的 CSV 數據...&#10;例如:&#10;name,age,city&#10;愛麗絲,30,台北&#10;鮑伯,25,高雄"
                        className="w-full h-[55vh] p-2.5 text-sm font-mono text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                </div>

                <div className="lg:col-span-3">
                     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col h-[60vh]">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                           <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center">與 AI 助手對話</h3>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto space-y-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                    {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">AI</div>}
                                    <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                     {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold flex-shrink-0">您</div>}
                                </div>
                            ))}
                             {isLoading && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">AI</div>
                                    <div className="max-w-md p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75"></div>
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                            <div ref={chatEndRef} />
                        </div>
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    placeholder="針對您的數據提問..."
                                    className="flex-1 p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    disabled={isLoading}
                                />
                                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-gray-400" disabled={isLoading}>
                                    發送
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ModuleContainer>
    );
};

export default AIAssistant;