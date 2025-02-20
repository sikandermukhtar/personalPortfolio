

export default function About(){
    return (
        <div id="about"
             className="flex flex-col pt-2 bg-[url('/black_inner_cube.jpg')] w-full h-screen bg-cover bg-center bg-no-repeat">
            <h3 className="text-4xl mb-32 font-spaceGrotesk font-semibold text-white text-center">Skills</h3>
            <div className="flex flex-col lg:flex-row items-center justify-between mx-auto w-4/6 px-14 py-8 bg-white">
                <div>
                    <img
                        src="/skills.svg"
                        alt="My SVG Icon"
                        style={{width: '500px', height: '500px'}}
                    />
                </div>
                <div>
                    <img
                        src="/description_of_matrix.svg"
                        alt="My SVG Icon"
                        style={{width: '500px', height: '400px'}}
                    />
                </div>
            </div>
        </div>
    )
}