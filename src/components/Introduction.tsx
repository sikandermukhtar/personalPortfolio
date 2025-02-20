

export default function Introduction(){
    return (
        <div
            className="flex flex-col pt-72 bg-[url('/black_inner_cube.jpg')] w-full h-screen bg-cover bg-center bg-no-repeat">
            <div className="flex flex-col items-center justify-between mx-auto w-2/3 backdrop-blur-lg p-2">
                {/* Main heading */}
                <h2
                    className="lg:text-7xl md:text-6xl text-4xl text-center text-white font-spaceGrotesk font-bold leading-relaxed uppercase"
                >
                    Don't be afraid to give up the good to go for the great
                </h2>
                <h3 className="text-white lg:self-end text-xl mt-2 lg:mr-16">~ John D. Rockefeller</h3>
            </div>
        </div>
    )
}