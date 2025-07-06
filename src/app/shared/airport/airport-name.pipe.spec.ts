import { AirportNamePipe } from './airport-name.pipe';

describe('AirportNamePipe', () => {
  it('create an instance', () => {
    const pipe = new AirportNamePipe();
    expect(pipe).toBeTruthy();
  });
});
