import React from "react";
import "./AboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/smartness_hacker";
  };
  return (
    <div className='aboutSection'>
      <div></div>
      <div className='aboutSectionGradient'></div>
      <div className='aboutSectionContainer'>
        <Typography component='h1'>About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src='https://res.cloudinary.com/dqap8osnk/image/upload/v1646894595/avatars/IMG_20200225_220509_553_hsivdl.jpg'
              alt='Founder'
            />
            <Typography>Rushikesh Saraf</Typography>
            <Button onClick={visitInstagram} color='primary'>
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by me. Only with the purpose to make
              development project. Credit: 6PP Yt Channel
            </span>
          </div>
          <div className='aboutSectionContainer2'>
            <Typography component='h2'>Our Brands</Typography>
            <a
              href='https://www.linkedin.com/in/rushikeshsaraf/'
              target='blank'
            >
              <LinkedInIcon className='youtubeSvgIcon' />
            </a>

            <a href='https://instagram.com/smartness_hacker' target='blank'>
              <InstagramIcon className='instagramSvgIcon' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
