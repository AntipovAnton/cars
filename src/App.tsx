import React,  { useState, Suspense } from "react";
import AppProvider from './context/AppContext';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Layout, Spin, Drawer } from 'antd';
import NavBar from 'components/NavBar';
import FooterComponent from "components/Footer";
import { appRoutes } from "./routes";
import { MenuOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    return (
        <BrowserRouter>
            <AppProvider>
                <Layout className="mainLayout">
                    <Header className="header">
                        <div className="mobileMenu">
                            <MenuOutlined className="mobileIcon" onClick={() => setOpenMenu(true)}/>
                        </div>
                        <Drawer placement="left" open={openMenu} closable={false} onClose={() => setOpenMenu(false)}>
                            <NavBar isInline={true}/>
                        </Drawer>
                        <span className="mainMenu">
                        <NavBar isInline={false}/>
                    </span>
                    </Header>
                    <Content>
                        <Suspense fallback={<div className="spin-wrapper"><Spin size="large"/></div>}>
                            <Routes>
                                {appRoutes.map((route) => {
                                    return (
                                        <Route
                                            key={route.path}
                                            path={route.path}
                                            element={<route.component/>}
                                        />
                                    );
                                })
                                }
                            </Routes>
                        </Suspense>
                    </Content>
                    <Footer className="footer">
                        <FooterComponent/>
                    </Footer>
                </Layout>
            </AppProvider>
        </BrowserRouter>
    );
};

export default App;
