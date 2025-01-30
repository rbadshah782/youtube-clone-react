import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, value_converter } from "../../Data";
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = () => {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null); // Use null to represent initial state
  const [loading, setLoading] = useState(true); // Track loading state
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  // Fetch video data
  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;

    try {
      const res = await fetch(videoDetails_url);
      const data = await res.json();

      console.log("API Data:", data); // Log the entire API response

      if (data.items && data.items.length > 0) {
        setApiData(data.items[0]);
      } else {
        console.log("No video data found.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching video data:", error);
      setLoading(false);
    }
  };

  // Fetch channel data including subscriber count
  const fetchChannelData = async () => {
    if (apiData && apiData.snippet && apiData.snippet.channelId) {
      const channelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;

      try {
        const res = await fetch(channelDetails_url);
        const data = await res.json();

        if (data.items && data.items.length > 0) {
          setChannelData(data.items[0]);
        }
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    }
  };

  // Fetch comment data
  const fetchCommentData = async () => {
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;

    try {
      const res = await fetch(comment_url);
      const data = await res.json();

      if (data.items) {
        setCommentData(data.items);
      }
    } catch (error) {
      console.error("Error fetching comment data:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (apiData && apiData.snippet && apiData.snippet.channelId) {
      fetchChannelData();
      fetchCommentData();
    }
  }, [apiData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!apiData) {
    return <div>Error: No video data available</div>;
  }

  const publishedDate = apiData.snippet.publishedAt
    ? moment(apiData.snippet.publishedAt).fromNow()
    : "Published date not available";

  const subscriberCount =
    channelData && channelData.statistics && channelData.statistics.subscriberCount
      ? value_converter(channelData.statistics.subscriberCount)
      : "1M"; // Default fallback for subscriber count

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="Video"
      ></iframe>

      {/* Video Title */}
      <h3>{apiData.snippet.title}</h3>

      <div className="play-video-info">
        <p>
          {value_converter(apiData.statistics.viewCount)} views &bull; {publishedDate}
        </p>

        <div>
          <span>
            <img src={like} alt="Like" />
            {value_converter(apiData.statistics.likeCount)}
          </span>
          <span>
            <img src={dislike} alt="Dislike" /> 2
          </span>
          <span>
            <img src={share} alt="Share" /> Share
          </span>
          <span>
            <img src={save} alt="Save" /> Save
          </span>
        </div>
      </div>

      <hr />

      {/* Publisher Info */}
      <div className="publisher">
        <img
          src={
            channelData && channelData.snippet && channelData.snippet.thumbnails
              ? channelData.snippet.thumbnails.default.url
              : "https://www.example.com/fallback-image.jpg" // Fallback image
          }
          alt="Publisher"
        />
        <div>
          <p>{apiData.snippet.channelTitle || "Channel Name"}</p>
          <span>{subscriberCount} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>

      {/* Video Description */}
      <div className="vid-description">
        <p>
          {apiData ? apiData.snippet.description.slice(0, 250) : "Description Here"}
        </p>
        <hr />
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : 102} Comments
        </h4>

        {/* Comments Section */}
        {commentData.length > 0 ? (
          commentData.map((item, index) => {
            const {
              authorProfileImageUrl,
              authorDisplayName,
              publishedAt,
              textDisplay,
              likeCount,
            } = item.snippet.topLevelComment.snippet; // Ensure correct access

            return (
              <div className="comment" key={index}>
                <img src={authorProfileImageUrl || user_profile} alt="User" />
                <div>
                  <h3>
                    {authorDisplayName}
                    <span>{moment(publishedAt).fromNow()}</span>
                  </h3>
                  <p>{textDisplay}</p>
                  <div className="comment-action">
                    <span>
                      <img src={like} alt="Like" />
                      {likeCount}
                    </span>
                    <img src={dislike} alt="Dislike" />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No comments available</p>
        )}
      </div>
    </div>
  );
};

export default PlayVideo;
