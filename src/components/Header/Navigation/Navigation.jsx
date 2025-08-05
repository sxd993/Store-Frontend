import React from "react";
import { CartIcon, FavoritesIcon, PhoneIcon, UserMenu } from "../../../ui/Icons/HeaderIcons";

const Navigation = () => (
  <div className='flex items-center text-gray-900 gap-8'>
    <PhoneIcon />
    <FavoritesIcon />
    <UserMenu />
    <CartIcon />
  </div>
);

export default Navigation;