import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [chaName, setChaName] = useState('');
    // 캐릭터 이름 스테이트

    const [chaInfo, setChainfo] = useState('');
    // 캐릭터 api 데이터 저장

    const [isSearched, setIsSearched] = useState(false);

    const apiKey =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAzMjk0NDYifQ.BjW5aBV3cjqd9tX6Wzspnz7eZtP73EsTvPG7DC9i22iN6itbiwBsXU8Pw3aZgbHJ-MrFgwXnk-zV8kSyM4p6tfiqMbSZJa8n9zIcQkSLE6CzGynwo74x8Rc4al_zILsYuWQNcLaSNUXAp4BBRFEADN7LmHGcD2AepOr2QiKN3Tf1k2by3zmTjrkNWpb0ky5UXQY1_N01eFnCyvI5TYHQQbio0Yu3vmmHSQ9TSd3Yrmw1vng1yYIsb47wuwf36sDQQY3Ovk-1jMXSC2Awna79yQeqRA_YSpcGjZshbui_4Prg3PgbCJ7nWCL7ZWlBpeXrYNEd5fztK1s20fYPm9ZyFA'; // 본인의 API 키로 대체
    const url = `https://developer-lostark.game.onstove.com/armories/characters/${chaName}/profiles`;

    const handleSearch = async () => {
        // 검색 버튼 클릭 로직 작성 해야함
        console.log(chaName + '을(를)검색합니다.');
        try {
            const response = await axios
                .get(url, {
                    headers: {
                        accept: 'application/json',
                        Authorization: `bearer ${apiKey}`,
                    },
                })
                .then((res) => {
                    console.log(res);
                    setChainfo(res);
                    console.log('입' + chaInfo + '입');
                });
        } catch (error) {
            console.error(error);
        }
        setIsSearched(true);
    };

    return (
        <div className='App'>
            <h1>Lost Koko</h1>
            <h3>캐릭터 정보 검색</h3>

            <input
                type='text'
                placeholder='캐릭터 이름 입력'
                value={chaName}
                onChange={(e) => {
                    console.log(e.target.value);
                    setChaName(e.target.value);
                }}
            />
            <button onClick={handleSearch}>검색</button>

            {isSearched ? (
                //캐릭터 박스 시작
                <div className='chaBox'>
                    <div className='nameof'>{isSearched && chaInfo.data.CharacterName}</div>
                    <div className='oneJ'>
                        원정대 레벨 <span className='oneJNume'>{isSearched && chaInfo.data.ExpeditionLevel}</span>
                    </div>
                    <img className='chaImg' src={isSearched && chaInfo.data.CharacterImage} />
                </div>
            ) : (
                //캐릭터 박스 끝
                <></>
            )}
        </div>
    );
}

export default App;
