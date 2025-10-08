
import React from 'react';
import ModuleContainer from '../components/ModuleContainer';
import { DatabaseIcon, SpeedometerIcon, ShapesIcon, ShieldCheckIcon, ServerStackIcon, CircleStackIcon } from '../components/icons';

const VCard: React.FC<{ title: string; subtitle: string; description: string; Icon: React.FC<{ className?: string }> }> = ({ title, subtitle, description, Icon }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
        <div className="flex items-center mb-3">
            <Icon className="w-10 h-10 text-blue-500 mr-4" />
            <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{subtitle}</p>
            </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
);

const ArchitectureCard: React.FC<{ title: string; description: string; Icon: React.FC<{ className?: string }>; children: React.ReactNode }> = ({ title, description, Icon, children }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-4">
            <Icon className="w-8 h-8 text-blue-500 mr-3" />
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h4>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
            {children}
        </div>
    </div>
);

const BigDataIntroduction: React.FC = () => {
    return (
        <ModuleContainer title="大數據概論">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    大數據（Big Data）不僅僅是指「很多資料」，它描述的是那些因規模龐大、產生速度快、種類繁多，而難以用傳統數據處理工具捕捉、管理和分析的數據集。理解大數據的特性是進入現代數據科學領域的基礎。
                </p>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">大數據的 4V 特性</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <VCard
                        title="Volume"
                        subtitle="資料量"
                        Icon={DatabaseIcon}
                        description="數據的規模極其龐大，從 TB（Terabytes）到 PB（Petabytes）甚至 ZB（Zettabytes）級別。例如，社群媒體每天產生的用戶貼文和互動數據。"
                    />
                    <VCard
                        title="Velocity"
                        subtitle="速度"
                        Icon={SpeedometerIcon}
                        description="數據產生和需要處理的速度非常快，常常是即時或近即時的。例如，金融交易數據、物聯網（IoT）設備傳感器回傳的數據流。"
                    />
                    <VCard
                        title="Variety"
                        subtitle="多樣性"
                        Icon={ShapesIcon}
                        description="數據類型五花八門，不僅有傳統的結構化數據（如表格），還包括半結構化（如 JSON、XML）和非結構化數據（如文字、圖片、影片、音檔）。"
                    />
                    <VCard
                        title="Veracity"
                        subtitle="真實性"
                        Icon={ShieldCheckIcon}
                        description="指數據的品質和可信度。由於數據來源多樣，其中可能包含不確定、不精確或矛盾的數據，確保數據的真實性是一大挑戰。"
                    />
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">處理架構的演進</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <ArchitectureCard
                        title="傳統數據處理"
                        Icon={ServerStackIcon}
                        description="在單一、強大的伺服器上進行集中式處理。這種方式在數據量超過伺服器負荷時會遇到瓶頸（垂直擴展）。"
                    >
                        <div className="flex flex-col items-center text-center">
                             <ServerStackIcon className="w-16 h-16 text-gray-500 dark:text-gray-400" />
                             <p className="mt-2 font-semibold">單一主機</p>
                             <p className="text-xs text-gray-500">處理所有任務</p>
                        </div>
                    </ArchitectureCard>
                     <ArchitectureCard
                        title="大數據處理 (分散式運算)"
                        Icon={CircleStackIcon}
                        description="將龐大的任務拆解成小塊，分配給一個由多台普通電腦組成的集群（Cluster）來並行處理（水平擴展）。"
                    >
                        <div className="flex justify-center items-center space-x-4 text-center">
                            <div className="flex flex-col items-center">
                               <ServerStackIcon className="w-12 h-12 text-gray-500 dark:text-gray-400" />
                               <p className="mt-1 font-semibold text-sm">節點1</p>
                            </div>
                            <div className="flex flex-col items-center">
                               <ServerStackIcon className="w-12 h-12 text-gray-500 dark:text-gray-400" />
                               <p className="mt-1 font-semibold text-sm">節點2</p>
                            </div>
                            <div className="flex flex-col items-center">
                               <ServerStackIcon className="w-12 h-12 text-gray-500 dark:text-gray-400" />
                               <p className="mt-1 font-semibold text-sm">節點N...</p>
                            </div>
                        </div>
                        <p className="text-center text-xs text-gray-500 mt-2">任務被分散到多台主機協同工作</p>
                    </ArchitectureCard>
                </div>
            </div>
             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 mt-8">
                 <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">關鍵技術</h4>
                 <p className="text-gray-700 dark:text-gray-300">
                    為實現分散式運算，業界發展出了如 <strong className="text-blue-500">Hadoop</strong> (包含 HDFS 檔案系統和 MapReduce 計算框架) 和更現代、更快速的 <strong className="text-blue-500">Apache Spark</strong> 等核心技術，它們是大數據處理的基石。
                 </p>
            </div>
        </ModuleContainer>
    );
};

export default BigDataIntroduction;
