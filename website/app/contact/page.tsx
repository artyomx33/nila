import { Container } from "@/components/ui/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch",
  description: "Have questions? We'd love to hear from you. Contact us today.",
};

export default function ContactPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="section-wrapper bg-gradient-to-b from-neutral-50 to-white py-12 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-4 md:mb-6">Get in Touch</h1>
            <p className="text-lg text-neutral-600">
              Have questions? We'd love to hear from you. Contact us and we'll respond as soon as possible.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="section-wrapper py-12 md:py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="heading-lg mb-8">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Your message here..."
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>
                <button type="submit" className="button-primary w-full">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="heading-lg mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Address</h3>
                  <p className="text-neutral-600">
                    123 Business Street<br />
                    City, State 12345<br />
                    Country
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Phone</h3>
                  <p className="text-neutral-600">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Email</h3>
                  <p className="text-neutral-600">hello@example.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Hours</h3>
                  <p className="text-neutral-600">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday: 10:00 AM - 3:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Map Placeholder */}
      <section className="section-wrapper py-12 md:py-20 bg-neutral-50">
        <Container>
          <div className="bg-neutral-300 aspect-video rounded-lg flex items-center justify-center">
            <span className="text-neutral-500 text-lg">Map Placeholder - Add your location map here</span>
          </div>
        </Container>
      </section>
    </main>
  );
}
