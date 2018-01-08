import { Action } from 'redux'
import { Map } from 'immutable'

import { statePipe, statePipeWithAction } from '../../utilities'

import { BREAKPOINT_CHANGE, WINDOW_CHANGE_WIDTH } from './keys'
import { IBreakPointChangeAction, WindowResizeAction } from './actions'

const breakpointChange = (breakPoint) => (state: Map<string, number>) => state.set('currentBreakPoint', breakPoint)
const layotWidthChange = ({ windowWidth }: WindowResizeAction) => (state: Map<string, number>) => state.set('WINDOW_WIDTH', windowWidth)

const initialState: Map<string, Object> = Map({
    type: 1,
    WINDOW_WIDTH: document.body.clientWidth
})

export const reducer = (state: Map<string, object> = initialState, action: Action): Map<string, object> => {
    switch (action.type) {
        case BREAKPOINT_CHANGE:
            const breakpointChangeAction = action as IBreakPointChangeAction
            return statePipe([breakpointChange(breakpointChangeAction.breakPoint)], state)
        case WINDOW_CHANGE_WIDTH:
            return statePipeWithAction([layotWidthChange], state, action)
        default:
            return state
    }
}