import { useSelector } from 'react-redux'

import style from './index.module.scss'

const LanguageModal = () => {
  const { settings } = useSelector(state => state.settings)

  return (
    <ul className={style.block}>
      {
        settings.languages.map((el, idx) =>
          <li
            key={idx}
            className={style.item}
          >
            <button
              type={'button'}
              className={style.option}
              aria-label={el.text}
            >
              <span className={style.icon}></span>
              <span className={style.text}>{el.text}</span>
            </button>
          </li>
        )
      }
    </ul>
  )
}

export default LanguageModal
