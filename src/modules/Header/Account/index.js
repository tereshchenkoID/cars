import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useOutsideClick } from 'hooks/useOutsideClick'
import { useWindowWidth } from 'context/WindowWidthContext'
import { useModal } from 'context/ModalContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { NAVIGATION, BREAKPOINTS } from 'constant/config'

import classNames from 'classnames'

import Reference from 'components/Reference'
import Button from 'components/Button'
import Backdrop from 'modules/Backdrop'
import Avatar from 'modules/Avatar'
import LoginModal from 'modules/LoginModal'
import RegistrationModal from 'modules/RegistrationModal'
import LanguageModal from 'modules/LanguageModal'
import Logout from '../Logout'

import style from './index.module.scss'

const Account = () => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const { windowWidth } = useWindowWidth()
  const { showModal } = useModal()
  const [show, setShow] = useState(false)
  const isMobile = windowWidth < BREAKPOINTS.lg

  const MENU = [
    NAVIGATION.searches,
    NAVIGATION.last,
    NAVIGATION.favorite,
    NAVIGATION.orders
  ]

  const blockRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick(
    blockRef,
    () => setShow(false),
    { buttonRef }
  )

  const openModal = (type) => {
    setShow(false)
    switch (type) {
      case 0:
        showModal(<LoginModal />)
        break
      case 1:
        showModal(<RegistrationModal />)
        break
      case 2:
        showModal(<LanguageModal />, t('modal.language'))
        break
      default:
        break
    }
  }

  return (
    <div ref={blockRef}>
      {
        (show && isMobile) && 
        <Backdrop onChange={() => setShow(false)} />
      }
      <div 
        className={
          classNames(
            style.block, 
            { [style.active]: show }
          )
        }
      >
        <button
          ref={buttonRef}
          type="button"
          aria-label="toggle"
          className={style.toggle}
          onClick={() => setShow(!show)}
        >
          {
            auth 
              ? 
                <Avatar size="sm" /> 
              : 
                <FontAwesomeIcon 
                  className={style.icon} 
                  icon="fa-regular fa-circle-user" 
                />
          }
          {
            !isMobile &&
            <>
              {
                auth 
                ? 
                  t('profile') 
                : 
                  t(NAVIGATION.login.text)
              }
              <FontAwesomeIcon 
                className={style.arrow}
                icon="fa-solid fa-angle-down" 
              />
            </>
          }
        </button>

        <div className={style.dropdown}>
          {
            isMobile && 
            <Button 
              classes={['secondary', 'square', style.close]} 
              icon="fa-solid fa-xmark" 
              onChange={() => setShow(false)} 
            />
          }
          {
            auth &&
            <div className={style.top}>
              <Avatar />
              <div className={style.meta}>
                <p className={style.name}>Ihor Tereshchenko</p>
                <p className={style.email}>tereschenko23041991@gmail.com</p>
              </div>
              <Logout />
            </div>
          }
          <div className={style.center}>
            {
              MENU.map((el, idx) => (
                auth 
                  ?
                    <Reference
                      key={idx}
                      link={el.link}
                      icon={el.icon}
                      classes={['secondary', 'left', 'wide', 'sm']}
                      placeholder={t(el.text)}
                      onChange={() => setShow(false)}
                    />
                  :
                    <Button
                      key={idx}
                      icon={el.icon}
                      classes={['secondary', 'left', 'wide', 'sm']}
                      placeholder={t(el.text)}
                      onChange={() => openModal(0)}
                    />
              ))
            }
          </div>
          <div className={style.bottom}>
            {
              auth 
              ? 
                <Reference
                  link={NAVIGATION.settings.link}
                  icon={NAVIGATION.settings.icon}
                  classes={['secondary', 'left', 'wide', 'sm']}
                  placeholder={t(NAVIGATION.settings.text)}
                  onChange={() => setShow(false)}
                />
              :
                <div className={style.setting}>
                  <Button
                    classes={['primary', 'wide']}
                    icon={NAVIGATION.login.icon}
                    placeholder={t(NAVIGATION.login.text)}
                    onChange={() => openModal(0)}
                  />
                  <p className={style.text}>
                    {t('notification.login')}
                    <button
                      type="button"
                      className={style.link}
                      aria-label="Registration"
                      onClick={() => openModal(1)}
                    >
                      {t('register')}
                    </button>
                  </p>
                </div>
              }
          </div>
          {isMobile && (
            <button
              type="button"
              aria-label="modal.language"
              className={style.language}
              onClick={() => openModal(2)}
            >
              <span className={style.flag}></span>
              <span>En (English)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Account