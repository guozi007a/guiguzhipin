/*
显示指定用户列表信息的UI组件
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WingBlank, WhiteSpace, Card } from 'antd-mobile'
import { withRouter } from 'react-router-dom' //把非路由组件变成路由组件，让组件能使用history属性

const Header = Card.Header
const Body = Card.Body

class UserList extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    render() {
        const { userList } = this.props

        return (
            <WingBlank style={{ margin: '36px 0 50px 0'}} >
                {
                    userList.map(user => (
                        <div key={ user._id } >
                            <WhiteSpace />
                            <Card onClick={ () => this.props.history.push(`/chat/${user._id}`) } >
                                <Header 
                                    thumb={require(`../../assets/images/${ user.header }.png`)}
                                    extra={ user.username }
                                />
                                <Body>
                                    <div>职位：{ user.post } </div>
                                    { user.company ? <div>公司：{ user.company } </div> : null }
                                    { user.salary ? <div>月薪：{ user.salary } </div> : null }
                                    <div>描述：{ user.info } </div>
                                </Body>
                            </Card>
                        </div>
                    ))
                }
            </WingBlank>
        )
    }
}

export default withRouter(UserList)
