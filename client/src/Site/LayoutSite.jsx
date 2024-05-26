import { Layout } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import { useLocation } from "react-router-dom"

import '../css/site.css'
import NavBar from "./NavBar"
import FooterPage from "./FooterPage"

const LayoutSite = ({ children }) => {
    const location = useLocation()

    return (
        <Layout>
            <div className="bgNav overflow-hidden ">
                <NavBar />
            </div>

            <Content className="bg-white">
                { children }
            </Content>

            {
                location.pathname === "/login" ? null : (
                    <Footer>
                        <FooterPage />
                    </Footer>
                )
            }
        </Layout>
    )
}

export default LayoutSite