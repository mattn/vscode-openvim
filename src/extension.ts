'use strict';

import vscode = require('vscode');
import cp = require('child_process');

export function activate(ctx: vscode.ExtensionContext): void {
  ctx.subscriptions.push(vscode.commands.registerCommand("extension.openVim", () => {
    var fileName = vscode.window.activeTextEditor.document.fileName;
    if (fileName) cp.execFile("gvim", [fileName]);
  }));
}
