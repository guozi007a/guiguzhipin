import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'


const Item = TabBar.Item

// 在非路由组件中如何使用路由库的api
// withRouter()

class NavFooter extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    }
    render() {
        let { navList, unReadCount } = this.props
        // 过滤掉hide为true的nav
        navList = navList.filter(nav => !nav.hide)
        const path = this.props.location.pathname // 请求路径
        return (
            <TabBar>
                {
                    navList.map((nav) => (
                        <Item key= { nav.path } 
                            badge={ nav.path === '/message' ? unReadCount : 0 } 
                            title = { nav.text }
                            icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url('+require(`./images/${ nav.icon }.png`)+')center center /  21px 21px no-repeat'
                                /* background: 'url: require(`./images/${ nav.icon }.png`) center center /  21px 21px no-repeat'  */}}
                              />
                              }
                            
                            selectedIcon={<div style={{
                                width: '22px',
                                height: '22px',
                                // react中引入背景图片的方法
                                background: 'url('+require(`./images/${ nav.icon }-selected.png`)+')center center /  21px 21px no-repeat'
                                /* background: 'url: require(`./images/${ nav.icon }-selected.png`) center center /  21px 21px no-repeat' */  }}
                              />
                              }
                            selected={ path === nav.path }
                            onPress={() => {
                                this.props.history.replace(nav.path)
                              }}
                        />
                    ))
                }
            </TabBar>
        )
    }
}

// 向外暴露withRouter包装的NavFooter
// 内部会向组件中传入一些路由组件特有的属性： history/ location/ math
export default withRouter(NavFooter)
