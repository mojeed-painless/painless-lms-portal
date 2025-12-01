import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Forms() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Forms, Types & Fields</h1>
                <p>Hypertext Markup Language</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/html-block-element" 
                nextPath="/html-style"
            />
        </section>
    );
}
