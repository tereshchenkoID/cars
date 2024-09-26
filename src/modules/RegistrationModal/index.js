import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useModal } from 'context/ModalContext'

import Field from 'components/Field'
import Button from 'components/Button'
import Password from 'components/Password'
import LoginModal from 'modules/LoginModal'
import Checkbox from 'components/Checkbox'

import style from './index.module.scss'

const RegistrationModal = () => {
  const { t } = useTranslation()
  const { showModal } = useModal()

  const [formData, setFormData] = useState({
    login: '',
    password: '',
    name: '',
    surname: '',
    postal: '',
    terms: false,
  })

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  const openModal = () => {
    showModal(<LoginModal />)
  }

  return (
    <div className={style.block}>
      <h5 className={style.title}>{t('modal.registration')}</h5>
      <p className={style.text}>
        {t('notification.registration')}
        <button
          type={'button'}
          className={style.link}
          aria-label={'Registration'}
          onClick={openModal}
        >
          {t('login')}
        </button>
      </p>
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
        <label className={style.label}>{t('personal_data')}</label>
        <div className={style.grid}>
          <Field
            placeholder={t('name')}
            data={formData.name}
            onChange={(value) => handleChange('name', value)}
          />
          <Field
            placeholder={t('surname')}
            data={formData.surname}
            onChange={(value) => handleChange('surname', value)}
          />
        </div>
        <Field
          placeholder={t('postal_code')}
          data={formData.postal}
          onChange={(value) => handleChange('postal', value)}
        />
        <Checkbox
          placeholder={t('notification.terms')}
          data={formData.terms}
          onChange={(value) => handleChange('terms', value)}
        />
        <Button
          type="submit"
          classes={['primary', 'wide']}
          placeholder={t('register')}
        />
      </form>
    </div>
  )
}

export default RegistrationModal