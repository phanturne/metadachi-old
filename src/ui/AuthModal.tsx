import { FormEvent, useState } from 'react';
import {
  Button,
  DialogContent,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Modal,
  ModalDialog,
  Stack,
  Typography,
} from '@mui/joy';
import { useRouter } from 'next/navigation';
import Box from '@mui/joy/Box';
import { supabase } from '@/lib/utils/supabaseClient';
import { InfoOutlined } from '@mui/icons-material';

export enum AuthFormType {
  Login,
  SignUp,
  ResetPassword,
}

export default function AuthModal({
  isAuthPage,
  onClose,
}: {
  isAuthPage?: boolean;
  onClose?: () => void;
}) {
  const [authFormType, setAuthFormType] = useState<AuthFormType>(
    AuthFormType.Login
  );
  const [open, setOpen] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const isApp = process.env.NEXT_PUBLIC_BUILD_MODE === 'export';

  function afterSubmit() {
    setOpen(false);

    if (isAuthPage) {
      router.push('/chat');
    }
  }

  function LoginForm() {
    return (
      <form
        onSubmit={async (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());

          const { data, error } = await supabase.auth.signInWithPassword({
            email: formJson['email'] as string,
            password: formJson['password'] as string,
          });

          // Show error message and return early if the login failed
          if (error) {
            setError(true);
            return;
          }

          afterSubmit();
        }}
      >
        <Stack spacing={2}>
          <Typography level='h1'>Welcome Back!</Typography>
          <FormControl error={error}>
            <FormLabel>Email</FormLabel>
            <Input name='email' type='email' autoFocus required />
          </FormControl>
          <FormControl error={error}>
            <FormLabel>Password</FormLabel>
            <Input name='password' type='password' required />
            {error && (
              <FormHelperText>
                <InfoOutlined />
                Invalid Credentials
              </FormHelperText>
            )}
          </FormControl>
          <Button type='submit'>Submit</Button>
          <Typography
            endDecorator={
              <Link
                component='button'
                onClick={() => {
                  setAuthFormType(AuthFormType.SignUp);
                }}
              >
                Sign up
              </Link>
            }
            fontSize='sm'
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Stack>
      </form>
    );
  }

  function SignUpForm() {
    return (
      <form
        onSubmit={async (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());

          const { data, error } = await supabase.auth.signUp({
            email: formJson['email'] as string,
            password: formJson['password'] as string,
          });

          // Show error message and return early if the login failed
          if (error) {
            setError(true);
            return;
          }

          afterSubmit();
        }}
      >
        <Stack spacing={2}>
          <Typography level='h1'>Join Now!</Typography>
          <FormControl error={error}>
            <FormLabel>Email</FormLabel>
            <Input name='email' type='email' autoFocus required />
          </FormControl>
          <FormControl error={error}>
            <FormLabel>Password</FormLabel>
            <Input name='password' type='password' required />
            {error && (
              <FormHelperText>
                <InfoOutlined />
                Invalid Credentials
              </FormHelperText>
            )}
          </FormControl>
          <Button type='submit'>Submit</Button>
          <Typography
            endDecorator={
              <Link
                component='button'
                onClick={() => {
                  setAuthFormType(AuthFormType.Login);
                }}
              >
                Login
              </Link>
            }
            fontSize='sm'
            sx={{ alignSelf: 'center' }}
          >
            Already have an account?
          </Typography>
        </Stack>
      </form>
    );
  }

  return (
    <Modal
      open={open}
      disableEscapeKeyDown={isAuthPage}
      onClose={() => {
        setOpen(false);
        onClose?.();
      }}
    >
      <ModalDialog layout={isAuthPage ? 'fullscreen' : 'center'} sx={{ p: 0 }}>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              height: isApp ? '100dvh' : 'auto',
            }}
          >
            {/*<Image*/}
            {/*  src=''*/}
            {/*  width={0}*/}
            {/*  height={0}*/}
            {/*  alt={'Image'}*/}
            {/*  style={{ width: '100%', height: 'auto' }}*/}
            {/*/>*/}
            <Box sx={{ p: 5 }}>
              {authFormType === AuthFormType.Login && <LoginForm />}
              {authFormType === AuthFormType.SignUp && <SignUpForm />}
            </Box>
          </Box>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
