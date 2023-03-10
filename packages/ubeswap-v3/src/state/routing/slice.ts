import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import qs from "qs";

import AlgebraConfig from "../../algebra.config";

export interface GetQuoteResult {
    blockNumber: string;
    gasPriceWei: string;
    gasUseEstimate: string;
    gasUseEstimateQuote: string;
    gasUseEstimateQuoteDecimals: string;
    gasUseEstimateUSD: string;
    methodParameters: { calldata: string; value: string };
    quote: string;
    quoteDecimals: string;
    quoteGasAdjusted: string;
    quoteGasAdjustedDecimals: string;
    quoteId: string;
    routeEdges: {
        fee: string;
        id: string;
        inId: string;
        outId: string;
        percent: number;
        type: string;
    }[];
    routeNodes: { chainId: number; id: string; symbol: string; type: string }[];
    routeString: string;
}

export const routingApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.uniswap.org/v1/",
    }),
    endpoints: (build) => ({
        getQuote: build.query<
            GetQuoteResult,
            {
                tokenInAddress: string;
                tokenInChainId: number;
                tokenOutAddress: string;
                tokenOutChainId: number;
                amount: string;
                type: "exactIn" | "exactOut";
                recipient?: string;
                slippageTolerance?: string;
                deadline?: string;
            }
        >({
            query: (args) => `quote?${qs.stringify(args)}`,
        }),
    }),
});

export const { useGetQuoteQuery } = routingApi;
