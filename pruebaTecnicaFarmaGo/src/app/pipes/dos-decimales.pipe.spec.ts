import { DosDecimalesPipe } from '../services/dos-decimales.pipe';

describe('DosDecimalesPipe', () => {
  it('create an instance', () => {
    const pipe = new DosDecimalesPipe();
    expect(pipe).toBeTruthy();
  });
});
