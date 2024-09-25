import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useWindowWidth } from 'context/WindowWidthContext'
import { useOutsideClick } from 'hooks/useOutsideClick'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { BREAKPOINTS, NAVIGATION } from 'constant/config'

import classNames from 'classnames'

import { overflowBody } from 'helpers/overflowBody'

import Reference from 'components/Reference'
import Button from 'components/Button'
import Backdrop from 'modules/Backdrop'
import Logo from 'components/Logo'

import style from './index.module.scss'

const Menu = ({ setShow, show }) => {
  const { t } = useTranslation()
  const { windowWidth } = useWindowWidth()
  const { pathname } = useLocation()
  const isMobile = windowWidth < BREAKPOINTS.lg
  const [active, setActive] = useState(null)
  const MENU = [
    NAVIGATION.home,
    NAVIGATION.buy,
    NAVIGATION.works,
    NAVIGATION.review,
    {
      ...NAVIGATION.services,
      submenu: [
        NAVIGATION.audit,
        NAVIGATION.delivery,
        NAVIGATION.financing,
        NAVIGATION.warranty
      ],
    },
    NAVIGATION.electric,
    NAVIGATION.about
  ]

  const blockRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick(
    blockRef,
    () => {
      setActive(null)
    },
    {
      buttonRef: buttonRef,
    },
  )

  useEffect(() => {
    overflowBody(show)
  }, [show])

  return (
    <>
      { 
        (show && isMobile) && 
        <Backdrop onChange={() => setShow(false)} /> 
      }
      <menu
        className={
          classNames(
            style.menu,
            show && style.active
          )
        }
      >
        {
          isMobile &&
          <div className={style.meta}>
            <Button 
              classes={['secondary', 'square', style.close]}
              icon={'fa-solid fa-xmark'}
              onChange={() => setShow(false)}
            />
            <Logo />
          </div>
        }
        {
          MENU.map((el, idx) =>
            <div key={idx} className={style.item}>
              {
                el.submenu
                  ?
                    <span
                      className={
                        classNames(
                          style.link,
                          style.inner,
                          active === idx && style.active,
                        )
                      }
                      ref={buttonRef}
                      onClick={() => setActive(active === idx ? null : idx)}
                    >
                      <span className={style.text}>{t(el.text)}</span>
                      <FontAwesomeIcon
                        className={style.icon}
                        icon={'fa-solid fa-angle-down'}
                      />
                    </span>
                  :
                    <Link
                      to={el.link}
                      rel="noreferrer"
                      onClick={() => {
                        setActive(null)
                        setShow(false)
                      }}
                      className={classNames(
                        style.link,
                        pathname === el.link && style.active,
                      )}
                    >
                      <span className={style.text}>{t(el.text)}</span>
                    </Link>
              }
              {
                (active === idx && el.submenu) &&
                <div ref={blockRef} className={style.dropdown}>
                  {
                    el.submenu.map((s_el, s_idx) => (
                      <Reference
                        key={s_idx}
                        link={s_el.link}
                        classes={['secondary', 'sm', 'left']}
                        placeholder={t(s_el.text)}
                        onChange={() => {
                          setActive(null)
                          setShow(false)
                        }}
                      />
                    ))
                  }
                </div>
              }
            </div>
          )
        }
      </menu>
    </>
  )
}

export default Menu
