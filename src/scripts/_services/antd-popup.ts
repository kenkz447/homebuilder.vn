import 'antd/lib/modal/style/css'

import * as Modal from 'antd/lib/modal'
import { ModalFuncProps } from 'antd/lib/modal'
import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Action } from 'redux'
import { takeEvery } from 'redux-saga'
import { CRService } from 'scripts/_core'
import { getStore } from 'scripts/_core'

export const SHOW_POPUP = 'ANTD_POPUP@SHOW'

interface ShowPopupPayload extends ModalFuncProps {
    popupType: 'modal' | 'success' | 'error' | 'info' | 'warning' | 'confirm'
    verticalCenter?: boolean,
    children?: any
}

export interface ShowPopupAction extends Action {
    payload: ShowPopupPayload
}

let modal
let containerElment = document.getElementById('antdModalContainer');
(function initModal() {
    if (!containerElment) {
        containerElment = document.createElement('div')
        containerElment.id = 'antdModalContainer'
    }
    document.body.appendChild(containerElment)
})()

export const ShowPopup = (payload: ShowPopupPayload): ShowPopupAction => {
    return {
        type: SHOW_POPUP,
        payload
    }
}

export const ShowPopupBind = (payload: ShowPopupPayload) => {
    const action = ShowPopup(payload)
    const store = getStore()
    store.dispatch(action)
}

export function closeModal(){
    onModalClose(modal)
}

function onModalClose(modal) {
    const containerElment = document.getElementById('antdModalContainer')
    modal = React.cloneElement(modal, { visible: false })
    render(modal, containerElment, () =>
        setTimeout(() => unmountComponentAtNode(containerElment), 500)
    )
}

function* onShow({ payload }: ShowPopupAction) {
    if (payload.popupType === 'modal') {
        modal = React.createElement(<any>Modal, <any>{
            ...payload,
            wrapClassName: 'full',
            visible: true,
            onCancel: () => {
                payload.onCancel && payload.onCancel()
                onModalClose(modal)
            },
            onOk: (...arg) => {
                payload.onOk()
            }
        })
        render(modal, document.getElementById('antdModalContainer'))
    }
    else
        Modal[payload.popupType || 'info'](payload)
}

function* popupSagas() {
    yield takeEvery(SHOW_POPUP, onShow)
}

export const Service: CRService = {
    middlewares: {
        sagas: popupSagas
    }
}