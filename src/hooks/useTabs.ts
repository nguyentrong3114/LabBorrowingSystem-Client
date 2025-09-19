import { useState } from 'react';

export const useTabs = (defaultTab: string) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  return {
    activeTab,
    setActiveTab,
    handleTabChange
  };
};