import 'antd/lib/notification/style/css'
import './antd-notification.scss'

import * as notification from 'antd/lib/notification'
import { ArgsProps } from 'antd/lib/notification'
import { Action } from 'redux'
import { takeEvery } from 'redux-saga'
import { getStore } from 'scripts/_core'

import { CRService } from './../_core/types/Module'

export const SHOW_NOTIFY = 'ANTD_NOTIFICATION_SHOW'

export interface ShowNotificationPayload extends ArgsProps {
    notifyType: 'success' | 'info' | 'warning' | 'error',
}

export interface ShowNotificationAction extends Action {
    payload: ShowNotificationPayload
}

export const ShowNotification = (payload: ShowNotificationPayload): ShowNotificationAction => ({
    type: SHOW_NOTIFY,
    payload
})

export const ShowNotificationBind = (payload: ShowNotificationPayload) => {
    const action = ShowNotification(payload)
    const store = getStore()
    store.dispatch(action)
}

function* onShow({ payload }: ShowNotificationAction) {
    notification[payload.notifyType || 'info'](payload)
}

export function* notificationSagas() {
    yield takeEvery(SHOW_NOTIFY, onShow)
}

export const Service: CRService = {
    middlewares: {
        sagas: notificationSagas
    }
}