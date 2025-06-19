
import CollectionList from '@/components/CollectionList'
import WelcomeMessage from '@/components/WelcomeMessage'
import React, { Suspense } from 'react'

const Home = () => {
  return (
    <div>
      <Suspense fallback={<p>Loading..</p>}>

        <WelcomeMessage></WelcomeMessage>
      </Suspense>
      <Suspense fallback={<p>Loading collection...</p>}>

        <CollectionList></CollectionList>
      </Suspense>
    </div>
  )
}

export default Home
