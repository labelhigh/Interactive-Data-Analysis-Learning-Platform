
import React from 'react';

interface ModuleContainerProps {
  title: string;
  children: React.ReactNode;
}

const ModuleContainer: React.FC<ModuleContainerProps> = ({ title, children }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{title}</h2>
      <div className="w-24 h-1.5 bg-blue-500 rounded-full mb-8"></div>
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
};

export default ModuleContainer;
