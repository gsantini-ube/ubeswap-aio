import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

// import MenuIcon from '../../assets/images/menu.svg'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'

const StyledMenuButton = styled.button`
  font-size: 1rem;
  color: ${({ theme }) => theme.text2};
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 2.5rem;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 4rem;
  right: 0rem;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: -6.25rem;
  `};
`

const MenuItemInternal = styled(NavLink)`
  display: flex;
  text-decoration: none;
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

// const v2Url = 'https://app.ubeswap.org'
// const v3Url = 'https://cerulean-empanada-f96e93.netlify.app'
const v2Url = 'https://loquacious-paletas-7fecc7.netlify.app'
const v3Url = 'https://funny-trifle-929534.netlify.app'

export default function VersionToggleMenu() {
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.VERSION_SWITCHER)
  const toggle = useToggleModal(ApplicationModal.VERSION_SWITCHER)
  useOnClickOutside(node, open ? toggle : undefined)
  const { t } = useTranslation()
  const [currentVersion] = useState(window.location.origin !== v3Url ? 'V2' : 'V3')

  const onVersionChange = (versionId: number) => {
    if (window.location.origin !== v3Url && versionId === 3) {
      window.location.href = v3Url
    } else if (window.location.origin !== v2Url && versionId === 2) {
      window.location.href = v2Url
    }
  }

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle} aria-label={open ? t('menuClose') : t('menuOpen')}>
        {currentVersion}
      </StyledMenuButton>

      {open && (
        <MenuFlyout>
          <MenuItemInternal id="link" to="#" onClick={() => onVersionChange(2)}>
            V2
          </MenuItemInternal>
          <MenuItemInternal id="link" to="#" onClick={() => onVersionChange(3)}>
            V3
          </MenuItemInternal>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
