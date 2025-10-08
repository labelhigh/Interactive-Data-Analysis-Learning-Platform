import React, { useState } from 'react';
import ModuleContainer from '../components/ModuleContainer';
import { BulbIcon, UsersGroupIcon, FileAnalyticsIcon, MessageCircleIcon, ChartBarIcon, PresentationChartLineIcon } from '../components/icons';

const StoryElementCard: React.FC<{ title: string; description: string; Icon: React.FC<{ className?: string }> }> = ({ title, description, Icon }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-3">
            <Icon className="w-8 h-8 text-blue-500 mr-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
);

const availableCharts = [
    { id: 'trend', title: '銷售額趨勢圖', Icon: PresentationChartLineIcon, description: '顯示了過去12個月的銷售額變化。' },
    { id: 'region', title: '各地區銷售佔比', Icon: ChartBarIcon, description: '比較了北部、中部、南部的銷售額貢獻。' },
    { id: 'feedback', title: '客戶回饋文字雲', Icon: MessageCircleIcon, description: '展示了客戶意見中最常出現的關鍵詞。' },
];

type StorySlot = 'context' | 'finding' | 'action';
type Chart = typeof availableCharts[0];

const StoryBuilder: React.FC = () => {
    const [storySlots, setStorySlots] = useState<Record<StorySlot, { chart: Chart | null; title: string }>>({
        context: { chart: null, title: '' },
        finding: { chart: null, title: '' },
        action: { chart: null, title: '' },
    });
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, slot: StorySlot) => {
        e.preventDefault();
        const chartId = e.dataTransfer.getData('chartId');
        const chart = availableCharts.find(c => c.id === chartId);
        if (chart) {
            setStorySlots(prev => ({
                ...prev,
                [slot]: { ...prev[slot], chart: chart },
            }));
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, chartId: string) => {
        e.dataTransfer.setData('chartId', chartId);
    };
    
    const handleTitleChange = (slot: StorySlot, title: string) => {
        setStorySlots(prev => ({
            ...prev,
            [slot]: { ...prev[slot], title: title },
        }));
    };

    const isComplete = storySlots.context.chart && storySlots.finding.chart && storySlots.action.chart &&
                       storySlots.context.title && storySlots.finding.title && storySlots.action.title;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">互動練習：故事產生器</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>情境：</strong>您是數據分析師，需要向管理層報告「上一季銷售額下降」的問題。請從下方的「圖表證據庫」中，將合適的圖表拖曳到右側的故事框架中，並為每個環節下一個簡潔的標題，來建構您的數據故事。
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">圖表證據庫</h4>
                    {availableCharts.map(chart => (
                        <div key={chart.id} draggable onDragStart={(e) => handleDragStart(e, chart.id)}
                            className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex items-center space-x-3 cursor-grab active:cursor-grabbing border border-dashed dark:border-gray-600">
                            <chart.Icon className="w-6 h-6 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{chart.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-300">{chart.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="lg:col-span-2 space-y-4">
                     <StorySlotComponent title="1. 情境 (Context)" slotKey="context" data={storySlots.context} onDrop={handleDrop} onTitleChange={handleTitleChange} placeholder="拖曳圖表到此處設定故事背景" />
                     <StorySlotComponent title="2. 發現 (Finding)" slotKey="finding" data={storySlots.finding} onDrop={handleDrop} onTitleChange={handleTitleChange} placeholder="拖曳圖表到此處呈現關鍵發現" />
                     <StorySlotComponent title="3. 行動 (Action)" slotKey="action" data={storySlots.action} onDrop={handleDrop} onTitleChange={handleTitleChange} placeholder="拖曳圖表到此處支撐行動建議" />
                     {isComplete && (
                         <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center text-green-800 dark:text-green-200 font-semibold animate-fade-in">
                             🎉 恭喜！您成功建構了一個完整的數據故事！
                         </div>
                     )}
                </div>
            </div>
        </div>
    );
};

const StorySlotComponent: React.FC<{
    title: string;
    slotKey: StorySlot;
    data: { chart: Chart | null; title: string };
    onDrop: (e: React.DragEvent<HTMLDivElement>, slot: StorySlot) => void;
    onTitleChange: (slot: StorySlot, title: string) => void;
    placeholder: string;
}> = ({ title, slotKey, data, onDrop, onTitleChange, placeholder }) => (
    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
        <h5 className="font-bold text-gray-800 dark:text-white mb-2">{title}</h5>
        <input 
            type="text" 
            placeholder="為此環節下個標題..."
            value={data.title}
            onChange={(e) => onTitleChange(slotKey, e.target.value)}
            className="w-full p-2 mb-2 text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <div 
            onDrop={(e) => onDrop(e, slotKey)} 
            onDragOver={(e) => e.preventDefault()}
            className="h-24 bg-white dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-center text-sm text-gray-500 dark:text-gray-400 p-2"
        >
            {data.chart ? (
                 <div className="flex items-center space-x-2">
                    <data.chart.Icon className="w-5 h-5 text-blue-500"/>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{data.chart.title}</span>
                 </div>
            ) : placeholder}
        </div>
    </div>
);


const DataStorytelling: React.FC = () => {
    return (
        <ModuleContainer title="數據故事力">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    數據分析的最終價值在於溝通。數據故事力是將複雜的分析結果，轉化為一個清晰、有說服力、能驅動決策者行動的敘事能力。它不僅是呈現圖表，更是結合數據、視覺化和敘事來傳遞核心洞見的藝術。
                </p>
            </div>
             <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">一個好故事的三大元素</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <StoryElementCard title="情境與背景 (Context)" Icon={UsersGroupIcon} description="為您的聽眾設定舞台。解釋您分析的業務問題是什麼，為什麼它很重要。讓聽眾理解故事的起點。" />
                    <StoryElementCard title="關鍵發現 (The Finding)" Icon={BulbIcon} description="這是故事的核心。呈現您從數據中挖掘出的最重要、最令人驚訝的洞見。用視覺化的方式展示「啊哈！」時刻。" />
                    <StoryElementCard title="行動呼籲 (Call to Action)" Icon={FileAnalyticsIcon} description="故事的結尾。根據您的發現，明確提出接下來應該採取的具體步驟或建議。回答「所以，我們該怎麼做？」" />
                </div>
            </div>
            <div className="mt-8">
                <StoryBuilder />
            </div>
        </ModuleContainer>
    );
};

export default DataStorytelling;