// import { useTranslation } from 'react-i18next'

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
  // const { t } = useTranslation()

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
            <h6>Carvago</h6>
          </div>
          <div className={style.column}>
            <h6>Services</h6>
          </div>
          <div className={style.column}>
            <h6>Company</h6>
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
