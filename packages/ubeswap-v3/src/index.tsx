import "inter-ui";
import "@reach/dialog/styles.css";
import "./components/analytics";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { Children, StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import Blocklist from "./components/Blocklist";
import { NetworkContextName } from "./constants/misc";
// import { LanguageProvider } from "./i18n";
import App from "./pages/App";
import store from "./state";
import ApplicationUpdater from "./state/application/updater";
import ListsUpdater from "./state/lists/updater";
import MulticallUpdater from "./state/multicall/updater";
import LogsUpdater from "./state/logs/updater";
import TransactionUpdater from "./state/transactions/updater";
import UserUpdater from "./state/user/updater";
import ThemeProvider, { ThemedGlobalStyle } from "./theme";
import getLibrary from "./utils/getLibrary";
import "@fontsource/montserrat";
import GasUpdater from "./state/application/gasUpdater";
import "./assets/styles/index.scss";

import AlgebraConfig from "./algebra.config";
import V3FarmingPage from "./pages/Farming/FarmingPage";

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

if (window.ethereum) {
    window.ethereum.autoRefreshOnNetworkChange = false;
}

const client = new ApolloClient({
    uri: AlgebraConfig.SUBGRAPH.infoURL,
    cache: new InMemoryCache(),
});

function Updaters() {
    return (
        <>
            <ListsUpdater />
            <UserUpdater />
            <ApplicationUpdater />
            <TransactionUpdater />
            <MulticallUpdater />
            <LogsUpdater />
            <GasUpdater />
        </>
    );
}

function Wrapper({ children }) {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <HashRouter>
                    {/* <LanguageProvider> */}
                    <Web3ReactProvider getLibrary={getLibrary}>
                        <Web3ProviderNetwork getLibrary={getLibrary}>
                            <Blocklist>
                                <Updaters />
                                <ThemeProvider>
                                    <ThemedGlobalStyle />
                                    {children}
                                </ThemeProvider>
                            </Blocklist>
                        </Web3ProviderNetwork>
                    </Web3ReactProvider>
                    {/* </LanguageProvider> */}
                </HashRouter>
            </Provider>
        </ApolloProvider>
    );
}

ReactDOM.render(
    <StrictMode>
        <Wrapper>
            <App />
        </Wrapper>
    </StrictMode>,
    document.getElementById("root")
);

export function FarmingPage() {
    return (
        <Wrapper>
            <V3FarmingPage />
        </Wrapper>
    );
}
