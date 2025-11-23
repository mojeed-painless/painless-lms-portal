import {Link} from 'react-router-dom';

export default function NotFoundScreen() {
    return (
            <div className="not-found">
                <p>404 | Page Not Found</p>
                <Link to="/login" className='not-found-link'>Go back</Link>
            </div>
    )
}