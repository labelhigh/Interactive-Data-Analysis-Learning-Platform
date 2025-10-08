import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ModuleId, NAV_STRUCTURE } from './constants';
import Introduction from './modules/Introduction';
import DataThinking from './modules/DataThinking';
import CoreStatistics from './modules/CoreStatistics';
import DataVisualization from './modules/DataVisualization';
import RegressionAnalysis from './modules/RegressionAnalysis';
import ExcelPivotTable from './modules/ExcelPivotTable';
import CustomerSegmentation from './modules/CustomerSegmentation';
import BusinessCaseStudy from './modules/BusinessCaseStudy';
import AIDataAnalyst from './modules/AIDataAnalyst';
import AIAssistant from './modules/AIAssistant';
import MLIntroduction from './modules/MLIntroduction';
import ClassificationModels from './modules/ClassificationModels';
import ClusteringModels from './modules/ClusteringModels';
import BigDataIntroduction from './modules/BigDataIntroduction';
import CloudDataWarehouse from './modules/CloudDataWarehouse';
import DataPipelines from './modules/DataPipelines';
import DataStorytelling from './modules/DataStorytelling';
import DataPortfolio from './modules/DataPortfolio';
import CapstoneProject from './modules/CapstoneProject';

const moduleComponents = {
  [ModuleId.Introduction]: Introduction,
  [ModuleId.DataThinking]: DataThinking,
  [ModuleId.CoreStatistics]: CoreStatistics,
  [ModuleId.Visualization]: DataVisualization,
  [ModuleId.Regression]: RegressionAnalysis,
  [ModuleId.ExcelPivotTable]: ExcelPivotTable,
  [ModuleId.CustomerSegmentation]: CustomerSegmentation,
  [ModuleId.BusinessCaseStudy]: BusinessCaseStudy,
  [ModuleId.AIAnalyst]: AIDataAnalyst,
  [ModuleId.AIAssistant]: AIAssistant,
  [ModuleId.MLIntroduction]: MLIntroduction,
  [ModuleId.ClassificationModels]: ClassificationModels,
  [ModuleId.ClusteringModels]: ClusteringModels,
  [ModuleId.BigDataIntroduction]: BigDataIntroduction,
  [ModuleId.CloudDataWarehouse]: CloudDataWarehouse,
  [ModuleId.DataPipelines]: DataPipelines,
  [ModuleId.DataStorytelling]: DataStorytelling,
  [ModuleId.DataPortfolio]: DataPortfolio,
  [ModuleId.CapstoneProject]: CapstoneProject,
};

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleId>(ModuleId.Introduction);

  const ActiveModuleComponent = moduleComponents[activeModule] || Introduction;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <Sidebar
        navStructure={NAV_STRUCTURE}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
      />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <ActiveModuleComponent />
      </main>
    </div>
  );
};

export default App;