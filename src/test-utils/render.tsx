import React from 'react'
import { render as RTLRender, RenderOptions } from '@testing-library/react'
import { GlobalStyle } from 'index.styled'
import { Provider } from 'react-redux'
import store, { AppStore, RootState, setupStore } from 'app/store'
import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom'
import type { Router } from '@remix-run/router'
import { PropsWithChildren } from 'react'
import { PreloadedState } from '@reduxjs/toolkit'
import { AppRoutes } from 'app/routes'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
  router?: Router
}

export function renderWithProvider(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    router = createMemoryRouter(AppRoutes),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return (
      <MemoryRouter>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    )
  }
  return { store, ...RTLRender(ui, { wrapper: Wrapper, ...renderOptions }) }
}

const TestAppWithReduxAndRouter = ({ store, router }: { store?: AppStore; router?: Router }) => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </Provider>
  )
}

export const renderWithRouter = (router, options?: Parameters<typeof RTLRender>[1]) => {
  const rendered = RTLRender(<TestAppWithReduxAndRouter router={router} store={store} />, options)
  return {
    ...rendered,
    rerender: (ui, options?: Parameters<typeof RTLRender>[1]) =>
      renderWithRouter(router, { container: rendered.container, ...options })
  }
}
