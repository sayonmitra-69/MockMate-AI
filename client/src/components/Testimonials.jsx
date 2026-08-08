function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <h2 className="text-4xl font-bold text-center mb-16">What Users Say</h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-[#111111] border border-gray-800 p-8 rounded-2xl">
          <p className="text-gray-400">
            MockMate AI helped me prepare for React interviews with confidence.
          </p>

          <h3 className="mt-4 font-semibold">Rahul Sharma</h3>
        </div>

        <div className="bg-[#111111] border border-gray-800 p-8 rounded-2xl">
          <p className="text-gray-400">
            The AI feedback made a huge difference in identifying my weak areas.
          </p>

          <h3 className="mt-4 font-semibold">Priya Verma</h3>
        </div>

        <div className="bg-[#111111] border border-gray-800 p-8 rounded-2xl">
          <p className="text-gray-400">
            Much better than randomly searching interview questions online.
          </p>

          <h3 className="mt-4 font-semibold">Aman Gupta</h3>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
