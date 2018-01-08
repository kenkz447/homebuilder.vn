import { Map } from 'immutable'
import {
    CHANGE_CURRENT_LANGUAGE,
    INIT_RESOURCES,
    ChangeCurrentLanguageAction, InitResources
} from './actions'
import { statePipeWithAction } from '../../utilities'

const changeCurrentLanguage = ({ language }: ChangeCurrentLanguageAction) => (state: Map<any, any>) => state.set('CURRENT_LANGUAGE', language)
const initResources = ({ resources }: InitResources) => (state: Map<any, any>) => state.set('RESOURCES', resources)

const initState = Map({

})

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_CURRENT_LANGUAGE:
            return statePipeWithAction([changeCurrentLanguage], state, action)
        case INIT_RESOURCES:
            return statePipeWithAction([initResources], state, action)
        default:
            return state
    }
}