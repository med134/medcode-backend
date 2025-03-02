import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::message.message",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params;

      const entity = await strapi.db.query("api::message.message").findOne({
        where: { articleId: id },
        populate: ["imageUser"],
      });

      if (!entity) {
        return ctx.notFound("comment not found");
      }

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
