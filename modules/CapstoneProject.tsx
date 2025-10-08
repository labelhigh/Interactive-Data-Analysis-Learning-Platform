import React, { useState } from 'react';
import ModuleContainer from '../components/ModuleContainer';
import { ShoppingCartIcon, MagnifyingGlassIcon, FilterIcon, RobotIcon, BulbIcon } from '../components/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const churnData = [
  { segment: '新客戶 (0-3月)', churnRate: 0.35 },
  { segment: '成長客戶 (4-12月)', churnRate: 0.15 },
  { segment: '忠誠客戶 (12月+)', churnRate: 0.05 },
  { segment: '未使用App客戶', churnRate: 0.45 },
  { segment: '使用App客戶', churnRate: 0.10 },
];

// FIX: Replaced the faulty and unused `handleToggle` function with a new implementation
// that uses an `isPreviousComplete` prop to correctly manage the accordion state.
const Step: React.FC<{
    step: number;
    title: string;
    Icon: React.FC<{ className?: string }>;
    children: React.ReactNode;
    isComplete: boolean;
    onComplete: () => void;
    isPreviousComplete: boolean;
}> = ({ step, title, Icon, children, isComplete, onComplete, isPreviousComplete }) => {
    const [isOpen, setIsOpen] = useState(step === 1);

    const canBeOpened = step === 1 || isPreviousComplete;

    const handleToggle = () => {
        if (canBeOpened) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-all ${isComplete ? 'border-l-4 border-green-500' : ''}`}>
            <div className={`flex items-center justify-between ${canBeOpened ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={handleToggle}>
                <div className="flex items-center">
                    <div className={`flex-shrink-0 w-10 h-10 ${isComplete ? 'bg-green-500' : canBeOpened ? 'bg-blue-500' : 'bg-gray-400'} text-white rounded-full flex items-center justify-center font-bold text-lg mr-4`}>
                        {isComplete ? '✓' : step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
                </div>
                 <Icon className="w-8 h-8 text-gray-400" />
            </div>
            {isOpen && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
                    {children}
                </div>
            )}
        </div>
    );
};

const CapstoneProject: React.FC = () => {
    const [completions, setCompletions] = useState<Record<number, boolean>>({ 1: false, 2: false, 3: false, 4: false });
    const [filteredSegment, setFilteredSegment] = useState<string | null>(null);
    const [recommendation, setRecommendation] = useState('');

    const markAsComplete = (step: number) => {
        setCompletions(prev => ({ ...prev, [step]: true }));
    };

    const handleFilterClick = (segment: string) => {
        setFilteredSegment(segment);
        markAsComplete(2);
    };
    
    const handleRecommendationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRecommendation(e.target.value);
        if (e.target.value.length > 20) {
            markAsComplete(4);
        }
    };
    
    return (
        <ModuleContainer title="畢業專案：電商客戶流失分析">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    恭喜您來到最後一關！現在，您將化身為一家名為 "E-Shopify" 的電商公司的數據分析師。您的任務是分析客戶數據，找出流失的關鍵原因，並提出具體的解決方案。請依序完成以下四個步驟，將您的所學融會貫通。
                </p>
            </div>
            <div className="space-y-6 mt-8">
                <Step step={1} title="情境理解" Icon={ShoppingCartIcon} isComplete={true} onComplete={() => {}} isPreviousComplete={true}>
                    <p className="text-gray-600 dark:text-gray-300">
                        <strong>商業背景：</strong>"E-Shopify" 近期發現，儘管新用戶持續增長，但整體的月活躍用戶數卻停滯不前。管理層懷疑是客戶流失率 (Churn Rate) 上升所致。
                        <br/>
                        <strong>您的任務：</strong>分析數據儀表板，找出流失率最高的客戶群體，並根據機器學習模型的洞察，提出挽留客戶的行動建議。
                    </p>
                </Step>

                <Step step={2} title="數據探索" Icon={FilterIcon} isComplete={completions[2]} onComplete={() => {}} isPreviousComplete={true}>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                       下方的圖表展示了不同客戶群體的流失率。請點擊下方的按鈕進行篩選，找出哪一個群體的流失率最高。
                    </p>
                    <div className="h-72 w-full bg-gray-50 dark:bg-gray-900 p-2 rounded-lg">
                         <ResponsiveContainer>
                            <BarChart data={churnData.filter(d => !filteredSegment || d.segment === filteredSegment || (filteredSegment === ' tenure' && ['新客戶', '成長客戶', '忠誠客戶'].some(s => d.segment.includes(s))) || (filteredSegment === 'app' && ['使用App', '未使用App'].some(s => d.segment.includes(s))))}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="segment" />
                                <YAxis domain={[0, 0.5]} tickFormatter={(tick) => `${tick * 100}%`} />
                                <Tooltip formatter={(value: number) => `${(value * 100).toFixed(0)}%`} />
                                <Bar dataKey="churnRate" name="流失率" fill="#ef4444" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                     <div className="flex justify-center space-x-2 mt-4">
                        <button onClick={() => handleFilterClick('未使用App客戶')} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">篩選 "未使用App客戶"</button>
                        <button onClick={() => handleFilterClick('新客戶 (0-3月)')} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">篩選 "新客戶"</button>
                    </div>
                    {completions[2] && (
                         <p className="text-center mt-4 text-green-600 dark:text-green-400 font-semibold">
                            分析完成！您發現了「未使用App的客戶」流失率高達45%，這是最高的群體。
                         </p>
                    )}
                </Step>

                <Step step={3} title="模型洞察" Icon={RobotIcon} isComplete={completions[2]} onComplete={() => {}} isPreviousComplete={completions[2]}>
                     <p className="text-gray-600 dark:text-gray-300 mb-4">
                        我們的工程團隊已經建立了一個機器學習模型來預測個別用戶的流失機率。根據您在<strong>步驟2</strong>的發現，我們將一個典型的「未使用App的新客戶」資料輸入模型，結果如下：
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/50 p-6 rounded-lg text-center border border-blue-200 dark:border-blue-800">
                        <p className="text-gray-600 dark:text-blue-200">客戶畫像：註冊2個月、未使用App、消費金額偏低</p>
                        <p className="text-5xl font-extrabold text-red-500 my-2">85%</p>
                        <p className="font-semibold text-lg text-blue-800 dark:text-blue-300">預測流失機率</p>
                    </div>
                </Step>

                <Step step={4} title="提出建議" Icon={BulbIcon} isComplete={completions[4]} onComplete={() => {}} isPreviousComplete={completions[2]}>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        綜合以上所有發現，請在下方提出您的具體行動建議（至少20字）。您的建議應該專注於如何降低「未使用App的新客戶」這個高風險群體的流失率。
                    </p>
                    <textarea 
                        value={recommendation}
                        onChange={handleRecommendationChange}
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="例如：我建議... 1. 針對新用戶設計App下載的引導和獎勵機制... 2. ..."
                    />
                </Step>

                {completions[4] && (
                     <div className="p-6 bg-green-100 dark:bg-green-900 rounded-lg text-center text-green-800 dark:text-green-200 font-bold animate-fade-in">
                         <h3 className="text-2xl">🎉 恭喜您，完成了畢業專案！🎉</h3>
                         <p className="font-normal mt-2">您已成功地將數據分析技能應用於解決真實的商業問題。這份完整的分析思路就是您未來求職時最有力的武器！</p>
                     </div>
                )}
            </div>
        </ModuleContainer>
    );
};

export default CapstoneProject;