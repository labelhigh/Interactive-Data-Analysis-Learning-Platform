import React, { useState } from 'react';
import ModuleContainer from '../components/ModuleContainer';
import { PresentationAnalyticsIcon, BrandGithubIcon, ExternalLinkIcon, BriefcaseIcon } from '../components/icons';

const TipCard: React.FC<{ title: string; description: string; Icon: React.FC<{ className?: string }> }> = ({ title, description, Icon }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-3">
            <Icon className="w-8 h-8 text-blue-500 mr-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
);

interface ProjectDetails {
    title: string;
    problem: string;
    process: string;
    tools: string;
    findings: string;
}

const ShowcaseTemplate: React.FC = () => {
    const [details, setDetails] = useState<ProjectDetails>({
        title: '',
        problem: '',
        process: '',
        tools: '',
        findings: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDetails(prev => ({ ...prev, [name]: value }));
    };

    const generatedMarkdown = `
### ${details.title || '專案標題'}

**1. 問題陳述 (Problem Statement):**
${details.problem || '這裡描述您試圖解決的商業問題或您想探討的研究問題。'}

**2. 分析過程 (Analysis Process):**
${details.process || '簡述您的分析步驟，例如：數據清理、特徵工程、探索性數據分析(EDA)、模型建立等。'}

**3. 使用工具 (Tools Used):**
- ${details.tools || 'Python (Pandas, Scikit-learn), SQL, Tableau'}

**4. 主要發現與結論 (Key Findings & Conclusion):**
${details.findings || '總結您最重要的發現，並解釋它們的商業意涵。最好使用量化結果來支撐您的結論。'}
    `.trim();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">互動練習：專案展示模板</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                一個好的專案描述是作品集的靈魂。請在左側的欄位中填寫您自己專案的資訊，右側將即時為您生成一段結構清晰、專業的專案描述。您可以直接複製使用！
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <TemplateInput name="title" label="專案標題" value={details.title} onChange={handleChange} placeholder="例如：電商客戶流失預測分析" />
                    <TemplateInput name="problem" label="問題陳述" value={details.problem} onChange={handleChange} type="textarea" placeholder="我們要解決什麼問題？" />
                    <TemplateInput name="process" label="分析過程" value={details.process} onChange={handleChange} type="textarea" placeholder="您是如何一步步分析的？" />
                    <TemplateInput name="tools" label="使用工具" value={details.tools} onChange={handleChange} placeholder="例如：SQL, Python, Tableau" />
                    <TemplateInput name="findings" label="主要發現" value={details.findings} onChange={handleChange} type="textarea" placeholder="您最重要的發現是什麼？" />
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">生成結果 (Markdown 格式)</h4>
                    <pre className="text-xs bg-white dark:bg-gray-800 p-3 rounded-md whitespace-pre-wrap font-mono text-gray-800 dark:text-gray-200 h-[300px] overflow-y-auto">
                        <code>{generatedMarkdown}</code>
                    </pre>
                     <button 
                        onClick={() => navigator.clipboard.writeText(generatedMarkdown)}
                        className="mt-2 w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        複製到剪貼簿
                    </button>
                </div>
            </div>
        </div>
    );
};

const TemplateInput: React.FC<{
    name: keyof ProjectDetails;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    type?: 'text' | 'textarea';
}> = ({ name, label, value, onChange, placeholder, type = 'text' }) => (
    <div>
        <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        {type === 'textarea' ? (
            <textarea
                id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} rows={2}
                className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
        ) : (
            <input
                type="text" id={name} name={name} value={value} onChange={onChange} placeholder={placeholder}
                className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
        )}
    </div>
);


const DataPortfolio: React.FC = () => {
    return (
        <ModuleContainer title="打造數據分析作品集">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    作品集是您向潛在雇主展示數據分析能力的最佳證明。它不僅僅是您技能的列表，更是您解決問題思路、商業理解力和溝通能力的體現。一個優秀的作品集，勝過千言萬語。
                </p>
            </div>
             <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">作品集的關鍵要素</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <TipCard title="挑選有意義的專案" Icon={BriefcaseIcon} description="選擇那些能體現您解決實際問題能力的專案。最好是端到端的分析，從定義問題、數據清理、分析建模到提出商業建議。" />
                    <TipCard title="結構化地呈現" Icon={PresentationAnalyticsIcon} description="為每個專案建立清晰的敘事結構：問題背景、分析方法、使用的工具、關鍵發現和最終結論。讓讀者能快速掌握專案的核心價值。" />
                    <TipCard title="選擇合適的平台" Icon={BrandGithubIcon} description="利用 GitHub、個人部落格或 Tableau Public 等平台來展示您的專案。確保程式碼整潔、有註解，並提供一個易於閱讀的 README 文件。" />
                </div>
            </div>
             <div className="mt-8">
                <ShowcaseTemplate />
            </div>
        </ModuleContainer>
    );
};

export default DataPortfolio;