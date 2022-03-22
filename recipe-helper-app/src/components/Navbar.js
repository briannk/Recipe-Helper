import React from "react";
import NavbarFull from "./NavbarFull";
import NavbarSide from "./NavbarSide";

const Navbar = () => {
  return (
    <>
      <div className="hidden lg:block w-full top-0">
        <NavbarFull />
      </div>
      <div className="block lg:hidden">
        <NavbarSide />
      </div>
    </>
  );
};

export default Navbar;
