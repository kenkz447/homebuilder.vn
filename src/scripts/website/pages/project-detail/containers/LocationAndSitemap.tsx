import * as React from 'react'
import { Viewer, ImageWithSrcProps, defaultImage } from 'scripts/_common/ui-kit'
import { autobind } from 'core-decorators';

interface LocationAndSitemapProps {
    location: ImageWithSrcProps
    sitemap: ImageWithSrcProps
}

export class LocationAndSitemap extends React.Component<LocationAndSitemapProps> {
    static defaultProps: LocationAndSitemapProps = {
        location: {
            src: defaultImage,
            alt: 'Location'
        },
        sitemap: {
            src: defaultImage,
            alt: 'Sitemap'
        }
    }

    viewer: Viewer

    render() {
        return (
            <>
            <label>View <u className="clickable" onClick={this.onLocationClick}>location</u> and <u className="clickable" onClick={this.onSitemapClick}>site map</u></label>
            <Viewer ref={(element) => this.viewer = element} images={[this.props.location, this.props.sitemap]} />
            </>
        )
    }

    @autobind
    onLocationClick() {
        this.viewer.toggle({ activeIndex: 0 })
    }

    @autobind
    onSitemapClick() {
        this.viewer.toggle({ activeIndex: 1 })
    }
}