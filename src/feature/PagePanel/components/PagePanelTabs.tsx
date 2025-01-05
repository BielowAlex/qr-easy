'use client';
import { usePagePanelStore } from '@/feature';
import { PagePanelTabsEnum } from '@/types';
import { Tab, Tabs, useTheme } from '@mui/material';
import React from 'react';

const PagePanelTabs: React.FC = () => {
  const { currentPanelTab, setPanelTab } = usePagePanelStore();

  const { palette } = useTheme();

  const handleChangeTab = (
    event: React.SyntheticEvent,
    newValue: PagePanelTabsEnum
  ) => {
    setPanelTab(newValue);
  };

  return (
    <Tabs
      value={currentPanelTab}
      onChange={handleChangeTab}
      sx={{
        borderBottom: '1px solid',
        borderColor: palette.grey[200],
      }}
    >
      <Tab
        value={PagePanelTabsEnum.BASIC_INFO}
        label={'Basic Info'}
        sx={{ fontWeight: 600 }}
      />
      <Tab
        value={PagePanelTabsEnum.PHOTOS}
        label={'Photos'}
        sx={{ fontWeight: 600 }}
      />
      <Tab
        value={PagePanelTabsEnum.LOCATION}
        label={'Location'}
        sx={{ fontWeight: 600 }}
      />
      <Tab
        value={PagePanelTabsEnum.DESCRIPTION}
        label={'Description'}
        sx={{ fontWeight: 600 }}
      />
    </Tabs>
  );
};

export { PagePanelTabs };
