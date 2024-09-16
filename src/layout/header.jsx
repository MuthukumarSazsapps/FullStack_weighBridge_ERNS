import React, { useState } from 'react'
import { Popover, Tooltip } from 'antd';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import { HiMiniXMark } from "react-icons/hi2";
import Settings from '../pages/auth/logout/settings';
import { useNavigate } from 'react-router-dom';
{/* <HiMiniXMark /> */ }
const MainHeader = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const hide = () => {
        setOpen(false);
        localStorage.clear()
        navigate('/login')
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    return (
        <>
            <div className='flex justify-between'>
                <p className='ml-3 font-semibold mt-4 text-3xl'>Sazs WeighBridge</p>
                <div className=''>
                    <Popover
                        content={<div >
                            <Settings hide={hide} />
                        </div>}
                        title="Settings"
                        trigger="click"
                        open={open}
                        onOpenChange={handleOpenChange}
                    >
                        <Tooltip title="Account">
                            <RiAccountPinCircleFill className='text-4xl mt-3 me-3 text-gray-400' />
                        </Tooltip>
                    </Popover>
                </div>
            </div>

        </>
    )
}

export default MainHeader