import {
    HomeIcon, Cog6ToothIcon, CircleStackIcon,
    CurrencyDollarIcon, RectangleGroupIcon
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { NavLink } from "react-router-dom"

const itemsSidebar = [
    {
        path: '/dashboard',
        title: 'Dasboard',
        svg: <HomeIcon className="w-6 h-6" />
    },
    {
        path: '/dashboard/settings',
        title: 'Settings',
        svg: <Cog6ToothIcon className="w-6 h-6" />,
        subMenu: [
            {
                path: 'accounts',
                title: 'Accounts',
                svg: <CurrencyDollarIcon className="w-6 h-6" />,
            },
            {
                path: 'account-categories',
                title: 'Account Categories',
                svg: <RectangleGroupIcon className="w-6 h-6" />,
            }
        ]

    },
    {
        path: 'registers',
        title: 'Registers',
        svg: <CircleStackIcon className="w-6 h-6" />
    }
]



export function ButtonDropdownSidebar({ title, svg, subMenu }) {
    const [dropDownSubMenu, setDropDownSubMenu] = useState(false)
    const classSubMenu = dropDownSubMenu ? '' : 'hidden'

    const handleToggle = () => {
        setDropDownSubMenu(!dropDownSubMenu)
    }
    return (
        <>
            <button type="button" onClick={handleToggle}
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                {svg}
                <span className="ml-2 text-sm font-medium capitalize">{title}</span>
            </button>
            <div className={classSubMenu}>
                <SubMenu subItems={subMenu} />
            </div>
        </>
    )
}

export function LargeSidebarItems() {
    return (
        <>
            {
                itemsSidebar.map((item) => {
                    if (item.subMenu) {
                        return (
                            <ButtonDropdownSidebar key={item.path} title={item.title} svg={item.svg} subMenu={item.subMenu} />
                        )
                    }
                    return (
                        <NavLink to={item.path} key={item.path}
                            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                            {item.svg}
                            <span className="ml-2 text-sm font-medium capitalize">{item.title}</span>
                        </NavLink>

                    )

                })
            }
        </>
    )
}

export function SmallSidebarItems({ path, svg }) {
    return (
        <NavLink to={path} className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
            {svg}
        </NavLink>
    )
}

export function SubMenu({ subItems }) {
    return (
        subItems.map((sub) => {
            return (
                <NavLink to={sub.path} key={`large-submenu-${sub.path}`}
                    className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                    {sub.svg}
                    <span className="ml-2 text-sm font-medium capitalize">{sub.title}</span>
                </NavLink>
            )
        })
    )
}
export function SmallSubMenu({ subItems }) {
    return (
        subItems.map((sub, index) => {
            return (
                <SmallSidebarItems key={index + '-small-sidebar-sub-item'} path={sub.path} svg={sub.svg} />

            )
        })
    )
}