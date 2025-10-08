
import React from 'react';
import ModuleContainer from '../components/ModuleContainer';

const RFMCard: React.FC<{ title: string; description: string;}> = ({ title, description}) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
);

const CustomerSegment: React.FC<{ name: string; r: string; f: string; m: string; strategy: string;}> = ({ name, r, f, m, strategy }) => (
    <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {name}
        </th>
        <td className="px-6 py-4">{r}</td>
        <td className="px-6 py-4">{f}</td>
        <td className="px-6 py-4">{m}</td>
        <td className="px-6 py-4">{strategy}</td>
    </tr>
);

const CustomerSegmentation: React.FC = () => {
    return (
        <ModuleContainer title="資料探勘：客戶分群 (RFM 模型)">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    資料探勘是從大量數據中自動發現模式、趨勢和有用資訊的過程。它結合了統計學、機器學習和數據庫技術。一個經典的商業應用是客戶分群，例如RFM模型。
                </p>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">RFM 客戶分群模型</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    RFM模型是衡量客戶價值和客戶創利能力的重要工具和手段。它基於三個關鍵指標對客戶進行分群，從而實現精準營銷。
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                    <RFMCard title="R (Recency) - 最近一次消費時間" description="客戶距離最後一次消費有多久？最近消費的客戶通常更有可能再次消費。" />
                    <RFMCard title="F (Frequency) - 消費頻率" description="客戶在特定時間內購買了多少次？頻繁購買的客戶忠誠度更高。" />
                    <RFMCard title="M (Monetary) - 消費金額" description="客戶在特定時間內總共花了多少錢？消費金額高的客戶價值也更高。" />
                </div>
            </div>

             <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">客戶分群與營銷策略</h3>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">客戶類型</th>
                                <th scope="col" className="px-6 py-3">R (高/低)</th>
                                <th scope="col" className="px-6 py-3">F (高/低)</th>
                                <th scope="col" className="px-6 py-3">M (高/低)</th>
                                <th scope="col" className="px-6 py-3">營銷策略</th>
                            </tr>
                        </thead>
                        <tbody>
                            <CustomerSegment name="重要價值客戶" r="高" f="高" m="高" strategy="提供VIP服務，重點維持" />
                            <CustomerSegment name="重要發展客戶" r="高" f="低" m="高" strategy="推薦相關產品，提高頻率" />
                            <CustomerSegment name="重要挽留客戶" r="低" f="高" m="高" strategy="主動聯繫，提供優惠喚醒" />
                            <CustomerSegment name="一般客戶" r="低" f="低" m="低" strategy="低成本觸達，如郵件營銷" />
                        </tbody>
                    </table>
                </div>
                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    *這是一個簡化的RFM分群示例。實際應用中會將R/F/M各分為多個等級（如1-5分）來進行更精細的劃分。
                </p>
            </div>
        </ModuleContainer>
    );
};

export default CustomerSegmentation;
