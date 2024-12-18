export default function GMap() {
    return (
        <div className="w-full max-w-screen-lg mx-auto flex flex-col md:flex-row my-8 gap-6">
            {/* Google Map Section */}
            <div className="relative pb-[56.25%] w-full md:w-2/3 h-0 md:h-auto">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Noida+(Chatora%20Squad)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    title="Google Map"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Address Card Section */}
            <div className="flex flex-col justify-center items-start bg-white shadow-lg p-6 rounded-lg md:w-1/3">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Location</h2>
                <p className="text-gray-600 mb-2">
                    <strong>Address:</strong>
                    <br />
                    Chatora Squad, Noida<br />
                    Uttar Pradesh, India
                </p>
                <p className="text-gray-600 mb-2">
                    <strong>Contact:</strong>
                    <br />
                    +91 12345 67890
                </p>
                <p className="text-gray-600 mb-2">
                    <strong>Email:</strong>
                    <br />
                    info@chatorasquad.com
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
