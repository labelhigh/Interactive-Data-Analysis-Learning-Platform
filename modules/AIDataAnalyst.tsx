
import React, { useState, useRef, useEffect } from 'react';
import ModuleContainer from '../components/ModuleContainer';
import { GoogleGenAI } from "@google/genai";

const sampleData = [
  { date: '2023-10-01', product: '咖啡', category: '飲品', sales: 150, region: '北部' },
  { date: '2023-10-01', product: '蛋糕', category: '食品', sales: 80, region: '北部' },
  { date: '2023-10-02', product: '咖啡', category: '飲品', sales: 180, region: '南部' },
  { date: '2023-10-02', product: '三明治', category: '食品', sales: 120, region: '中部' },
  { date: '2023-10-03', product: '茶', category: '飲品', sales: 90, region: '北部' },
  { date: '2023-10-03', product: '咖啡', category: '飲品', sales: 220, region: '中部' },
  { date: '2023-10-04', product: '蛋糕', category: '食品', sales: 110, region: '南部' },
  { date: '2023-10-04', product: '咖啡', category: '飲品', sales: 160, region: '北部' },
];

const sampleDataCSV = `date,product,category,sales,region
${sampleData.map(d => `${d.date},${d.product},${d.category},${d.sales},${d.region}`).join('\n')}`;

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const AIDataAnalyst: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(scrollToBottom, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const prompt = `
                你是一位專業的數據分析師。請根據以下 CSV 格式的銷售數據來回答使用者的問題。
                你的回答應該簡潔、專業，並直接針對問題。如果問題無法從數據中回答，請禮貌地說明。請用繁體中文回答。

                數據:
                \`\`\`csv
                ${sampleDataCSV}
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
        <ModuleContainer title="AI 數據分析師">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    歡迎與 AI 數據分析師互動！這裡有一份咖啡店的簡化銷售數據。您可以像與真人分析師對話一樣，用自然語言對數據提出問題，AI 將會為您分析並提供答案。
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <strong>試試問：</strong>「總銷售額是多少？」、「哪個產品最暢銷？」或「北部地區的銷售額佔比多少？」
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
                <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">樣本數據</h3>
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-4 py-2">日期</th>
                                    <th className="px-4 py-2">產品</th>
                                    <th className="px-4 py-2">類別</th>
                                    <th className="px-4 py-2">銷售額</th>
                                    <th className="px-4 py-2">地區</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sampleData.map((row, i) => (
                                    <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-4 py-2">{row.date}</td>
                                        <td className="px-4 py-2">{row.product}</td>
                                        <td className="px-4 py-2">{row.category}</td>
                                        <td className="px-4 py-2">{row.sales}</td>
                                        <td className="px-4 py-2">{row.region}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="lg:col-span-3">
                     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col h-[60vh]">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                           <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center">與 AI 分析師對話</h3>
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
                                    placeholder="在這裡輸入您的問題..."
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

export default AIDataAnalyst;
