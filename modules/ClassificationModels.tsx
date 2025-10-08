
import React, { useState, useMemo } from 'react';
import ModuleContainer from '../components/ModuleContainer';
import InteractiveChartWrapper from '../components/InteractiveChartWrapper';

// --- Decision Tree Data ---
const decisionTreeSampleData = [
    { id: 1, tenure: 3, contract: '月租', churn: '是' },
    { id: 2, tenure: 25, contract: '年租', churn: '否' },
    { id: 3, tenure: 30, contract: '月租', churn: '否' },
    { id: 4, tenure: 5, contract: '月租', churn: '是' },
    { id: 5, tenure: 50, contract: '兩年租', churn: '否' },
    { id: 6, tenure: 1, contract: '月租', churn: '是' },
    { id: 7, tenure: 40, contract: '年租', churn: '否' },
];

const TreeNode: React.FC<{ condition: string; result?: string; children?: React.ReactNode; isLeaf?: boolean; count: string; highlight: boolean }> = ({ condition, result, children, isLeaf, count, highlight }) => (
    <div className={`p-3 border-2 rounded-lg text-center transition-all duration-300 ${highlight ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 scale-105 shadow-lg' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}>
        <p className="font-bold text-gray-800 dark:text-white">{condition}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{count}</p>
        {isLeaf && <p className={`mt-2 text-lg font-extrabold ${result === '是' ? 'text-red-500' : 'text-green-500'}`}>流失: {result}</p>}
        {children && <div className="mt-4 flex justify-around gap-4">{children}</div>}
    </div>
);


// --- Titanic Survivor Prediction ---
const TitanicSimulator: React.FC = () => {
    const [pclass, setPclass] = useState<1 | 2 | 3>(1);
    const [sex, setSex] = useState<'male' | 'female'>('female');
    const [age, setAge] = useState(30);

    const survivalProbability = useMemo(() => {
        let prob = 0.2; // Base probability
        if (sex === 'female') prob += 0.35;
        if (pclass === 1) prob += 0.25;
        if (pclass === 2) prob += 0.1;
        if (age < 16) prob += 0.15;
        if (age > 50) prob -= 0.1;
        
        return Math.max(0.05, Math.min(0.95, prob));
    }, [pclass, sex, age]);

    const controls = (
        <div className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">艙等 (PClass)</label>
                <select value={pclass} onChange={e => setPclass(Number(e.target.value) as 1|2|3)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option value={1}>1等艙 (富裕)</option>
                    <option value={2}>2等艙 (中產)</option>
                    <option value={3}>3等艙 (平民)</option>
                </select>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">性別 (Sex)</label>
                 <select value={sex} onChange={e => setSex(e.target.value as 'male'|'female')} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option value="female">女性</option>
                    <option value="male">男性</option>
                </select>
            </div>
            <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">年齡 (Age): <span className="font-bold text-blue-600 dark:text-blue-400">{age}</span></label>
                 <input type="range" min="1" max="80" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600" />
            </div>
        </div>
    );

    const chart = (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">模擬生存機率</div>
            <div className="relative w-32 h-32">
                 <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                        className="text-gray-200 dark:text-gray-600"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke="currentColor" strokeWidth="3" />
                    <path
                        className="text-blue-500"
                        strokeDasharray={`${survivalProbability * 100}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800 dark:text-white">
                    {(survivalProbability * 100).toFixed(0)}%
                </div>
            </div>
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
                基於「女性與兒童優先」原則和艙等差異，此乘客的生存機率被模型預測為
                <span className={`font-bold ${survivalProbability > 0.5 ? 'text-green-500' : 'text-red-500'}`}>
                    {survivalProbability > 0.5 ? '較高' : '較低'}
                </span>。
            </p>
        </div>
    );
    
    return <InteractiveChartWrapper title="經典案例：鐵達尼號生存預測" controls={controls} chart={chart} />;
};


const ClassificationModels: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<typeof decisionTreeSampleData[0] | null>(null);

    const getHighlightPath = (user: typeof decisionTreeSampleData[0] | null) => {
        if (!user) return {};
        const path: Record<string, boolean> = { root: true };
        if (user.tenure <= 12) {
            path.tenure_low = true;
            if (user.contract === '月租') {
                path.tenure_low_contract_monthly = true;
            } else {
                path.tenure_low_contract_long = true;
            }
        } else {
            path.tenure_high = true;
        }
        return path;
    };

    const path = getHighlightPath(selectedUser);

    const decisionTreeControls = (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">選擇一位客戶查看預測路徑:</label>
        <div className="space-y-2">
            {decisionTreeSampleData.map(user => (
                <button 
                    key={user.id} 
                    onClick={() => setSelectedUser(user)}
                    className={`w-full text-left p-2 rounded-md text-sm transition-colors ${selectedUser?.id === user.id ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500'}`}
                >
                   客戶 {user.id} (合約: {user.tenure}個月, 方案: {user.contract})
                </button>
            ))}
             <button 
                onClick={() => setSelectedUser(null)}
                className="w-full text-left p-2 rounded-md text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 mt-2"
             >
                清除選擇
             </button>
        </div>
      </div>
    );
    
    const decisionTreeChart = (
        <div className="p-4">
            <TreeNode condition="所有客戶" count="7人" highlight={path['root']}>
                <TreeNode condition="合約 <= 12 個月?" count="4人" highlight={path['tenure_low']}>
                    <TreeNode condition="方案為月租?" count="3人" highlight={path['tenure_low_contract_monthly']} isLeaf result="是" />
                    <TreeNode condition="方案為年租?" count="1人" highlight={path['tenure_low_contract_long']} isLeaf result="否" />
                </TreeNode>
                <TreeNode condition="合約 > 12 個月?" count="3人" highlight={path['tenure_high']} isLeaf result="否" />
            </TreeNode>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                {selectedUser ? `客戶 ${selectedUser.id} 的預測結果為：流失機率 ${selectedUser.tenure <= 12 && selectedUser.contract === '月租' ? '高' : '低'}` : '請選擇一位客戶來觀察決策樹的判斷路徑。'}
            </p>
        </div>
    );
    
    return (
        <ModuleContainer title="分類模型實戰">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    分類是監督式學習的一種，目標是預測一個項目屬於哪個預先定義好的類別。例如，判斷一封郵件是否為垃圾郵件，或者一個客戶是否會流失。決策樹 (Decision Tree) 是一種非常直觀且強大的分類演算法。
                </p>
            </div>
            
            <InteractiveChartWrapper
                title="決策樹模擬器：客戶流失預測"
                controls={decisionTreeControls}
                chart={decisionTreeChart}
            />

            <div className="mt-8">
                <TitanicSimulator />
            </div>

            <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">評估分類模型：混淆矩陣</h3>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        光看準確率是不夠的。混淆矩陣 (Confusion Matrix) 能幫助我們更深入地了解模型在不同類別上的表現，以及它「犯了哪種錯」。
                    </p>
                    <div className="text-center text-sm">
                        <div className="grid grid-cols-3 gap-1">
                            <div />
                            <div className="font-bold text-gray-800 dark:text-gray-200">預測為正</div>
                            <div className="font-bold text-gray-800 dark:text-gray-200">預測為負</div>
                            
                            <div className="font-bold text-gray-800 dark:text-gray-200 self-center">實際為正</div>
                            <div className="bg-green-200 dark:bg-green-800 p-2 rounded">TP (真陽性)</div>
                            <div className="bg-red-200 dark:bg-red-800 p-2 rounded">FN (偽陰性)</div>
                            
                            <div className="font-bold text-gray-800 dark:text-gray-200 self-center">實際為負</div>
                            <div className="bg-orange-200 dark:bg-orange-800 p-2 rounded">FP (偽陽性)</div>
                            <div className="bg-blue-200 dark:bg-blue-800 p-2 rounded">TN (真陰性)</div>
                        </div>
                        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            準確率(Accuracy) = (TP+TN)/總數 <br />
                            精確率(Precision) = TP/(TP+FP) <br />
                            召回率(Recall) = TP/(TP+FN)
                        </p>
                    </div>
                </div>
            </div>
        </ModuleContainer>
    );
};

export default ClassificationModels;
