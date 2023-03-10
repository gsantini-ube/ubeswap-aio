import React from 'react'
import ReactDOM from 'react-dom'

import { CurrencyModalView } from './components/SearchModal/CurrencySearchModal'
import { createTokenFilterFunction } from './components/SearchModal/filtering'
import CurrencySearchModal from './pages/CurrencySearchModal'
import UbeswapHeader from './pages/UbeswapHeader'

ReactDOM.render(
  <React.StrictMode>
    <UbeswapHeader
      version={2}
      darkMode={true}
      showToggleDarkMode={true}
      onUpdateProvider={async (provider) => {
        console.log(await provider.listAccounts())
      }}
    />
  </React.StrictMode>,
  document.getElementById('root')
)

export { createTokenFilterFunction, CurrencyModalView, CurrencySearchModal, UbeswapHeader }
