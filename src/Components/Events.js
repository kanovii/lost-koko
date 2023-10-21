import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Events() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    // 모험섬 필터 스테잍
    const [fiteredData, setfilteredData] = useState([]);
    const [morningIsland, setMorningIsland] = useState([]);
    const [afterNoonIsland, setAfterNoonIsland] = useState([]);

    const today = new Date();
    const currentDate = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
    const morning = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0);
    const afternoon = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);

    const apiKey =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAzMjk0NDYifQ.BjW5aBV3cjqd9tX6Wzspnz7eZtP73EsTvPG7DC9i22iN6itbiwBsXU8Pw3aZgbHJ-MrFgwXnk-zV8kSyM4p6tfiqMbSZJa8n9zIcQkSLE6CzGynwo74x8Rc4al_zILsYuWQNcLaSNUXAp4BBRFEADN7LmHGcD2AepOr2QiKN3Tf1k2by3zmTjrkNWpb0ky5UXQY1_N01eFnCyvI5TYHQQbio0Yu3vmmHSQ9TSd3Yrmw1vng1yYIsb47wuwf36sDQQY3Ovk-1jMXSC2Awna79yQeqRA_YSpcGjZshbui_4Prg3PgbCJ7nWCL7ZWlBpeXrYNEd5fztK1s20fYPm9ZyFA'; // 본인의 API 키로 대체
    const url = 'https://developer-lostark.game.onstove.com';

    //api 로직
    const getEventsData = async () => {
        try {
            await axios
                .get(`${url}/gamecontents/calendar`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: `bearer ${apiKey}`,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    setData(res.data);

                    const filtered = res.data.filter((d) => {
                        return d.CategoryName == '모험 섬';
                    });

                    // 오늘 하는 모험 섬 찾는 로직
                    const adventureIsland = filtered.filter((d) => {
                        if (Array.isArray(d.StartTimes)) {
                            for (const timestamp of d.StartTimes) {
                                const itemTimestamp = new Date(timestamp);
                                if (itemTimestamp >= todayStart && itemTimestamp <= todayEnd) {
                                    return true;
                                }
                            }
                            return false;
                        } else {
                            const itemTimestamp = new Date(d.StartTimes);
                            return itemTimestamp >= todayStart && itemTimestamp <= todayEnd;
                        }
                    });

                    const morningData = adventureIsland.filter((item) => {
                        if (item.StartTimes) {
                            return item.StartTimes.some((startTime) => {
                                const itemTime = new Date(startTime);
                                return itemTime >= today && itemTime <= morning;
                            });
                        }
                        return false;
                    });

                    const afterNoonData = adventureIsland.filter((item) => {
                        if (item.StartTimes) {
                            return item.StartTimes.some((startTime) => {
                                const itemTime = new Date(startTime);
                                const hos = itemTime.getHours();
                                if (hos < 14) {
                                    return false;
                                } else {
                                    return itemTime >= morning && itemTime <= afternoon;
                                }
                            });
                        }
                        return false;
                    });

                    setfilteredData(adventureIsland);
                    setMorningIsland(morningData);
                    setAfterNoonIsland(afterNoonData);

                    console.log('저장 완료');
                    console.log(adventureIsland);

                    setIsLoading(false);
                });
        } catch (error) {
            console.error(error);
        }
    };

    //api 불러오는 로직 호출 useEffect
    useEffect(() => {
        console.log('이벤트 정보를 불러옵니다.');
        getEventsData();
    }, []);

    return (
        <div className='eventContainer'>
            <div className='eventsName'>오늘의 모험섬</div>
            <div className='eventsBox'>
                <div className='smallTitle'>오전</div>
                {isLoading
                    ? 'loading'
                    : morningIsland.map((d) => {
                          return (
                              <div className='eventsBoxSmall'>
                                  <img className='eventsImg' src={d.ContentsIcon} />
                                  <div className='eventsSpan'>{d.ContentsName}</div>
                              </div>
                          );
                      })}
            </div>
            <div className='eventsBox'>
                <div className='smallTitle'>오후</div>
                {isLoading
                    ? 'loading'
                    : afterNoonIsland.map((d) => {
                          return (
                              <div className='eventsBoxSmall'>
                                  <img className='eventsImg' src={d.ContentsIcon} />
                                  <span className='eventsSpan'>{d.ContentsName}</span>
                              </div>
                          );
                      })}
            </div>
        </div>
    );
}
