import { useEffect ,useState} from "react";
import FoodMenu from "../components/FoodMenu";
import FoodMenuSlider from "../components/FoodMenuSlider";
import Footer from "../components/Footer";
import FoodMainMenu from "../components/MainFoodsMenu";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

export default function Menu(){
    const [loading, setLoading] = useState(true); // State to manage loader

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Mock loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if(loading){
    return <Loader />
  }
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