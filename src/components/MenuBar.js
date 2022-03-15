import React, { useState } from "react"
import {Menu} from 'semantic-ui-react'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../authContext'
function MenuBar() {
  const [{user,username},dispatch]=useAuth()
  const navigate=useNavigate()
  const pathnsubstringame=window.location.pathname
  const path=pathnsubstringame==='/'?'home':pathnsubstringame.substring(1)
    const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const logout=()=>{
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("username")
      dispatch({
        type:'LOGOUT',
      })
      navigate('/')
  }

  const menuBar= user? (
    <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name={username}
          active
          as={Link}
          to="/"
        />
        <Menu.Menu position="right" >
        <Menu.Item
          name="logout"
          onClick={logout}
        />
        </Menu.Menu>
     </Menu>
  ):
     (
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    )
    return menuBar
  }


export default MenuBar