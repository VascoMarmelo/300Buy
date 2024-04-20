function App() {
    let productsList = [];

    fetch("api/products").then(response => response.json())
    .then(data => {
        console.log(data);
        
        for (let p in data){
          productsList.push(p);
        }
      })
    .then(data => {return (
      <div>
        {productsList[0].title}
      </div>
    )});

    return (
      <div>
        "OLA"
      </div>
    );
  
    
}


const domContainer = document.querySelector('#teste');
ReactDOM.render(<App />, domContainer);