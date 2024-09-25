import Button from 'components/Button';

import style from './index.module.scss'

const Modal = ({ children, onClose, title }) => {
  return (
    <div className={style.block} onClick={onClose}>
      <div className={style.content} onClick={e => e.stopPropagation()}>
        <div className={style.header}>
          <h6 className={style.title}>{title}</h6>
          <Button 
            classes={['secondary', 'square', 'sm']}
            icon={'fa-solid fa-xmark'}
            onChange={onClose}
          />
        </div>
        <div className={style.body}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
