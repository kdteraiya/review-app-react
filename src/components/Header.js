import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";

function Header() {
  const navigate = useNavigate();

  const items = [
    {
      label: "Add Review",
      command: () => {
        navigate("/add-review/");
      },
    },
    {
      label: "View Review Listing",
      command: () => {
        navigate("/view-listing/");
      },
    },
  ];

  return (
    <>
      {items ? (
        <nav className="header">
          <Menubar model={items} />
        </nav>
      ) : (
        <></>
      )}
    </>
  );
}

export default memo(Header);
