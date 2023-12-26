import Stack from '@mui/joy/Stack';
import { TabPanel } from '@mui/joy';
import * as React from 'react';
import { useEffect } from 'react';
import Card from '@mui/joy/Card';
import { useAccessStore } from '@/stores';
import Locale from '@/locales';
import { PasswordInput } from '@/components/Input';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import { OPENAI_BASE_URL } from '@/constants';

export default function ApiSettings() {
  const accessStore = useAccessStore();

  useEffect(() => {
    accessStore.update((access) => (access.useCustomConfig = true));
  }, []);

  return (
    <TabPanel value='api'>
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Stack direction='column' spacing={2} sx={{ my: 1 }}>
            {/*Access Code*/}
            <Typography level='title-sm'>
              {Locale.Settings.Access.AccessCode.Title}
            </Typography>
            <PasswordInput
              value={accessStore.accessCode}
              placeholder={Locale.Settings.Access.AccessCode.Placeholder}
              onChange={(e) => {
                accessStore.update(
                  (access) => (access.accessCode = e.currentTarget.value)
                );
              }}
            />

            {/*OpenAI Endpoint*/}
            <Typography level='title-sm'>
              {Locale.Settings.Access.OpenAI.Endpoint.Title}
            </Typography>
            <Input
              value={accessStore.openaiUrl}
              placeholder={OPENAI_BASE_URL}
              onChange={(e) =>
                accessStore.update(
                  (access) => (access.openaiUrl = e.currentTarget.value)
                )
              }
            />

            {/*OpenAI API Key*/}
            <Typography level='title-sm'>
              {Locale.Settings.Access.OpenAI.ApiKey.Title}
            </Typography>
            <PasswordInput
              value={accessStore.openaiApiKey}
              placeholder={Locale.Settings.Access.OpenAI.ApiKey.Placeholder}
              onChange={(e) => {
                accessStore.update(
                  (access) => (access.openaiApiKey = e.currentTarget.value)
                );
              }}
            />
          </Stack>
        </Card>
      </Stack>
    </TabPanel>
  );
}
