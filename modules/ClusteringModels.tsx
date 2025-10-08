
import React, { useState, useMemo, useEffect, useRef } from 'react';
import ModuleContainer from '../components/ModuleContainer';
import InteractiveChartWrapper from '../components/InteractiveChartWrapper';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const generateData = () => {
    const clusters = [
        { x: 30, y: 30, points: 30 }, // Cluster 1
        { x: 70, y: 80, points: 30 }, // Cluster 2
        { x: 80, y: 20, points: 30 }, // Cluster 3
    ];
    const data: { x: number, y: number }[] = [];
    clusters.forEach(cluster => {
        for (let i = 0; i < cluster.points; i++) {
            data.push({
                x: cluster.x + (Math.random() - 0.5) * 30,
                y: cluster.y + (Math.random() - 0.5) * 30,
            });
        }
    });
    return data;
};

const initialData = generateData();
const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

const KmeansSimulator: React.FC = () => {
    const [k, setK] = useState(3);
    const [centroids, setCentroids] = useState<{ x: number, y: number }[]>([]);
    const [assignments, setAssignments] = useState<number[]>([]);
    const [iteration, setIteration] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const intervalRef = useRef<number | null>(null);

    const distance = (p1: { x: number, y: number }, p2: { x: number, y: number }) =>
        Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

    const initialize = () => {
        setIsAnimating(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIteration(0);
        const initialCentroids = [];
        for (let i = 0; i < k; i++) {
            initialCentroids.push({ x: Math.random() * 100, y: Math.random() * 100 });
        }
        setCentroids(initialCentroids);
        setAssignments(Array(initialData.length).fill(-1));
    };
    
    useEffect(() => {
        initialize();
    }, [k]);

    const step = () => {
        setIteration(prev => prev + 1);

        // Assignment step
        const newAssignments = initialData.map(point => {
            let closestCentroidIndex = 0;
            let minDistance = Infinity;
            centroids.forEach((centroid, index) => {
                const d = distance(point, centroid);
                if (d < minDistance) {
                    minDistance = d;
                    closestCentroidIndex = index;
                }
            });
            return closestCentroidIndex;
        });
        setAssignments(newAssignments);

        // Update step
        const newCentroids = centroids.map((_, index) => {
            const clusterPoints = initialData.filter((_, pIndex) => newAssignments[pIndex] === index);
            if (clusterPoints.length === 0) return { x: Math.random() * 100, y: Math.random() * 100 };
            const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0);
            const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0);
            return { x: sumX / clusterPoints.length, y: sumY / clusterPoints.length };
        });

        // Check for convergence
        const centroidsMoved = centroids.some((c, i) => distance(c, newCentroids[i]) > 0.01);
        if (!centroidsMoved && iteration > 0) {
            stopAnimation();
        }
        
        setCentroids(newCentroids);
    };

    const startAnimation = () => {
        setIsAnimating(true);
        // Ensure the first step runs immediately
        step();
        intervalRef.current = window.setInterval(() => {
            step();
        }, 1000);
    };

    const stopAnimation = () => {
        setIsAnimating(false);
        if(intervalRef.current) clearInterval(intervalRef.current);
    }

    const chartData = useMemo(() => {
        return initialData.map((point, index) => ({
            ...point,
            fill: assignments[index] === -1 ? '#ccc' : COLORS[assignments[index] % COLORS.length]
        }));
    }, [assignments]);

    const controls = (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    選擇叢集數量 (K): <span className="font-bold text-blue-600 dark:text-blue-400">{k}</span>
                </label>
                <input
                    type="range" min="2" max="5" value={k}
                    onChange={e => setK(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
                    disabled={isAnimating}
                />
            </div>
            <div className="flex space-x-2">
                <button onClick={initialize} disabled={isAnimating} className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 disabled:bg-gray-400">重設</button>
                <button onClick={step} disabled={isAnimating} className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">下一步</button>
            </div>
             <button onClick={isAnimating ? stopAnimation : startAnimation} className={`w-full px-4 py-2 text-sm font-medium text-white rounded-lg ${isAnimating ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}>
                {isAnimating ? '停止動畫' : '自動執行'}
            </button>
        </div>
    );
    
    const chart = (
         <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeOpacity={0.2}/>
                <XAxis type="number" dataKey="x" name="酒精濃度 (Alcohol)" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <YAxis type="number" dataKey="y" name="顏色強度 (Color Intensity)" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="葡萄酒樣本" data={chartData} fill="#8884d8" />
                <Scatter name="群組中心" data={centroids} fill="black" shape="star" legendType="star" />
            </ScatterChart>
        </ResponsiveContainer>
    );
    
    const stats = (
        <div className="space-y-2 text-sm">
            <p><strong>演算法:</strong> K-Means</p>
            <p><strong>狀態:</strong> {isAnimating ? '執行中...' : '已停止'}</p>
            <p><strong>迭代次數:</strong> {iteration}</p>
        </div>
    );

    return (
        <InteractiveChartWrapper
            title="K-Means 演算法模擬：葡萄酒品種分群"
            controls={controls}
            chart={chart}
            stats={stats}
        />
    );
};

const ClusteringModels: React.FC = () => {
    return (
        <ModuleContainer title="分群模型實戰">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    分群 (Clustering) 是一種非監督式學習，目標是在沒有預先標記的情況下，將相似的數據點歸為一組。例如，我們可以根據多種葡萄酒的化學分析結果（如酒精濃度、顏色強度等），將它們自動歸類，從而發現潛在的品種群組。K-Means 是最廣為人知的分群演算法之一。
                </p>
                 <p className="text-sm mt-4 text-gray-600 dark:text-gray-400">
                   <strong>演算法步驟：</strong>
                   <ol className="list-decimal list-inside mt-2 space-y-1">
                        <li><strong>初始化：</strong>隨機選擇 K 個點作為初始的群組中心 (Centroids)。</li>
                        <li><strong>分配：</strong>將每個數據點（葡萄酒樣本）分配給離它最近的中心點。</li>
                        <li><strong>更新：</strong>將每個中心點移動到其所屬群組內所有數據點的平均位置。</li>
                        <li><strong>重複：</strong>重複步驟 2 和 3，直到中心點不再有明顯移動為止。</li>
                   </ol>
                </p>
            </div>
            <KmeansSimulator />
        </ModuleContainer>
    );
};

export default ClusteringModels;
