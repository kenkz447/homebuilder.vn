import * as React from 'react'
import { AppNavLink } from 'scripts/_core'
import { Header } from 'scripts/_common/ui-kit'

export function MasterHeader() {
    return (
        <Header className="header">
            <div className="logo pl-3 pl-md-0">
                <AppNavLink className="logo-link" to="/">home builder</AppNavLink>
            </div>
            <div>
                <ul className="nav-menu">
                    <AppNavLink className="nav-menu-link" to="/">project</AppNavLink>
                    <AppNavLink className="nav-menu-link" to="/blog">blog</AppNavLink>
                    <AppNavLink className="nav-menu-link" to="/contact">contact</AppNavLink>
                </ul>
            </div>
        </Header>
    )
}