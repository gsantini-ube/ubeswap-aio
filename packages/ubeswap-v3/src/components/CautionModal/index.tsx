// import { t, Trans } from "@lingui/macro";
import { useCallback, useState } from "react";
import Modal from "../Modal";
import { AgreeButton, CautionList, CautionListItem, CautionModalInner } from "./styled";

const agreementItems = [
    `Using QuickSwap involves various risks, including, but not limited to, losses while digital assets are being supplied to QuickSwap, and losses due to the fluctuation of prices of tokens in a trading pair or liquidity pool.`,
    `You use QuickSwap at your own risk and without warranties of any kind. QuickSwap is not liable for potential losses.`,
    `Before using QuickSwap, you should review the relevant documentation to make sure you understand how QuickSwap works.`,
    `You are responsible for completing your own due diligence to understand the risks of trading crypto.`,
];

export default function CautionModal() {
    const [cautionModal, toggleCautionModal] = useState(() => {
        const accepted = localStorage.getItem("cautionAccepted");
        return !accepted;
    });

    const handleAgreement = useCallback(() => {
        localStorage.setItem("cautionAccepted", "true");
        toggleCautionModal(false);
    }, []);

    return (
        <Modal isOpen={cautionModal} onDismiss={() => {}}>
            <CautionModalInner>
                <p>Please confirm that you agree with the following paragraphs:</p>
                <CautionList>
                    {agreementItems.map((el, i) => (
                        <CautionListItem key={i}>{el}</CautionListItem>
                    ))}
                </CautionList>
                <AgreeButton onClick={handleAgreement}>I agree</AgreeButton>
            </CautionModalInner>
        </Modal>
    );
}
