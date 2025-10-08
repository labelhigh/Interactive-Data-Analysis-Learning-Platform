
import React, { useState, useMemo } from 'react';
import ModuleContainer from '../components/ModuleContainer';
import InteractiveChartWrapper from '../components/InteractiveChartWrapper';
import { ScatterChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Custom hook to generate correlated data
const useCorrelatedData = (correlation: number, sampleSize: number) => {
    return useMemo(() => {
        const data = [];
        for (let i = 0; i < sampleSize; i++) {
            const x = Math.random() * 100;
            const noise = (Math.random() - 0.5) * 50 * (1 - Math.abs(correlation));
            const y = (x * correlation * 1.5) + (50 * (1 - correlation)) + noise;
            data.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });
        }
        
        // Simple linear regression calculation
        const sumX = data.reduce((acc, p) => acc + p.x, 0);
        const sumY = data.reduce((acc, p) => acc + p.y, 0);
        const sumXY = data.reduce((acc, p) => acc + p.x * p.y, 0);
        const sumX2 = data.reduce((acc, p) => acc + p.x * p.x, 0);
        
        const n = sampleSize;
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        const minX = Math.min(...data.map(p => p.x));
        const maxX = Math.max(...data.map(p => p.x));
        
        const regressionLine = [
            { x: minX, y: slope * minX + intercept },
            { x: maxX, y: slope * maxX + intercept }
        ];

        return { scatterData: data, regressionLine };
    }, [correlation, sampleSize]);
};

const Slider: React.FC<{ label: string; min: number; max: number; step: number; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, min, max, step, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}: <span className="font-bold text-blue-600 dark:text-blue-400">{value}</span>
        </label>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
        />
    </div>
);


const RegressionAnalysis: React.FC = () => {
    const [correlation, setCorrelation] = useState(0.7);
    const sampleSize = 100;
    
    const { scatterData, regressionLine } = useCorrelatedData(correlation, sampleSize);

    const controls = (
        <div className="space-y-4">
            <Slider label="相關係數 (r)" min={-1} max={1} step={0.1} value={correlation} onChange={e => setCorrelation(Number(e.target.value))} />
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2 pt-2">
                <p>
                    相關係數 (r) 是衡量兩個變量之間線性關係強度和方向的指標，其值介於 -1 和 +1 之間。請嘗試拖動上方的滑塊，觀察散佈圖的變化：
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                    <li><strong className="text-gray-700 dark:text-gray-300">正相關 (r &gt; 0):</strong> 當 r 值為正時，數據點大致呈 <span className="font-semibold">右上</span> 趨勢。r 越接近 1，數據點越集中在一條直線周圍。</li>
                    <li><strong className="text-gray-700 dark:text-gray-300">負相關 (r &lt; 0):</strong> 當 r 值為負時，數據點大致呈 <span className="font-semibold">右下</span> 趨勢。r 越接近 -1，數據點越集中。</li>
                    <li><strong className="text-gray-700 dark:text-gray-300">無相關 (r ≈ 0):</strong> 當 r 值接近 0 時，數據點分佈雜亂，<span className="font-semibold">沒有明顯的線性趨勢</span>。</li>
                    <li><strong className="text-gray-700 dark:text-gray-300">相關強度:</strong> r 的絕對值 |r| 越大，表示關係越強，數據點越接近趨勢線。</li>
                </ul>
            </div>
        </div>
    );
    
    const chart = (
        <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeOpacity={0.2}/>
                <XAxis type="number" dataKey="x" name="廣告投入" tick={{ fontSize: 12 }} />
                <YAxis type="number" dataKey="y" name="銷售額" tick={{ fontSize: 12 }} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="數據點" data={scatterData} fill="#8884d8" shape="circle" />
                <Line data={regressionLine} dataKey="y" stroke="#ff7300" strokeWidth={2} dot={false} name="趨勢線" />
            </ScatterChart>
        </ResponsiveContainer>
    );

    return (
        <ModuleContainer title="迴歸分析實戰">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    迴歸分析是一種強大的統計工具，用於研究變量之間的關係。最常見的是線性迴歸，它試圖找到一條直線（趨勢線）來最好地擬合數據點，從而進行預測。例如，我們可以分析廣告投入與銷售額之間的關係。
                </p>
            </div>
            <InteractiveChartWrapper title="相關性與迴歸模擬" controls={controls} chart={chart} />
        </ModuleContainer>
    );
};

export default RegressionAnalysis;