function App() {

    fetch("api/products/").then(response => console.log(JSON.stringify(response.body)));
    console.log("OLA");
  
    return (
      <div>
        Ola
      </div>
    );
}


const domContainer = document.querySelector('#teste');
ReactDOM.render(<App />, domContainer);
console.log("Hello World");