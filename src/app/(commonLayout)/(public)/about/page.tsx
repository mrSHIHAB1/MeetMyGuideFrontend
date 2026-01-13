import guideBg from "../../../../../public/guidebg.png";
import { BowArrow, Lightbulb } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-800">


      <section
        className="relative bg-cover bg-center bg-no-repeat  text-white  px-6"
        style={{
          backgroundImage:
            "url('/about.png')",
        }}
      >
        <div className=" text-white bg-opacity-40 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl opacity-90">
              We connect travelers with expert local guides to create
              unforgettable journeys.
            </p>
          </div>
        </div>
      </section>

      {/* 2️⃣ Who We Are */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <Image
            src={guideBg}
            alt="About travel"
            width={600}
            height={400}
            className="w-full rounded-2xl shadow-lg object-cover"
            priority
          />
          <div>
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2025, our platform was built to promote authentic travel
              experiences by connecting tourists with trusted local guides. We
              believe every journey should be meaningful, safe, and unforgettable.
            </p>
          </div>
        </div>
      </section>

      {/* 3️⃣ Mission & Vision */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 text-center md:text-left">
          <div className="p-8 bg-white rounded-2xl shadow-lg">
            <BowArrow size={48} />
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To make travel safe, local, and meaningful while empowering
              passionate local guides.
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-lg">
            <Lightbulb size={48} />
            <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To become the most trusted local tour platform in South Asia.
            </p>
          </div>
        </div>
      </section>

      {/* 4️⃣ What Makes Us Different */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "https://img.icons8.com/fluency/48/000000/verified-account.png",
                text: "Verified Local Guides",
              },
              {
                icon: "https://img.icons8.com/fluency/48/000000/secured-letter.png",
                text: "Safe & Transparent Booking",
              },
              {
                icon: "https://img.icons8.com/fluency/48/000000/travel.png",
                text: "Authentic Experiences",
              },
              {
                icon: "https://img.icons8.com/fluency/48/000000/customer-support.png",
                text: "24/7 Support",
              },
            ].map((item) => (
              <div
                key={item.text}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <img
                  src={item.icon}
                  className="mx-auto mb-3"
                  alt={item.text}
                />
                <p className="font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ Our Guides */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">About the Developer</h2>

          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <img
              src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Developer"
              className="w-40 h-40 mx-auto object-cover rounded-full shadow-md"
            />

            <h4 className="mt-6 text-xl font-semibold">
              Md. Montasir Rahman Shihab
            </h4>

            <p className="text-indigo-600 font-medium mt-1">
              Full Stack Web Developer
            </p>

            <p className="text-gray-600 mt-4 leading-relaxed">
              I am a passionate full-stack developer focused on building scalable,
              user-friendly web applications. This platform was designed to connect
              travelers with authentic local experiences using modern technologies
              and clean UI/UX principles.
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <a
                href="https://github.com/"
                target="_blank"
                className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 transition"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 transition"
              >
                LinkedIn
              </a>
              <a
                href="mailto:example@email.com"
                className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 transition"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6️⃣ Achievements / Stats */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Our Achievements
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat number="500+" label="Tours Completed" />
          <Stat number="100+" label="Verified Guides" />
          <Stat number="4.9★" label="Average Rating" />
          <Stat number="50+" label="Destinations Explored" />
        </div>
      </section>

      {/* 8️⃣ CTA */}
      <section
        className="py-20 px-6 bg-indigo-600 text-white text-center"
      >
        <h2 className="text-3xl font-bold mb-6">
          Ready for your next adventure?
        </h2>
        <a
          href="/explore"
          className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transition"
        >
          Explore Tours
        </a>
      </section>

    </main>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-4xl font-bold text-indigo-500">{number}</p>
      <p className="text-gray-600 mt-1">{label}</p>
    </div>
  );
}
