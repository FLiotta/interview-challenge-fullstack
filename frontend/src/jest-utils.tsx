// @Packages
import { ReactNode } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';

// @Project
import store from 'store';
import { JsxElement } from 'typescript';

function render(
  ui: ReactNode | JsxElement | any,
  renderOptions: any = { }
) {
  function Wrapper({ children }: any) {
    return (
      <Provider store={store}>{children}</Provider>
    )
  }
  return rtlRender(ui, {
     wrapper: Wrapper, 
     ...renderOptions
    })
}

export * from '@testing-library/react'

export { render }
