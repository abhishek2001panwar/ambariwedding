import React from "react";
import { Sparkles, Flower2, Lightbulb, Tent, CheckCircle2 } from "lucide-react";

export default function Page() {
  const services = [
    "Luxury Stage Design",
    "Floral Installations",
    "Mandap Design",
    "Entrance Décor",
    "Reception Backdrops",
    "Table Styling",
    "Lighting Design",
    "Custom Fabrication",
  ];

  return (
    <main className="bg-[#F8F6F3] text-neutral-900">

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 py-28">

        <span className="text-sm uppercase tracking-[0.3em] text-[#B88A44]">
          Ambari Weddings
        </span>

        <h1 className="mt-6 text-6xl font-serif max-w-4xl leading-tight">
          Wedding Decor <br /> Production
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600">
          Every celebration deserves a setting that feels unforgettable.
          At Ambari Weddings, we transform ideas into immersive wedding
          experiences through bespoke décor, premium craftsmanship, and
          flawless execution.
        </p>

      </section>

      {/* About */}

      <section className="bg-white py-24">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 px-6">

          <div>
            <h2 className="text-4xl font-serif">
              Crafted With Passion
            </h2>

            <p className="mt-8 text-neutral-600 leading-8">
              With years of expertise in wedding décor production, we design
              and manufacture every element with precision. From elegant floral
              installations to grand stage setups, our team creates spaces that
              reflect your story while ensuring every detail is beautifully
              executed.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="rounded-3xl bg-[#FAF6EF] p-8">
              <Flower2 className="w-10 h-10 text-[#C18B52]" />
              <h3 className="mt-6 text-xl font-semibold">
                Bespoke Floral Design
              </h3>
            </div>

            <div className="rounded-3xl bg-[#FAF6EF] p-8">
              <Sparkles className="w-10 h-10 text-[#C18B52]" />
              <h3 className="mt-6 text-xl font-semibold">
                Premium Styling
              </h3>
            </div>

            <div className="rounded-3xl bg-[#FAF6EF] p-8">
              <Tent className="w-10 h-10 text-[#C18B52]" />
              <h3 className="mt-6 text-xl font-semibold">
                Custom Fabrication
              </h3>
            </div>

            <div className="rounded-3xl bg-[#FAF6EF] p-8">
              <Lightbulb className="w-10 h-10 text-[#C18B52]" />
              <h3 className="mt-6 text-xl font-semibold">
                Creative Concepts
              </h3>
            </div>

          </div>

        </div>

      </section>

      {/* Services */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-center text-4xl font-serif">
            What We Create
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

            {services.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white p-8 border hover:shadow-lg transition"
              >
                <CheckCircle2 className="text-[#C18B52]" />

                <p className="mt-5 font-medium">
                  {item}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Process */}

      <section className="bg-white py-24">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-serif text-center">
            Our Production Process
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mt-16">

            {[
              {
                title: "Concept",
                text: "Understanding your vision and event style.",
              },
              {
                title: "Design",
                text: "Creating mood boards and detailed décor layouts.",
              },
              {
                title: "Production",
                text: "Manufacturing every décor element with precision.",
              },
              {
                title: "Execution",
                text: "On-site installation and flawless finishing.",
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border bg-[#FAFAFA] p-8"
              >
                <div className="text-5xl font-serif text-[#C18B52]">
                  0{index + 1}
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 text-neutral-600">
                  {step.text}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-28">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-5xl font-serif">
            Let's Create Something Beautiful
          </h2>

          <p className="mt-8 text-lg text-neutral-600 leading-8">
            From intimate ceremonies to grand destination weddings,
            Ambari Weddings brings together creativity, craftsmanship,
            and seamless execution to create décor that leaves a lasting
            impression.
          </p>

          <button className="mt-10 rounded-full bg-black text-white px-8 py-4">
            Start Your Wedding Journey
          </button>

        </div>

      </section>

    </main>
  );
}