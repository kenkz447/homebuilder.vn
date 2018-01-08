export const SET_XXX = 'SET_XXX'

export interface SetXXXAction {
    value: string
}

export const SetXXX = (payload: SetXXXAction) =>{
    return {
        key: SET_XXX,
        value: payload.value
    }
}