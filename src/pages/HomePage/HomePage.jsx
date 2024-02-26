import React from 'react'
import BurgerMenu from '../BurgerMenu/Burger'
import Events from '../Events/Events'
import Footer from "../Footer/Footer";
// import EventDetailPage from '../Events/EventDetailPage'
// import PaymentPage from '../Payment/Payment'

function HomePage() {
  return (
    <div>
        <BurgerMenu />
        <Events />
        {/* <EventDetailPage /> */}
        {/* <PaymentPage /> */}
        <Footer />
    </div>
  )
}

export default HomePage