import {YobotaTableBody} from '.'
import renderer from 'react-test-renderer'

test('renders yobota table body component', () => {
  const component = renderer.create(<YobotaTableBody />).toJSON()
  expect(component).toMatchSnapshot()
})
