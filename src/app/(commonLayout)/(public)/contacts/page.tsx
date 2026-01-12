import { MapPin, Phone } from "lucide-react";

export default function Contacts() {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* LEFT FORM */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form className="space-y-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="First Name" placeholder="Yourn First Name" />
              <Input label="Last Name" placeholder="Your Last Name" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Email" placeholder=" example@gmail.com" />
              <Input label="Phone" placeholder="+88018XXXXXXX" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Information Type
              </label>
              <select className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Select one...</option>
                <option>Place Request</option>
                <option>Refund</option>
                <option>Consultaion</option>
                <option>Report</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Submit
            </button>

          </form>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6">
            Have a question for us?
          </h2>

          <p className="text-gray-600 mb-10 leading-relaxed">
            If you want to know anything about our services, feel free to reach out. We are here to help you 24/7 with any questions or concerns you may have.
          </p>

          <div className="flex items-center gap-8 text-sm font-medium">
            <div className="flex items-center gap-2">
              <MapPin /><span>Dhaka,Bangladesh</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone /> <span>+1 (234) 567-8910</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* Reusable Input Component */
function Input({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
