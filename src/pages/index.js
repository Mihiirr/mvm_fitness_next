import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import ImageCardLanding from "../components/ImageCardLanding"
import Header from '../components/Header';
import Footer from "../components/Footer";
import customStyles from "../styles/Home.module.css"
import clientPromise from '../../lib/mongodb';

const useStyles = makeStyles((theme) => ({
  card_root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));

const places = [
  {
    title: 'Green',
    description:
      "The Maldives are home to some of the world's most ravishing islands, but it's the sea, which truly makes these islands shine. Luminous aquamarine waters with a crystal clarity lap upon these dazzling white shores, which barely peek above the Indian Ocean.",
    imageUrl: `https://source.unsplash.com/uPrxxLSkovY`,
    time: 1500,
  },
  {
    title: 'Bora Bora',
    description:
      'Shaped like a giant sombrero, this lush volcanic island stars in countless South Pacific fantasies. The focal point and best asset of this tropical beauty is its ravishing lagoon in technicolor turquoise. Fish, turtles, sharks, and rays swim in the clear waters.',
    imageUrl: `https://source.unsplash.com/DHsdSeCpjRU`,
    time: 1500,
  },
];

export default function Landing({ isConnected, users }) {
  // const checkedcard = useWindowPosition('header');
  console.log({ users })
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
      {/* Cards */}
      <div className={customStyles.card_root} id="place-to-visit">
        <ImageCardLanding place={places[1]} checked={true} />
        <ImageCardLanding place={places[0]} checked={true} />
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);
    const users = await db.collection("users").find({});
    return {
      props: { isConnected: true, users: JSON.parse(JSON.stringify(users)) }
    }
  } catch (err) {
    console.log(err)
    return {
      props: { isConnected: false }
    }
  }
}