import './ContactMap.scss'
import * as React from 'react'
import { autobind } from 'core-decorators'
import { GoogleMap } from 'scripts/_common/ui-kit'

interface StateProps {
}

export class ContactMap extends React.Component<StateProps> {
    markers = []

    render() {
        const lat = 10.721405
        const lng = 106.696609
        const center = [10.723109, lng]

        return (
            <div className="contact-map">
                <GoogleMap
                    center={center}
                    zoom={16}
                    markers={[{ id: 1, lat, lng }]}
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
                        Home Builder
                        </h1>
                    <span style={{ color: 'rgb(255, 255, 255)', lineHeight: 1.5 }}>
                        Company's Address
                        </span>
                </div>
            </div>
        )
    }
}