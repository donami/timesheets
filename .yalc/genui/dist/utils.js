import { withInfo } from '@storybook/addon-info';
var wInfoStyle = {
    header: {
        h1: {
            marginRight: '20px',
            fontSize: '25px',
            display: 'inline',
        },
        body: {
            paddingTop: 0,
            paddingBottom: 0,
        },
        h2: {
            display: 'inline',
            color: '#999',
        },
    },
    infoBody: {
        backgroundColor: '#eee',
        padding: '0px 5px',
        lineHeight: '2',
    },
};
export var wInfo = function (text) {
    return withInfo({ inline: true, source: false, styles: wInfoStyle, text: text });
};
//# sourceMappingURL=utils.js.map