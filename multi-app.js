const { app, BrowserWindow, dialog, Notificatio, shell } = require("electron");
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");



let windowPrincipal;


function createWindow() {

  let win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile('page/page-acceuil.html');
  autoUpdater.checkForUpdates();
}



app.whenReady().then(createWindow);



const sendStatusToWindow = (text) => {
  log.info(text);
  if (windowPrincipal) {
    windowPrincipal.webContents.send("message", text);
  }
};


autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow("Recherche de mise a jour...")
});
autoUpdater.on('update-available', info => {
  sendStatusToWindow("Une mise a jour à été trouvé.")
});

autoUpdater.on('update-available', (info, event, releaseNotes, releaseName) => {
  const dialogOptsavailable = {
    type: "info",
    buttons: ["Ok",],
    title: "Mise a jour d'application",
    detail: "Une nouvelle version à été détecter, lancement du téléchargement..."
  }
  dialog.showMessageBox(dialogOptsavailable)
});
autoUpdater.on('update-not-available', info => {
  sendStatusToWindow("Aucune mise a jour disponible.")
});
autoUpdater.on('error', err => {
  sendStatusToWindow(`Erreur lors de la mise a jour : ${err.toString()}`)
});

autoUpdater.on('error', (error, info, event, releaseNotes, releaseName) => {
  const dialogOptserror = {
    type: "error",
    buttons: ["Ok",],
    title: "Mise a jour d'application",
    detail: `Une nouvelle version à été détecter, mais le téléchargement a écoué \n ${error.toString()}`
  }
  dialog.showMessageBox(dialogOptsavailable)
});
autoUpdater.on('download-progress', progressObj => {
  sendStatusToWindow(
    `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`
  );
});
autoUpdater.on('update-downloaded', info => {
  sendStatusToWindow("Mise a jour télécharger.")
});

autoUpdater.on('update-downloaded', (info, event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Redémarrer", "Plus tard"],
    title: "Mise a jour d'application",
    detail: "Une nouvelle version à été télécharger. Redémarrez l'application pour appliquer les mises à jour."
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
});