
import React from 'react';
import { ModuleId } from './constants';

export interface NavItem {
  id: ModuleId;
  title: string;
  icon: React.FC<{ className?: string }>;
}

export interface NavPart {
  title: string;
  items: NavItem[];
}
