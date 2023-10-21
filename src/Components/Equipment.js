import React from 'react';
import { useEffect } from 'react';
import './../App.css';

export default function Equipment({ isSearched, itemLevel, equInfo, quality, chaName, tryArray }) {
    useEffect(() => {
        console.log('Search Equipments');

        console.log(tryArray);
    }, [chaName]);

    return (
        <div className='equBox'>
            {equInfo &&
                equInfo.map((i, index) => {
                    // console.log(i.Type); 아이템 부위 콘솔 로그

                    return (
                        <>
                            {isSearched && (
                                <div className='itemBoxSmall'>
                                    {index < 12 && <img src={i.Icon} />}

                                    <div>
                                        {index < 12 && <span>{i.Type}</span>}

                                        {index < 6 && <span className='itemLevel'>{itemLevel[index]} </span>}
                                        {index < 11 && (
                                            <span
                                                className={
                                                    quality[index] == 100
                                                        ? 'orange'
                                                        : quality[index] > 89
                                                        ? 'purple'
                                                        : quality[index] > 69
                                                        ? 'blue'
                                                        : quality[index] > 29
                                                        ? 'green'
                                                        : quality[index] > 9
                                                        ? 'yellow'
                                                        : 'red'
                                                }
                                            >
                                                {' '}
                                                {quality[index]}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    );
                })}
        </div>
    );
}
