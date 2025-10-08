import React, { useState } from 'react';
import ModuleContainer from '../components/ModuleContainer';
import { GoogleGenAI } from "@google/genai";

const HypothesisCard: React.FC<{ title: string; description: string; example: string; type: 'WHAT' | 'WHY'; }> = ({ title, description, example, type }) => {
    const color = type === 'WHAT' ? 'bg-indigo-100 dark:bg-indigo-900 border-indigo-500' : 'bg-teal-100 dark:bg-teal-900 border-teal-500';
    const textColor = type === 'WHAT' ? 'text-indigo-800 dark:text-indigo-200' : 'text-teal-800 dark:text-teal-200';
    
    return (
        <div className={`rounded-lg shadow p-6 border-l-4 ${color}`}>
            <h3 className={`text-xl font-bold ${textColor}`}>{title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">{description}</p>
            <div className="mt-4 bg-white dark:bg-gray-800 rounded p-3">
                <p className="font-semibold text-gray-600 dark:text-gray-400">範例：</p>
                <p className="italic text-gray-800 dark:text-gray-200">"{example}"</p>
            </div>
        </div>
    );
};

const InteractivePractice: React.FC = () => {
    const [whatHypothesis, setWhatHypothesis] = useState('');
    const [whyHypothesis, setWhyHypothesis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState('');

    const handleEvaluate = async () => {
        if (!whatHypothesis || !whyHypothesis) {
            setError('請同時填寫 WHAT 和 WHY 型假設。');
            return;
        }
        setIsLoading(true);
        setError('');
        setFeedback('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const prompt = `
                你是一位資深的數據分析導師。請根據以下情境和使用者提出的假設，提供有建設性的回饋。
                你的回饋應該專注於假設的清晰度、可衡量性和與問題的相關性。請以鼓勵的語氣，並提供具體的改進建議。請用繁體中文回答。

                **商業情境:**
                一家名為「CodeBrew Cafe」的連鎖咖啡店，在過去一季中，觀察到下午時段（下午2點至5點）的銷售額有明顯下滑。

                **使用者提出的假設:**
                - WHAT 型假設 (描述發生了什麼): "${whatHypothesis}"
                - WHY 型假設 (解釋為什麼發生): "${whyHypothesis}"

                **你的任務:**
                1.  評估 "WHAT" 型假設：這個描述是否清晰、具體？是否能從數據中直接觀察？
                2.  評估 "WHY" 型假設：這個解釋是否合理？它是否提出了一個可以被數據驗證的原因？
                3.  提供總結性建議：如何讓這兩個假設更具體、更可衡量，從而更容易進行下一步的數據分析？
            `;
            
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });

            setFeedback(response.text);

        } catch (err) {
            console.error(err);
            setError('AI 評估失敗，請稍後再試。');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">互動式假設練習：案例分析</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 space-y-6">
                <div>
                    <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200">背景情境</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        一家名為「CodeBrew Cafe」的連鎖咖啡店，在過去一季中，觀察到<strong className="text-blue-500 dark:text-blue-400">下午時段（下午2點至5點）的銷售額</strong>有明顯下滑。請根據這個情境，練習提出你的假設。
                    </p>
                </div>
                <div className="space-y-4">
                     <div>
                        <label htmlFor="what-hypothesis" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">WHAT 型假設 (描述性)</label>
                        <textarea 
                            id="what-hypothesis" 
                            rows={3} 
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="描述你認為「發生了什麼」現象。例如：下午時段的來客數減少了。"
                            value={whatHypothesis}
                            onChange={(e) => setWhatHypothesis(e.target.value)}
                        />
                    </div>
                     <div>
                        <label htmlFor="why-hypothesis" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">WHY 型假設 (解釋性)</label>
                        <textarea 
                            id="why-hypothesis" 
                            rows={3} 
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="解釋你認為「為什麼會發生」這個現象。例如：因為附近新開了一家競爭對手的飲料店。"
                            value={whyHypothesis}
                            onChange={(e) => setWhyHypothesis(e.target.value)}
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button
                        onClick={handleEvaluate}
                        disabled={isLoading}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-600"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                AI 正在分析...
                            </>
                        ) : '讓 AI 評估假設'}
                    </button>
                </div>
                {error && <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>}
                {feedback && (
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/50 rounded-lg border border-green-200 dark:border-green-800">
                        <h5 className="font-semibold text-green-800 dark:text-green-200">AI 導師建議</h5>
                        <p className="text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap">{feedback}</p>
                    </div>
                )}
            </div>
        </div>
    );
};


const DataThinking: React.FC = () => {
    return (
        <ModuleContainer title="數據思維與假設建立">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    數據分析的核心是提出假設並用數據來驗證它。一個好的假設能夠指引您的分析方向，並幫助您從數據中挖掘出有價值的洞見。假設通常分為兩種類型：WHAT型和WHY型。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <HypothesisCard 
                    type="WHAT"
                    title="WHAT型假設 (描述性)"
                    description="這類假設旨在描述「發生了什麼」。它關注的是現象、趨勢或模式的識別，通常是數據分析的第一步。"
                    example="下午時段，顧客的平均消費金額（客單價）比上午時段低 15%。"
                />
                <HypothesisCard
                    type="WHY"
                    title="WHY型假設 (解釋性)"
                    description="這類假設旨在解釋「為什麼會發生」。它試圖找出導致某一現象的原因或變量之間的因果關係，通常需要更深入的分析。"
                    example="下午時段的顧客主要是學生，他們傾向於購買價格較低的飲品，而非高單價的咖啡豆或周邊商品。"
                />
            </div>
            
            <div>
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">驗證流程</h3>
                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                    <ol className="relative border-l border-gray-200 dark:border-gray-700">                  
                        <li className="mb-10 ml-4">
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">1. 提出假設</h3>
                            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">根據業務問題，提出一個清晰、可被驗證的假設。</p>
                        </li>
                        <li className="mb-10 ml-4">
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">2. 收集數據</h3>
                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">收集與假設相關的數據，確保數據的準確性和完整性。</p>
                        </li>
                        <li className="mb-10 ml-4">
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">3. 分析數據</h3>
                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">使用適當的統計方法和視覺化工具進行分析。</p>
                        </li>
                         <li className="ml-4">
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">4. 得出結論</h3>
                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">根據分析結果，判斷假設是否成立，並解釋其商業意義。</p>
                        </li>
                    </ol>
                 </div>
            </div>
            
            <InteractivePractice />

        </ModuleContainer>
    );
};

export default DataThinking;