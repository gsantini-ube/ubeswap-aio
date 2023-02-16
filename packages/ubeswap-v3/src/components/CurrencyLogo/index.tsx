import React from "react";
// @ts-ignore
import { useActiveWeb3React } from "../../hooks/web3";
import { stringToColour } from "../../utils/stringToColour";
import { specialTokens } from "./SpecialTokens";
import { StyledImgLogo, StyledLogo } from "./styled";
import { WrappedCurrency } from "../../models/types";

import AlgebraConfig from "../../algebra.config";

export const getTokenLogoURL = (symbol: string) => `https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_${symbol}.png`;

export default function CurrencyLogo({ currency, size = "24px", style, fromList = false, ...rest }: { currency?: WrappedCurrency; size?: string; fromList?: boolean; style?: React.CSSProperties }) {
    const { chainId } = useActiveWeb3React();

    let logo;

    if (chainId === AlgebraConfig.CHAIN_PARAMS.chainId) {
        logo = AlgebraConfig.CHAIN_PARAMS.wrappedNativeCurrency.logo;
    }

    if (!currency) return <div />;

    // if (currency.address?.toLowerCase() in specialTokens) {
    //     return <StyledImgLogo src={specialTokens[currency.address.toLowerCase()]} size={size} style={style} {...rest} />;
    // }

    if (currency.isNative) {
        return <StyledImgLogo src={logo} size={size} style={style} {...rest} />;
    }

    return <StyledImgLogo src={getTokenLogoURL(currency.symbol)} size={size} style={style} {...rest} />;
}
