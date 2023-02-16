import { ActiveText, StyledArrowLeft, Tabs } from "./styled";
import { RowBetween } from "../Row";
import { Link as HistoryLink } from "react-router-dom";
// import { Trans } from '@lingui/macro'

interface FindPoolTabsProps {
    origin: string;
}

export function FindPoolTabs({ origin }: FindPoolTabsProps) {
    return (
        <div className={"flex-s-between mb-1"}>
            <HistoryLink to={origin}>
                <StyledArrowLeft />
            </HistoryLink>
            <div className={"fs-125 mxs_fs-1"}>Migrate from SushiSwap or QuickSwap</div>
            <div />
        </div>
    );
}
