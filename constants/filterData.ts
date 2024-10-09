import { filterDataType } from "./types";

export const filterData: filterDataType[] = [
  {
    title: "Type",
    set_to_key: "type",
    type: "list",
    options: [
      {
        name: "TV",
        value: "tv",
      },
      {
        name: "Movie",
        value: "movie",
      },
      {
        name: "OVA",
        value: "ova",
      },
      {
        name: "Special",
        value: "special",
      },
      {
        name: "ONA",
        value: "ona",
      },
      {
        name: "Music",
        value: "music",
      },
    ],
  },
  {
    title: "Rating",
    set_to_key: "rating",
    type: "list",
    options: [
      {
        name: "G - All Pages",
        value: "g",
      },
      {
        name: "PG - Children",
        value: "pg",
      },
      {
        name: "PG - Teens 13 or older",
        value: "pg13",
      },
      {
        name: "R - 17+ (Violence And Profanity)",
        value: "r17",
      },
      {
        name: "R+ - Mild Nudity",
        value: "r",
      },
      {
        name: "Rx - Hentai",
        value: "rx",
      },
    ],
  },
  {
    title: "Start Year",
    set_to_key: "startDate",
    type: "range",
    range: {
      start: 1963,
      end: "today",
    },
  },
  {
    title: "End Year",
    set_to_key: "endDate",
    type: "range",
    range: {
      start: 1963,
      end: "today",
    },
  },
  {
    title: "Minimum Score",
    set_to_key: "minScore",
    type: "range",
    range: {
      start: 0,
      end: 10,
    },
  },
  {
    title: "Status",
    set_to_key: "status",
    type: "list",
    options: [
      {
        name: "Airing",
        value: "airing",
      },
      {
        name: "Complete",
        value: "complete",
      },
      {
        name: "Upcoming",
        value: "upcoming",
      },
    ],
  },
  {
    title: "Order By",
    set_to_key: "orderBy",
    type: "list",
    options: [
      {
        name: "Title",
        value: "title",
      },
      // {
      //   name: "Type",
      //   value: "type",
      // },
      {
        name: "Rating",
        value: "rating",
      },
      {
        name: "Start Date",
        value: "start_date",
      },
      {
        name: "End Date",
        value: "end_date",
      },
      {
        name: "Score",
        value: "score",
      },
      {
        name: "Popularity",
        value: "popularity",
      },
    ],
  },
  {
    title: "Sort By",
    set_to_key: "sortBy",
    type: "list",
    options: [
      {
        name: "Ascending",
        value: "asc",
      },
      {
        name: "Descending",
        value: "desc",
      },
    ],
  },
];
