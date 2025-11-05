import Carousel from "./Components/Carousel";
import imageOne from "../../assets/Carousel/img1.png";
import imageTwo from "../../assets/Carousel/img2.jpg";
import imageThree from "../../assets/Carousel/img3.jpg";
import icon from "../../../public/Group 1321317063.svg";
import "./style.css";
const carouselSlides = [
  {
    id: 1,
    image: imageOne,
    title: "Speak to your role as both marketer and travel expert",
    buttonText: "View Details",
    onButtonClick: () => console.log("Slide 1 button clicked"),
  },
  {
    id: 2,
    image: imageTwo,
    title: "Discover amazing destinations around the world",
    buttonText: "Explore Now",
    onButtonClick: () => console.log("Slide 2 button clicked"),
  },
  {
    id: 3,
    image: imageThree,
    title: "Create unforgettable memories on your journey",
    buttonText: "Learn More",
    onButtonClick: () => console.log("Slide 3 button clicked"),
  },
];

export default function CarouselPage() {
  console.log(icon);

  const decodedSvg = decodeURIComponent(icon);

  console.log(decodedSvg);
  // Parse the decoded SVG string into an XML document
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(decodedSvg, "image/svg+xml");

  // Extract all path elements
  const paths = xmlDoc.querySelectorAll("path");

  // Log each path's data
  paths.forEach((path) => {
    console.log(path.getAttribute("d"));
  });

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-secondary">Carousel</h1>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8">
          <Carousel
            slides={carouselSlides}
            autoPlayInterval={5000}
            showNavigationButtons={true}
            showDots={true}
            height="500px"
            slideHeight="450px"
            sideSlideHeight="400px"
          />
        </div>
        <img src={imageOne} alt="" />
      </div>
      <div className="h-screen flex items-center justify-center">
        <div className="card">
          {/* <img src={icon} alt="Icon" className="icon-image" /> */}
        </div>
      </div>
    </div>
  );
}
