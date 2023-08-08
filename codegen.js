// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

console.log(process.env.CODEGEN_AWELL_API_KEY)

module.exports = {
  overwrite: true,
  schema: {
    [process.env.CODEGEN_AWELL_API_URL ??
    'https://api.sandbox.awellhealth.com/orchestration/m2m/graphql']: {
      headers: {
        apiKey: process.env.CODEGEN_AWELL_API_KEY,
      },
    },
  },
  generates: {
    './src/types/generated/types-orchestration.tsx': {
      plugins: [
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        'typescript',
        'typescript-operations',
      ],
      config: {
        withHOC: false,
        withHooks: true,
        withComponent: false,
        reactApolloVersion: 3,
        apolloClientVersion: 3,
      },
    },
    './src/types/generated/fragment-types.ts': {
      plugins: [
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
      ],
    },
  },
}
