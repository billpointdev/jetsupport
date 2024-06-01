function WhyJetsupport() {
    const items = [
        {
            "title": "Trade your favorite cryptocurrencies with ease",
            "description": "Effortlessly trade your favorite cryptocurrencies with our user-friendly platform<br/>and experience seamless transactions like never before with JetSupport.",
        },
        {
            "title": "Hassle-free gift card transactions.",
            "description": "Say goodbye to the hassle of gift card transactions.<br/>We offer a stress-free solution to gift card trading, making the process quick and easy.",
        },
        {
            "title": "Detailed and simplified trading experience",
            "description": "Experience trading like never before with our simplified and detailed platform.<br/>Our user-friendly interface provides a seamless trading experience with ease.",
        },
        {
            "title": "Maximum satisfaction in all your transactions.",
            "description": "Enjoy a worry-free and secure trading experience<br/>with maximum satisfaction guaranteed in all your transactions.",
        }
    ];

    return (
        <div className="py-6">
            <div className="text-center">
                <h3 className="font-bold text-[30px]">
                    Why Choose JetSupport?
                </h3>
                <p className="text-gray-500 text-[10px]">
                    Choose JetSupport for a seamless crypto trading experience with detailed and simplified
                    transactions. We <br/>
                    offer hassle-free gift card trading and a commitment to your maximum satisfaction.
                </p>
                <div className="grid grid-cols-2 gap-3 py-3 mt-8 ">
                    {items.map((item, index) => (
                        <div className={`border shadow-md px-4 py-3 rounded-md ${index === 0 ? "bg-primary text-white" : ""}`} key={index}>
                            <h4>{item.title}</h4>
                            <p className="text-gray-500 text-[11px]" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WhyJetsupport;
