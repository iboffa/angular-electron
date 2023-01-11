import { contextBridge, ipcRenderer } from 'electron';

// To call Node and Electron features from renderer, it is possible to extend "window" object here

// Example:
// contextBridge.exposeInMainWorld('myApi', {
//  sendMessage: (myMessage) => ipcRenderer.send('message', myMessage)
// })

// in the Angular application, you will be able to access window.myApi.sendMessage() to use this API.
// You can define interfaces in renderer.d.ts file for autocompletion

contextBridge.exposeInMainWorld('appStore', {
    get: (prop: string) => ipcRenderer.sendSync('store:get', prop),
    set: (prop: string, value: any) => ipcRenderer.send('store:set', prop, value),
    delete: (prop: string) => ipcRenderer.send('store:delete', prop)
})