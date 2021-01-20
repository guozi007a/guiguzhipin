import React, { Component } from 'react'
import { Button } from 'antd-mobile'

class NotFound extends Component {
    render() {
        return (
            <div>
                <h2>抱歉，找不到该页面 *_*orz_-</h2>
                <Button type="primary"
                onClick={ () => this.props.history.replace('/')}
                >
                    回到首页
                </Button>
            </div>
        )
    }
}

export default NotFound
