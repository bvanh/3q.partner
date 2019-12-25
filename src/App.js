import React from "react";
import { Layout, Menu, Icon, Avatar, Dropdown } from "antd";
import Charts from "./component/home/home";
import History from "./component/history/history";
import ChangePass from "./component/changepassword/changepassword";
import LoginForm from "./component/login/login";
import API from "./api/apiAll";
import logoclappigames from "./static/img/logoForPages.jpg";
import icon_changepassword from "./static/img/icon_changepassword.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { Header, Footer } = Layout;
export default class App extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isLogin: "",
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
          <img
            src={icon_changepassword}
            alt="icon_changepassword"
            className="icon_changepassword"
            style={{ paddingRight: ".5rem" }}
          ></img>
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
    this._isMounted = true;
    const isLogin = localStorage.getItem("saveLogin");
    if (isLogin === null || isLogin === "false") {
      this.logInOut(false);
    } else {
      let imageLogo = localStorage.getItem("imageLogo");
      let pageName = localStorage.getItem("fullname");
      this.setState({
        imageLogo: imageLogo,
        pageName: pageName
      });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  logInOut = elm => {
    if (elm === false) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("saveLogin");
    }
    this.setState({
      isLogin: elm
    });
  };
  getImgAndName = val => {
    this.setState({
      pageName: val.fullName,
      imageLogo: val.imageUrl
    });
  };
  render() {
    const { isLogin, imageLogo } = this.state;
    if (isLogin === false || isLogin === null) {
      return (
        <Router>
          <Route
            path="/"
            render={() => (
              <LoginForm
                logInOut={this.logInOut}
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
                <Charts imageLogo={imageLogo} logInOut={this.logInOut} />
              )}
            />
            <Route
              path={API.HISTORY_PATHNAME}
              render={props => (
                <History
                  {...props}
                  imageLogo={imageLogo}
                  logInOut={this.logInOut}
                />
              )}
            />
            <Route
              exact
              path={API.CHANGEPASSWORD_PATHNAME}
              render={props => (
                <ChangePass {...props} logInOut={this.logInOut} />
              )}
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
