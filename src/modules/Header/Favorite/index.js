import { useSelector } from 'react-redux'

import { NAVIGATION } from 'constant/config'

import Reference from 'components/Reference'

import style from './index.module.scss'

const Favorite = () => {
  const { auth } = useSelector(state => state.auth)

  return (
    <div className={style.block}>
      <Reference
        link={NAVIGATION.favorite.link}
        icon={NAVIGATION.favorite.icon}
        classes={['secondary', 'square']}
      />
      {
        auth && <span className={style.count}>1</span>
      }
    </div>
  )
}

export default Favorite
