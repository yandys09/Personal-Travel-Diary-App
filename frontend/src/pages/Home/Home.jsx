import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import axiosInstance from "../../utils/axiosInstance";
import TravelStoryCard from "../../components/TravelStroyCard";
import { toast, ToastContainer } from 'react-toastify';


const Home = () => {
  const [allStories, setAllStories] = React.useState([]);

  console.log(allStories);

  // Get all travel stories
  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/travel-story/get-all");

      if (response.data && response.data.stories) {
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.log(error, "Something went wrong. Please try again.");
    }
  };

  // Handle Edit
  const handleEdit = async (data) => {

  }
  const handleViewStory = (data) => { }

  const updateIsFavorite = async (storyData) => {
    const storyId = storyData._id

    try {
      const response = await axiosInstance.put("/travel-story/update-is-favorite/" + storyId, {
        isFavorite: !storyData.isFavorite,
      })

      if (response.data && response.data.story) {
        toast.success("Story updated successfully!.")
        getAllTravelStories()
      }
    } catch (error) {
      console.log(error, "Something went wrong. Please try again.")
    }
  }

  useEffect(() => {
    getAllTravelStories();

    return () => { };
  }, []);
  return (
    <>
      <Navbar />

      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1">
            {
              allStories.length > 0 ? (
                <div className="grid grid-cols-2 ap-4">
                  {
                    allStories.map((item) => {
                      return (
                        <TravelStoryCard
                          key={item._id}
                          imageUrl={item.imageUrl}
                          title={item.title}
                          story={item.story}
                          date={item.visitedDate}
                          visitedLocation={item.visitedLocation}
                          isFavorite={item.isFavorite}
                          onEdit={() => handleEdit(item)}
                          onClick={() => handleViewStory(item)}
                          onFavoriteClick={() => updateIsFavorite(item)}
                        />

                      )
                    })
                  }
                </div>
              ) : (
                <div>Empty Card Here</div>
              )
            }          </div>
          <div className="w-[320px]"></div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
