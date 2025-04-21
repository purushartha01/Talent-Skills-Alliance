import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'sonner'
import { IKContext } from 'imagekitio-react'
import authenticator, { publicKey, urlEndpoint } from './utilities/authenticator'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster richColors position='bottom-right' visibleToasts={5} closeButton />
      <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
        <App />
      </IKContext>
    </AuthProvider>
  </StrictMode>
)
