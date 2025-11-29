import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';

export default function WhyLearn() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Why should I Learn Coding?</h1>
                <p>Intruduction</p>
            </div>

            <section>
                <div className="course-content__container">
                   

                </div>
            </section>

            <PrevNextBtn 
                prevPath="/general-overview" 
                nextPath=""
            />
        </section>
    );
}
