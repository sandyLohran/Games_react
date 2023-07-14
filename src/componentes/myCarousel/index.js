import Carousel from 'react-bootstrap/Carousel';
import './carousel.css'
const MyCarousel = ({ props }) => {
    const firstThreeObjects = props.slice(0, 3);
    return (
        <section>
            <Carousel>
                {firstThreeObjects.map((item, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block MycarouselH3img"
                            src={item.thumbnail}
                            alt={item.title}
                        />
                        <Carousel.Caption className=''>

                            <h3 className='MycarouselH3'><strong></strong></h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </section>
    )
}
export default MyCarousel
