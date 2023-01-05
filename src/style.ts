import type grapesjs from 'grapesjs';
import { RequiredPluginOptions } from '.';

export default (editor: grapesjs.Editor, opt: RequiredPluginOptions) => {

  if (opt.resetStyleManager) {
    editor.onReady(() => {
      const sectors = editor.StyleManager.getSectors();

      sectors.reset();
      sectors.add([{
        name: 'Dimension',
        open: true,
        buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding', 'vertical-align'],
        properties: [{
          property: 'margin',
          properties: [
            { name: 'Top', property: 'margin-top' },
            { name: 'Right', property: 'margin-right' },
            { name: 'Bottom', property: 'margin-bottom' },
            { name: 'Left', property: 'margin-left' }
          ],
        }, {
          property: 'padding',
          detached: true,
          properties: [
            { name: 'Top', property: 'padding-top', default: '10px' },
            { name: 'Right', property: 'padding-right', default: '25px' },
            { name: 'Bottom', property: 'padding-bottom', default: '10px' },
            { name: 'Left', property: 'padding-left', default: '25px' }
          ],
        }, {
          property: 'ico-padding', extend: 'padding',
          detached: true,
          properties: [
            { name: 'Top', property: 'ico-padding-top', default: '10px' },
            { name: 'Right', property: 'ico-padding-right', default: '10px' },
            { name: 'Bottom', property: 'ico-padding-bottom', default: '10px' },
            { name: 'Left', property: 'ico-padding-left', default: '10px' }
          ],
        }, {
          property: 'inner-padding',
          type: 'text',
          defaults: '10px 25px',
          units: ['px']
/*          property: 'inner-padding', extend: 'padding',
          detached: true,
          properties: [
            { name: 'Top', property: 'inner-padding-top', extend: 'padding-top'},
            { name: 'Right', property: 'inner-padding-right', extend: 'padding-right'},
            { name: 'Bottom', property: 'inner-padding-bottom', extend: 'padding-bottom'},
            { name: 'Left', property: 'inner-padding-left', extend: 'padding-left'},
          ],*/
        }, {
          property: 'text-padding',
          type: 'text',
          defaults: '16px 16px',
          units: ['px']
        }, {
          property: 'vertical-align',
          type: 'select',
          list: [
            { value: 'top' },
            { value: 'middle' },
            { value: 'bottom' },
          ]
        }, {
          property: 'fluid-on-mobile',
          type: 'select',
          list: [
            {value: ''},
            {value: 'true'},
            {value: 'false'},
            ]
        }],
      }, {
        name: 'Typography',
        open: true,
        buildProps: [/*'font-family',*/ 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'align', 'text-decoration', 'font-style'],
        properties: [
          { name: 'Font', property: 'font-family' },
          { name: 'Weight', property: 'font-weight' },
          { name: 'Font color', property: 'color' },
          { name: 'Icon font family', property: 'ico-font-family', extend: 'font-family' },
          { name: 'Icon font size', property: 'ico-font-size', extend: 'font-size' }, 
          { name: 'Icon line height', property: 'ico-line-height', extend: 'line-height' }, 
          {
            property: 'text-align',
            type: 'radio',
            defaults: 'left',
            list: [
              { value: 'left', name: 'Left', className: 'fa fa-align-left' },
              { value: 'center', name: 'Center', className: 'fa fa-align-center' },
              { value: 'right', name: 'Right', className: 'fa fa-align-right' },
              { value: 'justify', name: 'Justify', className: 'fa fa-align-justify' }
            ],
          }, {
            property: 'align',
            type: 'radio',
            defaults: 'left',
            list: [
              { value: 'left', name: 'Left', className: 'fa fa-align-left' },
              { value: 'center', name: 'Center', className: 'fa fa-align-center' },
              { value: 'right', name: 'Right', className: 'fa fa-align-right' },
              { value: 'justify', name: 'Justify', className: 'fa fa-align-justify' }
            ],
          }, {
            name: 'Icon align ',
            property: 'ico-align',
            type: 'select',
            list: [
              { value: '' },
              { value: 'left' },
              { value: 'middle' },
              { value: 'right' },
            ]
          }, {
            property: 'icon-size',
            type: 'integer',
            defaults: '20px',
            units: ['px', '%']
          }, {
            property: 'icon-height',
            type: 'integer',
            defaults: '20px',
            units: ['px', '%']
          }, {
            property: 'ico-open',
            type: 'text',
            defaults: '☰',
          }, {
            property: 'ico-close',
            type: 'text',
            defaults: '⊗'
          }, {
            name: 'Icon color ',
            property: 'ico-color',
            type: 'color',
/*          }, {
            property: 'vertical-align',
            type: 'select',
            list: [
              { value: 'top' },
              { value: 'middle' },
              { value: 'bottom' },
            ]*/
          }, {
            name: 'Text decoration',
            property: 'text-decoration',
            type: 'radio',
            defaults: 'none',
            list: [
              { value: 'none', name: 'None', className: 'fa fa-times' },
              { value: 'underline', name: 'underline', className: 'fa fa-underline' },
              { value: 'line-through', name: 'Line-through', className: 'fa fa-strikethrough' }
            ],
          }, {
            name: 'Icon text decoration',
            property: 'ico-text-decoration',
            type: 'radio',
            defaults: 'none',
            list: [
              { value: 'none', name: 'None', className: 'fa fa-times' },
              { value: 'underline', name: 'underline', className: 'fa fa-underline' },
              { value: 'line-through', name: 'Line-through', className: 'fa fa-strikethrough' }
            ],
          }, {
            name: 'Text tranform',
            property: 'text-transform',
            type: 'radio',
            defaults: 'none',
            list: [
              { value: 'none', name: 'None', className: 'fa fa-times' },
              { value: 'capitalize', name: 'Capitalize', label: 'Capitalize' },
              { value: 'uppercase', name: 'Uppercase', label: 'Uppercase' },
              { value: 'lowercase', name: 'Lowercase', label: 'Lowercase' }
            ],
          }, {
            name: 'Icon text tranform',
            property: 'ico-text-transform',
            type: 'radio',
            defaults: 'none',
            list: [
              { value: 'none', name: 'None', className: 'fa fa-times' },
              { value: 'capitalize', name: 'Capitalize', label: 'Capitalize' },
              { value: 'uppercase', name: 'Uppercase', label: 'Uppercase' },
              { value: 'lowercase', name: 'Lowercase', label: 'Lowercase' }
            ],
          },{
            property: 'font-style',
            type: 'radio',
            defaults: 'normal',
            list: [
              { value: 'normal', name: 'Normal', className: 'fa fa-font'},
              { value: 'italic', name: 'Italic', className: 'fa fa-italic'}
            ],
          }],
      }, {
        name: 'Decorations',
        open: true,
        buildProps: ['background-color', 'container-background-color', 'background-url', 'background-repeat',
          'background-size', 'border-radius', 'border'],
        properties: [{
          name: 'Background color',
          property: 'container-background-color',
          type: 'color',
        }, {
          name: 'Style',
          property: 'style',
          type: 'text',
        }, {
          name: 'Inner background color',
          property: 'inner-background-color',
          type: 'color',
        }, {
          name: 'Background height',
          property: 'background-height',
          type: 'integer',
          units: ['px']
        }, {
          name: 'Background position',
          property: 'background-position',
          type: 'text',
        }, {
          property: 'background-url',
          type: 'file',
        }, {
          name: 'Height mode',
          property: 'mode',  type: 'select',
          list: [
            { value: 'fluid-height' },
            { value: 'fixed-height' }
          ],
        }, {
          property: 'border-radius',
          properties: [
            { name: 'Top', property: 'border-top-left-radius' },
            { name: 'Right', property: 'border-top-right-radius' },
            { name: 'Bottom', property: 'border-bottom-left-radius' },
            { name: 'Left', property: 'border-bottom-right-radius' }
          ],
        }, {
          property: 'border-detached',
          name: 'Border detached',
          type: 'composite',
          detached: true,
          properties: [
            { name: 'Width', property: 'border-width', type: 'integer', units: ['px', '%'] },
            {
              name: 'Style', property: 'border-style', type: 'select',
              list: [
                { value: 'none' },
                { value: 'solid' },
                { value: 'dotted' },
                { value: 'dashed' },
                { value: 'double' },
                { value: 'groove' },
                { value: 'ridge' },
                { value: 'inset' },
                { value: 'outset' }
              ]
            },
            { name: 'Color', property: 'border-color', type: 'color' },
          ],
        }],
      },
      ]);
    });
  }

};
