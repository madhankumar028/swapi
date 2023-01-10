import { rest } from "msw";
import {
  peopleFirstPage,
  peopleByName,
  filmsById,
  starshipsById,
} from "./data";

export const apiUrl = process.env.REACT_APP_API_URL;

export const handlers = [
  rest.get(`${apiUrl}/people`, (req, res, ctx) => {
    const query = req.url.searchParams;
    const search = query.get("search");

    return res(ctx.status(200), ctx.json(search ? peopleByName[search] : peopleFirstPage));
  }),
  rest.get(`${apiUrl}/films/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json(filmsById[id]));
  }),
  rest.get(`${apiUrl}/starships/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json(starshipsById[id]));
  }),
];
