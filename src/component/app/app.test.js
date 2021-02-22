import {App} from '.'
import renderer from 'react-test-renderer'

test('renders main app component', () => {
  const app = renderer.create(<App />).toJSON()
  expect(app).toMatchSnapshot()
})
