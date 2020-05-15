import React, { Component } from "react";
import nav from "../../../static/img/support/nav.jpg";
import leftchart1 from "../../../static/img/support/leftchart1.jpg";
import leftchart2 from "../../../static/img/support/leftchart1.jpg";
import leftchart3 from "../../../static/img/support/leftchart1.jpg";
import leftchart4 from "../../../static/img/support/leftchart1.jpg";
import leftchart5 from "../../../static/img/support/leftchart1.jpg";
import rightchart from "../../../static/img/support/leftchart1.jpg";
function OverviewDashboard() {
  return (
    <div>
      <h2>Overview of the CCR dashboard</h2>
      <p>There are three main sections</p>
      <ul>
        <li>Navigation bar</li>
        <li>
          Left Chart illustrate line chart about Purchase of game, default last
          7 days.
        </li>
        <li>
          Right Chart show Revenue total and percentage of device sources used
          in payment, default last 7 days.
        </li>
      </ul>
    </div>
  );
}
function NavigationBar() {
  return (
    <div>
      <h2>Navigation Bar</h2>
      <img src={nav} />
      <p></p>
      <p>
        The navigation bar contains logo Clappigames and menu personal. From
        left to right we have
      </p>
      <ol>
        <li>
          Logo Clappigames
          <br />
          When use stand every page of site, you can come back dashboard if you
          click this logo.
        </li>
        <li>
          Menu personal
          <br />
          The menu contains change password function, support page, and log out
          function. Like the logo Clappigames, menu is fixed on top of site, you
          can choose what function if you want to do.
        </li>
      </ol>
    </div>
  );
}
function LeftChart() {
    return (
      <div>
        <h2>Left Chart</h2>
        <img style={{width:'50%'}} src={leftchart1} />
        <p>The chart allows you to see:</p>
        <ul>
          <li>The total amount of user makes payments</li>
          <li>The total amount of purchase</li>
          <li>
            In line graph show how the revenue of game have changed by 3 lines:
            total, web, APK file for last 7 days default. Unit money is VNĐ.
          </li>
        </ul>
        <p>You can choose timeline to show revenue. </p>
        <img style={{width:'50%'}} src={leftchart2} />
        <ol>
          <li>Today</li>
        </ol>
        <img style={{width:'50%'}} src={leftchart3} />
        <ol>
          <li>Last 7 days</li>
          <li> Last 30 days</li>
        </ol>
        <img style={{width:'50%'}} src={leftchart4} />
        <ol>
          <li>Custom</li>
        </ol>
        <img style={{width:'50%'}} src={leftchart5} />
        <br/>
        <i>
          If you want to get list revenue for more 30 days, please contact with
          us. Clappigames staff will help you to see via document
        </i>
        <br />
        <p>
          When you want to see more insights about name products, time, username
          bought, … please choose <b>MORE INSIGHTS</b> button.
        </p>
      </div>
    );
  }
  function RightChart() {
    return (
      <div>
        <h2>Right chart</h2>
        <p>
          The CCR UI allows you to see about Total Revenue of game and percentage
          of platform where user purchase.
        </p>
        <img style={{width:'50%'}} src={rightchart} />
      </div>
    );
  }
export {NavigationBar,OverviewDashboard,LeftChart,RightChart}