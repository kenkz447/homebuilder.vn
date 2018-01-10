import * as React from 'react'
import { AppNavLink } from 'scripts/_core'

export const MasterMenus = [
    <AppNavLink className="nav-menu-link" to="/" exact>project</AppNavLink>,
    <AppNavLink className="nav-menu-link" to="/blogs">blogs</AppNavLink>,
    <AppNavLink className="nav-menu-link" to="/contact">contact</AppNavLink>
]