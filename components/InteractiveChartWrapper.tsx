
import React from 'react';

interface InteractiveChartWrapperProps {
  title: string;
  controls: React.ReactNode;
  chart: React.ReactNode;
  stats?: React.ReactNode;
}

const InteractiveChartWrapper: React.FC<InteractiveChartWrapperProps> = ({ title, controls, chart, stats }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{title}</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-200">參數調整</h4>
            {controls}
          </div>
          {stats && (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-200">動態統計</h4>
              {stats}
            </div>
          )}
        </div>
        <div className="lg:col-span-2 min-h-[300px] bg-gray-100 dark:bg-gray-900 p-4 rounded-lg flex items-center justify-center">
          {chart}
        </div>
      </div>
    </div>
  );
};

export default InteractiveChartWrapper;
