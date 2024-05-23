import React from "react";
import SideBar from "../../component/SideBar";

export default function Settings() {
  return (
    <div className="therapist-home row d-flex flex-row  m-0">
      <div className="col col-lg-2 col-md-2 col-sm-4 m-0 p-0">
        <SideBar />
      </div>
      <div className="col">
        <h5>This is Settings section</h5>
      </div>
    </div>
  );
}
