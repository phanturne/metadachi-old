'use client';

import Header from '@/ui/header/Header';
import { Tab, tabClasses, TabList, TabPanel, Tabs } from '@mui/joy';
import BotsTab from '@/app/(sidebar)/discover/BotsTab';

export default function DiscoverPage() {
  return (
    <>
      <Header />
      <Tabs
        aria-label='tabs'
        defaultValue='bots'
        sx={{ bgColor: 'transparent', overflowY: 'scroll' }}
      >
        <TabList
          disableUnderline
          sx={{
            p: 0.5,
            gap: 0.5,
            borderRadius: 'xl',
            bgColor: 'background.level1',
            width: 425,
            [`& .${tabClasses.root}[aria-selected="true"]`]: {
              boxShadow: 'sm',
              bgColor: 'background.surface',
            },
          }}
        >
          <Tab disableIndicator value='bots'>
            Bots
          </Tab>
          <Tab disableIndicator value='prompts'>
            Prompts
          </Tab>
          <Tab disableIndicator value='chats'>
            Chats
          </Tab>
          <Tab disableIndicator value='images'>
            Images
          </Tab>
          <Tab disableIndicator value='pets'>
            Pets
          </Tab>
        </TabList>
        <BotsTab />
        <TabPanel value='prompts'>Content for Prompts Tab</TabPanel>
        <TabPanel value='chats'>Content for Chats Tab</TabPanel>
        <TabPanel value='images'>Content for Images Tab</TabPanel>
        <TabPanel value='pets'>Content for Pets Tab</TabPanel>
      </Tabs>
    </>
  );
}
