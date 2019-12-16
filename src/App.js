import React from "react";
import { Layout, Menu, Icon, Avatar, Dropdown } from "antd";
import getToken from "./component/options/refreshToken";
import Home from "./component/home";
import Charts from "./component/charts";
import History from "./component/history";
import ChangePass from "./component/changepassword";
import LoginForm from "./component/login";
import Detail from "./component/detail";
import API from "./api/apiAll";
import logoclappigames from "./static/img/logoForPages.jpg";
import logo3qzombie from "./static/img/Logo-3q-Zombie.jpg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { Header, Footer } = Layout;
const menu = (
  <Menu>
    <Menu.Item>
    <Icon type="key" />Đổi mật khẩu
    </Menu.Item>
    <Menu.Item>
    <Icon type="export" />Đăng xuất
    </Menu.Item>
  </Menu>
);
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userToken: null
    };
  }
  componentDidMount() {
    if (getToken() === false) {
      this.setState({
        isLogin: false
      });
      return;
    } else setInterval(getToken, 3300000);
    let userToken = localStorage.getItem("userToken");
    if (userToken.refreshToken !== "") {
      this.setState({
        isLogin: true,
        userToken: userToken
      });
    }
  }
  logInOut = elm => {
    if (elm === "deleteToken") {
      localStorage.removeItem("userToken");
    }
    this.setState({
      isLogin: !this.state.isLogin
    });
  };
  render() {
    const { isLogin } = this.state;
    if (isLogin === false) {
      return (
        <Router>
          <Route
            path="/"
            render={() => <LoginForm logInOut={this.logInOut} />}
          />
        </Router>
      );
    }
    return (
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <Router>
          <Header>
            <div className="header1">
              <img
                src={logoclappigames}
                alt="logo_clappigames"
                className="logoForPages"
              ></img>
              <div className="user_logout">
                <Avatar icon="user" />
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link" href="#">
                    ABCD <Icon type="caret-down" />
                  </a>
                  
                </Dropdown>
              </div>
            </div>
            {/* <Menu
              // theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">
                <Link to="/">
                  <Icon type="home" theme="filled" />
                  <span>Home</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link
                  to={
                    API.CHARTS_PATHNAME +
                    API.CHARTS_PATHSEARCH_TYPE +
                    API.CHARTS_PATHSEARCH_DATE
                  }
                >
                  <span>
                    <Icon type="area-chart" />
                    Charts
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link
                  to={API.HISTORY_PATHNAME + API.HISTORY_PATHSEARCH_DEFAULT}
                >
                  <span>
                    <Icon type="schedule" />
                    History
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to={API.CHANGEPASSWORD_PATHNAME}>
                  <Icon type="key" />

                  <span>ChangePassword</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5" onClick={() => this.logInOut("deleteToken")}>
                <Link to="/">
                  <Icon type="backward" theme="filled" />
                  <span>Logout</span>
                </Link>
              </Menu.Item>
            </Menu> */}
          </Header>
          <Layout>
            <Header className="header2">
              <div className="header2_content">
                <div id='logo_title'>
                <img
                  src={logo3qzombie}
                  alt="logo_clappigames"
                  // className="logoForPages"
                ></img>
                <span className="header2_title">3Q Zombie</span>
                </div>
                <span id='header2_title'>Tổng hợp doanh thu C.coin</span>
              </div>
              <br />
              
            </Header>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path={API.CHARTS_PATHNAME}
              render={props => <Charts {...props} />}
            />

            <Route
              path={API.HISTORY_PATHNAME}
              render={props => (
                <History {...props} userToken={this.state.userToken} />
              )}
            />
            <Route
              exact
              path={API.CHANGEPASSWORD_PATHNAME}
              render={props => <ChangePass {...props} />}
            />
            {/* <Route path="/products/:id" component={Edit}/> */}
            <Route
              exact
              path={API.HISTORY_DETAIL_PATHNAME}
              component={Detail}
            />
            <Footer style={{ textAlign: "center" }}>
              Client_Partner_App ©2019
            </Footer>
          </Layout>
        </Router>
      </Layout>
    );
  }
}
