// Source: https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web/blob/e69d20a2092686fbfa2f67b2398019207969e892/app/azure.ts

export function makeAzurePath(path: string, apiVersion: string) {
  // should omit /v1 prefix
  path = path.replaceAll('v1/', '');

  // should add api-key to query string
  path += `${path.includes('?') ? '&' : '?'}api-version=${apiVersion}`;

  return path;
}
