import { statePipeWithAction } from '../../_core/utilities'
import { Map } from 'immutable'
import { SET_XXX, SetXXXAction } from 'scripts/website/state/actions'

const initState = Map({})

const setXXX = (action: SetXXXAction) => (state: Map<any, any>) => state.set('XXX', action.value)

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case SET_XXX:
        return statePipeWithAction([setXXX], state, action)
    }
    return state
}