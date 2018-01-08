import { SetTempValue, GetTempValue } from './state'
import { getStore } from '../app'

export const SetTempValueBind = (tempKey, tempValue) => {
    const setTempValueAction = SetTempValue(tempKey, tempValue)
    const store = getStore()
    store.dispatch(setTempValueAction)
}

export const GetTempValueBind = (tempKey) => {
    const getTempValueAction = GetTempValue(tempKey)
    const store = getStore()
    store.dispatch(getTempValueAction) 
}