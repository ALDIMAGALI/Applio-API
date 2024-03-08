import { Hono } from "hono";
import { errorHandler } from "../utils/error/errorHandler";
import { findByName } from "../services/modelsService";

const max_page_size = 20;
const models = new Hono();

models.get("/", async (c) => {
  try {
    const title = c.req.header("title");
    const page = Number(c.req.header("page")) || 1;
    let pageSize = Number(c.req.header("perPage")) || 20;

    if (pageSize > max_page_size) {
      return c.text(
        `Page size cannot exceed, the max page size is ${max_page_size}.`,
        400
      );
    }

    if (title) {
      const data = await findByName(title);
      return c.json(data);
    }
  } catch (error) {
    models.onError(errorHandler);
  }
});

export default models;
