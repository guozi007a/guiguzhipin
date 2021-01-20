// 抽离出来的，用来选择用户头像的组件

import React, { Component } from 'react'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'


export default class HeaderSelctor extends Component {
    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }
    state = { // 头像状态
        icon: null 
    }
    constructor(props) {
        super(props)
        // 把图片导入进去
        this.headerList = []
        for (let i = 0; i < 20; i++) {
            this.headerList.push({
                text: '头像' + (i + 1),
                // 用require引入图片， 并用模板字符串实现图片相对位置的拼接
                icon: require(`../../assets/images/头像${i+1}.png`)
            })
        }
    }
    handleClick = ({ text, icon }) => {
        // 更新当前组件状态
        this.setState({ icon })
        // 调用函数更新父组件状态
        this.props.setHeader(text)
    }
    
    render() {
        // 头部界面
        const { icon } = this.state
        const listHeader = !icon ? '请选择头像' : (
            <div>
                已选择头像：<img src={ icon } alt='233' />
            </div>
        )

        return (
            <List renderHeader={() => listHeader} className="my-list">
                <Grid data={ this.headerList } columnNum={5}
                onClick={ this.handleClick } ></Grid>
            </List>
        )
    }
}
