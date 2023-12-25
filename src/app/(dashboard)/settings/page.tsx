// Source: https://github.com/mui/material-ui/blob/master/docs/data/joy/getting-started/templates/profile-dashboard/components/MyProfile.tsx

'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { Tab, tabClasses, TabList, Tabs } from '@mui/joy';
import AccountSettings from '@/app/(dashboard)/settings/AccountSettings';
import ApiSettings from '@/app/(dashboard)/settings/ApiSettings';
import { useSearchParams } from 'next/navigation';

const tabs = [
  // { value: 'account', label: 'Account' },
  { value: 'api', label: 'API Keys' },
];

export default function SettingsPage() {
  const searchParams = useSearchParams();
  let tab = searchParams.get('tab');
  if (!tabs.some((t) => t.value === tab)) {
    tab = tabs[0].value;
  }

  return (
    <Box sx={{ overflow: 'auto' }}>
      <Typography level='h2' sx={{ mt: 1, mb: 2, px: { xs: 2, md: 6 }, pt: 3 }}>
        Settings
      </Typography>

      <Tabs
        defaultValue={tab}
        sx={{
          bgcolor: 'transparent',
          pl: { xs: 0, md: 4 },
        }}
      >
        <TabList
          tabFlex={1}
          size='sm'
          sx={{
            justifyContent: 'left',
            [`&& .${tabClasses.root}`]: {
              fontWeight: '600',
              flex: 'initial',
              color: 'text.tertiary',
              [`&.${tabClasses.selected}`]: {
                bgcolor: 'transparent',
                color: 'text.primary',
                '&::after': {
                  height: '2px',
                  bgcolor: 'primary.500',
                },
              },
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              sx={{ borderRadius: '6px 6px 0 0' }}
              indicatorInset
              value={tab.value}
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>

        <AccountSettings />
        <ApiSettings />
      </Tabs>
    </Box>
  );
}
