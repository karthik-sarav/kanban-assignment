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
        developer: "candy",
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
        developer: "patrick",
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
        developer: "mike",
        status: "Cancelled",
        storyPoints: 3,
        startDate: moment(new Date()).format('DD/MM/YYYY'),
        endDate: moment(new Date()).format('DD/MM/YYYY'),
        comments: []
    },
    {
        id: "KP-007",
        title: "Style badge elements",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        risk: "low",
        developer: "unassigned",
        status: "Open",
        storyPoints: 1,
        startDate: moment(new Date()).format('DD/MM/YYYY'),
        endDate: moment(new Date()).format('DD/MM/YYYY'),
        comments: ["can be done"]
    },
    {
        id: "KP-008",
        title: "Follow grid layout system",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        risk: "medium",
        developer: "andy",
        status: "Progress",
        storyPoints: 3,
        startDate: moment(new Date()).format('DD/MM/YYYY'),
        endDate: moment(new Date()).format('DD/MM/YYYY'),
        comments: []
    },
    {
        id: "KP-009",
        title: "Fix bookmark stylings",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        risk: "low",
        developer: "unassigned",
        status: "Testing",
        storyPoints: 1,
        startDate: moment(new Date()).format('DD/MM/YYYY'),
        endDate: moment(new Date()).format('DD/MM/YYYY'),
        comments: []
    },
    {
        id: "KP-010",
        title: "DnD refactor",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        risk: "high",
        developer: "karthik",
        status: "Progress",
        storyPoints: 5,
        startDate: moment(new Date()).format('DD/MM/YYYY'),
        endDate: moment(new Date()).format('DD/MM/YYYY'),
        comments: []
    }
]
