import { matchPath } from  'react-router'
import { MenuItem, Menu } from './../../types'

export const checkMenuItemActive = (menuItem: MenuItem) => {
    const currentPath = new URL(window.location.href).pathname

    if (!menuItem.exact)
        if(menuItem.to.startsWith(currentPath) || currentPath.startsWith(menuItem.to))    
            return true
    
    if (matchPath(menuItem.to, { path: currentPath, exact: menuItem.exact }))
        return true
    
    return false
}

export const getAllActivePath = (menu: Menu) => {
    return menu.items.filter((o) => checkMenuItemActive(o)).map((o) => o.to)
}
    