import App from "../App";

describe("App", () => {
  let component;
  beforeEach(() => {
    component = shallow(<App />);
  });

  test('it renders', () => {
    expect(component.find('.container')).toHaveLength(1);
  })
})


