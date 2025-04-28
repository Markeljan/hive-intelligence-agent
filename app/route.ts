import { ApiReference } from "@scalar/nextjs-api-reference";
import { ApiReferenceConfiguration } from "@scalar/api-reference";
import { openapiSpec } from "@/lib/openapi";

const config: Partial<ApiReferenceConfiguration> = {
  content: openapiSpec,
  metaData: {
    title: "Hive Intelligence Agent API",
    description: "Hive Intelligence Agent API Reference",
  },
  hideClientButton: true,
};

export const GET = ApiReference(config);
