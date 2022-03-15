import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import SinglePost from './pages/SinglePost'
import {Container} from 'semantic-ui-react'

function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/posts/:postId' element={<SinglePost/>}/>
        </Routes>
      </Container>
    </Router>
    
  )
}

export default App;
