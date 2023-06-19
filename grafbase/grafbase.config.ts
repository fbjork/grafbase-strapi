import { g, config, connector } from '@grafbase/sdk'

const strapi = connector.GraphQL({
  url: g.env('STRAPI_API_URL'),
  headers: (headers) => {
    headers.static('Authorization', `Bearer ${g.env('STRAPI_API_KEY')}`)
  }
})

g.datasource(strapi, { namespace: 'Strapi' })

export default config({
  schema: g,
  cache: {
    rules: [
      {
        types: ['StrapiQuery'],
        maxAge: 60,
        staleWhileRevalidate: 60
      }
    ]
  }
})
