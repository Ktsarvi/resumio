import Banner from "../components/home/Banner"
import HeroSection from "../components/home/HeroSection"
import Features from "../components/home/Features"
import Testimonial from "../components/home/Testimonial"
import CallToAction from "../components/home/CallToAction"
import Footer from "../components/home/Footer"

const Home = () => {
  return (
    <div>
      <Banner />
      <HeroSection />
      <Features />
      <Testimonial />
      <CallToAction />
      <Footer /> 
    </div>
  )
}

export default Home