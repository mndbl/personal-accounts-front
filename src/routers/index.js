import { createBrowserRouter } from "react-router-dom";
import App, { loader as appLoader } from "../App";
import {
    Login, loginAction,
    Register, registerAction,
    Profile,
    logoutAction,
    Logout
} from "../components/pages/auth-pages";
import { Dashboard, loader as dashboardLoader } from "../components/pages/private-routes/dashboard";
import { IndexAccountCategories, loader as accountCategoriesLoader } from "../components/pages/private-routes/settings/account-categories";
import { AccounCategorieForm, action as accountCategorieAction } from "../components/pages/private-routes/settings/account-categories/form";
import { ShowAccountCategorie, loader as accountCategorieLoader } from "../components/pages/private-routes/settings/account-categories/show";
import { action as accountCategorieDestroyAction } from '../components/pages/private-routes/settings/account-categories/destroy'
import { IndexAccounts, loader as accountsLoader } from "../components/pages/private-routes/settings/accounts";
import { ShowAccount, loader as accountLoader } from "../components/pages/private-routes/settings/accounts/show";
import { AccountForm, action as accountAction } from "../components/pages/private-routes/settings/accounts/form";
import { action as accountDestroyAction } from "../components/pages/private-routes/settings/accounts/destroy";
import { IndexRegisters, loader as registersLoader } from "../components/pages/private-routes/data";
import { RegisterForm, action as registerDataAction } from "../components/pages/private-routes/data/form";
import { ShowRegister, loader as registerDataLoader } from "../components/pages/private-routes/data/show";
import { action as registerDestroyAction } from "../components/pages/private-routes/data/destroy";
import { IndexDashboard } from "../components/pages/private-routes/index-dashboard";
import { ErrorPage } from "../components/pages/error-pages/error-page";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        loader: appLoader
    },
    {
        path: '/login',
        element: <Login />,
        action: loginAction,
        errorElement: <ErrorPage />
    },
    {
        path: '/register',
        element: <Register />,
        action: registerAction,
        errorElement: <ErrorPage />
    },
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/logout',
        element: <Logout />,
        action: logoutAction,
        errorElement: <ErrorPage />
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        loader: dashboardLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [

                    {
                        index: true,
                        element: <IndexDashboard />,
                        loader: dashboardLoader
                    },
                    {
                        path: 'account-categories',
                        element: <IndexAccountCategories />,
                        loader: accountCategoriesLoader
                    },
                    {
                        path: 'account-categories/add',
                        element: <AccounCategorieForm />,
                        loader: accountCategorieLoader,
                        action: accountCategorieAction
                    },
                    {
                        path: 'account-categories/:id',
                        element: <ShowAccountCategorie />,
                        loader: accountCategorieLoader
                    },
                    {
                        path: 'account-categories/:id/edit',
                        element: <AccounCategorieForm />,
                        loader: accountCategorieLoader,
                        action: accountCategorieAction
                    },
                    {
                        path: 'account-categories/:id/destroy',
                        action: accountCategorieDestroyAction
                    },
                    {
                        path: 'accounts',
                        element: <IndexAccounts />,
                        loader: accountsLoader
                    },
                    {
                        path: 'accounts/add',
                        element: <AccountForm />,
                        loader: accountLoader,
                        action: accountAction
                    },
                    {
                        path: 'accounts/:id',
                        element: <ShowAccount />,
                        loader: accountLoader
                    },
                    {
                        path: 'accounts/:id/edit',
                        element: <AccountForm />,
                        loader: accountLoader,
                        action: accountAction
                    },
                    {
                        path: 'accounts/:id/destroy',
                        action: accountDestroyAction
                    },
                    {
                        path: 'registers',
                        element: <IndexRegisters />,
                        loader: registersLoader
                    },
                    {
                        path: 'registers/add',
                        element: <RegisterForm />,
                        loader: registerDataLoader,
                        action: registerDataAction
                    },
                    {
                        path: 'registers/:id',
                        element: <ShowRegister />,
                        loader: registerDataLoader
                    },
                    {
                        path: 'registers/:id/edit',
                        element: <RegisterForm />,
                        loader: registerDataLoader,
                        action: registerDataAction
                    },
                    {
                        path: 'registers/:id/destroy',
                        action: registerDestroyAction
                    },
                ]
            }
        ]
    }
])