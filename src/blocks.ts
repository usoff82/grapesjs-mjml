import type { Editor, BlockProperties } from 'grapesjs';
import { RequiredPluginOptions } from '.';

export default (editor: Editor, opts: RequiredPluginOptions) => {
  const { Blocks } = editor;
  const imagePlaceholderSrc = opts.imagePlaceholderSrc || 'https://via.placeholder.com/350x250/78c5d6/fff';
  const socialIcon = `<svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />
  </svg>`;

  opts.resetBlocks && Blocks.getAll().reset();

  const addBlock = (id: string, def: BlockProperties) => {
    opts.blocks.indexOf(id)! >= 0 && Blocks.add(id, {
      select: true,
      category: editor.I18n.t('grapesjs-mjml.category'),
      ...def,
      ...opts.block(id),
    });
  };

  // @ts-ignore
  const getI18nLabel = (label: string) => editor.I18n.t(`grapesjs-mjml.components.names.${label}`)

  addBlock('mj-1-column', {
    label: getI18nLabel('oneColumn'),
    media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M2 20h20V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Z"/>
    </svg>`,
    content: `<mj-section>
        <mj-column><mj-text>Content 1</mj-text></mj-column>
      </mj-section>`,
  });

  addBlock('mj-2-columns', {
    label: getI18nLabel('twoColumn'),
    media: `<svg viewBox="0 0 23 24">
      <path fill="currentColor" d="M2 20h8V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM13 20h8V4h-8v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1Z"/>
    </svg>`,
    content: `<mj-section>
      <mj-column><mj-text>Content 1</mj-text></mj-column>
      <mj-column><mj-text>Content 2</mj-text></mj-column>
    </mj-section>`,
  });

  addBlock('mj-3-columns', {
    label: getI18nLabel('threeColumn'),
    media: `<svg viewBox="0 0 23 24">
      <path fill="currentColor" d="M2 20h4V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM17 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1ZM9.5 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"/>
    </svg>`,
    content: `<mj-section>
        <mj-column><mj-text>Content 1</mj-text></mj-column>
        <mj-column><mj-text>Content 2</mj-text></mj-column>
        <mj-column><mj-text>Content 3</mj-text></mj-column>
      </mj-section>`,
  });

  addBlock('mj-text', {
    label: getI18nLabel('text'),
    media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z" />
    </svg>`,
    content: '<mj-text>Insert text here</mj-text>',
    activate: true,
  });

  addBlock('mj-button', {
    label: getI18nLabel('button'),
    media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M20 20.5C20 21.3 19.3 22 18.5 22H13C12.6 22 12.3 21.9 12 21.6L8 17.4L8.7 16.6C8.9 16.4 9.2 16.3 9.5 16.3H9.7L12 18V9C12 8.4 12.4 8 13 8S14 8.4 14 9V13.5L15.2 13.6L19.1 15.8C19.6 16 20 16.6 20 17.1V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.1 2.9 14 4 14H8V12H4V4H20V12H18V14H20C21.1 14 22 13.1 22 12V4C22 2.9 21.1 2 20 2Z" />
    </svg>`,
    content: '<mj-button>Button</mj-button>',
  });

  addBlock('mj-image', {
    label: getI18nLabel('image'),
    media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M21,3H3C2,3 1,4 1,5V19A2,2 0 0,0 3,21H21C22,21 23,20 23,19V5C23,4 22,3 21,3M5,17L8.5,12.5L11,15.5L14.5,11L19,17H5Z" />
    </svg>`,
    content: `<mj-image src="${imagePlaceholderSrc}"/>`,
    activate: true,
  });

  addBlock('mj-divider', {
    label: getI18nLabel('divider'),
    media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M21 18H2V20H21V18M19 10V14H4V10H19M20 8H3C2.45 8 2 8.45 2 9V15C2 15.55 2.45 16 3 16H20C20.55 16 21 15.55 21 15V9C21 8.45 20.55 8 20 8M21 4H2V6H21V4Z" />
    </svg>`,
    content: '<mj-divider/>',
  });

  addBlock('mj-social-group', {
    label: getI18nLabel('socialGroup'),
    media: socialIcon,
    content: `<mj-social font-size="12px" icon-size="24px" border-radius="12px" mode="horizontal">
        <mj-social-element name="facebook"></mj-social-element>
        <mj-social-element name="google"></mj-social-element>
        <mj-social-element name="twitter"></mj-social-element>
      </mj-social>`,
  });

  addBlock('mj-social-element', {
    label: getI18nLabel('socialElement'),
    media: socialIcon,
    content: '<mj-social-element name="facebook" />',
  });

  addBlock('mj-spacer', {
    label: getI18nLabel('spacer'),
    media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M8,18H11V15H2V13H22V15H13V18H16L12,22L8,18M12,2L8,6H11V9H2V11H22V9H13V6H16L12,2Z" />
    </svg>`,
    content: '<mj-spacer/>',
  });

  addBlock('mj-navbar', {
    label: getI18nLabel('navBar'),
    media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    </svg>`,
    content: `<mj-navbar>
      <mj-navbar-link>Getting started</mj-navbar-link>
      <mj-navbar-link>Try it live</mj-navbar-link>
      <mj-navbar-link>Templates</mj-navbar-link>
      <mj-navbar-link>Components</mj-navbar-link>
    </mj-navbar>`,
  });

  addBlock('mj-navbar-link', {
    label: getI18nLabel('navLink'),
    media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z" />
    </svg>`,
    content: `<mj-navbar-link>Link</mj-navbar-link>`,
  });

  addBlock('mj-hero', {
    label: getI18nLabel('hero'),
    media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20M4,6V18H20V6H4M6,9H18V11H6V9M6,13H16V15H6V13Z" />
    </svg>`,
    content: `<mj-hero mode="fixed-height" height="469px" background-width="600px" background-height="469px" background-url="https://cloud.githubusercontent.com/assets/1830348/15354890/1442159a-1cf0-11e6-92b1-b861dadf1750.jpg" background-color="#2a3448" padding="100px 0px">
      <mj-text padding="20px" color="#ffffff" font-family="Helvetica" align="center" font-size="45px" line-height="45px" font-weight="900">
        GO TO SPACE
      </mj-text>
      <mj-button href="https://mjml.io/" align="center">
        ORDER YOUR TICKET NOW
      </mj-button>
    </mj-hero>`,
  });

  addBlock('mj-wrapper', {
    label: getI18nLabel('wrapper'),
    media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M18 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V4C20 2.9 19.11 2 18 2M18 20H6V16H18V20M18 8H6V4H18V8Z" />
    </svg>`,
    content: `<mj-wrapper border="1px solid #000000" padding="50px 30px">
      <mj-section border-top="1px solid #aaaaaa" border-left="1px solid #aaaaaa" border-right="1px solid #aaaaaa" padding="20px">
        <mj-column>
          <mj-image padding="0" src="${imagePlaceholderSrc}" />
        </mj-column>
      </mj-section>
      <mj-section border-left="1px solid #aaaaaa" border-right="1px solid #aaaaaa" padding="20px" border-bottom="1px solid #aaaaaa">
        <mj-column border="1px solid #dddddd">
          <mj-text padding="20px"> First line of text </mj-text>
          <mj-divider border-width="1px" border-style="dashed" border-color="lightgrey" padding="0 20px" />
          <mj-text padding="20px"> Second line of text </mj-text>
        </mj-column>
      </mj-section>
    </mj-wrapper>`,
  });
  /*
    addBlock('mj-raw', {
      label: getI18nLabel('raw'),
      media: `<svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,17.56L16.07,16.43L16.62,10.33H9.38L9.2,8.3H16.8L17,6.31H7L7.56,12.32H14.45L14.22,14.9L12,15.5L9.78,14.9L9.64,13.24H7.64L7.93,16.43L12,17.56M4.07,3H19.93L18.5,19.2L12,21L5.5,19.2L4.07,3Z" />
      </svg>`,
      content: `<mj-raw>
        <div class="container">
          <img class="item" src="https://source.unsplash.com/random/200x141" alt="Example image">
          <img class="item" src="https://source.unsplash.com/random/200x142" alt="Example image">
          <img class="item" src="https://source.unsplash.com/random/200x143" alt="Example image">
          <img class="item" src="https://source.unsplash.com/random/200x144" alt="Example image">
          <img class="item" src="https://source.unsplash.com/random/200x145" alt="Example image">
          <img class="item" src="https://source.unsplash.com/random/200x146" alt="Example image">
        </div>
      </mj-raw>`,
    });
    */

  addBlock('mj-blurb', {
    label: 'Horizontal Blurb',
    media: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg viewBox="0 0 987.9931 933.43866">
      <defs id="defs72" />
      <path
          d="m 399.27398,211.1091 c -25.19953,0 -45.62723,20.73347 -45.62723,46.31021 0,25.57674 20.4277,46.3102 45.62723,46.3102 25.19954,0 45.62723,-20.73346 45.62723,-46.3102 0,-25.57674 -20.43719,-46.31021 -45.62723,-46.31021 z M 679.78646,126.20708 H 314.76854 c -32.74704,0 -59.98945,27.6414 -59.98945,61.74692 v 308.73467 c 0,34.10553 27.23376,61.74693 59.9808,61.74693 h 365.01787 c 33.6026,0 60.8363,-27.6414 60.8363,-61.74693 V 187.954 c 0.01,-34.10552 -26.4171,-61.74692 -60.8276,-61.74692 z m 15.209,364.01746 L 564.95786,310.869 c -2.3764,-4.43806 -7.7946,-7.13949 -13.5931,-7.13949 -5.8108,0 -11.2357,2.67055 -14.45813,7.11923 L 435.57615,449.87581 400.31961,405.39872 c -3.27091,-4.12836 -8.49237,-6.56929 -14.03988,-6.56929 -5.55322,0 -10.76993,2.43997 -14.04939,6.56929 l -71.78685,90.5075 c 0,-0.0283 0,0.0283 0,0 l -0.038,-307.95222 c 0,-8.51143 6.82318,-15.43673 15.20908,-15.43673 h 365.01789 c 8.3859,0 15.2091,6.9253 15.2091,15.43673 v 302.27054 z"
          id="path66"
          style="stroke-width:0.957653" />
      <path
          id="path169"
          style="stroke-width:0.955132"
          d="M 324.9043 636.75977 C 308.16782 636.75977 294.64648 650.55594 294.64648 667.63281 C 294.64648 684.70968 308.16782 698.50781 324.9043 698.50781 L 688.00195 698.50781 C 704.73843 698.50781 718.25977 684.70968 718.25977 667.63281 C 718.25977 650.55594 704.73843 636.75977 688.00195 636.75977 L 324.9043 636.75977 z M 324.9043 760.25391 C 308.16782 760.25391 294.64648 774.05009 294.64648 791.12695 C 294.64648 808.20383 308.16782 822.00195 324.9043 822.00195 L 688.00195 822.00195 C 704.73843 822.00195 718.25977 808.20383 718.25977 791.12695 C 718.25977 774.05009 704.73843 760.25391 688.00195 760.25391 L 324.9043 760.25391 z " />
    </svg>
    `,
    content: `
      <mj-image src=""></mj-image>
      <mj-text>Content 1</mj-text>
      <mj-button>Button</mj-button>
    `,
  });

  addBlock('mj-handlebars-helper', {
    label: 'Handlebars helper',
    media: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg
       viewBox="0 0 226.33311 202.32236">
       <g
       id="g506"><path
         id="path403-6-5"
         class="fil0"
         transform="translate(54.096838,0.51742049)"
         d="m 172.2362,92.319889 v 17.042801 c -4.52776,0.10842 -8.23831,1.57016 -11.1015,4.38319 -2.83713,2.78492 -4.74059,6.56173 -5.70638,11.3043 -0.93366,4.77874 -1.44768,12.97889 -1.4778,24.6045 -0.0623,11.6617 -0.24094,19.29169 -0.54413,23.00419 -0.53811,5.91921 -1.50791,10.62371 -2.95559,14.15351 -1.44768,3.52984 -3.22866,6.34487 -5.34295,8.44913 -2.14039,2.14038 -4.85504,3.74669 -8.14394,4.85102 -2.23277,0.78307 -5.8871,1.17661 -10.95091,1.17661 h -4.95343 v -16.4043 h 2.74677 c 6.12602,0 10.1699,-1.31717 12.19181,-3.91736 1.99181,-2.60823 2.98772,-8.4913 2.98772,-17.6191 0,-17.3982 0.27106,-28.4556 0.81519,-33.1239 0.93567,-7.7022 2.83311,-13.9065 5.64012,-18.5467 2.83913,-4.59602 6.85087,-8.19815 12.0392,-10.8004 -6.78862,-3.814961 -11.5553,-8.878821 -14.3322,-15.191601 -2.77689,-6.31276 -4.16232,-16.9384 -4.16232,-31.9131 0,-13.5833 -0.12248,-21.681 -0.42165,-24.3555 -0.42567,-4.66831 -1.57016,-7.91303 -3.49972,-9.77031 -1.90346,-1.81913 -5.67626,-2.74677 -11.2581,-2.74677 h -2.74677 V 0.50179847 h 4.95343 c 5.7626,0 9.95504,0.53409403 12.5512,1.67457003 3.7728,1.53402 6.87697,4.09807 9.35067,7.7022 2.4737,3.6382705 4.1061,8.1981505 4.82894,13.6937005 0.72484,5.52366 1.14449,14.5491 1.20673,27.0601 0.0301,12.5532 0.54413,21.1831 1.4778,25.9618 0.96579,4.77874 2.86925,8.55756 5.70638,11.3405 2.86323,2.7789 6.57378,4.24063 11.1015,4.3852 z M 118.11533,91.19417 v 17.0428 c -4.52776,0.10842 -8.23831,1.57016 -11.1015,4.38319 -2.83713,2.78492 -4.74059,6.56173 -5.70638,11.3043 -0.93366,4.77874 -1.447681,12.9789 -1.477801,24.6045 -0.0623,11.6617 -0.24094,19.2917 -0.54413,23.0042 -0.53811,5.91921 -1.50791,10.6237 -2.95559,14.1535 -1.44768,3.52984 -3.22866,6.34488 -5.34295,8.44913 -2.14039,2.14039 -4.85504,3.74669 -8.14394,4.85102 -2.23276,0.78307 -5.88709,1.17661 -10.9509,1.17661 h -4.95343 v -16.4043 h 2.74677 c 6.12602,0 10.1699,-1.31717 12.1918,-3.91736 1.99181,-2.60823 2.98772,-8.4913 2.98772,-17.6191 0,-17.3982 0.27106,-28.4556 0.8152,-33.1239 0.93567,-7.7022 2.83311,-13.9065 5.64012,-18.5467 2.83913,-4.59602 6.85087,-8.19815 12.039201,-10.8004 -6.788621,-3.81496 -11.555301,-8.87882 -14.332201,-15.1916 -2.77689,-6.31276 -4.16232,-16.9384 -4.16232,-31.9131 0,-13.5833 -0.12248,-21.681 -0.42166,-24.3555 -0.42567,-4.66831 -1.57016,-7.91303 -3.49972,-9.77031 -1.90346,-1.81913 -5.67626,-2.74677 -11.2581,-2.74677 h -2.74677 V -0.62392049 h 4.95343 c 5.7626,0 9.95504,0.53409396 12.5512,1.67456999 3.7728,1.53402 6.87697,4.09807 9.35067,7.7022 2.4737,3.6382705 4.1061,8.1981505 4.82894,13.6937005 0.72485,5.52366 1.14449,14.5491 1.20673,27.0601 0.0301,12.5532 0.544141,21.1831 1.477801,25.9618 0.96579,4.77874 2.86925,8.55756 5.70638,11.3405 2.86323,2.7789 6.57378,4.24063 11.1015,4.3852 z m -172.212099,1.749649 v 17.042801 c 4.52776,0.10842 8.23831,1.57016 11.1015,4.38319 2.837131,2.78492 4.74059,6.56173 5.70638,11.3043 0.933662,4.77874 1.44768,12.97889 1.4778,24.6045 0.06225,11.6617 0.240945,19.29169 0.544134,23.00419 0.53811,5.91921 1.50791,10.62371 2.95559,14.15351 1.447681,3.52984 3.228661,6.34487 5.34295,8.44913 2.14039,2.14038 4.85504,3.74669 8.14394,4.85102 2.23276,0.78307 5.88709,1.17661 10.9508996,1.17661 h 4.95343 v -16.4043 h -2.74677 c -6.1260196,0 -10.1698996,-1.31717 -12.1917996,-3.91736 -1.99181,-2.60823 -2.98772,-8.4913 -2.98772,-17.6191 0,-17.3982 -0.271063,-28.4556 -0.815197,-33.1239 -0.935669,-7.7022 -2.83311,-13.9065 -5.64012,-18.5467 -2.83913,-4.59602 -6.85087,-8.19815 -12.0392,-10.8004 6.78862,-3.814961 11.5553,-8.878821 14.3322,-15.191601 2.77689,-6.31276 4.16232,-16.9384 4.16232,-31.9131 0,-13.5833 0.122481,-21.681 0.421654,-24.3555 0.425669,-4.66831 1.57016,-7.91303 3.49972,-9.77031 1.90346,-1.81913 5.67626,-2.74677 11.2580996,-2.74677 h 2.74677 V 1.1257292 h -4.95343 c -5.7625996,0 -9.9550396,0.534094 -12.5511996,1.67457 -3.7728,1.53402 -6.87697,4.09807 -9.35067,7.7021998 -2.4737,3.63827 -4.1061,8.19815 -4.82894,13.6937 -0.724843,5.52366 -1.14449,14.5491 -1.20673,27.0601 -0.03012,12.5532 -0.544134,21.1831 -1.4778,25.9618 -0.965787,4.77874 -2.86925,8.55756 -5.706381,11.3405 -2.863229,2.7789 -6.573779,4.24063 -11.101499,4.3852 z M 0.0240945,91.8181 v 17.0428 c 4.52776,0.10842 8.23831,1.57016 11.1015005,4.38319 2.83713,2.78492 4.740589,6.56173 5.706379,11.3043 0.933662,4.77874 1.44768,12.9789 1.4778,24.6045 0.06225,11.6617 0.240945,19.2917 0.544134,23.0042 0.53811,5.91921 1.50791,10.6237 2.95559,14.1535 1.447681,3.52984 3.228661,6.34488 5.34295,8.44913 2.14039,2.14039 4.85504,3.74669 8.14394,4.85102 2.23276,0.78307 5.88709,1.17661 10.9509,1.17661 h 4.95343 v -16.4043 h -2.74677 c -6.12602,0 -10.1699,-1.31717 -12.1918,-3.91736 -1.99181,-2.60823 -2.98772,-8.4913 -2.98772,-17.6191 0,-17.3982 -0.271063,-28.4556 -0.815197,-33.1239 -0.935669,-7.7022 -2.83311,-13.9065 -5.64012,-18.5467 -2.83913,-4.59602 -6.85087,-8.19815 -12.0392,-10.8004 6.78862,-3.81496 11.5553,-8.87882 14.3322,-15.1916 2.77689,-6.31276 4.16232,-16.9384 4.16232,-31.9131 0,-13.5833 0.122481,-21.681 0.421654,-24.3555 0.425669,-4.66831 1.57016,-7.91303 3.49972,-9.77031 1.90346,-1.81913 5.67626,-2.74677 11.2581,-2.74677 h 2.74677 V 1e-5 h -4.95343 c -5.7626,0 -9.95504,0.534094 -12.5512,1.67457 -3.7728,1.53402 -6.87697,4.09807 -9.35067,7.7022 -2.4737,3.63827 -4.1061,8.19815 -4.82894,13.6937 -0.724843,5.52366 -1.14449,14.5491 -1.20673,27.0601 -0.03012,12.5532 -0.544134,21.1831 -1.4778,25.9618 -0.965787,4.77874 -2.86925,8.55756 -5.70638,11.3405 -2.8632295,2.7789 -6.5737795,4.24063 -11.1014995,4.3852 z" /></g>
     </g>
    </svg>
    `,
    content: `<mj-text display="none">{{ }}</mj-text display="none">`, //<div hbs-helper="test" style="display:none">{{#each people}}</div>
  });
};


