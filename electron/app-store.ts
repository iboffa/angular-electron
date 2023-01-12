import { ipcMain } from 'electron';
import { Options } from 'electron-store';

// This cannot be converted to an import for how "Store" is defined within electron-store library. It would break esbuild compilation
const Store = require('electron-store');

export class AppStore {

    private static _store: typeof Store;
    private constructor() { };

    static init(options?: Options<any>) {
        if (!this._store) {
            this._store = new Store(options);
            ipcMain.on('store:set', (event, prop: string, value: any) => this._store.set(prop, value));
            ipcMain.on('store:get', (event, prop: string) => { event.returnValue = this._store.get(prop) });
            ipcMain.on('store:delete', (event, prop: string) => { this._store.delete(prop)});
        }
    }

    // Since _store is private, these methods are needed to access the store within the Electron Process

    static set(prop: string, value: any) {
        this._store.set(prop, value)
    }

    static get(prop: string) {
        return this._store.get(prop)
    }

    static delete(prop: string) {
        this._store.delete(prop);
    }
}
