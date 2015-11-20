'use strict';

import vscode = require('vscode');
import cp = require('child_process');

export function activate(ctx: vscode.ExtensionContext): void {
  ctx.subscriptions.push(vscode.commands.registerCommand("extension.openVim", () => {
	var vim = vscode.workspace.getConfiguration('openvim')['executablePath'];
    if (!vim) vim = 'gvim';
    var fileName = vscode.window.activeTextEditor.document.fileName;
    if (fileName) {
      cp.execFile(vim, [fileName], {}, (err, stdout, stderr) => {
        if (err && (<any>err).code == "ENOENT")
          vscode.window.showErrorMessage("'gvim' command not available. you change modify openvim.execFile on user configuration.");
      });
    }
  }));
}
