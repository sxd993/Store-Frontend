import { CartIcon, PhoneIcon, UserMenu } from "../../../ui/Icons/HeaderIcons";

const Navigation = () => (
  <div className='flex items-center text-gray-900 gap-[6vw] md:gap-[2vw] text-lg md:text-base'>
    <PhoneIcon />
    <UserMenu />
    <CartIcon />
  </div>
);

export default Navigation;