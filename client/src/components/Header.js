import React from 'react'
import { Link } from "react-router-dom"
import { Menu, MenuItem } from "semantic-ui-react";

const Header = () => {

  return (
    <Menu className="main-header" size="massive" stackable borderless attached inverted widths={3}>
      <MenuItem as={Link} to="/" name="Home">
        shrtn
      </MenuItem>
    </Menu>
  )
}

export { Header }