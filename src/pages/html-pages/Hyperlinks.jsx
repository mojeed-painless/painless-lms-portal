import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Hyperlinks() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>HTML Hyperlinks</h1>
                <p>Hypertext Markup Language</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/html-image" 
                nextPath="/html-block-element"
            />
        </section>
    );
}
