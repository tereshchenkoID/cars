import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setAuth } from 'store/actions/authAction'
import { getData } from 'helpers/api'

import Button from 'components/Button'

const Logout = ({ onChange = () => {} }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    getData('logout/').then(json => {
      dispatch(setAuth(json))
      onChange()
      navigate('/')
      window.location.reload()
    })
  }

  return (
    <Button
      icon={'fa-solid fa-arrow-right-from-bracket'}
      classes={['secondary', 'square']}
      onChange={handleLogout}
    />
  )
}

export default Logout