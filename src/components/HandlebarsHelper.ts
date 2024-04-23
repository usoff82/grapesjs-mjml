// Specs: https://documentation.mjml.io/#mjml-spacer
import type { Editor } from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import { type as typeColumn } from './Column';
import { type as typeHero } from './Hero';

export const type = 'mj-handlebars-helper';

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
  editor.Components.addType(type, {
    isComponent: isComponentType(type),
    extendFnView: ['onActive'],

    model: {
      ...coreMjmlModel,
      defaults: {
        name: getName(editor, 'mj-handlebars-helper'),
        draggable: componentsToQuery([typeColumn, typeHero]),
        droppable: false,
        'style-default': { display: 'none' },
        stylable: [],
        traits: ['template'],
        void: false,
      },
    },

    view: {
      ...coreMjmlView,
      tagName: 'tr',
      attributes: {
        style: 'pointer-events: all; display: table; width: 100%',
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
        return 'td';
      },


      /**
       * Prevent content repeating
       */
      rerender() {
        this.render();
      },

      /**
       * Need to make text selectable.
       */
      onActive() {
        this.getChildrenContainer().style.pointerEvents = 'all';
      },

    },
  });
};
