import { Hono } from "hono";
import { errorHandler } from "../utils/error/errorHandler";
import { getUsersByName } from "../services/usersService";
import { maxPageSize } from "../config";

const users = new Hono();

users.get("/", async (c) => {
  try {
    const username = c.req.header("username");
    const page = Number(c.req.header("page"));
    let pageSize = Number(c.req.header("perPage"));

    if (pageSize > maxPageSize) {
      const message = `Page size cannot exceed, the max page size is ${maxPageSize}.`;
      console.log(message);
      return c.text(message, 400);
    }

    if (username) {
      const data = await getUsersByName(username, page, pageSize);
      return c.json(data);
    }
  } catch (error) {
    users.onError(errorHandler);
  }
});

export default users;
