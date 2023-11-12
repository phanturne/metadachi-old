"use client"
import {Button, useColorScheme} from "@mui/joy";
import {useEffect, useState} from "react";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="outlined" color="neutral" sx={{ width: 120 }} />;
  }

  return (
    <Button
      variant="outlined"
      color="neutral"
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    >
      {mode === 'dark' ? 'Turn light' : 'Turn dark'}
    </Button>
  );
};


export default function Home() {
  return (
    <main>
      <p>Home</p>
      <ModeToggle />
    </main>
  )
}
