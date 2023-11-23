
# Angular-Electron Template  

Effortlessly start your project using Angular 17 and Electron 27, and create your amazing desktop applications! 

## Features  

- 📦 Packaging: `electron-builder` is already configured for packaging and distributing applications;
- 🔥 Hot Reload: Watch live changes in your Angular application without restarting the electron app, while developing!;
- 🛡 Safety: This template enforces context isolation principle, making Electron app safer;
- 🏎 High performances: both Angular and Electron applications are compiled using `esbuild`, reducing bundle size and improving app performance;
- ⚙ Storage: Persist data through executions using embedded  `AppStore`;
- 🧪Test suite: `jest` is already configured for unit tests.  

## Setting up the project  

1. Create a repository from this template clicking on **Use this template** button at the top of this page;

2. Clone the newly generated repository;

3. Install dependencies

   `npm install`  

4. Set a proper `productName` and `appId` in `electron-builder.json` file;

Et voila! You are ready to build your amazing desktop app with Angular!

If you want to start the application in development mode, enabling hot reload, you will just need to run `npm start`.

  

## Calling Node features from Renderer process  

As stated in the Features section, using Node packages directly in the renderer process is not possible, since context isolation is enforced.

But there is an easy way to enable our Angular application to use packages like `fs` or `childProcess`:  

1. Configure `ipcMain` listener in Electron process (`main.ts` in `electron` folder). For example:

       import {ipcMain} from 'electron';
       import {spawn} from 'child_process';
       ...
       ipcMain.on('start-process', (event, args) => spawn('myProcess', args))

2.  Expose a new API in `preload.ts` file:

        import { contextBridge, ipcRenderer } from 'electron';
        contextBridge.exposeInMainWorld('runProcess', {
            run: (...args: any[]) => ipcRenderer.send('start-process', ...args)
        });

3. Extend `window` object in `src/renderer.d.ts` file:

       export {};
       
       interface RunProcessApi {
           run: (...args: any[]) => void;
       }
       
       declare global{
	       interface Window{
		       runProcess: RunProcessApi
	       }
       }
4. Add `preload` option to your `BrowserWindow` in `main.ts` file

       const  win = new BrowserWindow({
           ...
           webPreferences: {
               ...
               preload:  path.join(__dirname, './preload.js'),
               ...
           },
           ...
          });

After that, you will be able to call `window.runProcess.run(...)` in your Angular application.

You can different preload scripts for different windows, but don't forget to update `esbuild-electron` script in `package.json`, to include all the scripts to be compiled.
 
