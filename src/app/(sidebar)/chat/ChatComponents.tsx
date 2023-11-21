import { Avatar, Box, Stack, Textarea, Typography } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import { Send } from '@mui/icons-material';

function ChatBubble({ m }: { m: Message }) {
  const fromUser = m.role === 'user';
  return (
    <Stack direction={fromUser ? 'row-reverse' : 'row'}>
      <Avatar variant={fromUser ? 'outlined' : 'solid'} />
      <Box sx={{ maxWidth: '60%', minWidth: 'auto' }}>
        <Sheet
          color={fromUser ? 'primary' : 'neutral'}
          variant={fromUser ? 'solid' : 'solid'}
          sx={{
            p: 1,
            borderRadius: 'lg',
            borderTopRightRadius: fromUser ? 0 : 'lg',
            borderTopLeftRadius: fromUser ? 'lg' : 0,
            marginLeft: fromUser ? 0 : 2,
            marginRight: fromUser ? 2 : 0,
            backgroundColor: fromUser
              ? 'var(--joy-palette-primary-solidBg)'
              : 'var(--joy-palette-primary-solidBg)',
          }}
        >
          <Typography
            sx={{
              color: 'var(--joy-palette-text-primary)',
            }}
          >
            {m.content}
          </Typography>
        </Sheet>
      </Box>
    </Stack>
  );
}

export function ChatMessages({ messages }: { messages: Message[] }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'scroll',
        px: 5,
        flexDirection: 'column-reverse',
      }}
    >
      <Stack gap={1.5} sx={{ py: 2 }}>
        {[...Array(100)].map((item, index) => (
          <Typography key={index}>Content</Typography>
        ))}
        {messages.map((m) => (
          <ChatBubble key={m.id} m={m} />
        ))}
      </Stack>
    </Box>
  );
}

export default function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
}: {
  input: string;
  handleInputChange: (event: any) => void;
  handleSubmit: (event: any) => void;
}) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <Box sx={{ px: 5, py: 2 }}>
      <form onSubmit={handleSubmit}>
        <Textarea
          placeholder='Send a message'
          maxRows={20}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
          endDecorator={
            <IconButton sx={{ mt: -1 }}>
              <Send />
            </IconButton>
          }
        />
      </form>
    </Box>
  );
}
