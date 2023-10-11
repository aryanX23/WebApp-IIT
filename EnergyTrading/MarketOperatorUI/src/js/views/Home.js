import React, { useEffect,useState } from 'react'
import Carousel from '../components/Carousel'
import Card from '../components/Card'
import Blog from '../components/Blog'
import News from '../components/News'
function Home() {
  const [progress,setProgress]=useState(0);
  const apiKey="aeec53ed0e0146389a34faa7f35cefb8"
  const pageSize=20;
  return (
    <div>
      {/* <Carousel /> */}
      <div className="container mt-4 border border-secondary-subtle rounded-2 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
      <Blog/>
      {/* <News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/> */}
      </div>
      <div className="container mt-4" >
        

        <Card title={"Market Operation"}
          desc={"The Market Operation section offers insights into vital energy trading processes. Explore 'Invite Bid' to initiate bids, 'Bid Matching' for efficient market transactions, and 'Matched Bid Broadcast' for real-time updates. Stay informed and optimize your energy trading strategies with these essential tools and functionalities"}
          tag={"Efficient Energy Trading"}
          
          tolink={"/MarketOperation"}
          // tolink={"https://learn.oracle.com/ols/user-portal"}
          img={"https://static.vecteezy.com/system/resources/previews/001/871/244/non_2x/illustration-for-online-marketplace-with-a-shop-or-stall-selling-booths-search-and-compare-items-in-the-marketplace-can-be-used-for-landing-page-website-web-mobile-apps-posters-flyers-free-vector.jpg"} 
          b1={"Invite Bid"}
          b2={"Bid Matching"}/>
        <Card title={"Grievance Redressal"}
          desc={"Explore the 'Grievance Redressal' section for two dynamic options: 'Query Response' for submitting inquiries and 'Live Chat' for real-time assistance. Whether you have questions or need immediate support, these tools are here to empower your experience and ensure your concerns are addressed promptly."}
          tag={"Efficient Energy Trading"}
          tolink={"//GrievanceRedressal"}
          img={"https://img.freepik.com/free-vector/organic-flat-customer-support-illustration_23-2148899174.jpg?w=2000"} 
          b1={"Query Response"}
          b2={"Live Chat"}/>
        <Card title={"Notification"}
          desc={"Stay informed with the 'Notification' section. Explore 'Compliance Report' for comprehensive insights into regulatory adherence. Additionally, keep up-to-date with 'New Regulation' notifications to adapt and excel in the evolving energy landscape."}
          tag={"Efficient Energy Trading"}
          tolink={"/Notification"}
          img={"https://assets.materialup.com/uploads/7a54d473-cae1-4dcd-be8e-735b421f2f5b/preview.jpg"} 
          b1={"Compliance Report"}
          b2={"New Regulation"}/>

         

       
      </div>
    </div>
  )
}

export default Home
