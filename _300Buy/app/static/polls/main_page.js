//Retirado da documentação do DJANGO https://docs.djangoproject.com/en/4.2/howto/csrf/
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}


function Products() {
    const [productsList, setProductsList] = React.useState([]);
    const searchParams = new URLSearchParams(window.location.search);
    let productFilter = searchParams.get('filter');

    //Uso argumento get "filtro", para uma filtragem do get
    if (productFilter == null){
      productFilter = "";
    }
    else{
      productFilter = "/" + productFilter; 
    }

    React.useEffect(() => 
        fetch("api/products" + productFilter)
        .then(response => response.json())
        .then(json => {
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
          <img src="https://i.imgur.com/1o3KcN6.png" style={{height: '10em', width: '10em'}}></img>
          <p style={{'justifyContent': 'center'}} className="row">{product.title}</p>
          <div style={{'justifyContent': 'center'}}>
            <AddToCart product={product}/>           
          </div>     
        </div>
      </div>
   
  )
}


function AddToCart(product){

  const csrfToken = getCookie('csrftoken');

  const btnClicked = () => {
    fetch("api/carts/", 
      {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json', // Set content type for JSON data
          'X-CSRFToken': csrfToken, 
        }, 
        credentials: "same-origin",
        body: JSON.stringify({
          'cart_products' : product.product,
          'amount': 1,
          'paid': false,
        })})
      .then(response => {
      if (response.status !== 200 && response.status !== 201){
        window.location.href = "/login";
      }
    })
  }

  return (
    <button onClick={btnClicked} className="btn" style={{width: "8em", height: "2.5em", backgroundColor: "rgba(2, 171, 73)"}}>Add to Cart</button>
  )
}



function CartDisplay(){

  const [cart, setCart] = React.useState([]);

  React.useEffect(() => 
      fetch("api/carts", {method : "GET"})
      .then(response => response.json())
      .then(json => {
        setCart(json);
    }), []);

  return (
      <div className="container ">
          <div style={{textAlign: 'center'}}>
            <h3>Cart Items</h3>                 
          </div>  
          <div className="row d-flex justify-content-center">
              {       
              cart.map(cartItemData => {
                  return <CartItem key={cartItemData.id} id={cartItemData.id} product={cartItemData.cart_products} />
              })}
          </div>
      </div>
  );

}

function CartItem({id, product}){

  return (
      <div className="col-sm" style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', textAlign: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <img src="https://i.imgur.com/1o3KcN6.png" style={{height: '10em', width: '10em'}}></img>
          <p style={{'justifyContent': 'center'}} className="row">{product.title}</p>  
          <RemoveCartItem id={id}/> 
        </div>
        
      </div>
  )
}

function RemoveCartItem({id}){

  const csrfToken = getCookie('csrftoken');

  const btnClicked = () => {
    fetch("api/carts/", 
      {
        method: "DELETE", 
        headers: {
          'Content-Type': 'application/json', // Set content type for JSON data
          'X-CSRFToken': csrfToken, 
        }, 
        credentials: "same-origin",
        body: JSON.stringify({
          'cart_id' : id
        })})
      
  }

  return (
    <button onClick={btnClicked} className="btn" style={{width: "8em", height: "2.5em", backgroundColor: "rgba(2, 171, 73)"}}>Remove</button>
  )
}

const domContainer = document.querySelector('#productsList');
if (domContainer){
  ReactDOM.render(<Products/>, domContainer);
}
  

const domContainerCart = document.querySelector('#cartList');
if (domContainerCart){
  ReactDOM.render(<CartDisplay/>, domContainerCart);
}



