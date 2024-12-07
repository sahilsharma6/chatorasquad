export default function GMap() {
    return (
        <div className="w-full max-w-screen-lg mx-auto my-auto mb-4">
            <div className="relative pb-[56.25%] w-full h-0">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Noida+(Chatora%20Squad)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    title="Google Map"
                >
                    <a href="https://www.gps.ie/">gps trackers</a>
                </iframe>
            </div>
        </div>
    );
}
