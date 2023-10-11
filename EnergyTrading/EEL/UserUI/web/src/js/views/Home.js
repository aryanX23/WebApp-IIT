import React, { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import Card from '../components/Card'
import Login from './Login';
import Entry from './Entry';

function Home({ accessToken, setAccessToken }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // let access_token = localStorage.getItem('access_token');
    // console.log(access_token)
    if (accessToken !== null) {
      // If the access token exists, set isLoggedIn to true
      setIsLoggedIn(true);
    } else {
      // If the access token doesn't exist, set isLoggedIn to false
      setIsLoggedIn(false);
    }
    console.log(isLoggedIn)


  }, [])

  return (
    <>
      {isLoggedIn ? (

        <div>
          
          <Carousel />
          <div className="container mt-4" >


            <Card title={"Monitoring and Contorl"}
              desc={"Efficiently oversee operations with real-time monitoring and control solutions, ensuring optimal performance and seamless management."}
              tag={"Real-time Data Insights"}
              tolink={"/Monitor"}
              img={"https://media.istockphoto.com/id/1156740048/vector/dashboard-great-design-for-any-site-purposes-business-infographic-template-vector-flat.jpg?s=612x612&w=0&k=20&c=0fPeh8a9ODDMvPk-3o9g5F-JRpt8d2lWIKCrXf_Yjv8="} />



            <Card title={"Energy MarketPlace"}
              desc={"Explore our energy marketplace, connecting buyers and sellers for sustainable energy solutions, fostering a greener future."}
              tag={"Connecting Energy Providers"}
              tolink={"/Marketplace"}
              img={"https://media.istockphoto.com/id/1222811180/photo/digital-marketing.jpg?s=170667a&w=0&k=20&c=2lPSkwk5A3VabjhrTv5rvYMYuJ032x3Ei4ZM_XkZLE8="} />

            <Card title={"Forcasting"}
              desc={"Harness the power of data-driven forecasting to make informed decisions, anticipating trends and optimizing strategies."}
              tag={"Data-Driven Insights"}
              tolink={"/Forcasting"}
              img={"https://blog.arkieva.com/wp-content/uploads/2021/01/differentiated-forecasting-social-01.png"} />

            <Card title={"More About us"}
              desc={"Discover our story and mission. Learn how we're shaping the energy landscape through innovation and sustainability."}
              tag={"Get to Know Us Better"}
              tolink={"/About"}
              img={"https://wp-mktg.prod.getty1.net/istockcontentredesign/wp-content/uploads/sites/5/bfi_thumb/2021_iStock_OptimizeImages_Hero.jpg-37fqz1tdisjr1vq51amb5avwi66i3dwenj8acn54fnsigyblo.jpeg"} />

          </div>
        </div>
      ) : (
        <Entry />
      )}
    </>
  )
}

export default Home
