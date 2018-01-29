import './ContactMap.scss'
import * as React from 'react'
import { autobind } from 'core-decorators'
import { GoogleMap } from 'scripts/_common/ui-kit'
import { withDbStateEntry } from 'scripts/_core/db-state'
import { SettingModel, Setting } from 'scripts/_dbState'

interface StateProps {
    companyName?: Setting
    companyAddress?: Setting
    lat?: Setting
    lng?: Setting
    center?: Array<number>
}

@withDbStateEntry({
    modelName: SettingModel.modelName,
    toProp: nameof<StateProps>(o => o.lat),
    identyKey: nameof<Setting>(o => o.name),
    getId: () => {
        return 'ContactMapLatitude'
    }
})
@withDbStateEntry({
    modelName: SettingModel.modelName,
    toProp: nameof<StateProps>(o => o.lng),
    identyKey: nameof<Setting>(o => o.name),
    getId: () => {
        return 'ContactMapLongitude'
    }
})
@withDbStateEntry({
    modelName: SettingModel.modelName,
    toProp: nameof<StateProps>(o => o.companyName),
    identyKey: nameof<Setting>(o => o.name),
    getId: () => {
        return 'CompanyName'
    }
})
@withDbStateEntry({
    modelName: SettingModel.modelName,
    toProp: nameof<StateProps>(o => o.companyAddress),
    identyKey: nameof<Setting>(o => o.name),
    getId: () => {
        return 'CompanyAddress'
    }
})    
export class ContactMap extends React.Component<StateProps> {
    markers = []

    render() {
        const { lat, lng } = this.props
        const center = [lat.value + 0.002000, lng.value]

        return (
            <div className="contact-map">
                <GoogleMap
                    center={center}
                    zoom={16}
                    markers={[{ id: 1, lat: lat.value, lng: lng.value }]}
                    renderMarkerContent={this.renderMarkerContent}
                />
            </div>
        )
    }

    @autobind
    renderMarkerContent(marker) {
        return (
            <div className="b-marker clearfix">
                <div className="d-inline-block">
                    <h1 className="company-name" style={{ color: 'rgb(255, 255, 255)' }}>
                        {this.props.companyName.value}
                    </h1>
                    <span style={{ color: 'rgb(255, 255, 255)', lineHeight: 1.5 }}>
                        {this.props.companyAddress.value}
                    </span>
                </div>
            </div>
        )
    }
}