import { BrowserRouter as Router } from 'react-router-dom'
import Routing from './routers'

function Index() {
  return (
    <div className="mainContainer">
      <Router>
        <Routing />
      </Router>
    </div>
  )
}

export default Index
