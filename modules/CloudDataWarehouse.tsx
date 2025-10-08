
import React from 'react';
import ModuleContainer from '../components/ModuleContainer';
import { DatabaseIcon, CloudArrowUpIcon, ChartBarIcon, ServerStackIcon, ArrowRightCircleIcon } from '../components/icons';

const FeatureCard: React.FC<{ title: string; description: string; }> = ({ title, description }) => (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
    </div>
);

const ComparisonRow: React.FC<{ feature: string; traditional: string; cloud: string; isHeader?: boolean; }> = ({ feature, traditional, cloud, isHeader }) => (
    <div className={`grid grid-cols-3 gap-4 p-3 ${isHeader ? 'font-bold bg-gray-100 dark:bg-gray-700' : 'border-b border-gray-200 dark:border-gray-700'}`}>
        <div className="text-gray-800 dark:text-gray-200">{feature}</div>
        <div className="text-gray-600 dark:text-gray-400">{traditional}</div>
        <div className="text-green-600 dark:text-green-400">{cloud}</div>
    </div>
);

const CloudDataWarehouse: React.FC = () => {
    return (
        <ModuleContainer title="雲端資料倉儲">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    資料倉儲 (Data Warehouse) 是一個專為分析和報告而設計的中央數據存儲庫。而「雲端」資料倉儲則將這一概念提升到了新的高度，它利用雲端運算的彈性、可擴展性和成本效益，徹底改變了企業處理和分析數據的方式。
                </p>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">核心架構：儲存與運算分離</h3>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        現代雲端資料倉儲（如 Google BigQuery, Snowflake）最大的架構創新是將「資料儲存」和「計算資源」分開。這意味著您可以獨立地擴展兩者，從而獲得極大的靈活性和成本效益。
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-center">
                        <div className="flex flex-col items-center">
                            <DatabaseIcon className="w-16 h-16 text-blue-500" />
                            <p className="font-bold mt-2">資料儲存層</p>
                            <p className="text-sm text-gray-500">（如 S3, GCS）</p>
                            <p className="text-xs mt-1">可無限擴展，成本低廉</p>
                        </div>
                        <ArrowRightCircleIcon className="w-10 h-10 text-gray-400 rotate-90 md:rotate-0" />
                        <div className="flex flex-col items-center">
                            <ServerStackIcon className="w-16 h-16 text-green-500" />
                            <p className="font-bold mt-2">計算資源層</p>
                             <p className="text-sm text-gray-500">（虛擬倉儲）</p>
                             <p className="text-xs mt-1">按需啟動，可彈性伸縮</p>
                        </div>
                        <ArrowRightCircleIcon className="w-10 h-10 text-gray-400 rotate-90 md:rotate-0" />
                        <div className="flex flex-col items-center">
                            <ChartBarIcon className="w-16 h-16 text-purple-500" />
                            <p className="font-bold mt-2">分析與應用</p>
                             <p className="text-sm text-gray-500">（BI 工具, 儀表板）</p>
                             <p className="text-xs mt-1">多個團隊可同時查詢，互不干擾</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">傳統 vs. 雲端資料倉儲</h3>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
                    <ComparisonRow isHeader feature="特性" traditional="傳統地端倉儲" cloud="現代雲端倉儲" />
                    <ComparisonRow feature="架構" traditional="儲存與運算耦合" cloud="儲存與運算分離" />
                    <ComparisonRow feature="擴展性" traditional="困難且昂貴（垂直擴展）" cloud="輕鬆、自動（水平擴展）" />
                    <ComparisonRow feature="成本" traditional="高昂的初期硬體投資" cloud="按用量付費，無前期成本" />
                    <ComparisonRow feature="併發性" traditional="查詢會互相搶資源，速度變慢" cloud="可為不同任務分配獨立資源" />
                    <ComparisonRow feature="維護" traditional="需專門團隊維護硬體和軟體" cloud="由雲端服務商管理，近乎免維護" />
                </div>
            </div>

        </ModuleContainer>
    );
};

export default CloudDataWarehouse;
