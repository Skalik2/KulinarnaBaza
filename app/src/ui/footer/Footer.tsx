import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className='flex flex-col flex-wrap bg-bgWhite dark:bg-bgDark'>
            <div className=' flex flex-col flex-wrap bg-bgWhite mx-auto text-bgDark dark:bg-bgDark dark:text-bgWhite justify-center items-center text-center p-7 w-full'>
                <h1 className=' text-3xl mx-auto'>KulinarnaBaza</h1>
                <p className='p-3'>Najsmaczniejsze przepisy w jednym miejscu, poznaj nasze smaki!</p>
                <div className='flex justify-center items-center [&>*]:mx-2'>
                    <FaFacebook className='w-7 h-7'/>
                    <FaLinkedin className='w-7 h-7'/>
                    <FaSquareXTwitter className='w-7 h-7'/>

                </div>
            </div>
            <div className=' bg-black text-white flex justify-between p-4'>
                <p>Copyright ©</p>
                <ul className='flex flex-row [&>*]:px-2'>
                    <li>Przepisy</li>
                    <li>Artykuły</li>
                    <li>Plan posiłków</li>
                    <li>Ranking</li>
                </ul>
            </div>
        </div>
  )
}