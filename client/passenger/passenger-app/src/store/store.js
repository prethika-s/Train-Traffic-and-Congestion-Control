import { configureStore } from '@reduxjs/toolkit'
import trainsReducer from './trainSlice.js'
import notificationsReducer from './notificationsSlice.js'


const store = configureStore({
reducer: {
trains: trainsReducer,
notifications: notificationsReducer
}
})


export default store