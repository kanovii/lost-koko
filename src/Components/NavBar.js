import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { GiCharacter } from 'react-icons/gi';

export default function NavBar() {
    return (
        <header>
            <nav className='navBox'>
                <Link className='navBoxSmall' to='/'>
                    <AiFillHome />홈
                </Link>
                <Link className='navBoxSmall' to='/Character'>
                    <GiCharacter />
                    캐릭터
                </Link>
                <div className='mainLogo'>
                    로스트 코코 <div className='kokoimg'></div>
                </div>
            </nav>
        </header>
    );
}
