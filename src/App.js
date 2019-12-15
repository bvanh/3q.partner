import React from "react";
import { Layout, Menu, Icon } from "antd";
import getToken from "./component/options/refreshToken";
import Home from "./component/home";
import Charts from "./component/charts";
import History from "./component/history";
import Infor from "./component/data-user";
import LoginForm from "./component/login";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { Header, Footer, Sider } = Layout;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userToken: null
    };
  }
  logOut = () => {
    this.setState({
      isLogin: false
    });
  };
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
  logIn = () => {
    this.setState({
      isLogin: true
    });
  };
  render() {
    const { isLogin } = this.state;
    if (isLogin === false) {
      return (
        <Router>
          <Route path="/" render={() => <LoginForm logIn={this.logIn} />} />
        </Router>
      );
    }
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Router>
          <Sider breakpoint="md" collapsedWidth="0">
            <div className="logo">Admin</div>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1">
                <Link to="/">
                  <Icon type="home" theme="filled" />
                  <span>Home</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/stats/revenue/date?type=0&fromDate=2019-10-01&toDate=2019-10-25">
                  <span>
                    <Icon type="area-chart" />
                    Charts
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/charges/list?currentPage=1&pageSize=10&search=&type=1&fromDate=2019-10-1&toDate=2019-12-30">
                  <span>
                    <Icon type="schedule" />
                    History
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/inforusers">
                  <Icon type="idcard" theme="filled" />

                  <span>Users</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5" onClick={this.logOut}>
                <Icon type="idcard" theme="filled" />
                <span>Logout</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}></Header>
            <Route exact path="/" component={Home} />
            <Route path="/stats" render={props => <Charts {...props} />} />

            <Route
              path="/charges"
              render={props => (
                <History {...props} userToken={this.state.userToken} />
              )}
            />
            <Route exact path="/inforusers" component={Infor} />
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
