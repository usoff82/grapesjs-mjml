// Specs: https://documentation.mjml.io/#mj-button
import type { Editor } from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import { type as typeColumn } from './Column';
import { type as typeHero } from './Hero';

export const type = 'mj-button';

export default (editor:  Editor, { coreMjmlModel, coreMjmlView }: any) => {
  editor.Components.addType(type, {
    isComponent: isComponentType(type),
    extend: 'link',
    model: {
      ...coreMjmlModel,
      defaults: {
        name: getName(editor, 'button'),
        draggable: componentsToQuery([typeColumn, typeHero]),
        highlightable: false,
        stylable: ['width', 'height',
          'background-color', 'container-background-color',
          'font-style', 'font-size', 'font-weight', 'font-family', 'color', 'letter-spacing','line-height',
          'text-decoration', 'align',
          'vertical-align', 'text-transform',
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom', 'inner-padding',
          'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
          'border', 'border-width', 'border-style', 'border-color',],
        'style-default': {
          'background-color': '#414141',
          'border-radius': '3px',
          'font-size': '13px',
          'font-weight': '400',
 //         'text-transform': 'none',
          'color': '#ffffff',
          'vertical-align': 'middle',
/*          'padding-top': '10px',
          'padding-bottom': '10px',
          'padding-right': '25px',
          'padding-left': '25px',
          'align': 'center',
          'inner-padding': '16px',
          'letter-spacing': '',*/
        },
        traits: ['css-class', 'href', 'rel', 'target', 'title'],
      },
    },

    view: {
      ...coreMjmlView,
      tagName: 'tr',
      attributes: {
        style: 'display: table; width: 100%',
      },

      getMjmlTemplate() {
        return {
          start: `<mjml><mj-body><mj-column>`,
          end: `</mj-column></mj-body></mjml>`,
        };
      },

      getTemplateFromEl(sandboxEl: any) {
        return sandboxEl.querySelector('tr').innerHTML;
      },

      getChildrenSelector() {
        return 'a,p';
      },

      /**
       * Prevent content repeating
       */
       rerender() {
        this.render();
      },
    },
  });
};
