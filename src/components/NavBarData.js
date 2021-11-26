import {MdOutlineCoronavirus} from "react-icons/md";
import {RiSyringeLine} from 'react-icons/ri'
import {BsClipboardPlus} from 'react-icons/bs'
import {GoKeyboard} from 'react-icons/go'

export const NavBarData = [
    {
        title: "확진 현황",
        path: "",
        icon: <MdOutlineCoronavirus/>,
        
    },
    {
        title: "백신 정보",
        path: "",
        icon: <RiSyringeLine/>,
        
    },
    {
        title: "게시판",
        path: "/board",
        icon: <GoKeyboard/>,
        
    },
    {
        title: "공지사항",
        path: "/notice",
        icon: <BsClipboardPlus/>,
        
    }
];