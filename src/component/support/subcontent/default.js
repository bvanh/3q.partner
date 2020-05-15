import React, { Component } from "react";

function Default() {
  return (
    <div>
      <h2>Contents</h2>
      <ul>
        <li>
          <h4>
            Getting started with Clappigames C.coin
            Revenue..........................................2
          </h4>
        </li>
        <li>
          <h4>
            Log in to
            CCR...................................................................................................2
          </h4>
        </li>
        <li>
          <h4>
            Change
            Password............................................................................................2
          </h4>
        </li>
        <li>
          <h4>
            Take a Tour of the CCR
            Interface.....................................................................3
          </h4>
        </li>
        <li>
          <h4>
            Overview of the CCR
            dashboard......................................................................3
          </h4>
        </li>
      </ul>
    </div>
  );
}
function ChangePass() {
  return (
    <div>
      <h2>Change Password</h2>
      <p>You can change your password in menu top-right corner</p>
      <br />
      <ol>
        <li>Enter your old password and new password in the field provided</li>
        <li>Click Change Password button to complete the process</li>
        <li>
          Next time when you sig in to CCR, you must have to use new password.
        </li>
      </ol>
    </div>
  );
}
function Login() {
  return (
    <div>
      <h2>Log in to CCR</h2>
      <p>
        There is only a method to log in to your account. You will receive
        username and password from Clappigames staff via Email when you sign
        contract with Clappigames.
      </p>
      <br />
      <p>Log in with your username and password</p>
      <ol>
        <li>Enter link into browser: partner.clappigames.com</li>
        <li>Enter your username and password in the field provided</li>
        <li>Enter your username and password in the field provided</li>
      </ol>
      <i>Forgot your Password</i>
      <ol>
        <li>
          Contact with Clappigames staff to notice that you forgot your password
        </li>
        <li>Clappigames staff will send to you a new password</li>
        <li>Log in CCR with your username and new password</li>
      </ol>
    </div>
  );
}
function Start() {
  return (
    <div>
      <h2>Getting started with Clappigames C.coin Revenue</h2>
      <p>
        Welcome to Clappigames C.coin Revenue (CCR), where you can check revenue
        of your game in Clappigames Platfrom, in real-time and in one place,
        helping you to update your revenue in game, faster
      </p>
      <p>
        CCR is built for the browsers, so you can use it across any platform
        (Window, Mac, Linux and Chromebook).
      </p>
      <ol>
        <li>
          Browser and operating system requirements CCR runs well on most
          browsers.
          <br />
          The minimum browser requirements are:
          <br />
          <ul>
            <li>IE9, IE10, IE11, Edge</li>
            <li>Firefox: 51+</li>
            <li>Chrome: 49+</li>
            <li>Safari: 10.1+</li>
          </ul>
        </li>
        <li>
          Using CCR on Mobile Devices
          <br />
          The minimum requirements to use on mobile browsers are:
          <br />
        </li>
      </ol>
    </div>
  );
}

export { Default, ChangePass, Login, Start };
