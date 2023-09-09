import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from 'features/Auth/authSlice'
import usersReducer from 'features/User/userSlice'
import pollsReducer from 'features/Poll/pollSlice'

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  polls: pollsReducer
})

const store = configureStore({
  reducer: rootReducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export type AppStore = ReturnType<typeof setupStore>

export default store
