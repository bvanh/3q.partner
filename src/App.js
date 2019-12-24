import React from "react";
import { Layout, Menu, Icon, Avatar, Dropdown } from "antd";
import getToken from "./utils/refreshToken";
import Charts from "./component/home/home";
import History from "./component/history/history";
import ChangePass from "./component/changepassword/changepassword";
import LoginForm from "./component/login/login";
import API from "./api/apiAll";
import logoclappigames from "./static/img/logoForPages.jpg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { Header, Footer } = Layout;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userToken: JSON.parse(localStorage.getItem("userToken")),
      imageLogo: "",
      pageName: "",
      isChangePassword: false
    };
  }
  menu = (
    <Menu>
      <Menu.Item>
        <Link to={API.CHANGEPASSWORD_PATHNAME}>
          <Icon type="read" style={{ paddingRight: ".5rem" }} />
          <span>Introduction</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={API.CHANGEPASSWORD_PATHNAME}>
          <Icon type="key" style={{ paddingRight: ".5rem" }} />
          <span>Change password</span>
        </Link>
      </Menu.Item>
      <Menu.Item onClick={() => this.logInOut(false)}>
        <Link to="/">
          <Icon type="export" style={{ paddingRight: ".5rem" }} />
          Log out
        </Link>
      </Menu.Item>
    </Menu>
  );
  componentDidMount() {
    const { userToken } = this.state;
    if (getToken(userToken) === false) {
      this.setState({
        isLogin: false
      });
      return;
    } else {
      let imageLogo = localStorage.getItem("imageLogo");
      let pageName = localStorage.getItem("fullname");
      this.setState({
        isLogin: true,
        imageLogo: imageLogo,
        pageName: pageName
      });
    }
  }
  logInOut = elm => {
    if (elm === false) {
      localStorage.removeItem("userToken");
    }
    this.setState({
      isLogin: elm
    });
  };
  getTokenToState = val => {
    this.setState({
      userToken: val
    });
  };
  getImgAndName = val => {
    this.setState({
      pageName: val.fullName,
      imageLogo: val.imageUrl
    });
  };
  render() {
    const { isLogin, imageLogo, userToken } = this.state;
    if (isLogin === false) {
      return (
        <Router>
          <Route
            path="/"
            render={() => (
              <LoginForm
                logInOut={this.logInOut}
                getTokenToState={this.getTokenToState}
                getImgAndName={this.getImgAndName}
              />
            )}
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
                    WARA_staff{" "}
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
            <Route
              exact
              path="/"
              render={() => (
                <Charts imageLogo={imageLogo} userToken={userToken} />
              )}
            />
            <Route
              path={API.HISTORY_PATHNAME}
              render={props => (
                <History
                  {...props}
                  userToken={userToken}
                  imageLogo={imageLogo}
                />
              )}
            />
            <Route
              exact
              path={API.CHANGEPASSWORD_PATHNAME}
              render={props => <ChangePass {...props} userToken={userToken} />}
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
