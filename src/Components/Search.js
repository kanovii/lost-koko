import { useEffect, useState } from 'react';
import './../App.css';
import axios from 'axios';
import ChaBox from './ChaBox';
import Equipment from './Equipment';
import { useLocation, useNavigate } from 'react-router-dom';

function Search() {
    const location = useLocation();

    const [chaName, setChaName] = useState('');
    // 캐릭터 이름 스테이트

    const [searchedText, SetSearchedText] = useState(false);

    const [chaInfo, setChainfo] = useState('');
    // 캐릭터 api 데이터 저장

    // 캐릭터 이미지
    const [characterImage, SetCharacterImage] = useState('');

    const [chaNameForEqu, setChaNameForEqu] = useState('');

    // 캐릭터 이름 검색 되었는지 안되었는지
    const [isSearched, setIsSearched] = useState(false);

    // 아이탬 정보
    const [equInfo, setEquInfo] = useState(null);

    // 품질 배열
    const [quality, setQuality] = useState([]);

    // 아이템 레벨 배열
    const [itemLevel, setItemLevel] = useState([]);

    const apiKey =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAzMjk0NDYifQ.BjW5aBV3cjqd9tX6Wzspnz7eZtP73EsTvPG7DC9i22iN6itbiwBsXU8Pw3aZgbHJ-MrFgwXnk-zV8kSyM4p6tfiqMbSZJa8n9zIcQkSLE6CzGynwo74x8Rc4al_zILsYuWQNcLaSNUXAp4BBRFEADN7LmHGcD2AepOr2QiKN3Tf1k2by3zmTjrkNWpb0ky5UXQY1_N01eFnCyvI5TYHQQbio0Yu3vmmHSQ9TSd3Yrmw1vng1yYIsb47wuwf36sDQQY3Ovk-1jMXSC2Awna79yQeqRA_YSpcGjZshbui_4Prg3PgbCJ7nWCL7ZWlBpeXrYNEd5fztK1s20fYPm9ZyFA'; // 본인의 API 키로 대체
    const url = `https://developer-lostark.game.onstove.com/armories/characters/${chaName}/profiles`;
    const urlSecond = `https://developer-lostark.game.onstove.com/armories/characters/${chaName}/equipment`;

    const handleSearch = async () => {
        // 검색 로직 ---------------------------------------------------->

        console.log(chaName + '을(를)검색합니다.');
        try {
            await axios
                .get(url, {
                    headers: {
                        accept: 'application/json',
                        Authorization: `bearer ${apiKey}`,
                    },
                })
                .then((res) => {
                    console.log(res);

                    //캐릭터 데이타 콘솔 로그
                    setChainfo(res);

                    // 검색 실패시 캐릭터 박스 안보이게 하는 if 문
                    if (res.data === null) {
                        setIsSearched(false);
                        alert('존재하지 않는 아크라시아인입니다.');
                    } else {
                        setIsSearched(true); // 검색 성공시 캐릭터 박스 노출
                        axios
                            .get(urlSecond, {
                                headers: {
                                    accept: 'application/json',
                                    Authorization: `bearer ${apiKey}`,
                                },
                            })
                            .then((res) => {
                                console.log(res);

                                if (res.data === null) {
                                    console.log('아이템 정보를 확인할 수 없습니다.');
                                } else {
                                    handleQuality(res);
                                    setEquInfo(res.data);
                                }
                                // 품질 함수 호출
                            });
                    }
                });
            // 품질, 장비 api
        } catch (error) {
            console.error(error);
        }
        setChaNameForEqu(chaName);
    };
    // 품질 여러개 가져오는 함수
    const handleQuality = (res) => {
        const newQuality = [];
        const newItemLevelArray = [];

        // 품질 받아오기 위한 반복
        for (let i = 0; i < 11; i++) {
            // 품질 코드
            var jsonRes = JSON.parse(res.data[i].Tooltip);

            console.log(jsonRes.Element_001.value.qualityValue); // 품질 콘솔 로그

            let item = jsonRes.Element_001.value.qualityValue;

            // setQuality((quality) => [...quality, newQuality]); // 품질 저장 [] 비동기, 동기 문제 때문에 안됨 삭제
            newQuality.push(item);

            //아이템 레벨 받아오기
            if (i < 6) {
                var newItemLevel = jsonRes.Element_001.value.leftStr2;
                console.log(newItemLevel.substr(23, 4));

                // 아이템 레벨 각각 저장
                newItemLevelArray.push(newItemLevel.substr(23, 4));
            }
        }

        // 배열 재정립
        setQuality(newQuality);
        setItemLevel(newItemLevelArray);
        console.log(quality);
        console.log(itemLevel);
    };
    //검색 로직 끝----------------------------------------------------->

    // 배열 시험 함수
    const tryArray = [1, 2, 3, 44, , 5, 6];

    useEffect(() => {
        if (location.state) {
            setChaName(location.state.chaName);
            SetSearchedText(true);
        }
    }, []);

    useEffect(() => {
        if (searchedText) {
            handleSearch();
        }
    }, [searchedText]);

    return (
        <div className='App'>
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

            {isSearched ? (
                //캐릭터 박스 시작
                <div className='mainBox'>
                    <ChaBox
                        isSearched={isSearched}
                        characterName={chaInfo.data.CharacterName}
                        CharacterImage={chaInfo.data.CharacterImage}
                        ExpeditionLevel={chaInfo.data.ExpeditionLevel}
                    />
                    <Equipment
                        isSearched={isSearched}
                        itemLevel={itemLevel}
                        equInfo={equInfo}
                        quality={quality}
                        tryArray={tryArray}
                        chaName={chaNameForEqu}
                    />
                </div>
            ) : (
                //캐릭터 박스 끝
                <></>
            )}
        </div>
    );
}
export default Search;
