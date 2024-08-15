import Navbar from "@/components/navbar";
import SearchNav from "@/components/SearchPage/search-nav";
import React from 'react';
import Image from 'next/image';

const AboutPage: React.FC = () => {
  return (
    <div>
      <Navbar currentPage={"Home"} />
      <SearchNav currentPage={"Home"} />
      <div className="min-h-screen bg-white p-4 md:p-10">
        <header className="text-center mb-10">
          <h1 className="text-2xl font-bold text-orange-500">The eXpats - The King of Group Travel</h1>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-16">
          {/* Image Section */}
          <div className="relative col-span-1 md:col-span-1">
            <Image src="/Images/home/tag.png" alt="ijele concept" width={700} height={500} />
          </div>
          {/* Content Section */}
          <div className="col-span-1 md:col-span-1 border-l-2 border-dashed border-gray-300 pl-4 md:pl-8">
            <h2 className="text-xl font-bold text-teal-600 mb-2">ORIGIN</h2>
            <p className="text-lg font-semibold text-green-700 mb-4">
              The Igbo ethnic group of South Eastern Nigeria
            </p>
            <p className="text-gray-700">
              <strong>ịje</strong> means go, move, travel, journey.
            </p>
            <p className="text-gray-700 mt-2">
              A masquerade considered the strongest and most powerful among the masquerades. It belongs to the highest and most secret cult of the land. It is believed to be the king of all masquerades when they all display.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center mb-16">
          <div className="text-center">
            <h3 className="text-orange-500">Travel Users</h3>
            <div className="w-12 h-12 bg-orange-500 mx-auto mt-2 rounded-full"></div>
          </div>
          <div className="text-center">
            <h3 className="text-teal-600">App Users</h3>
            <div className="w-12 h-12 bg-teal-600 mx-auto mt-2 rounded-full"></div>
          </div>
          <div className="text-center">
            <h3 className="text-yellow-500">Modern Travelers</h3>
            <div className="w-12 h-12 bg-yellow-500 mx-auto mt-2 rounded-full"></div>
          </div>
          <div className="relative">
            <Image src="/Images/home/plane.png" alt="ijele concept" width={500} height={300} />
          </div>
        </section>

        <section className="text-center mb-16">
          <p className="text-gray-800">
            With a commitment to innovation and collaboration, we aim to deliver an app that will bring peace between families, friends, and co-workers domestically and abroad with a focus on an element yet to be emphasized in the Travel App landscape - payment splitting methods.
          </p>
        </section>

        <footer className="text-center mt-10">
          <Image src="/Images/home/luggage.gif" alt="Travel Suitcase" width={150} height={150} />
          <p className="mt-4 text-orange-500">- The eXpats -</p>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
