import { AuthProvider } from './AuthContext'
import { ModalProvider } from './ModalContext'
import { WindowWidthProvider } from './WindowWidthContext'

export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ModalProvider>
        <WindowWidthProvider>
          {children}
        </WindowWidthProvider>
      </ModalProvider>
    </AuthProvider>
  )
}