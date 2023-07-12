import Carousel from 'react-bootstrap/Carousel';
import './carousel.css'
const MyCarousel = ({props}) => {
    const firstThreeObjects = props.slice(0, 3);

    console.log(firstThreeObjects)
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
                        <Carousel.Caption>
                            <h2><strong>Classicados</strong></h2>
                            <h3 className='MycarouselH3'><strong>{item.title}</strong></h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </section>
    )
}

export default MyCarousel
