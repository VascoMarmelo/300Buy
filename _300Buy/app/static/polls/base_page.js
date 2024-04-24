function RedirectButton({ href }){

    const buttonClicked = () => {
        window.location.href = href;
    };

    return (
        <button onClick={buttonClicked} className="btn" style={{"backgroundColor": "rgba(2, 171, 73)"}}>Login</button>
    )
}

function RedirectLogo({ href }){

    const svgClicked = () => {
        window.location.href = href;
    };

    return (
        <img onClick={svgClicked} src='/static/svg/logo-white2.svg' className="custom-logo" style={{width: "10em", height: "5em"}}></img>
    )
}

function SearchFunction({ href }){

    return (
        <div className="container row" style={{textAlign:"center"}} >
            <SearchBar href={href}/>
            <div className='col-sm-1'/>
            <SearchButton href={href}/>
        </div>
    )
}

function SearchBar({ href }){

    return (
        <input id="searchBoxMain" type="text" className="col-sm-8" style={{height: "2.5em"}}></input>
    )
}

function SearchButton({ href }){

    const btnClicked = () => {
        window.location.href = "/?filter=" + document.getElementById('searchBoxMain').value;
    };

    return (
        <button onClick={btnClicked} type="btn" className="btn col-sm-2" style={{width: "3em", height: "2.5em", backgroundColor: "rgba(2, 171, 73)"}}>
            <svg style={{display: "block", margin: "auto"}} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
        </button>   
    )
}

const domContainerLoginBtn = document.querySelector('#loginButton');
ReactDOM.render(<RedirectButton href={'/login'} />, domContainerLoginBtn);

const domContainerLogoImg = document.querySelector('#logo');
ReactDOM.render(<RedirectLogo href={'/'} />, domContainerLogoImg);

const domContainerSearchFunction = document.querySelector('#searchBar');
ReactDOM.render(<SearchFunction href={'/'} />, domContainerSearchFunction);