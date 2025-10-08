import React, { useState, useMemo } from 'react';
import ModuleContainer from '../components/ModuleContainer';
import InteractiveChartWrapper from '../components/InteractiveChartWrapper';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

type SimulatorType = 'normal' | 'lln' | 'clt';

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

const StatDisplay: React.FC<{ label: string; value: string | number; }> = ({ label, value }) => (
    <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
        <span>{label}</span>
        <span className="font-semibold text-gray-900 dark:text-white">{typeof value === 'number' ? value.toFixed(3) : value}</span>
    </div>
);

// --- Normal Distribution Simulator ---
const useNormalDistribution = (mean: number, stdDev: number, sampleSize: number) => {
    return useMemo(() => {
        const values = [];
        const generateNormal = () => {
            let u1 = 0, u2 = 0;
            while (u1 === 0) u1 = Math.random();
            while (u2 === 0) u2 = Math.random();
            const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            return z * stdDev + mean;
        };
        for (let i = 0; i < sampleSize; i++) {
            values.push(generateNormal());
        }
        
        const min = Math.min(...values);
        const max = Math.max(...values);
        const binCount = 40;
        const binWidth = (max - min) / binCount;
        const bins = Array(binCount).fill(0);
        values.forEach(v => {
            const binIndex = Math.min(Math.floor((v - min) / binWidth), binCount - 1);
            bins[binIndex]++;
        });
        
        const chartData = bins.map((count, i) => ({
            value: (min + i * binWidth).toFixed(2),
            count: count,
        }));
        
        const calculatedMean = values.reduce((a, b) => a + b, 0) / values.length;
        const calculatedStdDev = Math.sqrt(values.map(x => Math.pow(x - calculatedMean, 2)).reduce((a, b) => a + b) / values.length);

        return { chartData, stats: { mean: calculatedMean, stdDev: calculatedStdDev, min, max } };
    }, [mean, stdDev, sampleSize]);
};

const NormalDistributionSimulator: React.FC = () => {
    const [sampleSize, setSampleSize] = useState(1000);
    const [mean, setMean] = useState(50);
    const [stdDev, setStdDev] = useState(10);
    const { chartData, stats } = useNormalDistribution(mean, stdDev, sampleSize);

    return (
        <InteractiveChartWrapper 
            title="正態分佈模擬器" 
            controls={
                <div className="space-y-4">
                    <Slider label="樣本大小 (N)" min={100} max={5000} step={100} value={sampleSize} onChange={e => setSampleSize(Number(e.target.value))} />
                    <Slider label="平均值 (μ)" min={0} max={100} step={1} value={mean} onChange={e => setMean(Number(e.target.value))} />
                    <Slider label="標準差 (σ)" min={1} max={30} step={1} value={stdDev} onChange={e => setStdDev(Number(e.target.value))} />
                </div>
            } 
            chart={
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="value" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" name="頻率" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            } 
            stats={
                <div className="space-y-2">
                    <StatDisplay label="計算平均值" value={stats.mean} />
                    <StatDisplay label="計算標準差" value={stats.stdDev} />
                    <StatDisplay label="最大值" value={stats.max} />
                    <StatDisplay label="最小值" value={stats.min} />
                </div>
            } 
        />
    );
};

// --- Law of Large Numbers Simulator ---
const useCoinFlipSimulation = (trials: number, probability: number) => {
    return useMemo(() => {
        const results = [];
        let heads = 0;
        for (let i = 1; i <= trials; i++) {
            if (Math.random() < probability) {
                heads++;
            }
            results.push({
                trial: i,
                proportion: heads / i,
                trueProbability: probability
            });
        }
        return results;
    }, [trials, probability]);
};

const LawOfLargeNumbersSimulator: React.FC = () => {
    const [trials, setTrials] = useState(500);
    const [probability, setProbability] = useState(0.5);
    const simulationData = useCoinFlipSimulation(trials, probability);
    const lastResult = simulationData[simulationData.length - 1];

    return (
        <InteractiveChartWrapper
            title="大數法則模擬器 (拋硬幣)"
            controls={
                <div className="space-y-4">
                    <Slider label="拋擲次數" min={10} max={2000} step={10} value={trials} onChange={e => setTrials(Number(e.target.value))} />
                    <Slider label="正面出現機率" min={0.1} max={0.9} step={0.05} value={probability} onChange={e => setProbability(Number(e.target.value))} />
                </div>
            }
            chart={
                 <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={simulationData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2}/>
                        <XAxis dataKey="trial" type="number" domain={[0, 'dataMax']} tick={{ fontSize: 12 }} />
                        <YAxis domain={[0, 1]} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="proportion" name="觀測機率" stroke="#3b82f6" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="trueProbability" name="真實機率" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            }
            stats={
                <div className="space-y-2">
                    <StatDisplay label="總拋擲次數" value={lastResult.trial} />
                    <StatDisplay label="最終觀測機率" value={lastResult.proportion} />
                    <StatDisplay label="真實機率" value={lastResult.trueProbability} />
                </div>
            }
        />
    );
};


// --- Central Limit Theorem Simulator ---
const useCLTSimulation = (populationType: 'uniform' | 'exponential', sampleSize: number, numSamples: number) => {
    return useMemo(() => {
        const populationGenerator = {
            uniform: () => Math.random(),
            exponential: () => -Math.log(1 - Math.random()),
        }[populationType];

        const sampleMeans = [];
        for (let i = 0; i < numSamples; i++) {
            let currentSampleSum = 0;
            for (let j = 0; j < sampleSize; j++) {
                currentSampleSum += populationGenerator();
            }
            sampleMeans.push(currentSampleSum / sampleSize);
        }

        const min = Math.min(...sampleMeans);
        const max = Math.max(...sampleMeans);
        const binCount = 40;
        const binWidth = (max - min) / binCount;
        const bins = Array(binCount).fill(0).map((_, i) => ({
            value: (min + i * binWidth).toFixed(3),
            count: 0,
        }));

        sampleMeans.forEach(mean => {
            const binIndex = Math.min(Math.floor((mean - min) / binWidth), binCount - 1);
            if(bins[binIndex]) {
                 bins[binIndex].count++;
            }
        });

        const meanOfMeans = sampleMeans.reduce((a, b) => a + b, 0) / sampleMeans.length;

        return { histogramData: bins, meanOfMeans };

    }, [populationType, sampleSize, numSamples]);
};

const CentralLimitTheoremSimulator: React.FC = () => {
    const [sampleSize, setSampleSize] = useState(30);
    const [numSamples, setNumSamples] = useState(1000);
    const [populationType, setPopulationType] = useState<'uniform' | 'exponential'>('uniform');
    const { histogramData, meanOfMeans } = useCLTSimulation(populationType, sampleSize, numSamples);

    return (
        <InteractiveChartWrapper
            title="中央極限定理模擬器"
            controls={
                <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">母體分佈</label>
                        <select
                            value={populationType}
                            onChange={(e) => setPopulationType(e.target.value as 'uniform' | 'exponential')}
                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="uniform">均勻分佈</option>
                            <option value="exponential">指數分佈</option>
                        </select>
                    </div>
                    <Slider label="樣本大小" min={2} max={100} step={1} value={sampleSize} onChange={e => setSampleSize(Number(e.target.value))} />
                    <Slider label="樣本數量" min={100} max={5000} step={100} value={numSamples} onChange={e => setNumSamples(Number(e.target.value))} />
                </div>
            }
            chart={
                 <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={histogramData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="value" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={50} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="count" name="樣本平均數頻率" fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
            }
             stats={
                <div className="space-y-2">
                    <StatDisplay label="樣本平均數的平均值" value={meanOfMeans} />
                    <StatDisplay label="母體平均值 (理論)" value={populationType === 'uniform' ? 0.5 : 1.0} />
                </div>
            }
        />
    )
}


const SimulatorTab: React.FC<{ title: string; isActive: boolean; onClick: () => void; }> = ({ title, isActive, onClick }) => {
    const activeClasses = "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500";
    const inactiveClasses = "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
    return (
        <button
            onClick={onClick}
            className={`inline-block p-4 text-sm font-medium text-center rounded-t-lg ${isActive ? activeClasses : inactiveClasses}`}
            aria-current={isActive ? 'page' : undefined}
        >
            {title}
        </button>
    );
};

const StatisticalSimulation: React.FC = () => {
    const [activeSimulator, setActiveSimulator] = useState<SimulatorType>('normal');

    const simulators = {
        normal: { title: "正態分佈", component: <NormalDistributionSimulator /> },
        lln: { title: "大數法則", component: <LawOfLargeNumbersSimulator /> },
        clt: { title: "中央極限定理", component: <CentralLimitTheoremSimulator /> },
    };
    
    return (
        <ModuleContainer title="統計分析模擬">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    統計模擬是理解抽象概念的強大工具。這裡提供多個互動式模擬器，您可以親手調整參數，觀察統計定律如何在你眼前真實上演，從而建立更深刻、更直觀的理解。
                </p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {Object.keys(simulators).map((key) => (
                         <SimulatorTab 
                            key={key}
                            title={simulators[key as SimulatorType].title}
                            isActive={activeSimulator === key}
                            onClick={() => setActiveSimulator(key as SimulatorType)}
                         />
                    ))}
                </nav>
            </div>

            <div className="animate-fade-in">
                {simulators[activeSimulator].component}
            </div>

        </ModuleContainer>
    );
};

export default StatisticalSimulation;
