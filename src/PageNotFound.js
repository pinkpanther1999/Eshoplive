import React from 'react'
import LogoBar from './LogoBar';
import Footer from './Footer';

const PageNotFound = () => {
    return (
        <div class="App" >
            <div>
            <LogoBar/>
            </div>
            <img src="/Images/error404.jpg" alt="404" />
            <div id="info">
            </div>
            <div>
            <Footer/>
            </div>
        </div >
    )
}

export default PageNotFound;