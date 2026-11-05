const { app, BrowserWindow, Menu, dialog, shell } = require('electron');
const fs = require('node:fs/promises');
const path = require('node:path');
const APP_URL = 'https://shree-khata.princesaini2344.chatgpt.site';
let main;
function internal(url) {
  try { return new URL(url).origin === new URL(APP_URL).origin; } catch { return false; }
}
async function external(url) {
  try {
    const u = new URL(url);
    if (!['https:', 'mailto:'].includes(u.protocol)) return;
    const answer = await dialog.showMessageBox(main, {type:'question', buttons:['Cancel','Open browser'], defaultId:0, title:'Open external link', message:'Open this link outside Shree Khata?', detail:u.href});
    if(answer.response === 1) await shell.openExternal(u.href);
  } catch (error) { dialog.showErrorBox('Could not open link', error.message); }
}
async function home() {
  try { await main.loadURL(APP_URL); }
  catch {
    if (!main || main.isDestroyed()) return;
    await main.loadFile(path.join(__dirname, 'offline.html'));
  }
}
async function savePDF() {
  try {
    const result = await dialog.showSaveDialog(main, {defaultPath:'Shree-Khata.pdf', filters:[{name:'PDF',extensions:['pdf']}]});
    if(result.canceled) return;
    const pdf = await main.webContents.printToPDF({printBackground:true, pageSize:'A4'});
    await fs.writeFile(result.filePath, pdf);
  } catch (error) { dialog.showErrorBox('PDF could not be saved', error.message); }
}
function createWindow() {
  main = new BrowserWindow({width:1280,height:850,minWidth:800,minHeight:600,title:'Shree Khata',backgroundColor:'#0b1730',webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true,webSecurity:true}});
  const wc = main.webContents;
  wc.session.setPermissionRequestHandler((_wc, _permission, callback) => callback(false));
  wc.session.setPermissionCheckHandler(() => false);
  wc.on('will-attach-webview', event => event.preventDefault());
  for (const eventName of ['will-navigate','will-redirect']) wc.on(eventName, (event,url) => {
    if(!internal(url)) { event.preventDefault(); void external(url); }
  });
  wc.setWindowOpenHandler(({url}) => {
    if(internal(url)) void main.loadURL(url).catch(() => home());
    else void external(url);
    return {action:'deny'};
  });
  wc.session.on('will-download', (_event,item) => {
    item.setSaveDialogOptions({title:'Save Shree Khata download'});
    item.once('done', (_event,state) => { if(state !== 'completed' && state !== 'cancelled') dialog.showErrorBox('Download failed','Please check your connection and try again.'); });
  });
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {label:'Shree Khata',submenu:[{label:'Home / Retry connection',accelerator:'CmdOrCtrl+H',click:home},{label:'Print',accelerator:'CmdOrCtrl+P',click:()=>wc.print({printBackground:true},(success,reason)=>{if(!success && reason !== 'cancelled') dialog.showErrorBox('Print not completed',reason || 'Please try again.');})},{label:'Save page as PDF',accelerator:'CmdOrCtrl+Shift+S',click:savePDF},{type:'separator'},{role:'quit'}]},
    {label:'Edit',submenu:[{role:'undo'},{role:'redo'},{type:'separator'},{role:'cut'},{role:'copy'},{role:'paste'},{role:'selectAll'}]},
    {label:'View',submenu:[{label:'Refresh',accelerator:'CmdOrCtrl+R',click:()=>internal(wc.getURL())?wc.reload():home()},{role:'resetZoom'},{role:'zoomIn'},{role:'zoomOut'},{role:'togglefullscreen'}]},
    {label:'Help',submenu:[{label:'About',click:()=>dialog.showMessageBox(main,{title:'Shree Khata',message:'Shree Khata Desktop '+app.getVersion(),detail:'Online desktop edition. Sign in with your existing account. Internet is required. Browser-only data is not automatically transferred. Page PDF saves the visible page; use the app statement export for a full ledger.'})}]}
  ]));
  void home();
}
if(!app.requestSingleInstanceLock()) app.quit();
else {
  app.on('second-instance',()=>{if(main){if(main.isMinimized())main.restore();main.focus();}});
  app.whenReady().then(createWindow);
  app.on('window-all-closed',()=>app.quit());
}
