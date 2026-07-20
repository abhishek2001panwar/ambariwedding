import {
  Calendar,
  CheckCircle2,
  Heart,
  MapPin,
  Camera,
  Sparkles,
  Music,
  Users,
  ClipboardList,
  ShieldCheck,
  AlertCircle,
  FileText,
  ArrowRight,
} from "lucide-react";

export default function Page() {
  const planning = [
    "Budget Planning",
    "Venue Selection & Booking",
    "Event Scheduling",
    "Vendor Selection & Coordination",
    "Guest Logistics & Accommodation",
    "Décor Mood Board & Design Planning",
    "Bride & Groom Styling Suggestions",
    "RSVP Management",
    "Wedding Collaterals (Logo, Invitations, Stationery, Return Gifts & more)",
  ];

  const management = [
    "Vendor Coordination & Supervision",
    "Guest Hospitality & Assistance",
    "Timeline & Event Flow Management",
    "Venue Setup Inspection",
    "Bride & Groom Coordination",
    "Family Assistance",
    "Stage & Ceremony Flow",
    "Guest Experience",
    "On-site Troubleshooting & Emergency Handling",
    "Event Wrap-up & Pack-up",
  ];

  const services = [
    {
      title: "Wedding Planning & Management",
      icon: Calendar,
      blurb:
        "A seamless, end-to-end planning experience that keeps every detail beautifully organized.",
      bullets: [
        "Budget Planning",
        "Venue Selection & Booking",
        "Vendor Selection & Coordination",
        "Guest Logistics & Accommodation",
        "Décor Mood Board & Design Planning",
        "RSVP Management",
      ],
    },
    {
      title: "Wedding Production & Décor",
      icon: Sparkles,
      blurb:
        "Designing, manufacturing, sourcing, and executing bespoke wedding décor with precision and care.",
      bullets: [
        "Bespoke Wedding Décor",
        "Décor Production & Execution",
        "Venue Setup Inspection",
        "Stage & Ceremony Flow",
        "Ritual Flowers & Garlands",
        "Wedding Collaterals",
      ],
    },
  ];

  const customization = [
    {
      title: "Venue & Décor",
      items: [
        "Venue Selection & Booking",
        "Décor Mood Board & Design",
        "Décor Production & Execution",
      ],
    },
    {
      title: "Photography & Hospitality",
      items: ["Photography & Films", "Catering", "Cake"],
    },
    {
      title: "Bridal & Groom Services",
      items: ["Makeup Artist", "Mehendi Artist", "Choreographer"],
    },
    {
      title: "Entertainment",
      items: [
        "DJ",
        "VJ",
        "Emcee / Host",
        "Live Band & Entertainment Artists",
        "Fire Show / Fireworks",
        "Special Entries",
      ],
    },
    {
      title: "Guest Management",
      items: [
        "Guest Logistics & Transportation",
        "Guest Accommodation",
        "RSVP & Guest List Management",
      ],
    },
    {
      title: "Wedding Essentials",
      items: [
        "Wedding Stationery Design & Procurement",
        "Food & Experience Stalls",
        "Ritual Items",
        "Garlands & Ritual Flowers",
        "Return Gifts",
      ],
    },
  ];

  const notIncludedSections = [
    {
      title: "Vendor & Event Costs",
      items: [
        "Venue booking charges",
        "Vendor fees and service charges",
        "Décor production costs",
        "Catering charges",
        "Accommodation & transportation expenses",
        "Artist performance fees",
        "Government taxes and statutory charges",
      ],
    },
    {
      title: "Purchases & Personal Expenses",
      items: [
        "Wedding outfits, jewellery & accessories",
        "Personal shopping",
        "Makeup products purchased for personal use",
        "Ritual items, gifts & giveaways (unless included in the agreed scope)",
      ],
    },
    {
      title: "Third-Party & Miscellaneous",
      items: [
        "Vendor advances and balance payments",
        "Government permissions, licenses & permits",
        "Damage, loss or penalties caused by guests or third-party vendors",
        "Services or requirements added after the agreed scope of work",
      ],
    },
  ];

  const terms = [
    "This document provides an overview of our Wedding Planning & Management services. The final scope of work will be as mutually agreed upon and mentioned in the service agreement.",
    "The planning and management fee covers professional planning, coordination, and on-ground management services only. All third-party vendor charges, venue costs, accommodation, travel, taxes, and other event-related expenses are payable by the client unless specifically included in the agreed scope.",
    "Ambari Weddings acts as the planning and coordination partner between the client and third-party vendors. The quality, execution, and delivery of individual vendor services remain the responsibility of the respective vendors.",
    "Any additional services or changes requested after the scope has been finalized may be subject to feasibility, vendor availability, revised timelines, and additional charges.",
    "Timely approvals, payments, and information from the client are essential for smooth planning and execution. Delays may impact timelines and deliverables.",
    "Ambari Weddings will make every reasonable effort to ensure a seamless experience but shall not be held responsible for delays or disruptions caused by circumstances beyond our reasonable control, including force majeure events.",
    "All quotations, budgets, and vendor pricing are subject to change until confirmed through booking and payment.",
    "Any intellectual property created by Ambari Weddings, including décor concepts, designs, mood boards, and planning documents, shall remain the property of Ambari Weddings unless otherwise agreed in writing.",
    "By proceeding with our services, the client acknowledges and agrees to the scope, responsibilities, and terms outlined in the final service agreement.",
    "For detailed commercial terms, payment schedules, cancellation policies, and contractual obligations, please refer to the Service Agreement shared at the time of booking.",
  ];

  return (
    <main className="bg-[#faf7f4] text-neutral-900">
      <section className="relative overflow-hidden pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7efe8] via-white to-[#faf7f4]" />

        <div className="relative mx-auto font-light max-w-7xl px-6 sm:px-8 lg:px-12">
          <span className="inline-block rounded-full bg-[#d8b37b]/20 px-4 py-2 text-sm font-light text-[#8b6a3f]">
            Wedding Planning & Management
          </span>

          <h1 className="mt-6 font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            Ambari Weddings
          </h1>

          <p className="mt-8 max-w-3xl text-base md:text-lg leading-8 text-neutral-600 font-light">
            Ambari Weddings began over <strong>7 years ago</strong> as a wedding
            production house, specializing in designing, manufacturing,
            sourcing, and executing bespoke wedding décor. Over the years, we
            have brought countless wedding visions to life with creativity,
            precision, and attention to detail.
          </p>

          <p className="mt-6 max-w-3xl text-base md:text-lg leading-8 text-neutral-600 font-light">
            Building on this foundation, we expanded into{" "}
            <strong> Wedding Planning & Management 1.5 years ago, </strong>{" "}
            offering couples a seamless, end-to-end planning experience. Today,
            we combine thoughtful planning with flawless execution to create
            celebrations that are beautifully organized and truly memorable.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-8 lg:px-12 py-24 lg:grid-cols-2">
        <div>
          <h1 className="mb-8 text-3xl md:text-4xl">About Ambari Weddings</h1>

          <p className="text-lg leading-8 text-neutral-600 font-light">
            We believe a wedding should be celebrated, not managed by the
            family. Our purpose is to take care of every detail with
            professionalism, transparency, and care, so you can be fully present
            for the moments that matter most.
          </p>

          <p className="mt-6 text-lg leading-8 text-neutral-600 font-light">
            We look forward to creating an experience that is seamless,
            stress-free, and uniquely yours.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-10 shadow-sm">
          <Heart className="h-10 w-10 text-[#c18b52]" />

          <h1 className="mt-6 text-2xl">A Welcome from Our Founder</h1>

          <p className="mt-6 text-lg leading-8 text-neutral-600 font-light">
            Thank you for considering Ambari Weddings to be a part of your
            special journey. We believe a wedding should be celebrated, not
            managed by the family. Our role is to handle every detail with
            professionalism, transparency, and care so you can focus on what
            matters most.
          </p>
        </div>
      </section>

      <section className="bg-white py-5">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <h1 className="text-center text-3xl md:text-4xl">Our Services</h1>

          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="rounded-3xl border border-[#ece3d8] bg-[#fcfaf7] p-8 shadow-sm"
                >
                  <Icon className="h-10 w-10 text-[#c18b52]" />
                  <h1 className="mt-5 text-2xl">{service.title}</h1>
                  <p className="mt-4 font-light text-lg leading-8 text-neutral-600">
                    {service.blurb}
                  </p>
                  {/* <div className="mt-6 space-y-3">
                    {service.bullets.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div> */}
                </div>
              );
            })}
          </div>

          <div className="mt-16 rounded-3xl bg-[#f9f1e8] p-10">
            <h1 className="text-2xl ">Our In-House Brands</h1>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[#e8dfd6] bg-white p-6">
                <div className="flex items-center gap-3">
                  <Camera className="h-6 w-6 text-[#c18b52]" />
                  <h1 className="text-xl">House of Bliss</h1>
                </div>
                <p className="mt-3 text-neutral-600 font-light">
                  Photography & Films
                </p>
              </div>
              <div className="rounded-2xl border border-[#e8dfd6] bg-white p-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-[#c18b52]" />
                  <h1 className="text-xl">SSSS Catering</h1>
                </div>
                <p className="mt-3 text-neutral-600 font-light">
                  Catering & Hospitality
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <h1 className="text-center text-3xl md:text-4xl">
            What Can You Expect from Wedding Planning & Management?
          </h1>
          <p className="mx-auto mt-6 max-w-3xl font-light text-center text-base md:text-lg leading-8 text-neutral-600">
            Every wedding is unique, and so is our approach. We begin by
            understanding your vision, traditions, preferences, budget, and
            priorities to create a celebration that truly reflects you.
          </p>

          <div className="mt-16 grid gap-12 grid-cols-1 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-10 shadow-lg">
              <div className="mb-6">
                <h1 className="text-3xl">Phase 1: Wedding Planning</h1>
                <p className="mt-3 max-w-xl text-base leading-7 text-neutral-600 font-light">
                  We lay the foundation for a well-organized celebration by
                  taking care of every detail before the wedding day.
                </p>
              </div>
              <div className="space-y-4">
                {planning.map((item) => (
                  <div className="flex gap-3" key={item}>
                    <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />
                    <span className="font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-10 shadow-lg">
              <div className="mb-6">
                <h1 className="text-3xl">Phase 2: Wedding Management</h1>
                <p className="mt-3 max-w-xl text-base leading-7 text-neutral-600 font-light">
                  On your wedding days, our team ensures every detail is
                  executed seamlessly so you and your family can simply enjoy
                  the celebration.
                </p>
              </div>
              <div className="space-y-4">
                {management.map((item) => (
                  <div className="flex gap-3" key={item}>
                    <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />
                    <span className="font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="rounded-3xl border border-[#ece3d8] p-10 shadow-sm">
            <h1 className="text-3xl md:text-4xl">
              Customize Your Wedding Planning Experience
            </h1>
            <p className="mt-4 max-w-3xl text-base md:text-lg leading-8 text-neutral-600 font-light">
              Every wedding is unique. Select the services you would like Ambari
              Weddings to plan, coordinate, and manage for your celebration.
            </p>

            <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {customization.map((group) => (
                <div key={group.title} className="rounded-2xl bg-[#fcfaf7] p-6">
                  <h1 className="text-xl ">{group.title}</h1>
                  <div className="mt-5 space-y-3">
                    {group.items.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-5 w-5 text-[#c18b52]" />
                        <span className="text-neutral-700 font-light">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-12">
          <div className="rounded-3xl bg-[#fff6f4] p-5 md:p-12">
            <div className="flex items-center gap-4">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <h1 className=" text-3xl">What&apos;s Not Included</h1>
            </div>
            <p className="mt-4 text-lg leading-8 text-neutral-600 font-light">
              To ensure complete transparency, the following items are not
              included in our Wedding Planning & Management fee unless
              specifically agreed upon.
            </p>
            <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {notIncludedSections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-2xl border border-[#e8dfd6] bg-white p-6 shadow-sm"
                >
                  <h1 className="text-xl  text-neutral-900">{section.title}</h1>
                  <div className="mt-5 space-y-3">
                    {section.items.map((item) => (
                      <div key={item} className="flex items-start gap-3 ">
                        <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-red-500 " />
                        <span className="text-neutral-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-lg leading-8 text-neutral-600 font-light">
              Should you require assistance with any additional service,
              we&apos;d be happy to arrange and coordinate it as part of your
              wedding planning journey.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="rounded-3xl border border-[#ece3d8] p-12">
            <div className="flex items-center gap-4">
              <ShieldCheck className="h-8 w-8 text-[#c18b52]" />
              <h1 className=" text-3xl">
                Emergency Planning & Last-Minute Changes
              </h1>
            </div>
            <h2 className="mt-5 text-md">Our Approach to the Unexpected</h2>

            <p className="mt-2 text-lg font-light leading-8 text-neutral-600">
              No matter how well a wedding is planned, unexpected situations and
              last-minute changes can sometimes arise. At Ambari Weddings, our
              focus is on staying prepared, responding quickly, and ensuring
              your celebrations continue as smoothly as possible.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl bg-[#fcfaf7] p-6">
                <h1 className="text-xl ">How We Handle It</h1>
                <div className="mt-4 space-y-3 text-neutral-700">
                  <div className="flex items-start gap-3 font-light">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                    <span>
                      Continuous coordination with all vendors and venue teams.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 font-light">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                    <span>
                      Dedicated on-ground team to monitor timelines and event
                      flow.{" "}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 font-light">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                    <span>
                      Immediate response to last-minute changes and guest
                      requests.{" "}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 font-light">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                    <span>
                      Quick decision-making in consultation with the client or
                      designated family representative.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 font-light">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                    <span>
                      Practical solutions to minimize disruptions and maintain
                      the guest experience.
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-[#fcfaf7] p-6">
                <h1 className="text-xl">Last-Minute Requests</h1>
                <p className="mt-4 text-neutral-700 mb-4 font-light">
                  Whenever possible, our team will be happy to accommodate
                  additional requests during the event. Please note that such
                  requests are subject to feasibility, vendor availability, time
                  constraints, and any associated costs.
                </p>
                <h1 className="text-xl  ">Our Commitment</h1>
                <p className="mt-4 text-neutral-700 font-light">
                  Our goal is not just to plan your wedding, but to ensure you
                  feel supported throughout the celebration. While every
                  situation may not be within anyone&apos;s control, you can
                  count on our team to remain calm, proactive, and
                  solution-oriented, so you can focus on creating memories with
                  your loved ones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="rounded-3xl border border-[#ece3d8] p-12">
            <div className="mb-3 flex items-center gap-4">
              <FileText className="h-7 w-7 text-[#c18b52]" />
              <h1 className=" text-3xl">Terms & Conditions</h1>
            </div>

            <p className="text-neutral-800 mb-5 font-light ">
              To ensure a smooth planning experience, we request all clients to
              kindly review the following:
            </p>
            <div className="space-y-5">
              {terms.map((term) => (
                <div className="flex items-start gap-3" key={term}>
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                  <p className="font-light text-neutral-700">{term}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 text-center px-5">
        <h1 className="mt-8  text-5xl">Thank You</h1>
        <p className="mx-auto font-light mt-8 max-w-3xl text-lg leading-8 text-neutral-600">
          Thank you for considering Ambari Weddings to be a part of one of
          life&apos;s most cherished celebrations. We understand that a wedding
          is more than an event-it&apos;s a collection of moments, emotions,
          traditions, and memories that deserve to be experienced without worry.
        </p>
        <p className="mx-auto font-light mt-8 max-w-3xl text-lg leading-8 text-neutral-600">
          Our commitment is to bring together thoughtful planning, creative
          excellence, and flawless execution, so you and your loved ones can
          focus on what truly matters-celebrating every moment.
        </p>
        <h1 className="mt-10 text-xl">With warm regards,</h1>
        <p className="mt-2 text-xl font-light">Team Ambari Weddings</p>
      </section>
    </main>
  );
}
