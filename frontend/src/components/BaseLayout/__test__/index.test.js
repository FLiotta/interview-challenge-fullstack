// @Packages
import { getByTestId } from '@testing-library/react';
import { render } from 'jest-utils';

// @Project
import BaseLayout from '../index';

describe('BaseLayout component', () => {
  it('Should match snapshot', () => {
    const { container } = render(<BaseLayout />);

    expect(container).toMatchSnapshot();
  });

  it('Receives "children" prop', () => {
    const CUSTOMCHILDREN_TEST_ID = 'customchildren-testid';

    const { container } = render(
      <BaseLayout>
        <p data-testid={CUSTOMCHILDREN_TEST_ID}>Hola!</p>
      </BaseLayout>
    );

    const CustomChildrenNode = getByTestId(container, CUSTOMCHILDREN_TEST_ID);

    expect(CustomChildrenNode).toBeInTheDocument();
  })
});