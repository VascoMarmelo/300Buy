
function Products() {
    const [productsList, setProductsList] = React.useState([]);
    const searchParams = new URLSearchParams(window.location.search);
    let productFilter = searchParams.get('filter');

    if (productFilter == null){
      productFilter = "";
    }
    else{
      productFilter = "/" + productFilter; 
    }

    //Adicionar o filtro correto
    React.useEffect(() => 
        fetch("api/products" + productFilter)
        .then(response => response.json())
        .then(json => {
          console.log(json);
          setProductsList(json);
      }), []);

    return (
      <div className="container ">
        <div className="row d-flex justify-content-center">
          <ul>
            {       
            productsList.map(product => {
              return <Product key={product.id} product={product} />
            })}
          </ul>
        </div>
      </div>
    );
}

function Product({product}){

  const btnClicked = () => {
    console.log("OLA");
  }


  return (
    <li>
      <div className="col-sm" style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', textAlign: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column'}} onClick={{btnClicked}}>
          <img src="https://i.imgur.com/FKLhQ3T.png" style={{height: '10em', width: '10em'}}></img>
          <p style={{'justifyContent': 'center'}} className="row">{product.title}</p>
        </div>
      </div>
    </li> 
  )
}

const domContainer = document.querySelector('#teste');
ReactDOM.render(<Products/>, domContainer);


