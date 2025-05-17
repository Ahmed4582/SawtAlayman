import React from 'react'
import HeroSec from '../components/Home/HeroSec'
import Services from '../components/Home/Servises'
import LatestAdditions from '../components/Home/LatestAdditions'
import About from '../components/Home/About'

const Home = () => {
    return (
        <>
            <HeroSec />
            <Services />
            <LatestAdditions />
            <About />
        </>
    )
}

export default Home
