// import { Trans } from "@lingui/macro";
import { CheckOutLink } from "./styled";

export function CheckOut({ link }: { link: string }) {
    return (
        <CheckOutLink to={`/farm/${link}`}>
            <span>✨ New farm is available →</span>
        </CheckOutLink>
    );
}
