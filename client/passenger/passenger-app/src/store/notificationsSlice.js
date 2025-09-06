import { createSlice } from '@reduxjs/toolkit'


const notificationsSlice = createSlice({
name: 'notifications',
initialState: { items: [] },
reducers: {
addNotification(state, { payload }) { state.items.unshift(payload) },
clearAll(state) { state.items = [] }
}
})


export const { addNotification, clearAll } = notificationsSlice.actions
export default notificationsSlice.reducer