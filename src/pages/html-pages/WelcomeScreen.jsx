import { Link } from 'react-router-dom';
import '../../assets/styles/course-content.css';
// import { topics } from '../../data.js';
import welcomImg from '../../assets/welcome-img.png';
import { FaDoorOpen, FaCode, FaPaintbrush  } from "react-icons/fa6";
import { LuBrainCircuit } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";

const topics = [
    {
        id: 1,
        icon: <FaDoorOpen />,
        section: "INTRODUCTION",
        description: "Learn the basics of web structure",
        subjects: [
            {name: 'General Overview', path: '/general-overview'},
            {name: 'Why should I learn Coding', path: '/why'},
            {name: 'Course Overview', path: '/course-overview'},
            {name: 'Code Editors', path: '/editor'}
        ]
    },
    {
        id: 2,
        icon: <FaCode />,
        section: "HTML",
        description: "Understand the building blocks of every webpage.",
        subjects: [
            {name: 'HTML Page Structure', path: '/html-structure'},
            {name: 'Lists', path: '/html-list'},
            {name: 'Tables', path: '/html-table'},
            {name: 'Images', path: '/html-image'},
            {name: 'Hyperlinks', path: '/html-hyperlinks'},
            {name: 'Inline & Block Elements', path: '/html-block-element'},
            {name: 'Forms, Types & Fields', path: '/html-form'},
            {name: 'HTML Styling', path: '/html-style'}
        ]
    },
    {
        id: 3,
        icon: <FaPaintbrush />,
        section: "CSS",
        description: "Discover how to transform plain structures into visually appealing designs.",
        subjects: [
            {name: 'Introduction to CSS', path: '/css_introduction'},
            {name: 'Inserting CSS', path: '/css_insert'},
            {name: 'CSS Syntax', path: '/css_syntax'},
            {name: 'Selectors', path: '/css_selectors'},
            {name: 'Colors', path: '/csS_color'},
            {name: 'Background', path: '/css_background'},
            {name: 'Borders', path: '/css_border'},
            {name: 'Box Model', path: '/css_boxmodel'},
            {name: 'Height & Width', path: '/css_width'},
            {name: 'Text Formatting', path: '/css_formatting'},
            {name: 'Links', path: '/css_links'},
            {name: 'Lists', path: '/css_lists'},
            {name: 'Tables', path: '/css_table'},
            {name: 'Icons', path: '/css_icon'},
            {name: 'Layout: Display', path: '/css_display'},
            {name: 'Layout: Overflow', path: '/css_overflow'},
            {name: 'Layout: Position', path: '/css_position'},
            {name: 'Layout: Flex Box', path: '/css_flexbox'},
            {name: 'Layout: Grid', path: '/css_grid'},
            {name: 'Combinators', path: '/css_conbinator'},
            {name: 'Pseudo-classes', path: '/css_pseudoclass'},
            {name: 'Pseudo-elements', path: '/css_pseudoelement'},
            {name: 'Attributes Selector', path: '/css_attribute'},
            {name: 'Box Shadow', path: '/css_boxshadow'},
            {name: 'Opacity', path: '/css_opacity'},
            {name: 'Transform', path: '/css_transform'},
            {name: 'Transition', path: '/css_transition'},
            {name: 'Animations', path: '/css_animation'},
            {name: 'Media Query', path: '/css_mediaquery'},
            {name: 'Styling Forms', path: '/css_form'},
            {name: 'Navigation Bar', path: '/css_navbar'},
            {name: 'Portfolio Project', path: '/css_portfolio'}
        ]
    },
    {
        id: 4,
        icon: <LuBrainCircuit />,
        section: "Javascript",
        description: "Make your websites interactive and dynamic.",
        subjects: [
            {name: 'General Overview', path: '/general-overview'},
            {name: 'Why should I learn Coding', path: '/why'},
            {name: 'Course Overview', path: '/course-overview'},
            {name: 'Code Editors', path: '/editor'}
        ]
    },
]

export default function WelcomeScreen() {

    return (
        <section className="main-content">
            <header>
                <div className="header__image">
                  <img src={welcomImg} alt="Welcome" />
                </div>  
                <div className="header__text">
                    <h3>Hey, Mojeed!</h3>
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
                        <div className="head">
                            <div className="head__left">
                                <i>{topic.icon}</i>
                                <p><span>{topic.section}:</span> {topic.description}</p>
                            </div>
                            <div className="head__right">
                                <i><IoIosArrowDown /></i>
                            </div>
                        </div>

                        <div className="body hide" >
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