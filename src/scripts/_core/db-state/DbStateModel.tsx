import { Model } from 'redux-orm'
import { FetchSuccessAction, FETCH_SUCCESS } from '../fetch'
import { APISet } from './Types'

export class DbStateModel<T> extends Model<T> {
    static apiBase: string
    static apiSet: APISet

    static reducer({ type, payload }: FetchSuccessAction) {
        if (type !== FETCH_SUCCESS || payload.request.meta.modelName !== this.modelName)
            return
        
        let single, multi
        if (Array.isArray(payload.value.content))
            multi = payload.value.content
        else
            single = payload.value
        
        const apiAction = payload.request.meta.action

        switch (apiAction) {
            case nameof<APISet>(o => o.search):
                for (const item of multi)
                    this.mapToDbState(item)
                break
            case nameof<APISet>(o => o.get):
                this.mapToDbState(single)
                break
        }
    }
    static mapToDbState(value) {
        this.upsert(value)
    }
}