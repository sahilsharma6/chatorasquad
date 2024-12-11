import FoodMenu from "../components/FoodMenu";
import FoodMenuSlider from "../components/FoodMenuSlider";
import FoodMainMenu from "../components/MainFoodsMenu";
import SearchBar from "../components/SearchBar";

export default function Menu(){
    return (
        <div>
           
            <div className="mt-6">
                <h1 className="text-4xl font-bold text-center mb-3">Search Your Dishes</h1> 
            <SearchBar />
            </div>
            <FoodMenuSlider />
            <FoodMenu />
            <FoodMainMenu />
        </div>
        
    )
}