
function Products() {
    const [productsList, setProductsList] = React.useState([]);
    React.useEffect(() => 
        fetch("api/products")
        .then(response => response.json())
        .then(json => {
          console.log(json);

          setProductsList(json);
      }), []);



    return (
      <div>
        {productsList.map(product => {
          return <Product product={product} />
        })}
      </div>
    );
  
    
}

function Product({product}){
  return <p>{product.title}</p>
}


const domContainer = document.querySelector('#teste');
ReactDOM.render(<Products />, domContainer);


