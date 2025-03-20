import DentalAbnormalities from '../../fragments/abnormalities'
import Footer from '../../fragments/dashboard/footer'
import Navbar from '../../fragments/dashboard/navbar'

const AbnormalitiesPage = () => {
  return (
    <>
      {/* <NavbarAbnormalities/> */}
      <Navbar type="abnormalities" />
      <main className='p-10'> 
        <DentalAbnormalities/>
      </main>
      <Footer/>
    </>
  )
}

export default AbnormalitiesPage
