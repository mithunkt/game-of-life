import React from 'react';
import { render } from '@testing-library/react';
import Cell from './Cell';

test('renders cell', () => {
  const {container} = render(<Cell />);
  const cell = container.querySelector('.cell');
  expect(cell).toBeDefined();
});

test('renders cell correctly if cell is "live"', () => {
    const {container} = render(<Cell isLive/>);
    const cell = container.querySelector('.cell');
    expect(cell?.classList).toContain('live');
});

test('renders cell correctly with "id"', () => {
    const {container} = render(<Cell id={ 'ID' }/>);
    const cell = container.querySelector('.cell');
    expect(cell?.id).toEqual('ID');
});
