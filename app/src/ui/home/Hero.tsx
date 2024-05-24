import hero from '../../../images/hero.jpg'

const heroImg = {
  backgroundImage: `url(${hero})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100%"
}

export default function Hero() {
  return (
    <div style={heroImg} className='text-main h-screen flex flex-col justify-center items-center'>
      <h1 className='text-6xl text-center text-white font-bold drop-shadow-xl select-none'>Codzienny obiad</h1>
      <h1 className='text-4xl text-center text-white font-bold drop-shadow-xl select-none'>W kulinarnej bazie</h1>
    </div>
  )
}