import type { NavPart } from './types';
import { HomeIcon, BeakerIcon, ChartBarIcon, MagnifyingGlassIcon, PresentationChartLineIcon, CircleStackIcon, TableCellsIcon, DocumentChartBarIcon, SparklesIcon, BrainIcon, ViewColumnsIcon, Squares2X2Icon, CloudArrowUpIcon, ServerStackIcon, ArrowPathIcon, BookOpenIcon, BriefcaseIcon, AcademicCapIcon, RobotIcon } from './components/icons';

export enum ModuleId {
  // Part 1
  Introduction = 'introduction',
  DataThinking = 'data-thinking',
  CoreStatistics = 'core-statistics',
  
  // Part 2
  Visualization = 'visualization',
  Regression = 'regression',
  ExcelPivotTable = 'excel-pivot-table',

  // Part 3
  CustomerSegmentation = 'customer-segmentation',
  BusinessCaseStudy = 'business-case-study',
  AIAnalyst = 'ai-analyst',
  AIAssistant = 'ai-assistant',
  
  // Part 4
  MLIntroduction = 'ml-introduction',
  ClassificationModels = 'classification-models',
  ClusteringModels = 'clustering-models',

  // Part 5
  BigDataIntroduction = 'big-data-introduction',
  CloudDataWarehouse = 'cloud-data-warehouse',
  DataPipelines = 'data-pipelines',

  // Part 6
  DataStorytelling = 'data-storytelling',
  DataPortfolio = 'data-portfolio',
  CapstoneProject = 'capstone-project',
}

export const NAV_STRUCTURE: NavPart[] = [
  {
    title: '第一部分：數據分析基礎',
    items: [
      { id: ModuleId.Introduction, title: '課程簡介', icon: HomeIcon },
      { id: ModuleId.DataThinking, title: '數據思維與假設建立', icon: MagnifyingGlassIcon },
      { id: ModuleId.CoreStatistics, title: '核心統計概念', icon: BeakerIcon },
    ],
  },
  {
    title: '第二部分：核心分析技術',
    items: [
      { id: ModuleId.Visualization, title: '數據視覺化', icon: ChartBarIcon },
      { id: ModuleId.Regression, title: '迴歸分析實戰', icon: PresentationChartLineIcon },
      { id: ModuleId.ExcelPivotTable, title: 'Excel 數據透視表', icon: TableCellsIcon },
    ],
  },
    {
    title: '第三部分：進階應用與案例',
    items: [
      { id: ModuleId.CustomerSegmentation, title: '資料探勘：客戶分群', icon: CircleStackIcon },
      { id: ModuleId.BusinessCaseStudy, title: '商業案例分析', icon: DocumentChartBarIcon },
      { id: ModuleId.AIAnalyst, title: 'AI 數據分析師', icon: SparklesIcon },
      { id: ModuleId.AIAssistant, title: '通用 AI 數據助手', icon: RobotIcon },
    ],
  },
  {
    title: '第四部分：機器學習入門',
    items: [
      { id: ModuleId.MLIntroduction, title: '機器學習概論', icon: BrainIcon },
      { id: ModuleId.ClassificationModels, title: '分類模型實戰', icon: ViewColumnsIcon },
      { id: ModuleId.ClusteringModels, title: '分群模型實戰', icon: Squares2X2Icon },
    ],
  },
  {
    title: '第五部分：大數據與雲端技術',
    items: [
      { id: ModuleId.BigDataIntroduction, title: '大數據概論', icon: CloudArrowUpIcon },
      { id: ModuleId.CloudDataWarehouse, title: '雲端資料倉儲', icon: ServerStackIcon },
      { id: ModuleId.DataPipelines, title: '資料管道與ETL', icon: ArrowPathIcon },
    ],
  },
  {
    title: '第六部分：專業技能與總結',
    items: [
      { id: ModuleId.DataStorytelling, title: '數據故事力', icon: BookOpenIcon },
      { id: ModuleId.DataPortfolio, title: '打造數據分析作品集', icon: BriefcaseIcon },
      { id: ModuleId.CapstoneProject, title: '畢業專案', icon: AcademicCapIcon },
    ],
  },
];