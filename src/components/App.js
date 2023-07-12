import React from "react";
import { ListingProvider } from './../services/providers/context';
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {
  
  return (
    <div className="app">
      <ListingProvider>
          <Header />
          <ListingsContainer />
      </ListingProvider>
    </div>
  );
}


export default App;
