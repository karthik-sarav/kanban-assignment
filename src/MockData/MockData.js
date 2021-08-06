import moment from "moment";

export const mockData = [
    {
        id: "KP-001",
        title: "Fix the placeholder",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        risk: "high",
        developer: "karthik",
        storyPoints: 3,
        status: "Progress",
        startDate: moment(new Date()).format('DD/MM/YYYY'),
        endDate: moment(new Date()).format('DD/MM/YYYY'),
        comments: ["Updated on 12/07/2021", "Check this on priority"]
    },
    {
        id: "KP-002",
        title: "Fix the Logo",
        description: "Vel facilisis volutpat est velit. Ultrices vitae auctor eu augue ut lectus arcu. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus",
        risk: "medium",
        developer: "karthik",
        status: "Open",
        storyPoints: 3,
        startDate: moment(new Date()).format('DD/MM/YYYY'),
        endDate: moment(new Date()).format('DD/MM/YYYY'),
        comments: ["comment1", "comment2"]
    },
    {
        id: "KP-003",
        title: "Datepicker issue",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        risk: "high",
        developer: "andy",
        status: "Testing",
        storyPoints: 3,
        startDate: moment(new Date()).format('DD/MM/YYYY'),
        endDate: moment(new Date()).format('DD/MM/YYYY'),
        comments: []
    },
    {
        id: "KP-004",
        title: "Do the error handling",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        risk: "medium",
        developer: "unassigned",
        status: "Done",
        storyPoints: 3,
        startDate: moment(new Date()).format('DD/MM/YYYY'),
        endDate: moment(new Date()).format('DD/MM/YYYY'),
        comments: []
    },
    {
        id: "KP-005",
        title: "Handle API errors",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        risk: "low",
        developer: "unassigned",
        status: "Progress",
        storyPoints: 3,
        startDate: moment(new Date()).format('DD/MM/YYYY'),
        endDate: moment(new Date()).format('DD/MM/YYYY'),
        comments: []
    },
    {
        id: "KP-006",
        title: "Fix count variable",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        risk: "unassigned",
        developer: "unassigned",
        status: "Cancelled",
        storyPoints: 3,
        startDate: moment(new Date()).format('DD/MM/YYYY'),
        endDate: moment(new Date()).format('DD/MM/YYYY'),
        comments: []
    }
]
