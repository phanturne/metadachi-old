import { useEffect, useState } from "react";
// import { showToast } from "./components/ui-lib";
import { INPUT_PREFIXES } from "@/constants";

/**
 * Extracts user input, removing command or bot prefixes if present.
 *
 * @param {string} input - The user input string.
 * @returns {{ prefix: string | null, input: string }} - An object containing the prefix and the extracted user input.
 */
export function extractPrefix(input: string) {
  const hasPrefix = INPUT_PREFIXES.some((p) => input.startsWith(p));
  const extractedInput = !hasPrefix ? input : input.slice(1);

  return {
    prefix: hasPrefix ? input[0] : null,
    message: extractedInput,
  };
}

export function extractCommand(input: string) {
  const spaceIndex = input.indexOf(" ");
  return {
    command:
      spaceIndex === -1 ? input.substring(1) : input.substring(1, spaceIndex),
    message: spaceIndex === -1 ? "" : input.substring(spaceIndex + 1),
  };
}

export function trimTopic(topic: string) {
  // Fix an issue where double quotes still show in the Indonesian language
  // This will remove the specified punctuation from the end of the string
  // and also trim quotes from both the start and end if they exist.
  return topic
    .replace(/^["“”]+|["“”]+$/g, "")
    .replace(/[，。！？”“"、,.!?]*$/, "");
}

export async function copyToClipboard(text: string) {
  try {
    if (window.__TAURI__) {
      window.__TAURI__.writeText(text);
    } else {
      await navigator.clipboard.writeText(text);
    }

    // TODO: Replace showToast()
    // showToast(Locale.Copy.Success);
  } catch (error) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      // TODO: Replace showToast()
      // showToast(Locale.Copy.Success);
    } catch (error) {
      // TODO: Replace showToast()
      // showToast(Locale.Copy.Failed);
    }
    document.body.removeChild(textArea);
  }
}

export async function downloadAs(text: string, filename: string) {
  if (window.__TAURI__) {
    const result = await window.__TAURI__.dialog.save({
      defaultPath: `${filename}`,
      filters: [
        {
          name: `${filename.split(".").pop()} files`,
          extensions: [`${filename.split(".").pop()}`],
        },
        {
          name: "All Files",
          extensions: ["*"],
        },
      ],
    });

    if (result !== null) {
      try {
        await window.__TAURI__.fs.writeBinaryFile(
          result,
          new Uint8Array([...text].map((c) => c.charCodeAt(0))),
        );
        // TODO: Replace showToast()
        // showToast(Locale.Download.Success);
      } catch (error) {
        // TODO: Replace showToast()
        // showToast(Locale.Download.Failed);
      }
    } else {
      // TODO: Replace showToast()
      // showToast(Locale.Download.Failed);
    }
  } else {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text),
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}
export function readFromFile() {
  return new Promise<string>((res, rej) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";

    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        res(e.target.result);
      };
      fileReader.onerror = (e) => rej(e);
      fileReader.readAsText(file);
    };

    fileInput.click();
  });
}

export function isIOS() {
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1000,
    height: typeof window !== "undefined" ? window.innerHeight : 1000,
  });

  useEffect(() => {
    const onResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return size;
}

export const MOBILE_MAX_WIDTH = 600;
export function useMobileScreen() {
  const { width } = useWindowSize();

  return width <= MOBILE_MAX_WIDTH;
}

export const SHORT_WINDOW_HEIGHT = 500;
export function useShortWindow() {
  const { height } = useWindowSize();

  return height <= SHORT_WINDOW_HEIGHT;
}

export function isFirefox() {
  return (
    typeof navigator !== "undefined" && /firefox/i.test(navigator.userAgent)
  );
}

export function selectOrCopy(el: HTMLElement, content: string) {
  const currentSelection = window.getSelection();

  if (currentSelection?.type === "Range") {
    return false;
  }

  copyToClipboard(content);

  return true;
}

/**
 * Detects Macintosh
 */
export function isMacOS(): boolean {
  if (typeof window !== "undefined") {
    let userAgent = window.navigator.userAgent.toLocaleLowerCase();
    const macintosh = /iphone|ipad|ipod|macintosh/.test(userAgent);
    return !!macintosh;
  }
  return false;
}
