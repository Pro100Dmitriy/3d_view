import $ from 'jquery'
import 'slick-carousel'

export const pageScript = () => {

    $('#slick-carousel-big').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: '<button class="slick-next slick-arrow" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33"><g transform="translate(22.034 -40.113) rotate(90)"><path d="M60.027,5.123,55.065.163a.557.557,0,1,0-.789.787l4.568,4.567-4.568,4.567a.557.557,0,0,0,.789.788l4.962-4.96A.562.562,0,0,0,60.027,5.123Z" fill="#fff"/></g><rect width="33" height="33" fill="none"/></svg></button>',
        prevArrow: '<button class="slick-prev slick-arrow" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33"><g transform="translate(22.034 -40.113) rotate(90)"><path d="M60.027,5.123,55.065.163a.557.557,0,1,0-.789.787l4.568,4.567-4.568,4.567a.557.557,0,0,0,.789.788l4.962-4.96A.562.562,0,0,0,60.027,5.123Z" fill="#fff"/></g><rect width="33" height="33" fill="none"/></svg></button>',
        fade: false,
        asNavFor: '#slick-carousel-small'
    })
    
    $('#slick-carousel-small').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '#slick-carousel-big',
        dots: false,
        arrows: false,
        focusOnSelect: true
    })
    
}

