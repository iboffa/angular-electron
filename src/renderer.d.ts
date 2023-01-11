export {}

interface AppStore {
  get: (prop: string) => any;
  set: (prop: string, value: any) => void;
  delete: (prop: string) => void;
}

declare global {
  interface Window {
    appStore: AppStore
    // you can add here APIs defined in preload.ts for autocompletion.
  }
}
