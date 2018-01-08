import { ORM } from 'redux-orm'

let _orm: ORM

export function initORM(orm: ORM) {
    _orm = orm
}

export function getORM() {
    return _orm
}

//#region session
let session

export function getSession(dbState?) {
    return session
}

export function sessionStart(dbState) {
    const orm = getORM()
    session = orm.session(dbState)
    return session
}

export function sessionEnd() {
    return session.state
}
//#endregion