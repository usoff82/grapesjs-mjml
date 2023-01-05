// @ts-nocheck TODO remove this comment with the next grapesjs release
import type grapesjs from 'grapesjs';
import { RequiredPluginOptions } from '..';

export default (editor: grapesjs.Editor, opts: RequiredPluginOptions, cmdId: string) => {
  const config = editor.getConfig();
  const pfx = config.stylePrefix || '';

  const getI18nLabel = (label: string) => editor.I18n.t(`grapesjs-mjml.panels.import.${label}`);

  editor.Commands.add(cmdId, {
    onImport(code: string) {
      editor.Components.getWrapper().set('content', '');
      editor.setComponents(code.trim());
      editor.Modal.close();
    },

    createCodeEditor() {
      const el = document.createElement('div');
      const codeEditor = this.createCodeViewer();
      const codeEl = codeEditor.getElement();
      const labelImport = getI18nLabel('label');
      const btnEl = document.createElement('button');
      const fileInput = document.createElement('input');
      fileInput.type = "file";
      fileInput.accept = ".mjml";
      fileInput.style.paddingLeft = '10px';

      fileInput.addEventListener("change", () => {
        const [file] = fileInput.files;
        if (file) {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            let codeEditorMjml = this.codeEditorMjml as any;
            codeEditorMjml.setContent(reader.result);
            codeEditorMjml.editor.refresh();
          });
          reader.readAsText(file);
        }
      })

      btnEl.innerHTML = getI18nLabel('button');
      btnEl.className = `${pfx}btn-prim ${pfx}btn-import`;
      btnEl.onclick = () => {
        const assetManager = editor.AssetManager;
        const el = document.createElement('html');
        el.innerHTML = codeEditor.editor.getValue();
        for (let img of el.getElementsByTagName('mj-image')) {
          console.log(img.getAttribute('src'));
          assetManager.add(img.getAttribute('src'));
        };
        for (let img of el.querySelectorAll('mj-section,mj-hero,mj-wrapper')) {
          console.log(img.getAttribute('background-url'));
          assetManager.add(img.getAttribute('background-url'));
        };

        this.onImport(codeEditor.editor.getValue());
      };

      if (labelImport) {
        const labelEl = document.createElement('div');
        labelEl.className = `${pfx}import-label`;
        labelEl.innerHTML = labelImport;
        el.appendChild(labelEl);
      }

      codeEl.className = `${pfx}code-viewer`;
      codeEl.style.margin = '10px 0';

      el.appendChild(codeEl);
      el.appendChild(btnEl);
      el.appendChild(fileInput);

      return { codeEditor, el };
    },

    createCodeViewer(): any {
      // @ts-ignore
      return editor.CodeManager.createViewer({
        codeName: 'htmlmixed',
        theme: opts.codeViewerTheme,
        readOnly: false,
      });
    },

    getCodeContainer(): HTMLDivElement {
      let containerEl = this.containerEl as HTMLDivElement;

      if (!containerEl) {
        containerEl = document.createElement('div');
        this.containerEl = containerEl;
      }

      return containerEl;
    },

    run(editor, sender = {}) {
      const container = this.getCodeContainer();
      let codeEditorMjml = this.codeEditorMjml as any;

      if (!codeEditorMjml) {
        const result = this.createCodeEditor();
        codeEditorMjml = result.codeEditor;
        this.codeEditorMjml = codeEditorMjml;
        container.appendChild(result.el);
      }

      if (codeEditorMjml) {
        codeEditorMjml.setContent(opts.importPlaceholder);
        codeEditorMjml.editor.refresh();
      }

      editor.Modal.open({
        title: getI18nLabel('title'),
        content: container
      }).onceClose(() => {
        sender.set && sender.set('active', false);
        editor.stopCommand(cmdId)
      });
    },

    stop(editor) {
      editor.Modal.close();
    },
  });
};
