import React, { FC } from 'react'
import { useQuery } from 'react-apollo'
import {
  Collapsible,
  Layout,
  PageBlock,
  PageHeader,
  Spinner,
} from 'vtex.styleguide'

import APP_CONFIG_QUERY from './graphql/app-config.gql'

const MAX_TUTORIALS = 5

const CMSVideoTutorial: FC = () => {
  const { loading, error, data } = useQuery(APP_CONFIG_QUERY)
  const [isOpen, setIsOpen] = React.useState(
    new Array(MAX_TUTORIALS).fill(false)
  )

  const getTutorials = () => {
    if (data) {
      const tutorialsData = JSON.parse(data?.appSettings?.message ?? {})

      if (Object.keys(tutorialsData).length > 0) {
        const jsxTutorials = []
        for (let i = 1; i < MAX_TUTORIALS + 1; i++) {
          if (
            tutorialsData[`description_${i}`] &&
            tutorialsData[`video_${i}`]
          ) {
            jsxTutorials.push(
              <Collapsible
                key={`tutorial-${i}`}
                header={<h2>{tutorialsData[`description_${i}`]}</h2>}
                isOpen={isOpen[i - 1]}
                onClick={() => {
                  setIsOpen((previousIsOpen) => {
                    const newIsOpen = [...previousIsOpen]
                    newIsOpen[i - 1] = !previousIsOpen[i - 1]
                    return newIsOpen
                  })
                }}
              >
                <iframe
                  width="100%"
                  height="500"
                  src={`https://www.youtube.com/embed/${
                    tutorialsData[`video_${i}`]
                  }`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Collapsible>
            )
          }
        }

        return jsxTutorials
      }
    }

    return null
  }

  return (
    <Layout pageHeader={<PageHeader title="Tutoriais" />}>
      <PageBlock>
        {loading && <Spinner />}
        {error && `Erro: ${error}`}
        {(!loading && getTutorials()) ?? 'Nenhum tutorial encontrado'}
      </PageBlock>
    </Layout>
  )
}

export default CMSVideoTutorial
