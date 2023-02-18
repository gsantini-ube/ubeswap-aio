import { AbstractConnector } from "@web3-react/abstract-connector";
import { SUPPORTED_WALLETS } from "../../constants/wallet";
import Option from "./Option";
import { injected } from "../../connectors";
import { ErrorButton, ErrorGroup, LoadingMessage, LoadingWrapper, PendingSection, StyledLoader } from "./styled";

interface PendingView {
    connector?: AbstractConnector;
    error?: boolean;
    setPendingError: (error: boolean) => void;
    tryActivation: (connector: AbstractConnector) => void;
    errorMessage: string;
}

export default function PendingView({ connector, error = false, setPendingError, tryActivation, errorMessage }: PendingView) {
    const isMetamask = window?.ethereum?.isMetaMask;

    return (
        <PendingSection>
            <LoadingMessage error={error}>
                <LoadingWrapper>
                    {error ? (
                        <ErrorGroup>
                            <div>Error connecting</div>
                            <ErrorButton
                                onClick={() => {
                                    setPendingError(false);
                                    connector && tryActivation(connector);
                                }}
                            >
                                Try Again
                            </ErrorButton>
                        </ErrorGroup>
                    ) : (
                        <>
                            <StyledLoader />
                            Initializing...
                        </>
                    )}
                </LoadingWrapper>
            </LoadingMessage>
            {Object.keys(SUPPORTED_WALLETS).map((key) => {
                const option = SUPPORTED_WALLETS[key];
                if (option.connector === connector) {
                    if (option.connector === injected) {
                        if (isMetamask && option.name !== "MetaMask") {
                            return null;
                        }
                        if (!isMetamask && option.name === "MetaMask") {
                            return null;
                        }
                    }
                    return <Option id={`connect-${key}`} key={key} clickable={false} color={option.color} header={errorMessage} subheader={option.description} icon={option.iconURL} />;
                }
                return null;
            })}
        </PendingSection>
    );
}
