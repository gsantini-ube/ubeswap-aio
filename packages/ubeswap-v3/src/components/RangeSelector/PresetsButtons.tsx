import React from "react";
import { AutoRow } from "components/Row";
import { TYPE } from "theme";
import { Trans } from "@lingui/macro";
import { FeeAmount } from "../../lib/src";
import { Button } from "./styled";

const RANGES = {
    [FeeAmount.LOW]: [
        { label: "0.05", ticks: 5 },
        { label: "0.1", ticks: 10 },
        { label: "0.2", ticks: 20 },
    ],
    [FeeAmount.MEDIUM]: [
        { label: "1", ticks: 100 },
        { label: "10", ticks: 953 },
        { label: "50", ticks: 4055 },
    ],
    [FeeAmount.HIGH]: [
        { label: "2", ticks: 198 },
        { label: "10", ticks: 953 },
        { label: "80", ticks: 5878 },
    ],
};

interface PresetsButtonProps {
    feeAmount: FeeAmount | undefined;
    setRange: (numTicks: number) => void;
    setFullRange: () => void;
}

const PresetButton = ({
    values: { label, ticks },
    setRange,
}: {
    values: {
        label: string;
        ticks: number;
    };
    setRange: (numTicks: number) => void;
}) => (
    <Button
        onClick={() => {
            setRange(ticks);
        }}
    >
        <TYPE.body fontSize={12}>
            <Trans>+/- {label}%</Trans>
        </TYPE.body>
    </Button>
);

export default function PresetsButtons({ feeAmount, setRange, setFullRange }: PresetsButtonProps) {
    feeAmount = feeAmount ?? FeeAmount.LOW;

    return (
        <AutoRow gap="4px" width="auto">
            <PresetButton values={RANGES[feeAmount][0]} setRange={setRange} />
            <PresetButton values={RANGES[feeAmount][1]} setRange={setRange} />
            <PresetButton values={RANGES[feeAmount][2]} setRange={setRange} />
            <Button
                onClick={() => {
                    setFullRange();
                }}
            >
                <TYPE.body fontSize={12}>
                    <Trans>Full Range</Trans>
                </TYPE.body>
            </Button>
        </AutoRow>
    );
}
