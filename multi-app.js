const { app, BrowserWindow, autoUpdater, dialog } = require('electron');
const path = require("path");


require("update-electron-app")({
  repo: "https://github.com/Ludo-code/mon-app-electron",
  updateInterval: "5 minutes",
  logger: require("electron-log"),
});

const serveur = "https://github.com";
const url = `${serveur}/Ludo-code/mon-app-electron/${app.getVersion()}`;



//fonction pour crée la fenêtre.
function createWindow() {
  //crée la fenêtre du navigateur.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    icon: path.join(__dirname, "images/icones-app/icones_app.png"),
    webPreferences: {
      nodeIntegration: true,
    },
  });
  autoUpdater.setFeedURL({ url });
  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 60000);

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: "info",
      buttons: ["Restart", "Later"],
      title: "Application Update",
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: "A new version has been downloaded. Redémarrez l'application pour appliquer les mises à jour."
    }

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
  })
  autoUpdater.on("error", (message) => {
    console.error("There was a problem updating the application");
    console.error(message);
  });
//Je charge ma page d'accueil.
  win.loadFile('page/page-acceuil.html');
}

//Quand l'app est prête je crée la fenêtre.
app.whenReady().then(createWindow);