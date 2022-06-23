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
  const [isOpen1, setIsOpen1] = React.useState(false)
  const [isOpen2, setIsOpen2] = React.useState(false)
  const [isOpen3, setIsOpen3] = React.useState(false)
  const [isOpen4, setIsOpen4] = React.useState(false)
  const [isOpen5, setIsOpen5] = React.useState(false)

  const getTutorials = () => {
    if (data) {
      const tutorialsData = JSON.parse(data?.appSettings?.message ?? null)

      console.log(tutorialsData)

      if (tutorialsData) {
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
                isOpen={
                  i === 1
                    ? isOpen1
                    : i === 2
                    ? isOpen2
                    : i === 3
                    ? isOpen3
                    : i === 4
                    ? isOpen4
                    : i === 5
                    ? isOpen5
                    : false
                }
                onClick={() => {
                  if (i === 1) setIsOpen1(!isOpen1)
                  if (i === 2) setIsOpen2(!isOpen2)
                  if (i === 3) setIsOpen3(!isOpen3)
                  if (i === 4) setIsOpen4(!isOpen4)
                  if (i === 5) setIsOpen5(!isOpen5)
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
    <Layout fullWidth pageHeader={<PageHeader title="Tutoriais" />}>
      <PageBlock>
        {loading && <Spinner />}
        {error && `Erro: ${error}`}
        {getTutorials()}
      </PageBlock>
    </Layout>
  )
}

export default CMSVideoTutorial
