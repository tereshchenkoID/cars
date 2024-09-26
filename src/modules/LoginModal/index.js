import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useModal } from 'context/ModalContext'

import { NAVIGATION } from 'constant/config'

import Field from 'components/Field'
import Button from 'components/Button'
import Password from 'components/Password'
import RegistrationModal from 'modules/RegistrationModal'
import RestoreModal from 'modules/RestoreModal'

import style from './index.module.scss'

const LoginModal = () => {
  const { t } = useTranslation()
  const { showModal } = useModal()

  const [formData, setFormData] = useState({
    login: '',
    password: '',
  })

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  const openModal = (type) => {
    const ModalComponent = type === 0 ? RegistrationModal : RestoreModal
    showModal(<ModalComponent />)
  }

  return (
    <div className={style.block}>
      <h5 className={style.title}>{t('modal.login')}</h5>
      <div className={style.social}>
        <Button
          classes={['alt', 'wide']}
          icon={'fa-brands fa-google'}
          placeholder="Google"
        />
        <Button
          classes={['alt', 'wide']}
          placeholder="Facebook"
          icon={'fa-brands fa-facebook'}
        />
      </div>
      <p className={style.text}>
        {t('notification.login')}
        <button
          type="button"
          className={style.link}
          aria-label="Registration"
          onClick={() => openModal(0)}
        >
          {t('register')}
        </button>
      </p>
      <div className={style.divider}>{t('notification.via_email')}</div>
      <form className={style.form}>
        <label className={style.label}>{t('login')}</label>
        <Field
          type="email"
          placeholder={t('email')}
          data={formData.login}
          onChange={(value) => handleChange('login', value)}
        />
        <Password
          placeholder={t('password')}
          data={formData.password}
          onChange={(value) => handleChange('password', value)}
        />
        <button
          type="button"
          className={style.restore}
          aria-label="Restore Password"
          onClick={() => openModal(1)}
        >
          {t('notification.forgot_password')}
        </button>
        <Button
          type="submit"
          classes={['primary', 'wide']}
          placeholder={t(NAVIGATION.login.text)}
        />
      </form>
    </div>
  )
}

export default LoginModal