export default function({ id }: { id?: string }){
    return(<>
<section className="bg-gradient-to-r from-orange-400 to-pink-500 py-16">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
    <p className="text-white/90 mb-10">
      Have questions or want to book a tour? Reach out to us and our team will get back to you promptly!
    </p>

    <div className="bg-white rounded-2xl shadow-lg max-w-3xl mx-auto p-8 grid md:grid-cols-2 gap-6">
      {/* Contact Info */}
      <div className="flex flex-col justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Call Us</h3>
          <p className="text-gray-600">+880 1234 567 890</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Us</h3>
          <p className="text-gray-600">support@mytour.com</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Visit Us</h3>
          <p className="text-gray-600">Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Contact Form */}
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <textarea
          placeholder="Your Message"
          rows={4}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        ></textarea>
        <button
          type="submit"
          className="bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
</section>


    </>)
}