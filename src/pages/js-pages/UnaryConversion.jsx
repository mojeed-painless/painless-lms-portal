import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function UnaryConversion() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Unary Conversion</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='Unary Conversion'
                            code='ydrj1fjRe9g?si=jMSHfFe6Kgt1qFRX'
                        />
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-string-concatenation" 
                nextPath=""
            />
        </section>
    );
}
