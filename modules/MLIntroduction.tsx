
import React from 'react';
import ModuleContainer from '../components/ModuleContainer';
import { BeakerIcon, EyeIcon, PuzzlePieceIcon, CpuChipIcon, MagnifyingGlassIcon, PresentationChartLineIcon, RocketLaunchIcon, BuildingOfficeIcon, UsersIcon } from '../components/icons';

const ConceptCard: React.FC<{ title: string, description: string, Icon: React.FC<{className?: string}>, children?: React.ReactNode }> = ({ title, description, Icon, children }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow flex flex-col">
        <div className="flex items-center mb-3">
            <Icon className="w-8 h-8 text-blue-500 mr-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 flex-grow">{description}</p>
        {children && <div className="mt-4">{children}</div>}
    </div>
);

const ExampleCase: React.FC<{ title: string, description: string, Icon: React.FC<{className?: string}> }> = ({ title, description, Icon }) => (
     <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex items-start space-x-3">
        <Icon className="w-6 h-6 text-gray-500 dark:text-gray-400 flex-shrink-0 mt-1" />
        <div>
            <p className="font-semibold text-gray-700 dark:text-gray-200">{title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 italic">{description}</p>
        </div>
    </div>
);


const WorkflowStep: React.FC<{ step: number; title: string; description: string; Icon: React.FC<{className?: string}>; isLast?: boolean }> = ({ step, title, description, Icon, isLast }) => (
    <div className="relative flex items-start">
        <div className="flex-shrink-0 flex flex-col items-center mr-4">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg ring-4 ring-blue-500/20">
                <Icon className="w-6 h-6" />
            </div>
            {!isLast && <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600 mt-2"></div>}
        </div>
        <div>
            <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{step}. {title}</h4>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{description}</p>
        </div>
    </div>
);


const MLIntroduction: React.FC = () => {
    return (
        <ModuleContainer title="機器學習概論">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    機器學習 (Machine Learning, ML) 是人工智慧的一個分支，其核心思想是讓電腦從數據中「學習」並自動改進，而不需要進行明確的程式設計。就像人類從經驗中學習一樣，機器學習模型從數據中尋找模式，並利用這些模式來做出預測或決策。
                </p>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">機器學習的三種類型</h3>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                    <ConceptCard 
                        title="監督式學習" 
                        Icon={BeakerIcon}
                        description="提供帶有「正確答案」的標籤數據給模型學習。模型的工作是學習輸入與輸出之間的對應關係。這是最常見的機器學習類型，可進一步分為兩大任務：迴歸和分類。"
                    >
                        <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                            <ExampleCase 
                                Icon={BuildingOfficeIcon}
                                title="迴歸 (Regression): 預測連續數值"
                                description="例如：根據房屋的坪數、地點、屋齡等特徵，預測其市場價格。"
                            />
                             <ExampleCase 
                                Icon={UsersIcon}
                                title="分類 (Classification): 預測離散類別"
                                description="例如：根據鐵達尼號乘客的年齡、性別、艙等等特徵，預測其是否生還。"
                            />
                        </div>
                    </ConceptCard>
                    <div className="space-y-6">
                        <ConceptCard 
                            title="非監督式學習" 
                            Icon={EyeIcon}
                            description="提供沒有標籤的數據給模型，讓模型自己從數據中發現隱藏的結構或模式。"
                        >
                            <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                                <ExampleCase
                                    Icon={UsersIcon}
                                    title="分群 (Clustering)"
                                    description="將網站的用戶根據他們的瀏覽行為自動分成不同群體，以進行個人化推薦。"
                                />
                            </div>
                        </ConceptCard>
                        <ConceptCard 
                            title="強化學習"
                            Icon={RocketLaunchIcon}
                            description="模型（代理人）在一個環境中行動，透過「獎勵」或「懲罰」來學習如何達成特定目標。"
                        >
                            <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                                <ExampleCase
                                    Icon={CpuChipIcon}
                                    title="策略學習"
                                    description="訓練一個 AI 來玩棋盤遊戲，透過贏棋（獎勵）和輸棋（懲罰）來學習最佳策略。"
                                />
                            </div>
                        </ConceptCard>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">典型的機器學習工作流程</h3>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 border border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                        <WorkflowStep 
                            step={1} 
                            title="定義問題與收集數據" 
                            Icon={MagnifyingGlassIcon}
                            description="明確分析目標，並收集相關的原始數據。這是所有工作的起點。"
                        />
                        <WorkflowStep 
                            step={2} 
                            title="數據清理與預處理" 
                            Icon={PuzzlePieceIcon}
                            description="處理缺失值、異常值，並將數據轉換為適合模型使用的格式。"
                        />
                        <WorkflowStep 
                            step={3} 
                            title="模型選擇與訓練" 
                            Icon={CpuChipIcon}
                            description="根據問題類型選擇合適的演算法，並將處理好的數據餵給模型進行學習。"
                        />
                        <WorkflowStep 
                            step={4} 
                            title="模型評估" 
                            Icon={PresentationChartLineIcon}
                            description="使用測試數據來評估模型的表現，確保其預測的準確性和可靠性。"
                        />
                         <WorkflowStep 
                            step={5} 
                            title="模型部署與監控" 
                            Icon={RocketLaunchIcon}
                            isLast
                            description="將訓練好的模型部署到實際應用中，並持續監控其表現，根據新數據進行調整。"
                        />
                    </div>
                </div>
            </div>
        </ModuleContainer>
    );
};

export default MLIntroduction;
