import { Link } from 'react-router-dom';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import '../../assets/styles/prev-next-btn.css'

// const navInfo = [
//     {id: 1, path: prevPath, icon: <FaArrowLeftLong />, text: 'previous'},
//     {id: 2, path: nextPath, icon: <FaArrowRightLong />, text: 'next'},
// ]

export default function PrevNextBtn({ prevPath, nextPath }) {
    return (
        <section id="navigators">
                <div className="navigators">
                    {/* {navInfo.map((item) => (
                        <Link to={item.path} className='navigator'>
                            <i>{item.icon}</i>
                            <span>{item.text}</span>
                        </Link>
                    ))} */}
                   <Link to={prevPath} className='navigator'>
                    <i><FaArrowLeftLong /></i>
                    <span>previous</span>
                   </Link>

                   <Link to={nextPath} className='navigator'>
                    <span>next</span>
                    <i><FaArrowRightLong /></i>
                   </Link>
                </div>
        </section>
    )
}