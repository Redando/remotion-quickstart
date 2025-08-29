import { AbsoluteFill, Still, Img, Video, Composition } from 'remotion'
import { createClient } from 'pexels'
import { Constants } from './Constants.js'

export class QuoteComponent {

  static shuffleArray = arr => arr.sort(() => Math.random() - 0.5)

  static getBackgroundVideo = async (query) => {
  
    // * initialize pexels client
    const client = createClient(Constants.apiKey)
  
    // * define search parameters
    const orientation = 'portrait'
    const page = 1
    const minimumDuration = 30
  
    // * search portrait videos
    const response = await client.videos.search({ query, min_duration: minimumDuration, page, orientation })
  
    // * shuffle order of videos
    this.shuffleArray(response.videos)
    
    // * return first video
    return response.videos[0].video_files.pop().link
  }

  static quoteVideoComposition = ({ quote, query }) => {
  
    return (<Composition
      id={'QuoteVideo'}
      component={this.quoteVideoComponent}
      fps={60} // 60 frames per second
      durationInFrames={60 * 15} // 15 second video
      width={1080}
      height={1920}
      defaultProps={{ quote, query }}
      calculateMetadata={async ({ props }) => {
        // * fetch background image
        const background = await this.getBackgroundVideo(props.query)
        return {
          props: {
            quote,
            background
          }
        }}
      }
    />)
  }

  static quoteVideoComponent = ({ quote, background }) => {
  
    return (<AbsoluteFill style={{ backgroundColor: 'black' }}>
      <Video style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: 'translate(-50%, -50%)'
      }} src={background} />
      {/* Tint */}
      <AbsoluteFill style={{
        margin: 0,
        backgroundColor: 'rgba(0,0,0,.3)'
      }} />
      <QuoteComponent.quote quote={quote} top={450} />
    </AbsoluteFill>)
  }

  static getBackgroundImage = async (query) => {
  
    // * initialize pexels client
    const client = createClient(Constants.apiKey)
  
    // * get square videos on page 1
    const orientation = 'portrait'
    const page = 1
    const response = await client.videos.search({ query, page, orientation })
  
    // * shuffle order of videos
    this.shuffleArray(response.videos)
    
    // * return image of first video
    return response.videos[0].image
  }

  static quoteImageComposition = ({ quote, query }) => {
  
    return (<Still
      id={'QuoteImage'}
      component={this.quoteImageComponent}
      fps={1}
      durationInFrames={1}
      width={1080}
      height={1080}
      defaultProps={{ quote, query }}
      calculateMetadata={async ({ props }) => {
        // * fetch background image
        const background = await this.getBackgroundImage(props.query)
        return {
          props: {
            quote,
            background
          }
        }}
      }
    />)
  }
  
  static quoteImageComponent = ({ quote, background }) => {
  
    return (<AbsoluteFill style={{ backgroundColor: 'black' }}>
      <Img style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: 'translate(-50%, -50%)'
      }} src={background} />
      {/* Tint */}
      <AbsoluteFill style={{
        margin: 0,
        backgroundColor: 'rgba(0,0,0,.3)'
      }} />
      <QuoteComponent.quote quote={quote} top={150} />
    </AbsoluteFill>)
  }
  static quote = ({ quote, top }) => {
    return (<AbsoluteFill
      style={{
        top,
        fontSize: 40,
        padding: 10,
        textAlign: 'center',
        color: 'white'
      }}>
      <h1>{quote.quote}</h1>
      <h1>~ {quote.author}</h1>
    </AbsoluteFill>)
  }
  
}