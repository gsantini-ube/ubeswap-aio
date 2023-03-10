import { nearestUsableTick, TickMath } from "../lib/src";
import { useMemo } from "react";
import { Bound } from "../state/mint/v3/actions";

export default function useIsTickAtLimit(tickLower: number | undefined, tickUpper: number | undefined) {
    return useMemo(
        () => ({
            [Bound.LOWER]: tickLower
                ? // ? tickLower === nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[feeAmount as FeeAmount])
                  tickLower === nearestUsableTick(TickMath.MIN_TICK, 60)
                : undefined,
            [Bound.UPPER]: tickUpper
                ? // ? tickUpper === nearestUsableTick(TickMath.MAX_TICK, TICK_SPACINGS[feeAmount as FeeAmount])
                  tickUpper === nearestUsableTick(TickMath.MAX_TICK, 60)
                : undefined,
        }),
        [tickLower, tickUpper]
    );
}
