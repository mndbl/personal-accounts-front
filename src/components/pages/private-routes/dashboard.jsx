import logo from '../../../logo.svg';
import { useEffect, useState } from "react";
import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { ArrowLeftCircleIcon, ArrowSmallLeftIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { LogoutButton } from "../../buttons";
import { LargeSidebarItems } from '../../links/sidebar-links';
import localforage from 'localforage';
import { dataService } from '../../../services/data-services';
import { accounts_categories_URL, accounts_URL, registers_URL } from '../../../config/main.config';
import { AccountsBalance } from './settings/accounts/accounts-balance';

export async function loader() {
    const userAuth = await localforage.getItem('userAuth')
    const { accessToken } = userAuth
    const accounts = await dataService.getData(accounts_URL, '', {}, accessToken)
    const registers = await dataService.getData(registers_URL, '', {}, accessToken)
    const accountCategories = await dataService.getData(accounts_categories_URL, '', {}, accessToken)
    return { userAuth, accounts, accountCategories, registers }
}

export function Dashboard() {
    const [showColumn, setShowColumn] = useState('hidden')
    const { userAuth, accounts, registers } = useLoaderData()
    const { userName, accessToken } = userAuth
    const navigate = useNavigate()

    useEffect(() => {
        if (!accessToken) {
            setTimeout(() => {
                navigate('/login')
            }, 3000);
        }
    }, [accessToken])

    if (!accessToken) return <div><h2>No user Auth</h2></div>

    return (
        <div className="bg-gray-300 w-full h-screen flex overflow-hidden">
            <div id='sidebar-area' className="flex flex-col relative text-white w-40 h-full bg-gray-800 border-r-2 border-r-gray-500 shadow-md">
                <button className='absolute right-0 top-10 ' ><ArrowLeftCircleIcon className='h-4 w-4' /></button>
                <div id='logo-section' className='h-16 border-b-2 border-b-gray-500 flex items-center'>
                    <Link to={'/'} className='flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300'>
                        <img src={logo} alt="" className='w-12' />
                        <h2 className='font-bold'>App</h2>
                    </Link>
                </div>
                <div className='flex-grow'>
                    <LargeSidebarItems />
                </div>
                <div id='logo-section' className='h-16 border-t-2 border-t-gray-500 flex items-center justify-center'>

                    <Link to={'/profile'} className='flex items-center w-full space-x-2 h-12 px-3 rounded hover:bg-gray-700 hover:text-gray-300'>
                        <UserCircleIcon className='w-6 h-6' />
                        <h2 className='font-bold'>{userName}</h2>
                    </Link>
                </div>
            </div>
            <div className="h-full w-full">
                <div className='flex items-center justify-end px-6 w-full h-16 border-b-2 border-b-gray-700 '>

                    <LogoutButton />
                </div>
                <div className='w-full h-full flex relative'>
                    <button onClick={() => setShowColumn(prevState => prevState === 'hidden' ? '' : 'hidden')}
                        className={(showColumn === 'hidden' ? '' : 'hidden ') + "absolute z-10 bg-gray-300 right-0 top-0 px-1 text-gray-600 border-gray-400 border-2 rounded-l-full"}>
                        <ArrowSmallLeftIcon className="w-4 h-4" />
                    </button>

                    <div className={(showColumn === 'hidden' ? 'w-full ' : 'w-4/5 ') + 'bg-white h-full overflow-x-scroll'}>
                        {
                            accessToken && <Outlet />
                        }
                    </div>
                    <div className={`${showColumn} bg-gray-300 w-1/5 h-full relative`}>

                        <AccountsBalance accounts={accounts} registers={registers} showColumn={showColumn} setShow={setShowColumn} />
                    </div>
                </div>

            </div>
        </div>
    )
}

// Dashboard
// <HomeLink />