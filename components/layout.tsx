import React from 'react'
import {useRouter} from 'next/router'
import { Layout, Menu } from 'antd';
import styles from './layout.module.css'
const { Header, Content, Footer } = Layout;
import Link from 'next/link'
import "../style.less"


interface layoutProps {
    children : any
}

const LayoutTemplate = ({children} : layoutProps) => {
    const router = useRouter()
    
    return (
        <div>
            <Layout className="layout">
                <Header>
                <div className="logo" />
                    <p className="webTitle">COUNTR <span>YNFO</span></p>
                </Header>
                <Content style={{ padding: '0 150px'}}>
                    <div className="site-layout-content">{children}</div>
                </Content>
            </Layout>
        </div>
    )
}

export default LayoutTemplate







