
import React from 'react';
import ModuleContainer from '../components/ModuleContainer';

const Card: React.FC<{ title: string, description: string, icon: string }> = ({ title, description, icon }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-start space-x-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
        <div className="text-3xl flex-shrink-0 w-8 text-center">{icon}</div>
        <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{description}</p>
        </div>
    </div>
);

const Introduction: React.FC = () => {
    return (
        <ModuleContainer title="歡迎來到數據分析學習平台">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    歡迎來到新版互動式數據分析學習平台！本平台旨在通過一個結構化的六階段學習路徑，幫助您掌握從基礎到進階的數據分析核心技能。我們將理論與實踐相結合，讓您在互動和模擬中建立堅實的知識體系。
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="結構化學習" description="課程內容被精心劃分為六個部分，從基礎概念到專業技能，循序漸進，助您建立完整的知識體系。" icon="📚" />
                <Card title="互動式體驗" description="透過可調參數的圖表、模擬器和 AI 互動，親手操作來加深理解，而不僅僅是閱讀。" icon="🕹️" />
                <Card title="實戰導向" description="我們加入了 Excel 數據透視表、商業案例分析等實用模組，助您將理論應用於實際工作。" icon="🛠️" />
            </div>

            <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">學習路徑總覽</h3>
                <div className="space-y-6">
                    <PathPart index={1} title="第一部分：數據分析基礎" description="建立數據驅動的思維模式，並掌握統計學的核心概念。" />
                    <PathPart index={2} title="第二部分：核心分析技術" description="學習業界最常用的分析工具和方法，包括視覺化、迴歸分析和 Excel。" />
                    <PathPart index={3} title="第三部分：進階應用與案例" description="探索資料探勘的商業應用，並通過真實案例和 AI 工具鞏固您的綜合分析能力。" />
                    <PathPart index={4} title="第四部分：機器學習入門" description="踏入機器學習的世界，了解其核心概念，並透過分類與分群模型的實戰，掌握預測未來的能力。" />
                    <PathPart index={5} title="第五部分：大數據與雲端技術" description="了解大數據的 4V 特性，學習現代雲端資料倉儲架構，並掌握建構高效資料管道 (ETL) 的關鍵技術。" />
                    <PathPart index={6} title="第六部分：專業技能與總結" description="將您的分析技能轉化為影響力。學習數據故事力、打造專業作品集，並透過畢業專案完整演練，為您的職涯做好準備。" />
                </div>
            </div>
        </ModuleContainer>
    );
};

const PathPart: React.FC<{ index: number; title: string; description: string }> = ({ index, title, description }) => (
    <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl ring-4 ring-blue-500/20">
            {index}
        </div>
        <div>
            <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{title}</h4>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{description}</p>
        </div>
    </div>
);

export default Introduction;
