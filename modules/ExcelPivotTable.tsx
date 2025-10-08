
import React, { useState, useMemo } from 'react';
import ModuleContainer from '../components/ModuleContainer';
import {groupBy, sumBy} from 'lodash-es';

const sourceData = [
  { region: '北部', product: '咖啡', sales: 1200 },
  { region: '北部', product: '蛋糕', sales: 800 },
  { region: '中部', product: '咖啡', sales: 1500 },
  { region: '南部', product: '茶', sales: 600 },
  { region: '北部', product: '咖啡', sales: 1300 },
  { region: '中部', product: '蛋糕', sales: 900 },
  { region: '南部', product: '咖啡', sales: 1800 },
  { region: '北部', product: '茶', sales: 500 },
  { region: '中部', product: '咖啡', sales: 1600 },
  { region: '南部', product: '蛋糕', sales: 750 },
];

const fields = ['region', 'product'];
const valueField = 'sales';

const FieldSelector: React.FC<{ title: string; options: string[]; selected: string | null; onChange: (value: string | null) => void; disabledOption: string | null; }> = ({ title, options, selected, onChange, disabledOption }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{title}</label>
    <select
      value={selected ?? ''}
      onChange={(e) => onChange(e.target.value || null)}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option value="">(無)</option>
      {options.map(opt => (
        <option key={opt} value={opt} disabled={opt === disabledOption}>
          {opt === 'region' ? '地區' : '產品'}
        </option>
      ))}
    </select>
  </div>
);

const DataTable: React.FC<{ data: Record<string, any>[]; headers: string[] }> = ({ data, headers }) => (
  <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {headers.map(h => <th key={h} scope="col" className="px-6 py-3">{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {headers.map(h => <td key={h} className="px-6 py-4">{row[h]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


const ExcelPivotTable: React.FC = () => {
    const [rowField, setRowField] = useState<string | null>('region');
    const [colField, setColField] = useState<string | null>('product');

    const pivotData = useMemo(() => {
        if (!rowField || !colField) {
            return [];
        }

        const groupedByRow = groupBy(sourceData, rowField);
        const colHeaders = [...new Set(sourceData.map(d => d[colField as keyof typeof d]))].sort();

        return Object.entries(groupedByRow).map(([rowValue, records]) => {
            const row: Record<string, any> = { [rowField]: rowValue };
            colHeaders.forEach(colValue => {
                // Fix: Cast `records` from `unknown` to the correct array type.
                // TypeScript can fail to infer the type correctly from `Object.entries` on a grouped object.
                const filtered = (records as typeof sourceData).filter(r => r[colField as keyof typeof r] === colValue);
                row[String(colValue)] = sumBy(filtered, valueField);
            });
            return row;
        });

    }, [rowField, colField]);
    
    // FIX: The pivotHeaders variable was incorrectly typed as (string | number | null)[],
    // which is incompatible with the DataTable's `headers` prop (string[]).
    // This new logic ensures `pivotHeaders` is always a `string[]` by checking that
    // both `rowField` and `colField` are selected, which matches the rendering logic.
    // It also explicitly converts column values to strings.
    const pivotHeaders = (colField && rowField) ? [rowField, ...[...new Set(sourceData.map(d => String(d[colField as keyof typeof d])))].sort()] : [];

    return (
        <ModuleContainer title="Excel 數據透視表模擬">
             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    數據透視表是 Excel 中最強大的功能之一，它能幫助您快速匯總、分析和呈現大量數據。本模擬器將讓您體驗如何透過選擇「列」與「欄」來動態重塑數據。
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">透視表欄位</h3>
                        <div className="space-y-4">
                             <FieldSelector title="選擇『列』的欄位" options={fields} selected={rowField} onChange={setRowField} disabledOption={colField} />
                             <FieldSelector title="選擇『欄』的欄位" options={fields} selected={colField} onChange={setColField} disabledOption={rowField} />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">值的欄位</label>
                                <p className="bg-gray-100 dark:bg-gray-700 p-2.5 rounded-lg text-sm">{valueField} (總計)</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">結果：數據透視表</h3>
                    {rowField && colField ? (
                        <DataTable data={pivotData} headers={pivotHeaders.map(h => h === 'region' ? '地區' : h === 'product' ? '產品' : h)} />
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center border border-gray-200 dark:border-gray-700 h-full flex items-center justify-center">
                            <p className="text-gray-500 dark:text-gray-400">請從左側選擇「列」和「欄」的欄位來生成透視表。</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">原始數據</h3>
                <DataTable 
                  data={sourceData.map(item => ({ '地區': item.region, '產品': item.product, '銷售額': item.sales }))} 
                  headers={['地區', '產品', '銷售額']} 
                />
            </div>
        </ModuleContainer>
    );
};

export default ExcelPivotTable;
