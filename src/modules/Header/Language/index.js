import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useOutsideClick } from 'hooks/useOutsideClick'

import style from './index.module.scss'

const Language = () => {
  const [show, setShow] = useState(false)
  const [active, setActive] = useState('en')
  const { settings } = useSelector(state => state.settings)

  const blockRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick(
    blockRef,
    () => setShow(false),
    { buttonRef }
  )

  return (
    <div 
      ref={blockRef}
      className={style.block}
    >
      <button
        ref={buttonRef}
        type={'button'}
        aria-label={active}
        className={style.toggle}
        onClick={() => setShow(!show)}
      >
        <span className={style.icon}></span>
      </button>
      {
        show &&
        <ul className={style.dropdown}>
          {
            settings.languages.map((el, idx) => 
              <li
                key={idx}
                className={style.item}
                onClick={() => {
                  setShow(!show)
                  setActive(el.code)
                }}
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
      }
    </div>
  )
}

export default Language
