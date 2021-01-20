/*
个人中心主界面路由组件
*/
import React, { Component } from 'react'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { resetUser } from '../../redux/action'

const Item = List.Item 
const Brief = Item.Brief
const alert = Modal.alert

class Personal extends Component {
    logout = () => {
        alert('退出', '确定退出吗???', [
            { text: '取消' },
            { text: '确定', onPress: () => {
                // 干掉cookie中的userid
                Cookies.remove('userid')
                // 干掉redux管理的user， 即重置用户信息恢复到初始状态
                this.props.resetUser()
            } },
          ]);
    }
    render() {
        const { username, info, header, company, post, salary } = this.props.user
        return (
            <div style={{ margin: '45px 0 50px 0'}} >
                <Result 
                    img = { <img src={ require(`../../assets/images/${ header }.png`)} style={{width: '50px', height: '50px'}} alt="用户头像" />} 
                    title= { username }
                    message= { company }
                />

                <List renderHeader={ () => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位：{ post }</Brief>
                        <Brief>简介： { info } </Brief>
                        {
                            salary ? <Brief>薪资： { salary } </Brief> : null
                        }
                    </Item>
                </List>
                <WhiteSpace />
                <List>
                    <Button type='warning' onClick={ this.logout } >退出登录</Button>
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    {resetUser}
)(Personal)
