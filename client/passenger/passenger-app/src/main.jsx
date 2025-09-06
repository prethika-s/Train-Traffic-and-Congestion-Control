import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider, useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import store from './store/store.js'
import { rehydrateJourneys } from './store/trainSlice.js'
import './styles.css'


function Bootstrapper() {
const dispatch = useDispatch()
useEffect(() => { dispatch(rehydrateJourneys()) }, [dispatch])
return <App />
}


createRoot(document.getElementById('root')).render(
<React.StrictMode>
<Provider store={store}>
<BrowserRouter>
<Bootstrapper />
</BrowserRouter>
</Provider>
</React.StrictMode>
)