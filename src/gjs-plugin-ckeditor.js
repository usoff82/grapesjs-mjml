import grapesjs from 'grapesjs';

const stopPropagation = e => e.stopPropagation();

export default grapesjs.plugins.add('gjs-plugin-ckeditor', (editor, opts = {}) => {
    let c = opts;

    let defaults = {
        // CKEditor options
        options: {
            language: 'en',
            //              startupFocus: true,
            extraAllowedContent: '*(*);*{*}', // Allows any class and any inline style
            allowedContent: true, // Disable auto-formatting, class removing, etc.
            enterMode: CKEDITOR.ENTER_BR,
            toolbarGroups: [
                //{ name: 'document', groups: ['mode', 'document', 'doctools'] },
                { name: 'clipboard', groups: ['clipboard', 'undo'] },
                { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
                // { name: 'forms', groups: ['forms'] },
                '/',
                { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'paragraph'] },
                { name: 'links', groups: ['links'] },
                { name: 'insert', groups: ['insert'] },
                '/',
                { name: 'styles', groups: ['styles'] },
                { name: 'colors', groups: ['colors'] },
                { name: 'tools', groups: ['tools'] },
                { name: 'others', groups: ['others'] },
                { name: 'about', groups: ['about'] }
            ],
            removeButtons: 'NewPage,Flash,Iframe,PageBreak,Image,Smiley,CreateDiv,Anchor'
        },

        // On which side of the element to position the toolbar
        // Available options: 'left|center|right'
        position: 'left',
    };

    // Load defaults
    for (let name in defaults) {
        if (!(name in c))
            // @ts-ignore
            c[name] = defaults[name];
    }

    // @ts-ignore
    if (!CKEDITOR) {
        throw new Error('CKEDITOR instance not found');
    }

    editor.setCustomRte({
        // @ts-ignore
        enable(el, rte) {
            // If already exists I'll just focus on it
            if (rte && rte.status != 'destroyed') {
                this.focus(el, rte);
                return rte;
            }

            el.contentEditable = true;

            // Seems like 'sharedspace' plugin doesn't work exactly as expected
            // so will help hiding other toolbars already created
            let rteToolbar = editor.RichTextEditor.getToolbarEl();
            [].forEach.call(rteToolbar.children, (child) => {
                // @ts-ignore
                child.style.display = 'none';
            });

            // Check for the mandatory options
            // @ts-ignore
            var opt = c.options;
            var plgName = 'sharedspace';

            if (opt.extraPlugins) {
                if (typeof opt.extraPlugins === 'string')
                    opt.extraPlugins += ',' + plgName;
                else
                    opt.extraPlugins.push(plgName);
            } else {
                opt.extraPlugins = plgName;
            }
            // @ts-ignore
            if (!c.options.sharedSpaces) {
                // @ts-ignore
                c.options.sharedSpaces = { top: rteToolbar };
            }

            // Init CkEditors
            // @ts-ignore
            rte = CKEDITOR.inline(el, c.options);

            /**
             * Implement the `rte.getContent` method so that GrapesJS is able to retrieve CKE's generated content (`rte.getData`) properly
             *
             * See:
             *  - {@link https://github.com/artf/grapesjs/issues/2916}
             *  - {@link https://github.com/artf/grapesjs/blob/dev/src/dom_components/view/ComponentTextView.js#L80}
             *  - {@link https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#method-getData}
             */
            rte.getContent = rte.getData;

            // Make click event propogate
            rte.on('contentDom', () => {
                var editable = rte.editable();
                editable.attachListener(editable, 'click', () => {
                    el.click();
                });
            });

            // The toolbar is not immediatly loaded so will be wrong positioned.
            // With this trick we trigger an event which updates the toolbar position
            // @ts-ignore
            rte.on('instanceReady', e => {
                var toolbar = rteToolbar.querySelector('#cke_' + rte.name);
                if (toolbar) {
                    // @ts-ignore
                    toolbar.style.display = 'block';
                }
                //editor.trigger('canvasScroll')
                editor.Canvas.getWindow().dispatchEvent(new CustomEvent('scroll'))
            });

            // Prevent blur when some of CKEditor's element is clicked
            // @ts-ignore
            rte.on('dialogShow', e => {
                // @ts-ignore
                const editorEls = grapesjs.$('.cke_dialog_background_cover, .cke_dialog');
                // @ts-ignore
                ['off', 'on'].forEach(m => editorEls[m]('mousedown', stopPropagation));
            });

            this.focus(el, rte);


            return rte;
        },

        // @ts-ignore
        disable(el, rte) {
            el.contentEditable = false;
            if (rte && rte.focusManager)
                rte.focusManager.blur(true);
        },

        // @ts-ignore
        focus(el, rte) {
            // Do nothing if already focused
            if (rte && rte.focusManager.hasFocus) {
                return;
            }
            el.contentEditable = true;
            rte && rte.focus();
        },
    });

    // Update RTE toolbar position
    // @ts-ignore
    editor.on('rteToolbarPosUpdate', (pos) => {
        // Update by position
        // @ts-ignore
        switch (c.position) {
            case 'center':
                let diff = (pos.elementWidth / 2) - (pos.targetWidth / 2);
                pos.left = pos.elementLeft + diff;
                break;
            case 'right':
                let width = pos.targetWidth;
                pos.left = pos.elementLeft + pos.elementWidth - width;
                break;
        }

        if (pos.top <= pos.canvasTop) {
            pos.top = pos.elementTop + pos.elementHeight * 2;
        }

        // Check if not outside of the canvas
        if (pos.left < pos.canvasLeft) {
            pos.left = pos.canvasLeft;
        }
    });

});