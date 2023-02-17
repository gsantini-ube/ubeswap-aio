import './i18n'
import '@celo-tools/use-contractkit/lib/styles.css'

import React from 'react'
import ReactDOM from 'react-dom'

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

export default UbeswapHeader
