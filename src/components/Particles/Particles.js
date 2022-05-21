import React from "react";
import particlesConfig from "./ParticlesConfig";
import Particles from "react-tsparticles";
const ParticlesBackground = () => {
    return (
        <Particles params={particlesConfig}>

        </Particles>
    );
}

export default ParticlesBackground;