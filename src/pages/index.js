import React from 'react';
import { IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import ImageCardLanding from "../components/ImageCardLanding"
import Header from '../components/Header';
import Footer from "../components/Footer";
import customStyles from "@/styles/Home.module.css"
import clientPromise from '../../lib/mongodb';
import useWindowPosition from '@/hooks/useWindowPosition';
import { Button } from '@mui/material';

const places = [
  {
    title: 'Transform Your Body Today',
    description:
      "Our gym offers a variety of exercises that are designed to help you achieve your fitness goals. From weight lifting to cardio, our GIF's and videos will guide you through each step of your fitness journey",
    imageUrl: `/boy_landing.jpg`,
    time: 1500,
  },
  {
    title: 'Unlock Your Potential',
    description:
      "Whether you're a beginner or an experienced fitness enthusiast, our gym app has something for everyone. Our state-of-the-art GIF's and videos will help you reach new heights and unleash your full potential",
    imageUrl: `/girl_landing.jpg`,
    time: 1500,
  },
];

export default function Landing({ isConnected, users }) {
  const checkedcard = useWindowPosition('header');
  return (
    <div className={customStyles.landing_root}>
      <div className={customStyles.landing_container2}>
        <div className={customStyles.header_root}>
          <Header />
          <div className={customStyles.landing_container}>
            <h1 className={customStyles.landing_title}>
              Welcome to <br />
              MVM_<span className={customStyles.landing_colorText}>FITNESS</span>
            </h1>
            <Scroll to="place-to-visit" smooth={true}>
              <IconButton>
                <ExpandMoreIcon className={customStyles.landing_goDown} />
              </IconButton>
            </Scroll>
          </div>
        </div>
        <video className={customStyles.landing_video} autoPlay loop muted>
          <source src="videoplayback.webm" type='video/mp4' />
          Your browser does not support the video tag. I suggest you upgrade your browser.
        </video>
      </div>
      {/* Hero Content 2 */}
      <div className={customStyles.hero_content2}>
        <div className={customStyles.hero_content2_left}></div>
        <div className={customStyles.hero_content2_right}>
          <div className={customStyles.hero_content2_right_text}>
            <h1>Your Body is a work of art in the gym</h1>
            <p>we believe that every day is an opportunity to get stronger. Whether you're training for a competition or just looking to improve your overall health and fitness, we have the resources and expertise to help you succeed.</p>
            <Button href='/register' color="inherit" variant='contained' style={{ marginTop: 20 }}>Sign Up</Button>
          </div>
        </div>
        <img src="/landing_hero2.jpg" className={customStyles.hero_content2_image}></img>
      </div>
      {/* Cards */}
      <div className={customStyles.card_root} id="place-to-visit">
        <ImageCardLanding place={places[1]} checked={checkedcard} />
        <ImageCardLanding place={places[0]} checked={checkedcard} />
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);
    return {
      props: { isConnected: true }
    }
  } catch (err) {
    console.log(err)
    return {
      props: { isConnected: false }
    }
  }
}