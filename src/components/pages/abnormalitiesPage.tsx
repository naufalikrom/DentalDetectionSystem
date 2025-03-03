import DentalAbnormalities from '../fragments/abnormalities'
import NavbarAbnormalities from '../fragments/abnormalities/navbarAbnormalities'
import Footer from '../fragments/dashboard/footer'

const AbnormalitiesPage = () => {
  return (
    <>
      <NavbarAbnormalities/>
      <main className='p-10'> 
        <DentalAbnormalities/>
      </main>
      <Footer/>
    </>
  )
}

export default AbnormalitiesPage
