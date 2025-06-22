import { _getTarget } from "gsap/Observer";
import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* <div className="flex flex-col justify-center">
          <p>Terms & Conditions</p>
        </div> */}
        <div className="socials">
          {socialImgs.map((socialImg, index) => (
            
            <div key={index} className="icon">
              <img src={socialImg.imgPath} alt="social icon" onClick={ ()=>window.open(socialImg.followUpLink,'_blank')}/>
            </div>
          ))}
        </div>
        {/* <div className="flex flex-col  justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Sam. All rights reserved.
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
