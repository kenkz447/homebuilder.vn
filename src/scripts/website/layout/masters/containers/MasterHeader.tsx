import * as React from 'react'
import { AppNavLink } from 'scripts/_core'
import { Header } from 'scripts/_common/ui-kit'
import { MasterOffCanvas } from './MasterOffCanvas'
import { MasterMenus } from './MasterMenu'

export function MasterHeader() {
    return (
        <Header id="header" className="header">
            <div className="logo pl-3 pl-md-0">
                <AppNavLink className="logo-link" to="/">home builder</AppNavLink>
            </div>
            <div className="text-right">
                <MasterOffCanvas />
                <ul className="nav-menu">
                    {MasterMenus.map((menuElement, i) => <li key={i}>{menuElement}</li>)}
                </ul>
            </div>
        </Header>
    )
}