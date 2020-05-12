const { app, BrowserWindow } = require('electron');

//fonction pour crée la fenêtre.
function createWindow() {
  //crée la fenêtre du navigateur.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

//Je charge ma page d'accueil.
  win.loadFile('page/page-acceuil.html');
}

//Quand l'app est prête je crée la fenêtre.
app.whenReady().then(createWindow);
