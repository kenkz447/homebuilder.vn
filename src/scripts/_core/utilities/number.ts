const replace = require('lodash/replace')

export function formatCurrency(pnumber) {
    return replace(pnumber, /(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}