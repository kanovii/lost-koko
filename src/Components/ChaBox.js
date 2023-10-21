export default function ChaBox({ isSearched, CharacterImage, characterName, ExpeditionLevel }) {
    return (
        <div>
            {isSearched ? (
                //캐릭터 박스 시작
                <div className='chaBox'>
                    <div className='nameof'>{isSearched && characterName}</div>
                    <div className='oneJ'>
                        원정대 레벨 <span className='oneJNume'>{isSearched && ExpeditionLevel}</span>
                    </div>
                    <img className='chaImg' src={isSearched && CharacterImage} />
                </div>
            ) : (
                //캐릭터 박스 끝
                <></>
            )}
        </div>
    );
}
