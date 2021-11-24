import { Button } from 'antd'
import { Link } from 'react-router-dom'

function myButton({ type="primary", to, ...rest }) {
  const but = <Button type={type}  {...rest} />
  return to ? <Link to={to}>{but}</Link> : but
}
export default myButton
