import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
// const poppins = localFont({
//   src: "/fonts/Poppins-ExtraBold.tff",
//   variable: "--font-poppins",
//   weight: "100 900",
// });
export default function Home() {
  return (
   <main className="bg-purple-400">
    <section className="grid grid-cols-2 h-[50vh]">
      <div className="flex flex-col gap-4 items-center justify-center">
        <p className="text-3xl font-bold ">BOOK this Flight Now</p>
        <p className="px-56 text-center">THis is the best deal of ur life no question asked lorem jsigjirn the customer is not always right but it cant be wrong in some cases such that they are alwyas curious and want answsers to qusetion which can be obtained via the internet</p>
        <div className='flex gap-3 justify-start'>
        <Link href="/search"><button className='bg-purple-500 rounded-lg p-3 py-1 font-bold text-white'>Search Now</button></Link>
        <Link href="/shorten"><button className='bg-purple-500 rounded-lg p-3 py-1 font-bold text-white'>Short Now</button></Link>
        </div>
      </div>
      <div className="flex justify-start relative">
       <Image className="mix-blend-darken" alt =" pic " src={'/skybox.jpg'} fill={true}></Image>
      </div>

    </section>
   </main>
  );
} 
