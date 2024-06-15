import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ArrowRightOnRectangleIcon,
  UsersIcon,
  BuildingLibraryIcon,
PaperAirplaneIcon,
ChatBubbleBottomCenterIcon,
CurrencyDollarIcon,

} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, Farmer,Weather, CropInsurance ,Feedback, Payout} from "@/pages/dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
  
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      
      {
        icon: <UsersIcon {...icon} />,
        name: "farmer",
        path: "/farmer",
        element: <Farmer />,
      },
      {
        icon: <BuildingLibraryIcon {...icon} />,
        name: "Crop Inurance",
        path: "/cropInsurance",
        element: <CropInsurance />,
      },
      {
        icon: <PaperAirplaneIcon {...icon} />,
        name: "Weather provider",
        path: "/Weather-provider",
        element: <Weather />,
      },
      {
        icon: <ChatBubbleBottomCenterIcon {...icon} />,
        name: "Feedback",
        path: "/feedback",
        element: <Feedback />,
      },
      {
        icon: <CurrencyDollarIcon {...icon} />,
        name: "Payout",
        path: "/payout",
        element: <Payout/>,
      },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Logout", 
        path: "/",
      },
    ],
  },
];

export default routes;
