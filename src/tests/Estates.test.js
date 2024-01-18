import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Estates from '../pages/Estates';

describe('testes da tela Estates', () => {

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Estates/>
      </BrowserRouter>
    );
  });

  it('Existe card em Estates?', () => {
    expect(screen.getByTestId('mycard')).toBeInTheDocument();
  });

});