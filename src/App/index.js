import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import { AppProviders } from 'context/AppProviders'

import i18n from 'i18next'

import 'rc-slider/assets/index.css'
import 'react-phone-input-2/lib/style.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import { setSettings } from 'store/actions/settingsAction'
import { setAuth } from 'store/actions/authAction'

import Toastify from 'components/Toastify'
import Header from 'modules/Header'
import Footer from 'modules/Footer'
import DelayedSuspense from './DelayedSuspense'

import { generateRoutes } from '../router'

import style from './index.module.scss'

const App = () => {
  const { auth } = useSelector(state => state.auth)
  const [loading, setLoading] = useState(true)
  const [configLoaded, setConfigLoaded] = useState(false)
  const routes = generateRoutes(auth)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(config => {
        localStorage.setItem('config', JSON.stringify(config.hostnames))
        setConfigLoaded(true)
      })
  }, [])

  useEffect(() => {
    if (configLoaded) {
      Promise.all([
        dispatch(setAuth()),
        dispatch(setSettings()),
      ]).then(json => {
        const storedLanguage = JSON.parse(localStorage.getItem('language'))?.code
        const defaultLanguage = json[0]?.account?.language?.code

        i18n.changeLanguage(storedLanguage || defaultLanguage)
        setLoading(false)
      })
    }
  }, [configLoaded, dispatch])

  if (loading) return false

  return (
    <AppProviders>
      <Header />
      <main className={style.main}>
        <DelayedSuspense>
          <Routes>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                >
                  {route.children && route.children.map((childRoute, childIndex) => {
                    return (
                      <Route
                        key={childIndex}
                        path={childRoute.path}
                        element={childRoute.element}
                      />
                    );
                  })}
                </Route>
              )
            })}
          </Routes>
        </DelayedSuspense>
        <Toastify />
        <Tooltip id={'tooltip'} place={'bottom-start'} />
      </main>
      <Footer />
    </AppProviders>
  )
}

export default App
library.add(
  fas,
  fab,
  far
)