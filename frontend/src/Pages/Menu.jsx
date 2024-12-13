import FoodMenu from "../components/FoodMenu";
import FoodMenuSlider from "../components/FoodMenuSlider";
import Footer from "../components/Footer";
import FoodMainMenu from "../components/MainFoodsMenu";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

export default function Menu(){
    return (
       <> 
       <Navbar />
       <div>
           
       <div className="mt-6">
           {/* <h1 className="text-4xl font-bold text-center mb-3">Search Your Dishes</h1>  */}
       {/* <SearchBar /> */}
       <FoodMainMenu />
       </div>
       <FoodMenuSlider />
       <FoodMenu />
       
      </div>
      <Footer />
   </>
        
    )
}