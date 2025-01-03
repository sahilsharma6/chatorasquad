export default function GMap() {
  return (
    <div className="w-full max-w-full  px-16 flex  items-center justify-center flex-col md:flex-row my-8 gap-10">
      {/* Google Map Section */}
      <div className="lg:w-[50%]  w-full">
        <iframe
          className=" w-full h-[400px] rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3561.0419463599!2d82.208286074299!3d26.806792976710405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDQ4JzI0LjUiTiA4MsKwMTInMzkuMSJF!5e0!3m2!1sen!2sin!4v1735887493944!5m2!1sen!2sin" 
        ></iframe>
      </div>

      {/* Address Card Section */}
      <div className="flex flex-col justify-center items-start bg-white shadow-lg p-6 rounded-lg md:w-1/3">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Our Location
        </h2>
        <p className="text-gray-600 mb-2">
          <strong>Address:</strong>
          <br />
          In front of Hindu dham <br /> Janki Mahal trust road
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Contact:</strong>
          <br />
          +91-9235264749
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Email:</strong>
          <br />
          howdn68@gmail.com
        </p>
        <p className="text-gray-600">
          <strong>Working Hours:</strong>
          <br />
          Mon - Fri: 9:00 AM - 6:00 PM
        </p>
      </div>
    </div>
  );
}
