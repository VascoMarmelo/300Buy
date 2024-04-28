
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
      <div>
        <div style={{textAlign: 'center'}}>
          <h3>Products</h3>        
        </div>  
        <div className="container">
          <div className="row d-flex justify-content-center">
              {       
              productsList.map(product => {
                return <Product key={product.id} product={product} />
              })}
          </div>
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
          <div style={{'justifyContent': 'center'}}>
            <AddToCart product={product}/>           
          </div>     
        </div>
      </div>
  )
}


function AddToCart(product){

  const btnClicked = () => {
    fetch("api/carts", {method: "POST", body: JSON.stringify(product)}).then(console.log("Enviado"))
  }

  return (
    <button onClick={btnClicked} className="btn" style={{width: "8em", height: "2.5em", backgroundColor: "rgba(2, 171, 73)"}}>Add to Cart</button>
  )
}

function Cart({username}){

  const [cart, setCart] = React.useState([]);

  React.useEffect(() => 
      fetch("api/carts", {method : "GET"})
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setCart(json);
    }), []);

  console.log(username);

  return (
      <div className="container ">
          <div style={{textAlign: 'center'}}>
            <h3>Cart Items</h3>                 
          </div>  
          <div className="row d-flex justify-content-center">
              {       
              cart.map(cartItemData => {
                  return <CartItem key={cartItemData.id} product={cartItemData.product} />
              })}
          </div>
      </div>
  );

}

function CartItem({product}){

  return (
      <div className="col-sm" style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', textAlign: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <img src="https://i.imgur.com/FKLhQ3T.png" style={{height: '10em', width: '10em'}}></img>
          <p style={{'justifyContent': 'center'}} className="row">{product.title}</p>   
        </div>
      </div>
  )
}

const domContainer = document.querySelector('#productsList');
ReactDOM.render(<Products/>, domContainer);

const domContainerCart = document.querySelector('#cartList');
ReactDOM.render(<Cart/>, domContainerCart);


