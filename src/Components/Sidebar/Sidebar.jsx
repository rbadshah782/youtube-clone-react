import React from 'react';
import './Sidebar.css';
import home from '../../assets/home.png';
import game_icon from '../../assets/game_icon.png';
import automobiles from '../../assets/automobiles.png';
import sports from '../../assets/sports.png';
import entertainment from '../../assets/entertainment.png';
import tech from '../../assets/tech.png';
import music from '../../assets/music.png';
import blogs from '../../assets/blogs.png';
import news from '../../assets/news.png';
import jack from '../../assets/jack.png';
import simon from '../../assets/simon.png';
import tom from '../../assets/tom.png';
import megan from '../../assets/megan.png';
import cameron from '../../assets/cameron.png';

const Sidebar = ({ sidebar, category, setCategory }) => {
  return (
    <div className={`sidebar ${sidebar ? '' : 'small-sidebar'}`}>
      <div className='shortcut-links'>
       

        <div
          className={`side-link ${category === 20 ? 'active' : ''}`}
          onClick={() => setCategory(20)}
        >
          <img src={game_icon} alt='gaming' />
          {sidebar && <p>Gaming</p>}
          {category === 20 && <div className='active-line'></div>}
        </div>

        <div
          className={`side-link ${category === 2 ? 'active' : ''}`}
          onClick={() => setCategory(2)}
        >
          <img src={automobiles} alt='automobiles' />
          {sidebar && <p>Automobiles</p>}
          {category === 2 && <div className='active-line'></div>}
        </div>

        <div
          className={`side-link ${category === 17 ? 'active' : ''}`}
          onClick={() => setCategory(17)}
        >
          <img src={sports} alt='sports' />
          {sidebar && <p>Sports</p>}
          {category === 17 && <div className='active-line'></div>}
        </div>

        <div
          className={`side-link ${category === 24 ? 'active' : ''}`}
          onClick={() => setCategory(24)}
        >
          <img src={entertainment} alt='entertainment' />
          {sidebar && <p>Entertainment</p>}
          {category === 24 && <div className='active-line'></div>}
        </div>

        <div
          className={`side-link ${category === 28 ? 'active' : ''}`}
          onClick={() => setCategory(28)}
        >
          <img src={tech} alt='technology' />
          {sidebar && <p>Technology</p>}
          {category === 28 && <div className='active-line'></div>}
        </div>

        <div
          className={`side-link ${category === 10 ? 'active' : ''}`}
          onClick={() => setCategory(10)}
        >
          <img src={music} alt='music' />
          {sidebar && <p>Music</p>}
          {category === 10 && <div className='active-line'></div>}
        </div>

        <div
          className={`side-link ${category === 22 ? 'active' : ''}`}
          onClick={() => setCategory(22)}
        >
          <img src={blogs} alt='blogs' />
          {sidebar && <p>Blogs</p>}
          {category === 22 && <div className='active-line'></div>}
        </div>

        <div
          className={`side-link ${category === 25 ? 'active' : ''}`}
          onClick={() => setCategory(25)}
        >
          <img src={news} alt='news' />
          {sidebar && <p>News</p>}
          {category === 25 && <div className='active-line'></div>}
        </div>
        <hr />
      </div>

      <div className='subscribe-list'>
        <h3>Subscribed</h3>
        <div className='side-link'>
          <img src={jack} alt='jack' /> <p>PewDiePie</p>
        </div>

        <div className='side-link'>
          <img src={simon} alt='simon' /> <p>MrBeast</p>
        </div>

        <div className='side-link'>
          <img src={tom} alt='tom' /> <p>Justin Bieber</p>
        </div>

        <div className='side-link'>
          <img src={megan} alt='megan' /> <p>5-Minute Crafts</p>
        </div>

        <div className='side-link'>
          <img src={cameron} alt='cameron' /> <p>Nas Daily</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
