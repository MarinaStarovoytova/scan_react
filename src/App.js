import Main from "./pages/main/Main";
import Authorization from './pages/authorization/Authorization';
import Search from "./pages/search/Search";
import Footer from './components/footer/Footer'
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import React from "react";
import Output from "./pages/output/Output";

class App extends React.Component{
  
  state = {
    isAutorization : false,
    isFirstLoaded : true
  };

  setOffFirstLoaded(){
    this.setState({isFirstLoaded: false});
  }

  setIsAutorization = (isAutoriz) => {
    this.setState({
      isAutorization : isAutoriz
    });
  };

  init(){
    const token = localStorage.getItem("token");
    if(this.state.isFirstLoaded){
    if(token){
        this.setIsAutorization(true);
      } else {
        this.setIsAutorization(false);
      }
      this.setOffFirstLoaded();
    }

  }

  render(){
    this.init();
    return (
      <div className="App">
      <Header isAutorization={this.state.isAutorization} mSetIsAutor={this.setIsAutorization}/>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/authorization" element={<Authorization isAutorization={this.state.isAutorization} mSetIsAutor={this.setIsAutorization}/>} />
            <Route path="/search" element={<Search />} />
            <Route path="/histograms"  element={<Output />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
      </div>
    );
    }
}

export default App;
