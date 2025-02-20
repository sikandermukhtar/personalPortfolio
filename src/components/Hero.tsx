import Image from "next/image";
import JsonEditor from "@/components/jsonEditor";

export default function HeroSection(){
    return(
        <div
            className="flex flex-col pt-32 items-center bg-[url('/black_inner_cube.jpg')] w-full h-screen bg-cover bg-center bg-no-repeat">
            <div className="flex items-center justify-between w-2/3 p-2">
                <div className="rounded-3xl border-gray-500 shadow-2xl shadow-gray-500 border overflow-hidden">
                    <Image
                        src={"/profilePicture.jpeg"} alt="Profile Picture"
                        className="transition-transform duration-300 ease-in-out hover:scale-105"
                        width={420}
                        height={400}
                    />
                </div>
                <div>
                    <JsonEditor />
                </div>
            </div>
            <div className="mt-56">
                <h3 className="lg:text-5xl md:text-4xl text-3xl font-bold font-spaceGrotesk text-white ">one algorithm at a time.</h3>
            </div>
        </div>
    )
}