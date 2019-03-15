import {setGlobal} from 'reactn';
const beautify = require('js-beautify').html
export function setTheme(theme) {
    setGlobal({ 
        pageHTML: beautify(theme.code, { indent_size: 2 }),
        postHTML: beautify(theme.postCode, { indent_size: 2 })
    })
}