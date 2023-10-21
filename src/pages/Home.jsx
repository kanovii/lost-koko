import HomeSearch from '../Components/HomeSearch';
import Events from '../Components/Events';

export default function Home({ chaName }) {
    return (
        <div>
            <HomeSearch />
            <Events />
        </div>
    );
}
