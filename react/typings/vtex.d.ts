declare module 'vtex.styleguide'
declare module 'vtex.render-runtime'
declare module '*.gql' {
  import { DocumentNode } from 'graphql'

  const Schema: DocumentNode

  export default Schema
}
