'use strict';

import vscode = require('vscode');
import cp = require('child_process');

export function activate(ctx: vscode.ExtensionContext): void {
  ctx.subscriptions.push(vscode.commands.registerCommand("extension.openVim", () => {
    var vim = vscode.workspace.getConfiguration('openvim')['executablePath'];
    if (!vim) vim = 'gvim';
    var editor = vscode.window.activeTextEditor;
    var fileName = editor.document.fileName;
    if (fileName) {
      var position = editor.selection.active;
      var cursor = [0, position.line+1, position.character+1, 0]
      cp.execFile(vim, ['-c', 'call setpos(".", ' + JSON.stringify(cursor) + ')', fileName], {}, (err, stdout, stderr) => {
        if (err && (<any>err).code == "ENOENT")
          vscode.window.showErrorMessage("'gvim' command not available. you can modify openvim.execFile on user configuration.");
      });
    }
  }));
}
