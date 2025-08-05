import React from "react";
import { CartIcon, FavoritesIcon, UserMenu } from "../../../ui/Icons/HeaderIcons";

const Navigation = () => (
  <div className="flex items-center gap-6">
    <FavoritesIcon />
    <UserMenu />
    <CartIcon />
  </div>
);

export default Navigation;