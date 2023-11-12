"use client";

import {useGlobalShortcut} from "@/tauri/shortcuts";
import {useEffect} from "react";

export default function TauriConfig() {
  // Register global shortcut to show/hide app
  useGlobalShortcut("Alt+A", async () => {
    const { appWindow} = await import("@tauri-apps/api/window");

    if (await appWindow.isVisible()) {
      await appWindow.hide();
    } else {
      await appWindow.show();
      await appWindow.setFocus();
    }
  });

  // Hide app when focus is lost and app is still visible (not manually hidden by user)
  useEffect(() => {
    if (!('__TAURI__' in window)) return;

    (async () => {
      const { appWindow} = await import("@tauri-apps/api/window");

      await appWindow.onFocusChanged(async ({payload: focused}) => {
        if (!focused && await appWindow.isVisible()) {
          await appWindow.hide();
        }
      });
    })();
  }, []);

  return null;
  // return <>{(typeof window !== "undefined") && window.__TAURI__ && <Config></Config>}</>;
}