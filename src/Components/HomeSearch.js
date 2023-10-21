import { useNavigate } from 'react-router-dom';
import './../App.css';

import { useState } from 'react';

function HomeSearch() {
    const [chaName, setChaName] = useState('');
    const move = useNavigate();

    const handleSearch = () => {
        console.log('검색 데이터 이동');
        move('/character', {
            state: {
                chaName: chaName,
                fromHomeSearch: true,
            },
        });
    };
    return (
        <div className='searchBarBox'>
            <input
                className='searchBar'
                type='text'
                placeholder='캐릭터 정보 검색 [ 카노고 검색 금지 ]'
                value={chaName}
                onChange={(e) => {
                    setChaName(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        console.log(e.key);
                        handleSearch();
                    }
                }}
            />
            <button className='searchBotton' onClick={handleSearch}>
                검색
            </button>
        </div>
    );
}
export default HomeSearch;
