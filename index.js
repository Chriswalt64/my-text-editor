const {  app, BrowserWindow } = require('electron') // app and BrowserWindow are electron modules, we're importing them here
/*
 * You might have noticed the capitalization differece between the app and BrowserWindow modules. 
 * Electron follows typical JavaScript conventions here, where PascalCase modules are instantiable 
 *   class constructors (e.g. BrowserWindow, Tray, Notification) whereas camelCase modules are 
 *   not instantiable (e.g. app, ipcRenderer, webContents).
*/
const createWindow = () => { // createWindow loads the webpage (index in this case) into a new BrowserWindow instance
	const win = new BrowserWindow({
		width: 1920,
		height: 1080
	})

	win.loadFile('index.html')
}

app.whenReady().then(() => { // Many of Electron's core modules are Node.js event emitters that adhere to Node's asynchronous event-driven architecture. The app module is one of these emitters.
// In Electron, BrowserWindows can only be created after the app module's ready event is fired. You can wait for this event by using the app.whenReady() API and calling createWindow() once its promise is fulfilled.
	createWindow()
})
