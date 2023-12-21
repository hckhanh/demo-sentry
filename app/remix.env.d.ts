/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />
/// <reference types="@remix-run/node" />

declare const grecaptcha: {
  enterprise: {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
    reset: () => void;
  }
};

declare const document: any