import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { NAVIGATION } from 'constant/config'

import Container from 'components/Container'
import Logo from 'components/Logo'
import Social from 'modules/Social'

import style from './index.module.scss'

const PAYMENTS = [
  'visa',
  'visa-electron',
  'mastercard',
  'maestro',
  'diners-club',
  'discover',
]

const Footer = () => {
  const { t } = useTranslation()

  const MENU = [
    {
      title: 'Carvago',
      submenu: [
        NAVIGATION.buy,
        NAVIGATION.works,
        NAVIGATION.review,
        NAVIGATION.electric,
        NAVIGATION.sitemap
      ]
    },
    {
      title: t('services'),
      submenu: [
        NAVIGATION.audit,
        NAVIGATION.delivery,
        NAVIGATION.financing,
        NAVIGATION.warranty
      ]
    },
    {
      title: t('company'),
      submenu: [
        NAVIGATION.about,
        NAVIGATION.contact
      ]
    }
  ]

  return (
    <footer className={style.block}>
      <Container>
        <div className={style.top}>
          <div className={style.column}>
            <Logo />
            <p className={style.text}>Carvago 2024 • All rights reserved</p>
            <Social />
          </div>
          <div className={style.column}>
            {
              MENU.map((el, idx) =>
                <ul
                  key={idx}
                  className={style.submenu}
                >
                  <li className={style.item}>
                    <h6>{el.title}</h6>
                  </li>
                  {
                    el.submenu.map((sublink, index) =>
                      <li
                        className={style.item}
                        key={index}
                      >
                        <Link
                          to={sublink.link}
                          rel="noreferrer"
                          className={style.link}
                        >
                          {t(sublink.text)}
                        </Link>
                      </li>
                    )
                  }
                </ul>
              )
            }
          </div>
        </div>
        <div className={style.bottom}>
          <p className={style.transfer}>We accept online card payments as well as wire transfers.</p>
          <div className={style.payments}>
            {
              PAYMENTS.map((el, idx) =>
                <img
                  key={idx}
                  className={style.payment}
                  src={`./image/${el}.svg`}
                  alt={el}
                />
              )
            }
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
