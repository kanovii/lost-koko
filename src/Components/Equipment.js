import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Equipment({ chaName }) {
    const apiKey =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAzMjk0NDYifQ.BjW5aBV3cjqd9tX6Wzspnz7eZtP73EsTvPG7DC9i22iN6itbiwBsXU8Pw3aZgbHJ-MrFgwXnk-zV8kSyM4p6tfiqMbSZJa8n9zIcQkSLE6CzGynwo74x8Rc4al_zILsYuWQNcLaSNUXAp4BBRFEADN7LmHGcD2AepOr2QiKN3Tf1k2by3zmTjrkNWpb0ky5UXQY1_N01eFnCyvI5TYHQQbio0Yu3vmmHSQ9TSd3Yrmw1vng1yYIsb47wuwf36sDQQY3Ovk-1jMXSC2Awna79yQeqRA_YSpcGjZshbui_4Prg3PgbCJ7nWCL7ZWlBpeXrYNEd5fztK1s20fYPm9ZyFA'; // 본인의 API 키로 대체
    const url = `https://developer-lostark.game.onstove.com/armories/characters/${chaName}/equipment`;

    const [equInfo, setEquInfo] = useState(null);

    useEffect(() => {
        console.log('Search Equipments');

        axios
            .get(url, {
                headers: {
                    accept: 'application/json',
                    Authorization: `bearer ${apiKey}`,
                },
            })
            .then((res) => {
                console.log(res);
                setEquInfo(res.data);
            });
    }, [chaName]);

    return (
        <div className='equBox'>
            {equInfo &&
                equInfo.map((i) => {
                    console.log(i.Type);
                    return (
                        <span>
                            <span>{i.Type}</span>;
                            <img src={i.Icon} />
                        </span>
                    );
                })}
        </div>
    );
}
