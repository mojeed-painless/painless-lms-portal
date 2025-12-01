import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function HTMLPageStructure() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Understanding the HTML Page Structure</h1>
                <p>Hypertext Markup Language</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
                        Every webpage on the internet is built on HTML — the <strong>HyperText Markup Language</strong>. 
                        But to make it work properly in a browser, we must follow a consistent 
                        <strong>page structure</strong>, which helps the browser interpret and render the content correctly.
                      </p>
                      <p>
                        Whether you're building a small personal blog or a full-blown web app, your HTML page always begins 
                        with a few essential parts. Let’s explore each of them in detail.
                      </p>

                      <h3>The HTML Boilerplate</h3>
                      <p>
                        A boilerplate is a basic reusable HTML template. Here’s the standard 
                        one you'll use often:
                      </p>
                      

<pre>
<span className="t">&lt;!DOCTYPE <span className="p">html</span>&gt;</span>
<span className="t">&lt;html</span> <span className="p">lang</span>=<span className="v">"en"</span><span className="t">&gt;</span>
<span className="t">&lt;head&gt;</span>
    <span className="t">&lt;meta</span> <span className="p">charset</span>=<span className="v">"UTF-8"</span><span className="t">&gt;</span>
    <span className="t">&lt;meta</span> <span className="p">http-equiv</span>=<span className="v">"X-UA-Compatible"</span> <span className="p">content</span>=<span className="v">"IE=edge"</span><span className="t">&gt;</span>
    <span className="t">&lt;meta</span> <span className="p">name</span>=<span className="v">"viewport"</span> <span className="p">content</span>=<span className="v">"width=device-width, initial-scale=1.0"</span><span className="t">&gt;</span>
    <span className="t">&lt;title&gt;</span>My Web Page<span className="t">&lt;/title&gt;</span>
    <span className="t">&lt;link</span> <span className="p">rel</span>=<span className="v">"stylesheet"</span> <span className="p">href</span>=<span className="v">"style.css"</span><span className="t">&gt;</span>
<span className="t">&lt;/head&gt;</span>
<span className="t">&lt;body&gt;</span>

  <span className="comments">&lt;!-- This is a comment --&gt;</span>

  <span className="t">&lt;script</span> <span className="p">src</span>=<span className="v">"script.js"</span><span className="t">&gt;</span><span className="t">&lt;/script&gt;</span>
<span className="t">&lt;/body&gt;</span>
<span className="t">&lt;/html&gt;</span>
</pre>





  <h3>The Doctype Declaration</h3>
  <p>The very first line in any HTML document is the doctype declaration: <code className="code">&lt;!DOCTYPE html&gt;</code></p>
    
  <p>
    This line tells the browser that your document is using HTML5. If you omit this line, the browser may switch into quirks mode, which can cause unexpected behavior in modern designs.
  </p>





  <h3>The &lt;html&gt; Tag</h3>
  <p>
    The <code>&lt;html&gt;</code> element wraps the entire page content. The <code className="code">lang="en"</code> attribute specifies the language of the document as English.
  </p>
  <code>&lt;html lang="en"&gt;</code>





  <h3>The &lt;head&gt; Tag</h3>
  <p>
    The <code>&lt;head&gt;</code> section contains metadata — information about the page — that is not visible to the user but essential to the browser.
  </p>

  <h4>Common elements in the &lt;head&gt;:</h4>
  <ul>
    <li><code>&lt;meta charset="UTF-8"&gt;</code> – Sets character encoding to UTF-8. According to the World Wide Web Consortium, a Unicode based encoding such as UTF-8 can support many languages and can accommodate pages and forms in any mixture of these languages.</li>
    <li><code>&lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;</code> – Makes Internet Explorer use the latest engine</li>
    <li><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code> – Enables responsive design. So in order to have content resize for mobile devices and smaller screens, you need to add this viewport with your meta data at the top.</li>
    <li><code>&lt;title&gt;Page Title&lt;/title&gt;</code> – This indicates the title for the web page. This text is shown in the browser's title bar.</li>
    <li><code>&lt;link rel="stylesheet" href="style.css"&gt;</code> – Links to an external stylesheet</li>
  </ul>






  <h3>The &lt;body&gt; Tag</h3>
  <p>
    The <code>&lt;body&gt;</code> element holds all the visible content of the page — text, images, buttons, links, etc.
  </p>
  <p>
    You can also link your JavaScript at the bottom of the body to allow the HTML to load first:
  </p>
  <code>&lt;script src="script.js"&gt;&lt;/script&gt;</code>





  <h3>HTML Comments</h3>
  <p>
    Comments are ignored by browsers and are used to explain sections of your code or temporarily disable parts:
  </p>
  <code className="code">&lt;!-- This is a comment --&gt;</code>

  <div className="watch">
    <p>🎥 Watch: HTML Page structure</p>
    <div className="video-responsive">
        <iframe width="100%" height="100%" 
            src="https://www.youtube.com/embed/rHJd47-ZqE8?si=0Bi4lxtGtVdoznxW" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
        </iframe>
    </div>
  </div>

   <h3>Smart Phone</h3>
    <div className="watch">
    <p>🎥 Watch: HTML Page structure</p>
    <div className="video-responsive">
        <iframe width="100%" height="100%" 
            src="https://www.youtube.com/embed/IBjU_zEtAOc?si=PzlN_BGzsP6rDZ8D"  
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
        </iframe>
    </div>
  </div>
  

  <h3> Final Thoughts</h3>
  <p>
    Understanding HTML structure is like knowing how to build the foundation of a house. The doctype sets the building code, the HTML tag defines the container, the head sets the rules, and the body contains everything the user interacts with.
  </p>

  <h3 className="bold">
    Once you understand this structure, you’re ready to build clean, responsive, and professional webpages from scratch.
  </h3>
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/html-transition" 
                nextPath="/html-list"
            />
        </section>
    );
}
