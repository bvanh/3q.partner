import React from "react";
import { Layout, Menu, Icon, Avatar, Dropdown } from "antd";
import getToken from "./component/options/refreshToken";
import Charts from "./component/home";
import History from "./component/history";
import ChangePass from "./component/changepassword";
import LoginForm from "./component/login";
import API from "./api/apiAll";
import logoclappigames from "./static/img/logoForPages.jpg";
import logo3qzombie from "./static/img/Logo-3q-Zombie.jpg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { Header, Footer } = Layout;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userToken: null,
      isChangePassword: false
    };
  }
  menu = (
    <Menu>
      <Menu.Item>
        <Link to={API.CHANGEPASSWORD_PATHNAME}>
          <Icon type="key" style={{ paddingRight: ".5rem" }} />
          <span>Change password</span>
        </Link>
      </Menu.Item>
      <Menu.Item onClick={() => this.logInOut(false)}>
        <Link to="/">
          <Icon type="export" style={{ paddingRight: ".5rem" }} />
          Đăng xuất
        </Link>
      </Menu.Item>
    </Menu>
  );
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
    if (elm === false) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("user");
    }
    this.setState({
      isLogin: elm
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
              <Dropdown overlay={this.menu} placement="bottomRight">
                <div className="user_logout">
                  <Avatar icon="user" />
                  <span
                    className="ant-dropdown-link"
                    style={{ padding: "0 0 0 .5rem" }}
                  >
                    ABCD{" "}
                    <Icon
                      type="caret-down"
                      style={{ padding: "0 0 0 1.5rem" }}
                    />
                  </span>
                </div>
              </Dropdown>
            </div>
          </Header>
          <Layout>
            <Header className="header2">
              <div className="header2_content">
                <div id="logo_title">
                  <img src={logo3qzombie} alt="logo_clappigames"></img>
                  <span className="header2_title">3Q Zombie</span>
                </div>
                <span id="header2_title">Tổng hợp doanh thu C.coin</span>
              </div>
              <br />
            </Header>
            <Route exact path="/" component={Charts} />
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
            <Footer style={{ textAlign: "center" }}>
              Client_Partner_App ©2019
            </Footer>
          </Layout>
        </Router>
      </Layout>
    );
  }
}
