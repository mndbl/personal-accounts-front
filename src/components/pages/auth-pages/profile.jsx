import fotoCarnet from '../../../assets/pictures/foto carnet 2023.jpeg'
import { HomeLink } from "../../links";
import { EditButton } from "../../buttons/edit-button"
import { useLoaderData } from 'react-router-dom';

export function Profile(params) {
    const { userAuth } = useLoaderData()
    
    return (
        <div className="flex flex-col lg:flex-row  w-3/5 border-2 border-gray rounded-lg h-1/2 shadow-inner mx-auto mt-2 items-center">
            <div className="w-1/3  h-full rounded-l-lg">
                <figure className='h-full'>
                    <img src={fotoCarnet} alt=""
                        className='h-full rounded-l-lg' />
                </figure>
            </div>
            <div className="w-2/3 flex flex-col items-center  h-full rounded-r-lg space-y-8 pt-6 pb-4">
                <h2 className=" font-extrabold text-center text-gray-700 text-2xl capitalize">{userAuth.userAuth.name}</h2>
                <div className="flex flex-col flex-grow space-y-6 justify-start w-full ml-6">

                    <p>Email: <span>{userAuth.userAuth.email}</span></p>
                    <p>Phone: <span>(385)457-5497</span></p>
                    <address>
                        <p>
                            Direccion:
                        </p>
                        13371 s 2700 w, Riverton, UT, 84065
                    </address>
                </div>
                <div className='flex justify-between gap-2'>
                    <HomeLink />
                    <EditButton />
                </div>
            </div>
        </div>
    )
}