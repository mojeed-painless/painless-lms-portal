import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../assets/styles/course-content.css';
import { topics } from '../../data.js';
import welcomImg from '../../assets/welcome-img.png';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";



export default function WelcomeScreen() {

    const { user } = useAuth();

    const [ isHidden, setIsHidden ] = useState(false);
    
    function handleSelect(selectedHead) {
        setIsHidden(prev => !prev);
    }

    return (
        <section className="main-content">
            <header>
                <div className="header__image">
                  <img src={welcomImg} alt="Welcome" />
                </div>  
                <div className="header__text">
                    <h3>Hey, {user.firstName || "User"}</h3>
                    {/* <h3>Hey, Mojeed!</h3> */}
                    <h1>Welcome to the world of Web Development</h1>
                    <p className='line-clamp-8'>This course is carefully designed to take complete beginners from ground level 
                        to confident web developers. Whether you’ve never written a line of code before 
                        or you're curious about how websites are built, this is the perfect starting point.
                        By the end of the course, you’ll have a solid foundation in web technologies 
                        and the hands-on skills to create modern, responsive websites—ready to take 
                        on real-world projects or dive deeper into advanced development.
                    </p>
                </div>
            </header>

            <section>
                {topics.map(topic => (
                    <div key={topic.id} className="welcome__container">
                        <div className="head" onClick={() => handleSelect(topic.section)}>
                            <div className="head__left">
                                <i><topic.icon /></i>
                                <p><span>{topic.section}:</span> {topic.description}</p>
                            </div>
                            <div className="head__right">
                                <i>{!isHidden ? <IoIosArrowDown /> : <IoIosArrowUp />}</i>
                            </div>
                        </div>

                        <div className={`body hide ${isHidden ? 'active' : ''}`} >
                            {topic.subjects.map((subject) => (
                                <Link key={subject.path} to={subject.path} target="_self">
                                    <div>
                                        <i><GiNotebook /></i>
                                        <p>{subject.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </section>
    );
}
