import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as GrIcons from "react-icons/gr";

//création Array pour les icones et chemin de navigation
export const SidebarData = [
    {
        title:'Accueil',
        path: '/Home',
        icon: <FaIcons.FaHouseUser />,
        cName: 's-sidebar__nav-link',
        admin: false,
        category: 'app'
    },
    {
        title:'Formulaire Timesheet',
        path: '/AdminForm',
        icon: <GrIcons.GrUserAdmin />,
        cName: 's-sidebar__nav-link admin__nav-link',
        admin: true,
        category: 'admin'
    },
    {
        title:'Formulaire Achat Client',
        path: '/AdminHeure',
        icon: <FaIcons.FaClock />,
        cName: 's-sidebar__nav-link admin__viewall-link',
        admin: true,
        category: 'admin'
    },
    {
        title:'Supervision Client',
        path: '/ViewAll',
        icon: <GrIcons.GrAppsRounded />,
        cName: 's-sidebar__nav-link admin__viewall-link',
        admin: true,
        category: 'admin'
    },
    // {
    //     title:'Account',
    //     path: '/Account',
    //     icon: <FaIcons.FaUser/>,
    //     cName: 's-sidebar__nav-link',
    //     admin: false,
    //     category: 'account'
    // },
    {
        title:'Achat Crédit Horaire',
        path: '/Credits',
        icon: <FaIcons.FaPlus/>,
        cName: 's-sidebar__nav-link',
        admin: false,
        category: 'app'
    },
    // {
    //     title:'Factures',
    //     path: '/Factures',
    //     icon: <FaIcons.FaRegFileAlt/>,
    //     cName: 's-sidebar__nav-link',
    //     admin: false,
    //     category: 'app'
    // },
    {
        title:'LogOut',
        path: '/Logout',
        icon: <RiIcons.RiLogoutBoxLine />,
        cName: 's-sidebar__nav-link',
        admin: false,
        category: 'account'
    }
]
