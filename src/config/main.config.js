export const API_URL = 'http://personal-accounts-api-back.test/api'
export const registers_URL = 'http://personal-accounts-api-back.test/api/data/registers'
export const accounts_URL = 'http://personal-accounts-api-back.test/api/settings/accounts'
export const accounts_categories_URL = 'http://personal-accounts-api-back.test/api/settings/account-categories'

export const nf = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: 'usd',
    maximumFractionDigits: 2,
});