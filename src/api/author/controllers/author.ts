import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::author.author",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params;

      const entity = await strapi.db.query("api::author.author").findOne({
        where: { id },
        populate: ["avatar"],
      });

      if (!entity) {
        return ctx.notFound("Article not found");
      }

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
