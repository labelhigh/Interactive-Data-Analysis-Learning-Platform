import React, { useState, useMemo } from 'react';
import ModuleContainer from '../components/ModuleContainer';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Sector, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar, ComposedChart } from 'recharts';

// --- DATA FOR CHARTS ---

const barData = [
    { name: '產品A', sales: 4000 },
    { name: '產品B', sales: 3000 },
    { name: '產品C', sales: 2000 },
    { name: '產品D', sales: 2780 },
];

const pieData = [
    { name: 'A類', value: 400 },
    { name: 'B類', value: 300 },
    { name: 'C類', value: 300 },
    { name: 'D類', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const lineData = [
    { month: '一月', sales: 2400 },
    { month: '二月', sales: 1398 },
    { month: '三月', sales: 9800 },
    { month: '四月', sales: 3908 },
    { month: '五月', sales: 4800 },
    { month: '六月', sales: 3800 },
];

const scatterData = [
    { x: 100, y: 200 }, { x: 120, y: 100 }, { x: 170, y: 300 },
    { x: 140, y: 250 }, { x: 150, y: 400 }, { x: 110, y: 280 },
];

const boxPlotData = [
  { category: 'A組', min: 10, q1: 25, median: 30, q3: 45, max: 60 },
  { category: 'B組', min: 15, q1: 30, median: 38, q3: 50, max: 75 },
  { category: 'C組', min: 5, q1: 15, median: 22, q3: 28, max: 40 },
];

const bubbleData = [
  { x: 20, y: 40, z: 300, category: '類別1' },
  { x: 45, y: 70, z: 500, category: '類別2' },
  { x: 65, y: 30, z: 200, category: '類別3' },
  { x: 80, y: 60, z: 700, category: '類別4' },
];

const radialBarData = [
    { name: '目標A', value: 80, fill: '#8884d8' },
    { name: '目標B', value: 65, fill: '#83a6ed' },
    { name: '目標C', value: 45, fill: '#8dd1e1' },
    { name: '目標D', value: 25, fill: '#a4de6c' },
];

const mapData = [
    { x: 20, y: 80, value: 500, name: '北區' },
    { x: 40, y: 50, value: 800, name: '中區' },
    { x: 30, y: 20, value: 300, name: '南區' },
    { x: 70, y: 60, value: 200, name: '東區' },
];

const dotPlotData = [
  { name: '項目A', value: 10 }, { name: '項目A', value: 12 }, { name: '項目A', value: 15 },
  { name: '項目B', value: 20 }, { name: '項目B', value: 22 },
  { name: '項目C', value: 5 }, { name: '項目C', value: 8 }, { name: '項目C', value: 9 },
];

const ganttData = [
  { task: '任務 A', start: 0, duration: 5 },
  { task: '任務 B', start: 3, duration: 7 },
  { task: '任務 C', start: 6, duration: 4 },
  { task: '任務 D', start: 10, duration: 3 },
];

const heatmapData = [
  { day: '週一', time: '早上', value: 20 }, { day: '週二', time: '早上', value: 40 }, { day: '週三', time: '早上', value: 15 },
  { day: '週一', time: '中午', value: 60 }, { day: '週二', time: '中午', value: 90 }, { day: '週三', time: '中午', value: 50 },
  { day: '週一', time: '晚上', value: 30 }, { day: '週二', time: '晚上', value: 25 }, { day: '週三', time: '晚上', value: 70 },
];

const rawHistogramData = Array.from({ length: 200 }, () => Math.random() * 100);
const bins = Array(10).fill(0);
rawHistogramData.forEach(value => {
    const binIndex = Math.min(Math.floor(value / 10), 9);
    bins[binIndex]++;
});
const histogramData = bins.map((count, i) => ({
    range: `${i * 10}-${(i + 1) * 10}`,
    count: count,
}));


// --- REUSABLE COMPONENTS ---

const ChartCard: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm h-12">{description}</p>
        <div className="h-80 w-full flex-grow">{children}</div>
    </div>
);

const HighlightTable: React.FC<{ data: typeof heatmapData }> = ({ data }) => {
    const rows = [...new Set(data.map(d => d.day))];
    const cols = [...new Set(data.map(d => d.time))];
    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);

    const getColor = (value: number) => {
        const percentage = (value - min) / (max - min);
        const alpha = 0.1 + percentage * 0.8;
        return `rgba(59, 130, 246, ${alpha})`;
    };

    return (
        <div className="flex items-center justify-center h-full">
            <table className="w-full text-center border-collapse text-sm">
                <thead>
                    <tr>
                        <th className="p-2 border dark:border-gray-600"></th>
                        {cols.map(c => <th key={c} className="p-2 border dark:border-gray-600 font-semibold">{c}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(r => (
                        <tr key={r}>
                            <td className="p-2 border dark:border-gray-600 font-semibold">{r}</td>
                            {cols.map(c => {
                                const cell = data.find(d => d.day === r && d.time === c);
                                return (
                                    <td key={c} className="p-2 border dark:border-gray-600 font-medium" style={{ backgroundColor: cell ? getColor(cell.value) : '#eee' }}>
                                        {cell?.value}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const CustomBoxPlotShape = (props: any) => {
    const { x, width, yAxis, payload } = props;
    if (!yAxis) return null; // Defensive check to prevent crash

    const { min, q1, median, q3, max } = payload;
    
    const yMin = yAxis.scale(min);
    const yQ1 = yAxis.scale(q1);
    const yMedian = yAxis.scale(median);
    const yQ3 = yAxis.scale(q3);
    const yMax = yAxis.scale(max);
    
    return (
        <g>
            <path d={`M ${x + width / 2},${yMax} L ${x + width / 2},${yQ3}`} stroke="currentColor" />
            <path d={`M ${x + width / 2},${yQ1} L ${x + width / 2},${yMin}`} stroke="currentColor" />
            <rect x={x} y={yQ3} width={width} height={yQ1 - yQ3} fill="#8884d8" stroke="currentColor" />
            <line x1={x} y1={yMedian} x2={x + width} y2={yMedian} stroke="white" strokeWidth={2} />
        </g>
    );
};

const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
    return (
        <g>
            <text x={cx} y={cy-10} dy={8} textAnchor="middle" fill={fill} className="font-bold text-lg">{payload.name}</text>
            <text x={cx} y={cy+10} dy={8} textAnchor="middle" fill="#999">{`(Value: ${payload.value})`}</text>
            <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 6} startAngle={startAngle} endAngle={endAngle} fill={fill} />
        </g>
    );
};


// --- MAIN COMPONENT ---

const DataVisualization: React.FC = () => {
    const [activeIndexPie, setActiveIndexPie] = useState<number | null>(null);

    const onPieEnter = (_: any, index: number) => setActiveIndexPie(index);
    const onPieLeave = () => setActiveIndexPie(null);

    const boxPlotYDomain = useMemo(() => {
        if (!boxPlotData || boxPlotData.length === 0) return [0, 100];
        const allValues = boxPlotData.flatMap(d => [d.min, d.max]);
        const min = Math.min(...allValues);
        const max = Math.max(...allValues);
        const padding = (max - min) * 0.1;
        return [Math.floor(min - padding), Math.ceil(max + padding)];
    }, []);

    return (
        <ModuleContainer title="數據視覺化">
             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    「一圖勝千言」。數據視覺化是將數據轉換為圖形或圖像的過程，它可以幫助我們快速理解數據中的模式、趨勢和異常值。選擇正確的圖表類型至關重要。
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                
                {/* --- EXISTING CHARTS --- */}
                <ChartCard title="長條圖 (Bar Chart)" description="適用於比較不同類別之間的數值大小。">
                    <ResponsiveContainer>
                        <BarChart data={barData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip wrapperStyle={{ zIndex: 10 }} />
                            <Legend />
                            <Bar dataKey="sales" name="銷售額" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
                 <ChartCard title="圓餅圖 (Pie Chart)" description="適用於顯示各部分佔整體的百分比。懸停可查看詳情。">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value"
                                // @ts-ignore
                                activeIndex={activeIndexPie ?? -1} activeShape={renderActiveShape} onMouseEnter={onPieEnter} onMouseLeave={onPieLeave}
                            >
                                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip wrapperStyle={{ zIndex: 10 }} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="折線圖 (Line Chart)" description="適用於展示數據隨時間變化的趨勢。">
                     <ResponsiveContainer>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="sales" name="銷售額" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
                 <ChartCard title="散佈圖 (Scatter Plot)" description="適用於觀察兩個變量之間的關係或分佈。">
                    <ResponsiveContainer>
                        <ScatterChart>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" name="廣告投入" />
                            <YAxis type="number" dataKey="y" name="銷售額" />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Legend />
                            <Scatter name="數據點" data={scatterData} fill="#ff7300" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* --- NEW CHARTS --- */}
                <ChartCard title="區域圖 (Area Chart)" description="強調數量隨時間變化的趨勢，並突顯總量。">
                    <ResponsiveContainer>
                        <AreaChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="sales" name="銷售額" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="盒鬚圖 (Box Plot)" description="展示一組數據的分佈情況，包括中位數、四分位數和異常值。">
                    <ResponsiveContainer>
                        <ComposedChart data={boxPlotData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" type="category" />
                            <YAxis type="number" domain={boxPlotYDomain} allowDataOverflow />
                            <Tooltip />
                            <Bar dataKey="q1" shape={<CustomBoxPlotShape />} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="泡泡雲 (Bubble Chart)" description="散佈圖的變體，用氣泡的大小表示第三個維度的數值。">
                    <ResponsiveContainer>
                        <ScatterChart>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" name="維度X" />
                            <YAxis type="number" dataKey="y" name="維度Y" />
                            <ZAxis type="number" dataKey="z" range={[100, 1000]} name="大小" />
                            <Tooltip />
                            <Legend />
                            <Scatter name="數據集" data={bubbleData} fill="#8884d8" shape="circle" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="靶心圖 (Bullseye Chart)" description="在圓形佈局中比較數值，適用於展示目標達成率。">
                    <ResponsiveContainer>
                        <RadialBarChart innerRadius="10%" outerRadius="80%" data={radialBarData} startAngle={180} endAngle={0}>
                            <RadialBar label={{ position: 'insideStart', fill: '#fff' }} background dataKey="value" />
                            <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                            <Tooltip />
                        </RadialBarChart>
                    </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="比較統計地圖 (模擬)" description="在地理區域上用顏色深淺表示數值大小，此為示意圖。">
                     <ResponsiveContainer>
                        <ScatterChart>
                            <XAxis type="number" dataKey="x" hide domain={[0, 100]} />
                            <YAxis type="number" dataKey="y" hide domain={[0, 100]} />
                            <ZAxis type="number" dataKey="value" range={[100, 1000]} />
                            <Tooltip />
                            <Scatter name="地區" data={mapData}>
                                {mapData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="環狀視圖 (Donut Chart)" description="圓餅圖的變體，中間的空心可用於顯示總計或其他資訊。">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5}>
                                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="點分佈圖 (Dot Plot)" description="用點的位置表示單一變量的分佈，適合比較不同類別。">
                    <ResponsiveContainer>
                        <ScatterChart layout="vertical">
                             <CartesianGrid />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" width={60} />
                            <Tooltip />
                            <Scatter name="數值" data={dotPlotData} fill="#8884d8" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="甘特圖 (Gantt Chart)" description="用於專案管理，展示任務的開始和結束時間。">
                     <ResponsiveContainer>
                        <BarChart data={ganttData} layout="vertical" margin={{ left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="task" width={60} />
                            <Tooltip />
                            <Legend />
                            <Bar name="起始時間" dataKey="start" stackId="a" fill="transparent" />
                            <Bar name="持續時間" dataKey="duration" stackId="a" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
                 <ChartCard title="熱圖 / 矩陣 (Heatmap)" description="用顏色表示二維矩陣中數值的大小，快速發現模式。">
                    <ResponsiveContainer>
                        <ScatterChart>
                             <XAxis type="category" dataKey="day" name="日期" />
                             <YAxis type="category" dataKey="time" name="時間" />
                             <Tooltip />
                             <Legend />
                             <ZAxis type="number" dataKey="value" range={[100, 500]} />
                             <Scatter name="數值" data={heatmapData} shape="square">
                                {heatmapData.map((entry, index) => {
                                    const value = entry.value;
                                    let fill = '#a4de6c';
                                    if (value > 30) fill = '#8dd1e1';
                                    if (value > 60) fill = '#8884d8';
                                    return <Cell key={`cell-${index}`} fill={fill} />;
                                })}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="醒目提示表格" description="將表格與熱圖結合，在單元格中顯示數值的同時用顏色標示大小。">
                    <HighlightTable data={heatmapData} />
                </ChartCard>
                 <ChartCard title="直方圖 (Histogram)" description="展示連續數據的分佈頻率，將數據分組為連續的區間。">
                     <ResponsiveContainer>
                        <BarChart data={histogramData} barCategoryGap="0%">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="range" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" name="頻率" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </ModuleContainer>
    );
};

export default DataVisualization;