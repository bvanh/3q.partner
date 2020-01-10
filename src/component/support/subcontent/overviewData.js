import React, { Component } from "react";
import nav from "../../../static/img/support/nav.jpg";
import detail1 from "../../../static/img/support/detail1.jpg";
import leftchart2 from "../../../static/img/support/leftchart1.jpg";
import showup from "../../../static/img/support/showup.jpg";

function OverviewDetail() {
  return (
    <div>
      <h2>Overview of Data details</h2>
      <p>
        Data details show more insights of data. We provide further details of a
        purchase and allow you use some feature to do with data.
      </p>
      <img  src={detail1}style={{width:'50%'}} />
      <p></p>
      <p>
        A purchase contains Product name, ID product, ID Purchase, Time,
        Username who buy, Source, Price exchange to C.coin and Price exchange to
        VNĐ.
      </p>
      <p>
        When you wanted comeback chart view, choose chart view button on the
        top-right.
      </p>
    </div>
  );
}
function Search() {
  return (
    <div>
      <h2>Search for Purchase</h2>
      <p>You can look for Purchase using the Search function on top.</p>
      <p>To search for a purchase:</p>
      <ol>
        <li>Type Product name, select start time to end time</li>
        <li>
          Press search button. As you type, we will show the search result in
          the table below
        </li>
        <li>We sort any result by last time</li>
      </ol>
    </div>
  );
}
function Export() {
  return (
    <div>
      <h2>Export Excel</h2>
      <p>Export in Excel format</p>
      <p>To export your data from CCR you need to make your selection. After you select purchase, then export excel button will be able. </p>
      <p>You can select which purchase you’d like to export. This could be:</p>
      <img style={{width:'50%'}} src={leftchart2} />
      <ol>
        <li>A single purchase</li>
        <li>A list purchase</li>
      </ol>
    </div>
  );
}
function Showup() {
  return (
    <div>
      <p>
      We support you to see the number of Purchase if you want.
      </p>
      <ol>
          <li>10 Purchase/page</li>
          <li>20 Purchase/page</li>
          <li>30 Purchase/page</li>
      </ol>
      <img src={showup}/>
    </div>
  );
}
export { Showup, Export, Search, OverviewDetail};
