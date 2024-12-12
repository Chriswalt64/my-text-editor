function saveFile() {
  const text = document.getElementById('textArea').value;
  console.log(text);
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'note.txt';
  link.click();
}

function openFile() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.txt';
  input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
          document.getElementById('textArea').value = reader.result;
      };
      reader.readAsText(file);
  };
  input.click();
}

const {  app, BrowserWindow, Menu } = require('electron') // app and BrowserWindow are electron modules, we're importing them here

const isMac = process.platform === 'darwin'
/*
 * You might have noticed the capitalization differece between the app and BrowserWindow modules. 
 * Electron follows typical JavaScript conventions here, where PascalCase modules are instantiable 
 *   class constructors (e.g. BrowserWindow, Tray, Notification) whereas camelCase modules are 
 *   not instantiable (e.g. app, ipcRenderer, webContents).
*/

const template = [

	{
		label: 'File',
		submenu: [
      { label: "Save", function: saveFile },
      { label: "Load", function: openFile },
			isMac ? {role:'close' } : { role: 'quit' }
		]

	},
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac
        ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
              label: 'Speech',
              submenu: [
                { role: 'startSpeaking' },
                { role: 'stopSpeaking' }
              ]
            }
          ]
        : [
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' }
          ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac
        ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
          ]
        : [
            { role: 'close' }
          ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]



const createWindow = () => { // createWindow loads the webpage (index in this case) into a new BrowserWindow instance
	const win = new BrowserWindow({
		width: 1920,
		height: 1080,
		icon: "Logo256x256.png"
	})

	win.loadFile('index.html')
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.whenReady().then(() => { // Many of Electron's core modules are Node.js event emitters that adhere to Node's asynchronous event-driven architecture. The app module is one of these emitters.
// In Electron, BrowserWindows can only be created after the app module's ready event is fired. You can wait for this event by using the app.whenReady() API and calling createWindow() once its promise is fulfilled.
	createWindow()
})
