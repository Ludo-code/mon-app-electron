const enligneoupas = () => { window.alert(navigator.onLine ? "Vous êtes en ligne !" : "Vous êtes hors ligne : la page peut donc avoir certain dysfonctionnement.") }

window.addEventListener('online', enligneoupas)
window.addEventListener('offline', enligneoupas)
