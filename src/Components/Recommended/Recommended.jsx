import React, { useEffect, useState } from "react";
import "./Recommended.css";
import { API_KEY } from "../../Data"; // Import your API key here
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  // Function to convert view count into K, M, B, etc.
  const formatViews = (count) => {
    if (!count) return "Views not available";

    const views = parseInt(count);
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "M"; // For millions
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + "K"; // For thousands
    } else {
      return views.toLocaleString(); // For numbers less than 1000
    }
  };

  // Fetch the data for recommended videos
  const fetchData = async () => {
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;

    try {
      const res = await fetch(relatedVideo_url);
      const data = await res.json();
      setApiData(data.items || []); // Set data or an empty array if no data is found
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]); // Only re-fetch if categoryId changes

  return (
    <div className="recommended">
      {apiData.length === 0 ? (
        <p>Loading recommended videos...</p> // Display loading text if no data
      ) : (
        apiData.map((item, index) => {
          const thumbnailUrl =
            item.snippet?.thumbnails?.medium?.url ||
            "https://via.placeholder.com/150"; // Fallback image if thumbnail is missing
          const title = item.snippet?.title || "No title available";
          const channelName = item.snippet?.channelTitle || "Unknown Channel";
          const viewCount = formatViews(item.statistics?.viewCount);

          return (
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={index}>
              <img src={thumbnailUrl} alt={title} />
              <div className="vid-info">
                <h4>{title}</h4>
                <p>{channelName}</p>
                <p>{viewCount}</p>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Recommended;
