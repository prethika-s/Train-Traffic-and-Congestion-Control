// src/store/trainSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { searchTrains, getLiveStatus } from '../api/trainService.js'
import { getTimetable } from '../api/timetableService.js'
import { getItem, setItem, Keys } from '../utils/offlineStorage.js'

/* ------------------------- API thunks ------------------------- */
export const searchTrainsThunk = createAsyncThunk('trains/search', searchTrains)
export const getLiveStatusThunk = createAsyncThunk('trains/live', getLiveStatus)
export const getTimetableThunk = createAsyncThunk('trains/timetable', getTimetable)

/* ----------------------- Persistence thunks ------------------- */
export const rehydrateJourneys = createAsyncThunk('trains/rehydrate', async () => {
  const stored = await getItem(Keys.MY_JOURNEYS)
  return Array.isArray(stored) ? stored : []
})

export const addJourneyThunk = createAsyncThunk(
  'trains/addJourneyThunk',
  async (journey, { dispatch, getState }) => {
    // update redux first
    dispatch(addJourney(journey))
    // then persist the latest list from state
    const { trains: { myJourneys } } = getState()
    await setItem(Keys.MY_JOURNEYS, myJourneys)
  }
)

export const removeJourneyThunk = createAsyncThunk(
  'trains/removeJourneyThunk',
  async (number, { dispatch, getState }) => {
    dispatch(removeJourney(number))
    const { trains: { myJourneys } } = getState()
    await setItem(Keys.MY_JOURNEYS, myJourneys)
  }
)

/* --------------------------- Slice ---------------------------- */
const initialState = {
  myJourneys: [],
  search: { results: [], status: 'idle', error: null },
  live: { status: 'idle', liveStatus: null, error: null },
  timetable: { status: 'idle', timetable: [], error: null }
}

const trainsSlice = createSlice({
  name: 'trains',
  initialState,
  reducers: {
    addJourney(state, action) {
      const exists = state.myJourneys.some(j => j.number === action.payload.number)
      if (!exists) state.myJourneys.push(action.payload)
    },
    removeJourney(state, action) {
      const number = action.payload
      state.myJourneys = state.myJourneys.filter(j => j.number !== number)
    }
  },
  extraReducers: (builder) => {
    builder
      // Rehydrate
      .addCase(rehydrateJourneys.fulfilled, (state, { payload }) => {
        state.myJourneys = payload
      })

      // Search
      .addCase(searchTrainsThunk.pending, (state) => {
        state.search.status = 'loading'; state.search.error = null
      })
      .addCase(searchTrainsThunk.fulfilled, (state, { payload }) => {
        state.search.status = 'succeeded'; state.search.results = payload
      })
      .addCase(searchTrainsThunk.rejected, (state, action) => {
        state.search.status = 'failed'; state.search.error = action.error.message
      })

      // Live
      .addCase(getLiveStatusThunk.pending, (state) => {
        state.live.status = 'loading'; state.live.error = null
      })
      .addCase(getLiveStatusThunk.fulfilled, (state, { payload }) => {
        state.live.status = 'succeeded'; state.live.liveStatus = payload
      })
      .addCase(getLiveStatusThunk.rejected, (state, action) => {
        state.live.status = 'failed'; state.live.error = action.error.message
      })

      // Timetable
      .addCase(getTimetableThunk.pending, (state) => {
        state.timetable.status = 'loading'; state.timetable.error = null
      })
      .addCase(getTimetableThunk.fulfilled, (state, { payload }) => {
        state.timetable.status = 'succeeded'; state.timetable.timetable = payload
      })
      .addCase(getTimetableThunk.rejected, (state, action) => {
        state.timetable.status = 'failed'; state.timetable.error = action.error.message
      })
  }
})

export const { addJourney, removeJourney } = trainsSlice.actions
export default trainsSlice.reducer
