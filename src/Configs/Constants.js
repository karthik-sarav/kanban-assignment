export const headerConfig = {
    risk: [
        {
            headerTitle: "high",
            pinned: false
        },
        {
            headerTitle: "medium",
            pinned: false
        },
        {
            headerTitle: "low",
            pinned: false
        },
        {
            headerTitle: "unassigned",
            pinned: false
        }
    ],
    developer: [
        {
            headerTitle: "unassigned",
            pinned: false,
            displayColor: "#757575",
        },
        {
            headerTitle: "andy",
            pinned: false,
            email: "andy@gmail.com",
            displayColor: "#C5CAE9",
        },
        {
            headerTitle: "candy",
            pinned: false,
            email: "candy@gmail.com",
            displayColor: "#757575",
        },
        {
            headerTitle: "karthik",
            pinned: false,
            email: "karthik.s@gmail.com",
            displayColor: "#C5CAE9",
        },
        {
            headerTitle: "patrick",
            pinned: false,
            email: "patrick@gmail.com",
            displayColor: "#757575",
        },
        {
            headerTitle: "mike",
            pinned: false,
            email: "kmike@gmail.com",
            displayColor: "#757575",
        },
    ],
    status: [
        {
            headerTitle: "Open",
            pinned: false
        },
        {
            headerTitle: "Progress",
            pinned: false
        },
        {
            headerTitle: "Testing",
            pinned: false
        },
        {
            headerTitle: "Done",
            pinned: false
        },
        {
            headerTitle: "Cancelled",
            pinned: false
        },
    ]
}

export const groupByItems = {
    risk: "risk",
    develop: "developer",
    status: "status"
}

export const customTheme = {
    primary: "#397ff1",
    secondary: "#2196f3",
    warning: "#f7ad02",
    error: "#f50057",
    greenPrimary: "#4caf50",
    greenLight: "#388E3C",
    status: {
        Open: "#7C4DFF",
        Progress: "#03A9F4",
        Testing: "#FBC02D",
        Done: "#4CAF50",
        Cancelled: "#F44336"
    },
    risk: {
        high: "#F44336",
        medium: "#FBC02D",
        low: "#03A9F4",
        unassigned: "#7C4DFF"
    }
}