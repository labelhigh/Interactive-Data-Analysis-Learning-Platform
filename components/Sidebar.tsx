
import React from 'react';
import type { NavPart } from '../types';
import { ModuleId } from '../constants';

interface SidebarProps {
  navStructure: NavPart[];
  activeModule: ModuleId;
  setActiveModule: (moduleId: ModuleId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ navStructure, activeModule, setActiveModule }) => {
  return (
    <aside className="w-72 bg-white dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col shadow-lg">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">數據分析平台</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">互動式學習 V2</p>
      </div>
      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        {navStructure.map((part, index) => (
          <div key={index}>
            <h2 className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {part.title}
            </h2>
            <div className="space-y-1">
              {part.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                return (
                  <a
                    key={item.id}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveModule(item.id);
                    }}
                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span className="flex-grow">{item.title}</span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2025 互動學習平台</p>
      </div>
    </aside>
  );
};
