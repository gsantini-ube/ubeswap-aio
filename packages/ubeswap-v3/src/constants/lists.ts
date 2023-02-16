import { IS_ON_APP_URL } from './misc'

const UBESWAP_LIST = 'https://raw.githubusercontent.com/Ubeswap/default-token-list/master/ubeswap.token-list.json'
const COMPOUND_LIST = 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json'

// only load blocked list if on app url
// export const UNSUPPORTED_LIST_URLS: string[] = IS_ON_APP_URL ? [BA_LIST] : []
export const UNSUPPORTED_LIST_URLS: string[] = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
    UBESWAP_LIST,
    COMPOUND_LIST,
    ...UNSUPPORTED_LIST_URLS // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [
    COMPOUND_LIST,
    UBESWAP_LIST
]
