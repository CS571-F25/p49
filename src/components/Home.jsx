const CRAVINGS = {
    cheap: {
        label: "Cheap & Fast",
        tagline: "Quick bites that don't hurt the wallet.",
        spots: [
            { name: "Ian's Pizza", note: "Mac 'n' Cheese pizza legend." },
            { name: "McDonald's", note: "Reliable, cheap, fast classic." },
            { name: "Paul's Pel'meni", note: "Warm dumplings — comfort food cheap." },
        ],
    },
    study: {
        label: "Study Snacks",
        tagline: "Good vibes, Wi-Fi, and snacks to keep you going.",
        spots: [
            { name: "Taiwan Little Eats", note: "Snacks + milk tea = study fuel." },
            { name: "Colectivo Coffee", note: "Big tables + pastries = focus." },
            { name: "Starbucks", note: "A familiar caffeine home base." },
        ],
    },
    lateNight: {
        label: "Late Night",
        tagline: "When Canvas is still open and you're starving.",
        spots: [
            { name: "Toppers", note: "Breadsticks past midnight hit different." },
            { name: "Conrad's", note: "Chill late-night pub bites." },
            { name: "Raising Cane's", note: "Chicken fingers = instant happiness." },
        ],
    },
    treat: {
        label: "Treat Yourself",
        tagline: "Sweet reward after a long day — you deserve it.",
        spots: [
            { name: "Chocolate Shoppe", note: "Ice cream that never misses." },
            { name: "Insomnia Cookies", note: "Warm cookies delivered late." },
            { name: "Candy Cloud", note: "Colorful treats for pure serotonin." },
        ],
    },
};

export default function Home() {
    const [cravingKey, setCravingKey] = useState("cheap");
    const craving = CRAVINGS[cravingKey];

    return (
        <div>
            <section className="hero">
                <div className="hero-pill">Hungry on Campus?</div>
                <h1 className="hero-title">Campus Cravings</h1>
                <p className="hero-subtitle">
                    Discover the best bites around UW-Madison's campus! Food tailored to your
                    current mood.
                </p>

                <div className="craving-controls">
                    <p className="craving-label">What are you in the mood for?</p>
                    <div className="craving-buttons">
                        {Object.entries(CRAVINGS).map(([key, value]) => (
                            <Button
                                key={key}
                                variant={key === cravingKey ? "danger" : "outline-secondary"}
                                size="sm"
                                className="me-2 mb-2"
                                onClick={() => setCravingKey(key)}
                            >
                                {value.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="craving-results">
                <h2 className="craving-heading">{craving.label}</h2>
                <p className="craving-tagline">{craving.tagline}</p>

                <ul className="craving-list">
                    {craving.spots.map((spot) => (
                        <li key={spot.name} className="craving-item">
                            <span className="craving-spot-name">{spot.name}</span>
                            <Badge bg="light" text="dark" className="ms-2">
                                {spot.note}
                            </Badge>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}