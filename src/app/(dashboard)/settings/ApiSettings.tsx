import Stack from '@mui/joy/Stack';
import { TabPanel } from '@mui/joy';
import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Card from '@mui/joy/Card';
import { useAccessStore } from '@/stores';
import Locale from '@/locales';
import { PasswordInput } from '@/components/Input';

export default function ApiSettings() {
  const accessStore = useAccessStore();

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
            <FormControl>
              <FormLabel>
                {Locale.Settings.Access.OpenAI.ApiKey.Title}
              </FormLabel>

              {/*OpenAI API Key*/}
              <PasswordInput
                value={accessStore.openaiApiKey}
                placeholder={Locale.Settings.Access.OpenAI.ApiKey.Placeholder}
                onChange={(e) => {
                  accessStore.update(
                    (access) => (access.openaiApiKey = e.currentTarget.value)
                  );
                }}
              />
            </FormControl>
          </Stack>
        </Card>
      </Stack>
    </TabPanel>
  );
}
