export function template( data ){
    const title = data.name.replace( /(?<other>[\sа-яА-Я0-9a-zA-Z&]+)\[i\](?<title>\w+)\[-i\]/gu, ( ...match ) => {
        let groups = match.pop()
        return `${groups.other} <span>${groups.title}</span>`
    } )
    const price = data.cost
    const sizes = data.sizes.match( /[a-zA-Z]+/gu )
    const description = data.description.match( /[а-яА-Я\s.,:\w-]+/gu ).filter( paragraph => { if( paragraph !== 'br' ) return true } )
    let part1 = description.slice( 0, description.length / 2 )
    let part2 = description.slice( description.length / 2 )
    const imageSrc = data.imageSrc.map( src => src.replace( '\\', '/' ) )


    return `
    <div id="single-PM-menu" class="page-module__menu">
        <div class="page-module__menu__map">
            <nav class="map">
                <ul class="map__list">
                    <li class="map__list__item active"><a href="#" class="medium-14">Превью</a></li>
                    <li class="map__list__item"><a href="#about" class="medium-14">Описание</a></li>
                    <li class="map__list__item"><a href="#" class="medium-14">Галерея</a></li>
                    <li class="map__list__item"><a href="#" class="medium-14">Похожие</a></li>
                </ul>
            </nav>
        </div>
        <button id="close-PM" class="close-button el-close-button-dark">close</button>
    </div>
    <section id="single-PM" class="single-page-module">
        <div class="relative">
            <div class="page-module">
                <!-- <div class="page-module__menu"></div> -->
                <div class="page-module__container">
                    <!-- Container -->
                    <div class="PMC__main-section">
                        <div style="background-image: url('http://localhost:5000/${imageSrc[0]}');" class="PMC__main-section__image"></div>
                        <div class="PMC__main-section__text">
                            <h1 class="h1-style">${ title }</h1>
                            <div class="PMC__main-section__text__details">
                                <p class="semiBold-23 price">$${ price }.00</p>
                                <div class="sizes">
                                    <p class="medium-14 sizes__title">Размеры:</p>
                                    <ul class="sizes__list">
                                        ${ sizes.map( size => `<li class="sizes__list__item"><a href="#" class="medium-14">${ size }</a></li>` ).join('') }
                                    </ul>
                                </div>
                                <div class="buttons">
                                    <button class="el-fill-button-dark add-to-cart">В корзину</button>
                                    <div class="el-quantity">
                                        <button class="el-quantity__minus"><svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33"><rect width="33" height="33" fill="none"/><g transform="translate(11 16)"><g transform="translate(0 0)"><rect width="11.432" height="1.429" rx="0.715" fill="#fff"/></g></g></svg></button>
                                        <input type="number" id="quantity" class="el-quantity__input" step="1" min="1" value="1" name="quantity" title="Количество" size="4" placeholder inputmode="numeric">
                                        <button class="el-quantity__plus"><svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33"><rect width="33" height="33" fill="none"/><g transform="translate(11 11)"><g transform="translate(0)"><rect width="11.43" height="1.43" rx="0.715" transform="translate(0 5)" fill="#fff"/><rect width="11.43" height="1.43" rx="0.715" transform="translate(6.43) rotate(90)" fill="#fff"/></g></g></svg></button>
                                    </div>
                                    <button class="el-wishlist add-to-wishlist"><svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33"><g transform="translate(8.105 8.684)"><path d="M8.323,43.324a23.174,23.174,0,0,1-2.4-2.07C2.355,38.223,0,36.221,0,33.3a4.537,4.537,0,0,1,4.421-4.763c2.815,0,3.722,2.634,3.9,2.634s1.007-2.634,3.9-2.634A4.537,4.537,0,0,1,16.645,33.3c0,2.923-2.355,4.926-5.919,7.957A23.087,23.087,0,0,1,8.323,43.324Zm-3.9-13.815A3.549,3.549,0,0,0,.975,33.3c0,2.473,2.218,4.359,5.576,7.214C7.12,41,8.1,42.029,8.323,42.029s1.2-1.034,1.771-1.518c3.358-2.855,5.576-4.742,5.576-7.214a3.549,3.549,0,0,0-3.446-3.788c-1.774,0-3.024,1.59-3.431,3.056v0l-.939,0h0C7.493,31.271,6.326,29.509,4.421,29.509Z" transform="translate(0 -28.534)" fill="#fff"/></g><rect width="33" height="33" fill="none"/></svg></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="about" class="PMC__adout-section">
                        <div class="container">
                            <div class="PMC__adout-section__content">
                                <div class="PMC__adout-section__content__title">
                                    <h2 class="h2-style">Описание</h2>
                                </div>
                                <div class="PMC__adout-section__content__text">
                                    <div class="small-container">
                                        <div class="row">
                                            <div class="col">
                                                ${ part1.map( paragraph => `<p class="regular-14"><span></span>${ paragraph }</p>` ).join('') }
                                            </div>
                                            <div class="col">
                                                ${ part2.map( paragraph => `<p class="regular-14"><span></span>${ paragraph }</p>` ).join('') }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="PMC__slider-section">
                        <div class="PMC__slider-section__sliders">
                            <div id="slick-carousel-big" class="big-slider">
                                <!-- Big Slider -->

                                ${ imageSrc.map( image => `<div class="big-slider__item" style="background-image: url('http://localhost:5000/${ image }');"></div>` ).join() }

                                <!-- Big Slider -->
                            </div>
                            <div id="slick-carousel-small" class="small-slider">
                                <!-- Small Slider -->

                                ${ imageSrc.map( image => `<div class="small-slider__item" style="background-image: url('http://localhost:5000/${ image }');"></div>` ).join() }
                                
                                <!-- Small Slider -->
                            </div>
                        </div>
                    </div>
                    <!-- Container -->
                </div>
            </div>
        </div>
    </section>
`
}