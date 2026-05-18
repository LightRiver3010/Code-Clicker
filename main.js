import {app, BrowserWindow } from "electron";

function createWindow() {
    const win = new BrowserWindow({
        title: "Code Clicker Game",
        width: 1920,
        height: 1080,
        icon: "assets\no_border.jpg"
    });
    win.loadFile("index.html");
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
    app.quit();
});

app.on("active", () => {
    if (BrowserWindow.getAllWindows() === 0) {
        createWindow();
    }
});

