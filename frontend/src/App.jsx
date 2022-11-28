import { BrowserRouter as Router } from 'react-router-dom'
import Routing from './routers'
import './App.css'

function App() {
  return (
    <div className="mainContainer">
      <Router>
        <Routing />
      </Router>
    </div>
  )
}

export default App
