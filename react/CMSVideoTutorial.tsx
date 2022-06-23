import React, { FC /* , useEffect */ } from 'react'
import { useQuery } from 'react-apollo'
import { Layout, PageBlock, PageHeader, Spinner } from 'vtex.styleguide'
// import { useRuntime } from 'vtex.render-runtime'

import APP_CONFIG_QUERY from './graphql/app-config.gql'

const CMSVideoTutorial: FC = () => {
  const { loading, error, data } = useQuery(APP_CONFIG_QUERY)

  const youtubeVideoId = 'gzeY3CaS-R8'
  // generate a jsx to render the video
  const youtubeVideo = (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${youtubeVideoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  )

  return (
    <Layout fullWidth pageHeader={<PageHeader title="Tutoriais" />}>
      <PageBlock>
        {loading && <Spinner />}
        <p>{youtubeVideo}</p>
        {error && `Erro: ${error}`}
        {data && (
          <textarea style={{ width: '100%', height: 500 }}>
            {JSON.stringify(data)}
          </textarea>
        )}
      </PageBlock>
    </Layout>
  )
}

export default CMSVideoTutorial
