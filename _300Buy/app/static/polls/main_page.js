
function Products() {
    const [productsList, setProductsList] = React.useState([]);
    const searchParams = new URLSearchParams(window.location.search);
    const productFilter = searchParams.get('filter');

    //Adicionar o filtro correto

    React.useEffect(() => 
        fetch("api/products/")
        .then(response => response.json())
        .then(json => {
          console.log(json);

          setProductsList(json);
      }), []);

    return (
      <div className="container">
        <div className="row">
          {productsList.map(product => {
            return <Product key={product.id} product={product} />
          })}
        </div>
      </div>
    );
}

function Product({product}){


  return (
    <div className="col-sm" style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', textAlign: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <img src="https://i.imgur.com/FKLhQ3T.png" style={{height: '10em', width: '10em'}}></img>
        <p style={{'justifyContent': 'center'}} className="row">{product.title}</p>
      </div>   
    </div>
  )
}

const domContainer = document.querySelector('#teste');
ReactDOM.render(<Products/>, domContainer);


