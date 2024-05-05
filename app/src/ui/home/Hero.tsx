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
    <div style={heroImg} className='text-main h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] flex justify-center items-center'>
      <h1 className=' md:w-1/3 text-6xl text-center text-white font-bold drop-shadow-xl select-none'>Baza posiłków z którą ugotujesz codzienny obiad</h1>
    </div>
  )
}