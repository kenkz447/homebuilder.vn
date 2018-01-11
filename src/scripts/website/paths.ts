import { ViewRoute } from 'scripts/_core'

export const HomePath: ViewRoute = {
    path: '/',
    allowAnonymous: true,
    exact: true
}

export const BlogsPath: ViewRoute = {
    path: '/blogs',
    allowAnonymous: true,
    exact: true
}

export const BlogDetailPath: ViewRoute = {
    path: `${BlogsPath.path}/:blog`,
    allowAnonymous: true,
    exact: true
}

export const ProjectDetailPath: ViewRoute = {
    path: '/:project',
    allowAnonymous: true,
    exact: true
}

export const LayoutDetailPath: ViewRoute = {
    path: `/layout/:layout`,
    allowAnonymous: true,
    exact: true
}

export const PrepectiveDetailPath: ViewRoute = {
    path: `/perspective/:perspective`,
    allowAnonymous: true,
    exact: true
}

export const ProductDetailPath: ViewRoute = {
    path: `${PrepectiveDetailPath.path}/:product`,
    allowAnonymous: true,
    exact: true
}
