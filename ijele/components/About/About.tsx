import React from 'react';
import Image from 'next/image';

const About: React.FC = () => {
    return (
        <div>
            <div className="min-h-screen bg-white p-4 md:p-10">
                <header className="text-center mb-10">
                    <h1 className="text-2xl font-bold text-orange-500">The King of Group Travel</h1>
                </header>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">

                    <Image src="/Images/home/tag.png" alt="ijele concept" width={700} height={500} />
                    <div className="text-center md:text-left order-2 md:order-2">
                        <div className="col-span-1 md:col-span-1 border-l-2 border-dashed border-gray-300 pl-4 md:pl-8">
                            <h1 className="text xl font-bold text-red-600 mb-2">IJELE</h1>
                            <h2 className="text-xl font-bold text-teal-600 mb-2">ORIGIN</h2>
                            <p className="text-lg font-semibold text-green-700 mb-4">
                                The Igbo ethnic group of South Eastern Nigeria
                            </p>
                            <p className="text-gray-700">
                                <strong>ịje</strong> means go, move, travel, journey.
                            </p>
                            <p className="text-gray-700 mt-2">
                             <strong>ịjele</strong> A masquerade considered the strongest and most powerful among the masquerades. It belongs to the highest and most secret cult of the land. It is believed to be the king of all masquerades when they all display.
                            </p>
                        </div>
                    </div>
                </section>

                <h1 className="text-2xl font-bold text-orange-500 text-center mb-8">Meet Your Cabin Crew</h1>

                <section className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-center">
                        <div className="text-center">
                            <h3 className="text-orange-500">Cynthia</h3>
                            <div className="relative w-32 h-32 mx-auto mt-2 rounded-full overflow-hidden">
                                <Image
                                    src="/Images/home/Cynthia.jpg"
                                    alt="Travel Users"
                                    width={128}
                                    height={128}
                                    layout="intrinsic"
                                    objectFit="cover" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-teal-600">Tywayah</h3>
                            <div className="relative w-32 h-32 mx-auto mt-2 rounded-full overflow-hidden">
                                <Image
                                    src="/Images/home/Tywayah.jpg"
                                    alt="Travel Users"
                                    layout="fill"
                                    objectFit="cover" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-yellow-500">Jennifer</h3>
                            <div className="relative w-32 h-32 mx-auto mt-2 rounded-full overflow-hidden">
                                <Image
                                    src="/Images/home/Jennifer.jpg"
                                    alt="Travel Users"
                                    width={128}
                                    height={128}
                                    layout="intrinsic"
                                    objectFit="cover" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-blue-500">Rukiaiah</h3>
                            <div className="relative w-32 h-32 mx-auto mt-2 rounded-full overflow-hidden">
                                <Image
                                    src="/Images/home/Rukaiah.jpg"
                                    alt="Travel Users"
                                    width={128}
                                    height={128}
                                    layout="intrinsic"
                                    objectFit="cover" />
                            </div>
                        </div>
                    </div>
                </section>





                <section className="text-center">
                    <Image src="/Images/home/plane.png" alt="ijele concept" width={500} height={300} className="mx-auto" />
                </section>

                <section className="text-center mb-16">
                    <p className="text-gray-800">
                        With a commitment to innovation and collaboration, we aim to deliver an app that will bring peace between families, friends, and co-workers domestically and abroad with a focus on an element yet to be emphasized in the Travel App landscape - payment splitting methods.
                    </p>
                </section>

                <footer className="flex flex-col items-center mt-10">
                    <Image src="/Images/home/luggage.gif" alt="Travel Suitcase" width={150} height={150} />
                    <p className="mt-4 text-orange-500">- The eXpats -</p>
                </footer>
            </div>
        </div>
    );
};

export default About;