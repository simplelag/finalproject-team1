import React, {useState} from "react";

function Header(props) {
    const [search, setSearch] = useState('');
    const onChange = (e) => {
        setSearch(e.target.value)
    }


    return (
        <div>
            <div className={'container'}>
                <input type={'text'} value={search} onChange={onChange}/>
                <button type={'button'} className={'btn'} onClick={}>검색</button>
                <button type={'button'} className={'btn'} onClick={}>장바구니</button>
                <button type={'button'} className={'btn'} onClick={}>마이페이지</button>
            </div>

        </div>
    )
}

export default Header;