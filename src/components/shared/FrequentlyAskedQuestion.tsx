export default function(){
    return(
        <div >
            <section className="max-w-4xl mx-auto mt-10  px-4">
  <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

  <details className="collapse bg-base-100 border border-base-300 mb-2" open>
    <summary className="collapse-title font-semibold">How do I book a tour?</summary>
    <div className="collapse-content text-sm">
      You can book a tour by selecting your preferred tour from the list and clicking the "Book Now" button. Follow the instructions to complete your booking.
    </div>
  </details>

  <details className="collapse bg-base-100 border border-base-300 mb-2">
    <summary className="collapse-title font-semibold">Can I change the number of people in my booking?</summary>
    <div className="collapse-content text-sm">
      Yes! After booking, you can update the number of people in your booking from the dashboard or contact the guide for assistance.
    </div>
  </details>

  <details className="collapse bg-base-100 border border-base-300 mb-2">
    <summary className="collapse-title font-semibold">How do I contact my assigned guide?</summary>
    <div className="collapse-content text-sm">
      Your guide's contact information is available in your booking details. You can reach out via phone or email for any questions about your tour.
    </div>
  </details>

  <details className="collapse bg-base-100 border border-base-300 mb-2">
    <summary className="collapse-title font-semibold">What if I want to cancel or reschedule my tour?</summary>
    <div className="collapse-content text-sm">
      You can cancel or reschedule tours from your dashboard, subject to our cancellation policy. Early cancellation may receive a partial refund.
    </div>
  </details>

  <details className="collapse bg-base-100 border border-base-300 mb-2">
    <summary className="collapse-title font-semibold">How do I make a payment for my booking?</summary>
    <div className="collapse-content text-sm">
      Payments can be made directly through the dashboard using the "Pay Now" button for pending bookings. You can use online payment methods provided on the platform.
    </div>
  </details>
</section>

        </div>
    )
}