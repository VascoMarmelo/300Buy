function RedirectText({ href, name }){

    const buttonClicked = () => {
        window.location.href = href;
    }; 

    return (
        <button onClick={buttonClicked} className="btn d-flex justify-content-center" style={{ "color": "black", "backgroundColor": "rgba(2, 171, 73, 0)"}}>{name}</button>
    )
}

const domContainerRegisterBtn = document.querySelector('#registerBtn');
if (domContainerRegisterBtn){
    ReactDOM.render(<RedirectText href={'/register'} name={'Pretende registar?'} />, domContainerRegisterBtn);
}