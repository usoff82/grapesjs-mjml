//import grapesjs from 'grapesjs';
import type { Editor } from 'grapesjs';
// @ts-ignore
import { RequiredPluginOptions } from '.';

//import 'grapesjs/dist/css/grapes.min.css'
//import grapesJSMJML from 'grapesjs-mjml'



export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
  // @ts-ignore
  editor.DownloadSourceCode = (editor: Editor) => {
    // @ts-ignore
    const filename = document.getElementById('export-filename').value + '.project.json';
    // @ts-ignore
    localStorage.setItem('filename', document.getElementById('export-filename').value);
    const text = JSON.stringify(editor.getProjectData(), null, 2);//format(editor.runCommand('mjml-code'));
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    a.download = filename;
    a.click();
  }

  // @ts-ignore
  editor.SaveSourceCode = (editor) => {
    // @ts-ignore
    const filename = document.getElementById('export-filename').value + '.mjml';
    // @ts-ignore
    localStorage.setItem('filename', document.getElementById('export-filename').value);
    const text = format(editor.runCommand('mjml-code'));
    const projectdata = editor.getProjectData();

    fetch('http://localhost:3603/save', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename, text, projectdata }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    //console.log(editor.getProjectData());
  }

  // @ts-ignore
  editor.LoadProjectData = (editor) => {
    const fileInput = document.getElementById('load-project');
    // @ts-ignore
    fileInput.addEventListener("change", () => {
      // @ts-ignore
      const [file] = fileInput.files;
      if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          // @ts-ignore
          const filename = parsePath(fileInput.value).filename.replace('.project.json', '');
          localStorage.setItem('filename', filename);
          // @ts-ignore
          document.getElementById('export-filename').value = filename;
          //            console.log(filename);
          // @ts-ignore
          editor.loadProjectData(JSON.parse(reader.result));
          const assetManager = editor.AssetManager;
          const el = document.createElement('html');
          el.innerHTML = editor.runCommand('mjml-code');
          // @ts-ignore
          for (let img of el.getElementsByTagName('mj-image')) {
            console.log(img.getAttribute('src'));
            assetManager.add(img.getAttribute('src'));
          };
        });
        reader.readAsText(file);
      }
    })
    // @ts-ignore
    fileInput.click();
  }

  // @ts-ignore


};

// @ts-ignore
export function format(html) {
  let tab = '  ';
  let result = '';
  let indent = '';
  // @ts-ignore
  html.split(/>\s*</).forEach(function (element) {
    if (element.match(/^\/\w/)) {
      indent = indent.substring(tab.length);
    }
    result += indent + '<' + element + '>\r\n';
    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) {
      indent += tab;
    }
  });
  return result.substring(1, result.length - 3);
}

// @ts-ignore
export function parsePath(path) {
  // regex to split path (untile last / or \ to two groups '(.*[\\\/])' for path and '(.*)' (untile the end after the \ or / )for file name
  const regexPath = /^(?<path>(.*[\\\/])?)(?<filename>.*)$/;

  const match = regexPath.exec(path);
  if (path && match) {
    return {
      // @ts-ignore
      path: match.groups.path,
      // @ts-ignore
      filename: match.groups.filename
    }
  }
}





