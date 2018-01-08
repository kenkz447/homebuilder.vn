import { ApiCallbacks, fetchUti, FetchStartPayload } from '../../fetch'
import { APISet, EntryProps, BaseDbStateEntry, } from '../Types'
import { autobind } from 'core-decorators'
import { getORM } from '../orm'

export class DbStateEntry<T extends BaseDbStateEntry> {
    [key: string]: any
    status: 'NEW' | 'MODIFIED' | 'DELETE' | 'NO_ACTION' | 'ERROR_IN_ACTION'
    id

    private _value: T

    get value() {
        return this._value
    }

    set value(value) {
        if (!value)
            return

        this.id = value.id
        this._value = value
    }

    private model = undefined

    @autobind
    private callAction(params: { actionName: string, value?: any, callbacks?: ApiCallbacks }) {
        if (!this.model)
            return

        // DO NOT REMOVE LINE BELOW
        const apiSet: APISet<T> = this.model.apiSet

        let apiPayload: FetchStartPayload = apiSet[params.actionName](params.value)
        if (!apiPayload)
            return
        
        if (!apiPayload.meta)
            apiPayload.meta = {}
        
        apiPayload.meta.history = true
        apiPayload.meta.action = params.actionName
        apiPayload.meta.modelName = this.model.modelName

        if (!apiPayload.meta)
            apiPayload.meta = {}

        if (params.callbacks)
            apiPayload = { ...apiPayload, ...params.callbacks }

        fetchUti.FetchStartBind(apiPayload)
    }

    constructor(props: EntryProps) {
        const orm = getORM()
        if (props.model)
            this.model = props.model
        if (props.modelName) {
            const models = orm.getModelClasses()
            this.model = models.find(o => o.modelName == props.modelName)
        }

        if (props.value)
            this.value = props.value

        if (props.value === null)
            props.id ? this.callAction({ actionName: nameof<APISet<T>>(o => o.get), value: { id: props.id } }) :
                this.callAction({ actionName: nameof<APISet<T>>(o => o.search), value: props.value || {} })
    }

    @autobind
    create(value = this.value) {
        return new Promise((resolve, reject) => {
            this.callAction({
                actionName: nameof<APISet<T>>(o => o.create),
                value, callbacks: {
                    success: resolve,
                    error: reject
                }
            })
        })
    }

    @autobind
    update(value = this.value) {
        return new Promise((resolve, reject) => {
            this.callAction({
                actionName: nameof<APISet<T>>(o => o.update),
                value, callbacks: {
                    success: resolve,
                    error: reject
                }
            })
        })
    }

    @autobind
    delete() {
        return new Promise((resolve, reject) => {
            this.callAction({
                actionName: nameof<APISet<T>>(o => o.delete),
                value: this.value, callbacks: {
                    success: resolve,
                    error: reject
                }
            })
        })
    }
}
