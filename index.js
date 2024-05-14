const { app, BrowserWindow, Tray, Menu, screen } = require("electron");

const createWindow = () => {
    const {width, height} = screen.getPrimaryDisplay().workAreaSize;
    const win = new BrowserWindow({
        width: 500,
        height: 142,
        titleBarStyle: "hidden",
        autoHideMenuBar: true,
        resizable: false,
        transparent: true,
        skipTaskbar: true,
        x: width - 600,
        y: 50,
        type: "desktop",
    });

    win.loadFile("views/clock.html");

    win.on("close", (evt) => {
        evt.preventDefault();
        console.log("Use tray icon to close.");
    });
}

app.whenReady().then(() => {
    createWindow();
    loadAppTray();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

function loadAppTray() {
    let tray = new Tray("public/logo.png");
    const contextMenu = Menu.buildFromTemplate([
        { "id":"close-app", "label":"Close DesktopClock", "type":"normal", click() {
            app.exit();
        }}
    ]);
    tray.setToolTip("DesktopClock");
    tray.setContextMenu(contextMenu);
}