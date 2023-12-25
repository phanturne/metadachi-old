import IconButton from '@mui/joy/IconButton';
import { useState } from 'react';
import Input, { InputProps } from '@mui/joy/Input';
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';

export function PasswordInput(props: InputProps) {
  const [visible, setVisible] = useState(false);

  function changeVisibility() {
    setVisible(!visible);
  }

  return (
    <Input
      {...props}
      type={visible ? 'text' : 'password'}
      endDecorator={
        <IconButton onClick={changeVisibility}>
          {visible ? <VisibilityRounded /> : <VisibilityOffRounded />}
        </IconButton>
      }
    />
  );
}
