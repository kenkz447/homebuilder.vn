import './home.scss'
import * as React from 'react'
import { MainMaster } from '../../layout'
import { Row, Col, Card } from 'scripts/_common/ui-kit'
import { AppNavLink } from 'scripts/_core'

export class Page extends React.Component {
    render() {
        return (
            <MainMaster>
                <div>
                    <div className="mb-4 text-center text-xl-left">
                        <h1>What’s on our mind?</h1>
                        <label>Collection of articles, videos, and resources made by designers at Facebook.</label>
                    </div>
                    <div className="">
                        <Row gutter={40} type="flex">
                            {
                                [0, 1, 2, 3, 4, 5].map(o => (
                                    <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
                                        <AppNavLink to="/sample-project">
                                            <Card />
                                        </AppNavLink>
                                    </Col>
                                ))
                            }
                        </Row>
                    </div>
                </div>
            </MainMaster>
        )
    }
}