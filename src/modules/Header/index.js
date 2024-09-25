import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowWidth } from 'context/WindowWidthContext'

import { BREAKPOINTS } from 'constant/config'

import classNames from 'classnames'

import Logo from 'components/Logo'
import Menu from './Menu'
import Account from './Account'
import Language from './Language'
import Favorite from './Favorite'

import style from './index.module.scss'

const Header = () => {
  const { t } = useTranslation()
  const { windowWidth } = useWindowWidth()
  const [show, setShow] = useState(false)
  const isMobile = windowWidth < BREAKPOINTS.lg

  return (
    <header className={style.block}>
      {
        isMobile &&
        <div
          className={style.button}
          onClick={() => setShow(!show)}
        >
          <button
            type={'button'}
            className={classNames(style.toggle, show && style.active)}
            aria-label="Toggle"
          >
            <span className={style.line} />
            <span className={style.line} />
            <span className={style.line} />
          </button>
          <p className={style.text}>{t('menu')}</p>
        </div>
      }
      <Logo setShow={setShow} />
      <Menu setShow={setShow} show={show} />
      <div className={style.wrapper}>
        <Favorite />
        {!isMobile && <Language />}
        <Account />
      </div>
    </header>
  )
}

export default Header
