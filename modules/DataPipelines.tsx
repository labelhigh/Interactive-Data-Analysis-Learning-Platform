
import React, { useState } from 'react';
import ModuleContainer from '../components/ModuleContainer';
import { DatabaseIcon, ArrowPathIcon, CloudArrowUpIcon, CpuChipIcon, ServerStackIcon, ArrowRightCircleIcon } from '../components/icons';

const StepCard: React.FC<{ title: string; description: string; Icon: React.FC<{ className?: string }>; color: string }> = ({ title, description, Icon, color }) => (
    <div className="flex-1 flex flex-col items-center text-center p-4">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${color}`}>
            <Icon className="w-10 h-10 text-white" />
        </div>
        <h4 className="font-bold text-lg text-gray-900 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
    </div>
);

const PipelineVisualizer: React.FC<{ type: 'ETL' | 'ELT' }> = ({ type }) => {
    const etlSteps = [
        { title: 'Extract (抽取)', description: '從多個來源系統（如資料庫、API、日誌檔）提取原始數據。', Icon: DatabaseIcon, color: 'bg-blue-500' },
        { title: 'Transform (轉換)', description: '在專用的中介伺服器上進行數據清洗、整合、計算和格式化。', Icon: CpuChipIcon, color: 'bg-orange-500' },
        { title: 'Load (載入)', description: '將轉換好的、乾淨的數據載入到目標資料倉儲中以供分析。', Icon: CloudArrowUpIcon, color: 'bg-green-500' },
    ];
    const eltSteps = [
        { title: 'Extract (抽取)', description: '從多個來源系統提取原始數據。', Icon: DatabaseIcon, color: 'bg-blue-500' },
        { title: 'Load (載入)', description: '將原始數據直接、快速地載入到雲端資料倉儲的儲存層。', Icon: CloudArrowUpIcon, color: 'bg-green-500' },
        { title: 'Transform (轉換)', description: '利用資料倉儲強大的計算能力，在倉儲內部對載入的數據進行轉換。', Icon: CpuChipIcon, color: 'bg-orange-500' },
    ];
    const steps = type === 'ETL' ? etlSteps : eltSteps;
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
             <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-6">{type} 流程</h3>
            <div className="flex flex-col md:flex-row items-center justify-around">
                <StepCard {...steps[0]} />
                <ArrowRightCircleIcon className="w-8 h-8 text-gray-300 dark:text-gray-600 my-4 md:my-0 rotate-90 md:rotate-0" />
                <StepCard {...steps[1]} />
                <ArrowRightCircleIcon className="w-8 h-8 text-gray-300 dark:text-gray-600 my-4 md:my-0 rotate-90 md:rotate-0" />
                <StepCard {...steps[2]} />
            </div>
        </div>
    );
};


const DataPipelines: React.FC = () => {
    const [pipelineType, setPipelineType] = useState<'ETL' | 'ELT'>('ETL');

    return (
        <ModuleContainer title="資料管道與ETL">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    資料管道（Data Pipeline）是將數據從一個系統移動到另一個系統的自動化流程。ETL 是這個流程中最經典的模式，它代表了數據整合的三個核心步驟：抽取（Extract）、轉換（Transform）、載入（Load）。
                </p>
            </div>
            
            <div className="mt-8">
                <div className="flex justify-center mb-4 border-b border-gray-200 dark:border-gray-700">
                    <button 
                        onClick={() => setPipelineType('ETL')}
                        className={`px-6 py-2 font-semibold text-sm rounded-t-lg transition-colors ${pipelineType === 'ETL' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    >
                        傳統 ETL 模式
                    </button>
                    <button 
                        onClick={() => setPipelineType('ELT')}
                        className={`px-6 py-2 font-semibold text-sm rounded-t-lg transition-colors ${pipelineType === 'ELT' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    >
                        現代 ELT 模式
                    </button>
                </div>

                <div className="animate-fade-in">
                    <PipelineVisualizer type={pipelineType} />
                </div>
            </div>

             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 mt-8">
                 <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">ETL vs. ELT</h4>
                 <p className="text-gray-700 dark:text-gray-300">
                    隨著雲端資料倉儲的興起，<strong className="text-blue-500">ELT (抽取、載入、轉換)</strong> 模式變得越來越流行。
                 </p>
                 <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                     <li>
                        <strong>ETL:</strong> 適用於傳統資料倉儲。優點是載入的數據乾淨且結構化，但缺點是轉換邏輯複雜時，處理速度會成為瓶頸，且靈活性較差。
                     </li>
                     <li>
                        <strong>ELT:</strong> 為雲端資料倉儲而生。優點是載入速度極快，可以直接處理半結構化或非結構化數據，並利用倉儲的彈性計算能力進行高效轉換，靈活性更高。
                     </li>
                 </ul>
            </div>

        </ModuleContainer>
    );
};

export default DataPipelines;
