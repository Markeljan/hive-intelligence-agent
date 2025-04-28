import { DEPLOYMENT_URL } from "vercel-url";

export const openapiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Hive Intelligence API",
    description:
      "Bitte Agent API for executing Web3 and Blockchain search queries using Hive Intelligence.",
    version: "1.0.0",
  },
  servers: [
    {
      url: DEPLOYMENT_URL,
    },
  ],
  "x-mb": {
    "account-id": "markeljan.near",
    assistant: {
      name: "Hive Intelligence Agent",
      description:
        "An assistant that allows users to perform advanced Web3 and Blockchain search queries using Hive Intelligence.",
      instructions: `
This assistant uses Hive Intelligence to:
- Search for on-chain and off-chain blockchain data using natural language
- Retrieve analytics, metrics, and summaries for Web3 protocols, tokens, and addresses

Make sure to include an address in the prompt if you are querying for information about a specific address.
`,
      categories: ["web3", "blockchain", "analytics"],
      chainIds: [1, 8453, 56, 137, 100, 42161, 10, 43114],
      version: "0.0.1",
      image: `${DEPLOYMENT_URL}/logo.png`,
    },
  },
  paths: {
    "/api/tools/search": {
      get: {
        operationId: "hiveSearch",
        summary: "Execute a Web3 or Blockchain search query",
        description:
          "Executes a search query using Hive Search API to retrieve Web3 or Blockchain information.",
        parameters: [
          {
            name: "prompt",
            in: "query",
            description:
              "Natural Language Search Query to execute with Hive Search API.",
            required: true,
            schema: { type: "string" },
          },
          {
            name: "include_data_sources",
            in: "query",
            description:
              "When set to true, the response will include the data sources used to generate the answer.",
            required: false,
            schema: { type: "boolean" },
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    response: {
                      oneOf: [{ type: "string" }, { type: "object" }],
                      description: "The AI-generated response to the query",
                    },
                    isAdditionalDataRequired: {
                      type: "object",
                      nullable: true,
                      description:
                        "If additional data is required to answer the query, this field contains details about what is needed",
                    },
                    data_sources: {
                      type: "array",
                      items: { type: "string" },
                      description:
                        "List of data sources used to generate the response (only included when include_data_sources input parameter is set to true)",
                    },
                  },
                  required: ["response"],
                },
              },
            },
          },
          "400": {
            description: "Invalid request body or parameters",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                  },
                },
              },
            },
          },
          "401": {
            description: "API key is required",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                  },
                },
              },
            },
          },
          "403": {
            description: "Invalid API key",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                  },
                },
              },
            },
          },
          "429": {
            description: "Rate limit reached for today",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
