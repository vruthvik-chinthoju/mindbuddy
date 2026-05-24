import "./css/explore.css";

const cards = [
    {
        title: "Journal",
        img: "https://cdn-icons-png.flaticon.com/512/2920/2920244.png",
        tab: "mood",
    },
    {
        title: "Activities",
        img: "https://cdn-icons-png.flaticon.com/512/3534/3534061.png",
        tab: "activities",
    },
    {
        title: "Exercises",
        img: "https://cdn-icons-png.flaticon.com/512/3048/3048398.png",
        tab: "exercise",
    },
    {
        title: "How you feel",
        img: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
        tab: "mood",
    },
    {
        title: "Music",
        img: "https://cdn-icons-png.flaticon.com/512/727/727269.png",
        tab: "music",
    },
    {
        title: "Set Goals",
        img: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
        tab: "goals",
    },
    {
        title: "Sleep",
        img: "https://cdn-icons-png.flaticon.com/512/2933/2933186.png",
        tab: "sleep",
    },
    {
        title: "Travel",
        img: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
        tab: "travel",
    },
    {
        title: "Communities",
        img: "https://cdn-icons-png.flaticon.com/512/921/921347.png",
        tab: "community",
    },
    {
        title: "Movies",
        img: "https://cdn-icons-png.flaticon.com/512/4221/4221484.png",
        tab: "movies",
    },
    {
        title: "Health Tips",
        img: "https://cdn-icons-png.flaticon.com/512/2966/2966483.png",
        tab: "health",
    },
    {
        title: "Training Program",
        img: "https://cdn-icons-png.flaticon.com/512/2331/2331970.png",
        tab: "training",
    },
    {
        title: "Talk With MindBuddy",
        img: "https://cdn-icons-png.flaticon.com/512/4712/4712027.png",
        tab: "chat",
    },
    {
        title: "Check Your Progress",
        img: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png",
        tab: "progress",
    },
];

export default function Explore({ setTab }) {
    return (
        <div className="explore">
            <h1>Explore</h1>

            <div className="card-container">
                {cards.map((card, i) => (
                    <div key={i} className="big-card">
                        <div className="left">
                            <h2>{card.title}</h2>
                            <button onClick={() => setTab(card.tab)}>
                                See More
                            </button>
                        </div>

                        <img src={card.img} alt={card.title} />
                    </div>
                ))}
            </div>
        </div>
    );
}