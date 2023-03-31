import styled from "styled-components/macro";
import { AutoColumn } from "../Column";
import { TYPE } from "../../theme";

//All
export const PaddedColumn = styled(AutoColumn)`
    padding: 20px;
`;

//ImportTokens
export const AddressText = styled(TYPE.blue)`
    font-size: 12px;
    word-break: break-all;

    ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 10px;
  `}
`;
