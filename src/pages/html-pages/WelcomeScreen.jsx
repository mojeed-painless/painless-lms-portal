import welcomImg from '../../assets/welcome-img.png';
import '../../assets/styles/course-content.css'


export default function WelcomeScreen() {

    return (
        <section className="main-content">
            <header>
              <div className="header__image">
                  <img src={welcomImg} alt="Welcome" />
                </div>

                <div className="header__text">
                    <h3>Hey, <span id="welcome-user">Mojeed</span>!</h3>
                    <h1>Welcome to the world of Web Development</h1>
                    <p>This course is carefully designed to take complete beginners from ground level 
                        to confident web developers. Whether you’ve never written a line of code before 
                        or you're curious about how websites are built, this is the perfect starting point.
                        By the end of the course, you’ll have a solid foundation in web technologies 
                        and the hands-on skills to create modern, responsive websites—ready to take 
                        on real-world projects or dive deeper into advanced development.
                    </p>
                </div>
            </header>

            <main>
                <section id="intro">
                    <div id="cover">
                        <div className="spacing intro">
                            <div className="head">
                                <div className="head_left">
                                    <i className="fa-solid fa-door-open"></i>
                                    <p><span>INTRODUCTION:</span> Learn the basics of web structure</p>
                                </div>

                                <div className="head_right">
                                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                                </div>
                            </div>

                            <div id="content" className="hide">

                                <a href="./pages/general.html" target="_self">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>General Overview</p>
                                    </div>
                                </a>

                                <a href="./pages/why.html" target="_self">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Why should I learn Coding</p>
                                    </div>
                                </a>

                                <a href="./pages/course.html" target="_self">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Course Overview</p>
                                    </div>
                                </a>

                                <a href="./pages/editors.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Code Editors</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="html">
                    <div id="cover">
                        <div className="spacing html">
                            <div className="head">
                                <div className="head_left">
                                    <i className="fa fa-code" aria-hidden="true"></i>
                                    <p><span>HTML:</span> Learn the basics of web structure</p>
                                </div>

                                <div className="head_right">
                                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                                </div>
                            </div>

                            <div id="content" className="hide">

                                <a href="./pages/html_pages/structure.html" target="_self">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>HTML Page Structure</p>
                                    </div>
                                </a>

                                <a href="./pages/html_pages/lists.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>HTML List</p>
                                    </div>
                                </a>

                                <a href="./pages/html_pages/tables.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>HTML Tables</p>
                                    </div>
                                </a>

                                <a href="./pages/html_pages/images.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>HTML Images</p>
                                    </div>
                                </a>

                                <a href="./pages/html_pages/hyperlinks.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>HTML Hyperlinks</p>
                                    </div>
                                </a>

                                <a href="./pages/html_pages/inline.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>HTML Inline & Block Elements</p>
                                    </div>
                                </a>

                                <a href="./pages/html_pages/forms.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>HTML Forms, Types & Fields</p>
                                    </div>
                                </a>

                                <a href="./pages/html_pages/style.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>HTML Styling</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="css">
                    <div id="cover">
                        <div className="spacing css">
                            <div className="head">
                                <div className="head_left">
                                    <i className="fa fa-paint-brush" aria-hidden="true"></i>
                                    <p><span>CSS:</span> Learn to give the web page an attractive appearance</p>
                                </div>

                                <div className="head_right">
                                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                                </div>
                            </div>

                            <div id="content" className="hide">
                                <a href="./pages/css_pages/css_intro.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Introduction to CSS</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/insert_css.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Inserting CSS</p>
                                    </div>
                                </a>
                                
                                <a href="./pages/css_pages/css_syntax.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>CSS Syntax</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/selectors.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Selectors</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/colors.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Colors</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/background.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Background</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/borders.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Borders</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/boxmodel.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Box Model</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/width.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Height & Width</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/formatting.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Text Formatting</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/links.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Links</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/lists.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Lists</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/tables.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Tables</p>
                                    </div>
                                </a>
                                
                                <a href="./pages/css_pages/icons.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Icons</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/layout.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Layout: Diplay</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/overflow.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Layout: Overflow</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/position.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Layout: Position</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/flex.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Layout: Flex Box</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/grid.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Layout: Grid</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/combinators.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Combinators</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/pseudo-className.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Pseudo-classNamees</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/pseudo-className.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Pseudo-elements</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/attributes.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Attributes Selector</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/shadow.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Box Shadow</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/opacity.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Opacity</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/transform.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Transform</p>
                                    </div>
                                </a>
                                
                                <a href="./pages/css_pages/transition.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Transition</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/animations.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Animations</p>
                                    </div>
                                </a>

                            <a href="./pages/css_pages/query.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Media Query</p>
                                    </div>
                                </a>
                                
                            <a href="./pages/css_pages/forms.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Styling Forms</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/navbar.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Navigation Bar</p>
                                    </div>
                                </a>

                                <a href="./pages/css_pages/portfolio.html">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Portfolio Project</p>
                                    </div>
                                </a>

                                
                            </div>
                        </div>
                    </div>
                </section>

                <section id="js">
                    <div id="cover">
                        <div className="spacing js">
                            <div className="head">
                                <div className="head_left">
                                    <i className="fa-brands fa-node-js"></i>
                                    <p><span>Javascript Basics:</span> Learn to make the web page dynamic</p>
                                </div>

                                <div className="head_right">
                                    <i className="fa-solid fa-lock"></i>
                                </div>
                            </div>

                            <div id="content" className="hide">
                                <a href="#">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Placeholder</p>
                                    </div>
                                </a>

                                <a href="#">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Placeholder</p>
                                    </div>
                                </a>

                                <a href="#">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Placeholder</p>
                                    </div>
                                </a>

                                <a href="#">
                                    <div>
                                        <i className="fa-solid fa-file"></i>
                                        <p>Placeholder</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="quiz">
                    <div id="cover">
                        <div className="spacing quiz">
                            {/* <a href="./pages/quiz.html"><img src="./img/quiz1.png" alt=""></a> */}
                        </div>
                    </div>
                </section>
            </main>
        </section>
    );
}